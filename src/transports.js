import Mustache from "mustache";
// import Router from "./router.js";
// import harvest_contract from "./utils/contracts/harvest_contract";
import transportHandler_contract from "./utils/contracts/transporthandler_contract";
import transport_contract from "./utils/contracts/transport_contract";
import * as helper from "./utils/helper_scripts";
import * as tx from "./utils/transactions";

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
    const currentH = await currentHarvest();
    
    const currentTransport = await getCurrentTransport();

    if (currentH != undefined && currentTransport != undefined) {
        var check = checkTransport(currentH, currentTransport);
    }
    // if(!check || check == undefined){
        const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
        const account = await helper.getAccount();
        const result = await transportHandler_instance.newTransport(
            lat,
            long,
            {from: account}).then((res) => {
            return res
        });
        return getTransportCards();
    // }
    // else{
    //     console.error("same harvest!");
    // }
}

async function checkTransport(harvest,transport){
    const current = harvest;
    const newharvest = await getHarvest(transport);
    if(current == newHarvest){
        return false;
    }return true;
}

export async function getCurrentTransport(){
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const transport = await transportHandler_instance.currentTransport.call().then((res) => {
        return res;
    }).catch(err => console.error(err));
    
    return transport;
}

export async function currentHarvest() {
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const result = await transportHandler_instance.currentHarvest.call().then((res) => {
        return res;
    }).catch(error =>{return console.error("woopsie",error)});
    return result;
}

async function getHarvest(address) {
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const harvest = await transportHandler_instance.getHarvestsFromTransport.call(address).then(result => {
        return result;
    });
    return harvest;
}

async function getID(transport){
     const transport_instance = await transport_contract(web3.currentProvider).at(transport);
     const ID = transport_instance.getID.call().then(result => {
         return result;
     });
     return ID;
}

export async function transportAsJson(transport) {
    const transport_instance = await transport_contract(web3.currentProvider).at(transport);

    let start_latitude;
    let start_longitude;
    let end_latitude;
    let end_longitude;
    let txSender = [];
    let harvests = [];

    const startLocation = await transport_instance.getStartCoordinates.call().then(result => {
        return result;
    });
    console.log("start",startLocation);
    
    var json = {};

    json["address"] = transport;
    json["harvestAddress"] = await getHarvest(transport);
    json["ID"] = await getID(transport);
    json['transactions'] = await getAllTransactions(transport);
    json['tokenBalance'] = await tx.getBalance(transport_instance);
    json["start_latitude"] = startLocation[0];
    json["start_longitude"] = startLocation[1];
    // json["end_latitude"] = await transport_instance.end_latitude.call().then(result => {return result;});
    // json["end_longitude"] = await transport_instance.end_longitude.call().then(result => {return result;});
    json["totalTransactions"] = await getTotalTransactionCount(transport);

    txSender = await transport_instance.getAllUniqueTransactionSender.call().then(result => {return result;});
    // for (let i = 0; i < txSender.length; i++) {
    //     let sender = {"address": txSender[i]};
    //     json["txSender"].push(sender);
    //     }
    return json;
}

async function loadTransportCard(json){
    const template_transports = await helper.fetchTemplate("src/templates/transport/mustache.transportcard.html");
    Mustache.parse(template_transports);
    var output = Mustache.render(
        template_transports, json
    );
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
    Mustache.parse(template_transportdetails);
    const json = await transportAsJson(address);
    var output = Mustache.render(
        template_transportdetails, json
    );
     helper.toggleLoader("details", false);
     if(output != null){
        document.getElementById('details').innerHTML = output;
     }
}

export async function addData(address) {
    let sensor = $('#sensor-select').val();
    let data = $('#data-input').val();
    const transport_instance = await transport_contract(web3.currentProvider).at(address);
    tx.addTransaction(transport_instance,sensor, data).then(result => {
        console.log("tx sent",result)
    });
}

export async function addHarvest(transport) {
    const transporthandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();
    var harvest = $("#harvest-input").val();
    var amount = $("#harvestValue-input").val();
    console.log("from",harvest,"amout",amount);
    return await transporthandler_instance.addFromHarvest(harvest, transport, amount, {
        from: account
    }).then(result => {
        console.log(result);
        return result
    }).catch(err => (console.error("Not enough Balance?", err)));
}

// ############### START TRANSACTION FUNCTIONS ###############

export async function getTotalTransactionCount(address) {
    const transport_instance = await transport_contract(web3.currentProvider).at(address);
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
    if(txCount >0){
         for (let i = 0; i < txCount; i++) {
             let tx = {};
             tx.sender = await getTransactionSenderAtIndex(address, i);
             tx.data = web3.utils.hexToString(await getTransactionDataAtIndex(address, i));
             tx.time = await getTransactionTimeAtIndex(address, i);
             json.push(tx);
         }
    }
    return json;
}



// ############### END TRANSACTION FUNCTIONS ###############
