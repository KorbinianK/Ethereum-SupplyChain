import Mustache from "mustache";
import transportHandler_contract from "./utils/contracts/transporthandler_contract";
import transport_contract from "./utils/contracts/transport_contract";
import * as helper from "./utils/helper_scripts";
import * as tx from "./utils/transactions";
import { openHarvest } from "./harvests";
import awaitTransactionMined from "await-transaction-mined";


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
            .then(async receipt => {
                $('#transportSection').find(".loader").removeClass("d-none");
                console.log("new transport",receipt);
                for (var i = 0; i < receipt.logs.length; i++) {
                    var log = receipt.logs[i];
                    if (log.event == "NewTransport") {
                        var transpAddr = log.args.transport;
                        await awaitTransactionMined.awaitTx(web3,receipt.tx).then(async() =>{
                            return addTransportCard(transpAddr);
                        });
                    }
                }
            }).catch(err => console.error("Error creating a new transprot",err));
           
             $('#transportSection').find(".loader").addClass("d-none");
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
    json["status"] = await tx.getStatus(transport_instance);
    var txSender = await transport_instance.getAllUniqueTransactionSender.call().then(result => {return result;});
    for (let i = 0; i < txSender.length; i++) {
        let sender = {"address": txSender[i]};
        json["txSender"].push(sender);
        }
    return json;
}

export async function loadSingleTransportCard(address){
    const template_transports = await helper.fetchTemplate("src/templates/transport/mustache.transportcard.html");
    var json = await transportAsJson(address);    
    var output = Mustache.render(
        template_transports, json
    );
    return output;
}

export async function addTransportCard(address){
    const card = await loadSingleTransportCard(address);
    document.getElementById("transports-loading").innerHTML = "";
    return document.getElementById('transports').innerHTML += card;
}

export async function getTransportCards(){
    $('#transportSection').find(".loader").removeClass("d-none");
    $('#transports').empty();
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    await transportHandler_instance.getTransports.call().then(transports =>{
        for (let i = 0; i < transports.length; i++) {
            addTransportCard(transports[i]);
        }
    });
    $('#transportSection').find(".loader").addClass("d-none");
}


export async function openTransport(address){
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
    await tx.addTransaction(transport_instance,sensor, data).catch(err => (console.error("Transaction failed", err)));
    return openTransport(transport);
}

export async function addHarvest(transport) {
    const transporthandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();
    var harvest = $("#harvest-input").val();
    var amount = $("#harvestValue-input").val();
    console.log("from",harvest,"amout",amount);
    await transporthandler_instance.addFromHarvest(harvest, transport, amount, {
        from: account
    }).then(async receipt => {
        await awaitTransactionMined.awaitTx(web3,receipt.tx).then(() =>{
            return openTransport(transport);
        });
    }).catch(err => (console.error("Not enough Balance?", err)));
}

// ############### START TRANSACTION FUNCTIONS ###############

/**
 * Gets the total amount of transactions to this contract
 *
 * @param {*} address Address of the contract
 * @returns Integer value of the total transactions
 */ 
export async function getTotalTransactionCount(address) {
    const transport_instance = await transport_contract(web3.currentProvider).at(address);
    const txCount = await tx.getTotalTransactionCount(transport_instance);
    return txCount;
}

/**
 * Gets a specific transaction sender with an index
 *
 * @param {*} address Address of the contract
 * @param {*} index Integer value as index
 * @returns {sender} Address of the sender
 */
export async function getTransactionSenderAtIndex(address, index) {
    const transport_instance = await transport_contract(web3.currentProvider).at(address);
    const sender = await tx.getTransactionSenderAtIndex(transport_instance, index);
    return sender;
}

/**
 * Gets the data of a transaction with an index
 *
 * @param {*} address Address of the contract
 * @param {*} index Integer value as index
 * @returns {data} String of the data
 */
export async function getTransactionDataAtIndex(address, index) {
    const transport_instance = await transport_contract(web3.currentProvider).at(address);
    const data = await tx.getTransactionDataAtIndex(transport_instance, index);
    return data;
}

/**
 * Gets the timestamp of a transaction 
 *
 * @param {*} address Address of the contract
 * @param {*} index Integer value as index
 * @returns {time} Readable timestamp
 */
export async function getTransactionTimeAtIndex(address, index) {
    const transport_instance = await transport_contract(web3.currentProvider).at(address);
    const time = await tx.getTransactionTimeAtIndex(transport_instance, index);
    return helper.makeUnixReadable(time);
}

/**
 * Gets all transactions made to this contract
 *
 * @param {*} address Address of the contract
 * @returns {json} Json file with all transactions
 */
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
    json.sort((a, b) => parseFloat(a.time) - parseFloat(b.time)).reverse();
    return json;
}

// ############### END TRANSACTION FUNCTIONS ###############
