import Mustache from "mustache";
// import Router from "./router.js";
// import harvest_contract from "./utils/contracts/harvest_contract";
import transportHandler_contract from "./utils/contracts/transporthandler_contract";
import transport_contract from "./utils/contracts/transport_contract";
import * as helper from "./utils/helper_scripts";
import * as tx from "./utils/transactions";

export async function newTransport() {
    const currentH = await currentHarvest();
    const currentTransport = await getCurrentTransport();
    if (currentH != undefined && currentTransport != undefined) {
        var check = checkTransport(currentH, currentTransport);
    }
    if(!check || check == undefined){
        const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
        const account = await helper.getAccount();
        const result = await transportHandler_instance.newTransport({
            from: account
        }).then((res) => {
            return res
        });
    }
    else{
        console.error("same harvest!");
    }
    
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
    const account = await helper.getAccount();
    const result = await transportHandler_instance.currentHarvest({
        from: account
    }).then((res) => {
        return res;
    });
    return result;
}

async function getHarvest(address) {
    const account = await helper.getAccount();
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const harvest = await transportHandler_instance.getHarvestFromTransport(address,{from:account}).then(result => {
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
    let start_latitude;
    let start_longitude;
    let end_latitude;
    let end_longitude;
    let txSender = [];
    let harvests = [];
    var json = {};
    json["address"] = transport;
    json["harvestAddress"] = await getHarvest(transport);
    json["ID"] = await getID(transport);
    const transport_instance = await transport_contract(web3.currentProvider).at(transport);

    // json["start_latitude"] = await transport_instance.start_latitude.call().then(result => {return result;});
    // json["start_longitude"] = await transport_instance.start_longitude.call().then(result => {return result;});
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
    $('#cultivationSection').find(".loader").addClass("d-none");
}


async function allTransports() {
    $("#transportSection")
    .find(".loader")
    .removeClass("d-none");
    console.log("allTransports");
    
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const transports = await transportHandler_instance.getTransports.call().then(async result => {
        var t = [];
        for (let i = 0; i < result.length; i++) {
           t.push(await transportAsJson(result[i]));
        }
        return t; 
    });
    console.log("alltr",transports)
    if (transports.length == 0){
        document.getElementById("transports-loading").innerHTML = "No Transports found";
    }
     $("#transportSection")
         .find(".loader")
         .addClass("d-none");
    return transports;
}

export async function loadSingleTransport(address) {
      $("#transportDetails").empty();
      $("#transportSection")
          .find(".loader")
          .removeClass("d-none");
    const transport = await getCurrentTransport();
    const transport_instance = await transport_contract(web3.currentProvider).at(transport);
    const balance = await tx.getBalance(transport_instance);

    const template_transportdetails = await helper.fetchTemplate("src/templates/transport/mustache.transportdetails.html");
    Mustache.parse(template_transportdetails);
    // const json = await harvestAsJson(address);
    var json = {
        "tokenBalance": balance,
        "address": transport,
        "harvestAddress": await getHarvest(transport),
        "transactions": await getAllTransactions(transport)
    };
    console.log("transport Json",json);
    var output = Mustache.render(
        template_transportdetails, json
    );
    document.getElementById('transportDetails').innerHTML = output;
    console.log("balance",balance);
    $("#transportSection")
        .find(".loader")
        .addClass("d-none");
}

export async function addData(address) {
    // console.log("a",address)
    let sensor = $('#sensor-select').val();
    let data = $('#data-input').val();
    const transport_instance = await transport_contract(web3.currentProvider).at(address);
    tx.addTransaction(transport_instance,sensor, data).then(result => {
        console.log("tx sent",result)
    });


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
    for (let i = 0; i < txCount; i++) {
        let tx = {};
        tx.sender = await getTransactionSenderAtIndex(address, i);
        tx.data = web3.utils.hexToString(await getTransactionDataAtIndex(address, i));
        tx.time = await getTransactionTimeAtIndex(address,i);
        json.push(tx);
    }
    return json;
}



// ############### END TRANSACTION FUNCTIONS ###############







