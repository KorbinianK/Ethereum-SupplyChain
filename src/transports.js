import Mustache from "mustache";
// import Router from "./router.js";
// import harvest_contract from "./utils/contracts/harvest_contract";
import transportHandler_contract from "./utils/contracts/transporthandler_contract";
import transport_contract from "./utils/contracts/transport_contract";
import * as helper from "./utils/helper_scripts";
import * as tx from "./utils/transactions";
import { openHarvest } from "./harvests";

export async function newTransport() {
     var details = $("#newTransportForm").serializeArray();
     var lat,long;
     $.each(details, function (i, item) {
         switch (item.name) {
             case "latitude":
                 lat = item.value;
                 break;
             case "longitude":
                 long = item.value;
                 break;
             default:
                 break;
         }
     });
        const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
        const account = await helper.getAccount();
        const address = await transportHandler_instance.newTransport(
            lat,
            long,
            {from: account})
            .then(receipt => {
                $('#transportSection').find(".loader").removeClass("d-none");
                console.log("new transport",receipt);
                for (var i = 0; i < receipt.logs.length; i++) {
                    var log = receipt.logs[i];
                    if (log.event == "NewTransport") {
                        var transpAddr = log.args.transport;
                        return transpAddr;
                    }
                }
            }).catch(err => console.error("Error creating a new transprot",err));
            var json = await transportAsJson(address);
             $('#transportSection').find(".loader").addClass("d-none");
            return loadTransportCard(json);
        }

export async function getCurrentTransport(){
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const transport = await transportHandler_instance.currentTransport.call().then((res) => {
        return res;
    }).catch(error =>{return console.error("Error fetching the current transport",error)});
    
    return transport;
}

export async function currentHarvest() {
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const result = await transportHandler_instance.currentHarvest.call().then((res) => {
        return res;
    }).catch(error =>{return console.error("Error fetching the current harvest",error)});
    return result;
}

async function getHarvest(address) {
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const harvest = await transportHandler_instance.getHarvestsFromTransport.call(address).then(result => {
        return result;
    }).catch(error =>{return console.error("Error fetching harvest:",address,error)});
    return harvest;
}

async function getID(transport){
     const transport_instance = await transport_contract(web3.currentProvider).at(transport);
     const ID = transport_instance.getID.call().then(result => {
         return result;
        }).catch(error =>{return console.error("Error getting the ID",error)});
        return ID;
}

export async function transportAsJson(transport) {
    const transport_instance = await transport_contract(web3.currentProvider).at(transport);
    const startLocation = await transport_instance.getStartCoordinates.call().then(result => {
        return result;
    });
    var json = {};
    json["txSender"] = [];
    json["address"] = transport;
    json["harvestAddress"] = await getHarvest(transport);
    json["ID"] = await getID(transport);
    json['transactions'] = await getAllTransactions(transport);
    json['tokenBalance'] = await tx.getBalance(transport_instance);
    json["start_latitude"] = startLocation[0];
    json["start_longitude"] = startLocation[1];
    json["totalTransactions"] = await getTotalTransactionCount(transport);

    var txSender = await transport_instance.getAllUniqueTransactionSender.call().then(result => {return result;});
    for (let i = 0; i < txSender.length; i++) {
        let sender = {"address": txSender[i]};
        json["txSender"].push(sender);
        }
    return json;
}

async function loadTransportCard(json){
    const template_transports = await helper.fetchTemplate("src/templates/transport/mustache.transportcard.html");
    // Mustache.parse(template_transports);
    var output = Mustache.render(
        template_transports, json
    );
    document.getElementById("transports-loading").innerHTML = "";
    return document.getElementById('transports').innerHTML += output;
}



export async function getTransportCards(){
    $('#transportSection').find(".loader").removeClass("d-none");
    $('#transports').empty();
    await allTransports().then(transports =>{
        for (let i = 0; i < transports.length; i++) {
            loadTransportCard(transports[i]);
        }
    });
    $('#transportSection').find(".loader").addClass("d-none");
}


async function allTransports() {
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const transports = await transportHandler_instance.getTransports.call().then(async result => {
        var t = [];
        for (let i = 0; i < result.length; i++) {
           t.push(await transportAsJson(result[i]));
        }
        return t; 
    });
    if (transports.length == 0){
        document.getElementById("transports-loading").innerHTML = "No Transports found";
    }else{
         document.getElementById("transports-loading").innerHTML = "";
    }
    return transports;
}

export async function loadSingleTransport(address) {
    $("#details").empty();
     helper.toggleLoader("details",true);
    $("#detailsModal").modal("show");
    const template_transportdetails = await helper.fetchTemplate("src/templates/transport/mustache.transportdetails.html");
    // Mustache.parse(template_transportdetails);
    const json = await transportAsJson(address);
    var output = Mustache.render(
        template_transportdetails, json
    );
     helper.toggleLoader("details", false);
     if(output != null){
        document.getElementById('details').innerHTML = output;
     }
}

export async function addData(transport) {
    let sensor = $('#sensor-select').val();
    let data = $('#data-input').val();
    const transport_instance = await transport_contract(web3.currentProvider).at(transport);
    await tx.addTransaction(transport_instance,sensor, data).then(result => {
        console.log("tx sent",result)
        return loadSingleTransport(transport);
    }).catch(err => (console.error("Transaction failed", err)));
}

export async function addHarvest(transport) {
    const transporthandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();
    var harvest = $("#harvest-input").val();
    var amount = $("#harvestValue-input").val();
    console.log("from",harvest,"amout",amount);
    await transporthandler_instance.addFromHarvest(harvest, transport, amount, {
        from: account
    }).then(result => {
        console.log(result);
        return loadSingleTransport(transport);
    }).catch(err => (console.error("Not enough Balance?", err)));
}

// ############### START TRANSACTION FUNCTIONS ###############

export async function getTotalTransactionCount(address) {
    const transport_instance = await transport_contract(web3.currentProvider).at(address);
    console.log("transport",address);
    const txCount = await tx.getTotalTransactionCount(transport_instance);
    return txCount;
}

export async function getTransactionSenderAtIndex(address, index) {
    const transport_instance = await transport_contract(web3.currentProvider).at(address);
    const sender = await tx.getTransactionSenderAtIndex(transport_instance, index);
    return sender;
}

export async function getTransactionDataAtIndex(address, index) {
    const transport_instance = await transport_contract(web3.currentProvider).at(address);
    const data = await tx.getTransactionDataAtIndex(transport_instance, index);
    return data;
}

export async function getTransactionTimeAtIndex(address, index) {
    const transport_instance = await transport_contract(web3.currentProvider).at(address);
    const time = await tx.getTransactionTimeAtIndex(transport_instance, index);
    return helper.makeUnixReadable(time);
}

export async function getAllTransactions(address) {
    const txCount = await getTotalTransactionCount(address);
    var json = [];
         for (let i = 0; i < txCount; i++) {
             let tx = {};
             tx.sender = await getTransactionSenderAtIndex(address, i);
             tx.data = web3.utils.hexToString(await getTransactionDataAtIndex(address, i));
             tx.time = await getTransactionTimeAtIndex(address, i);
             json.push(tx);
    }
    return json;
}



// ############### END TRANSACTION FUNCTIONS ###############
