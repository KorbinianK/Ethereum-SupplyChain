import Mustache from "mustache";
import processHandler_contract from "./utils/contracts/processhandler_contract";
import production_contract from "./utils/contracts/production_contract";
import field_contract from "./utils/contracts/field_contract";
import fieldHandler_contract from "./utils/contracts/fieldhandler_contract";
import transportHandler_contract from "./utils/contracts/transporthandler_contract";
import transport_contract from "./utils/contracts/transport_contract";
import harvest_contract from "./utils/contracts/harvest_contract";
import harvestHandler_contract from "./utils/contracts/harvesthandler_contract";
import * as helper from "./utils/helper_scripts";
import * as tx from "./utils/transactions";


export async function finalBottle(production) {
    const transport = await currentTransport();
    const harvest = await getHarvestsFromTransport(transport);
    const fields = await getFieldsFromHarvest(harvest);
    console.log("Transporter:",transport);
    console.log("Harvest:",harvest);
    console.log("Fields:",fields);
}


export async function newProduction() {
    // var details = $("#newTransportForm").serializeArray();
    // var lat,long;
    // $.each(details, function (i, item) {
    //     switch (item.name) {
    //         case "latitude":
    //             lat = item.value;
    //             break;
    //         case "longitude":
    //             long = item.value;
    //             break;
    //         default:
    //             break;
    //     }
    // });
//    const transport = await currentTransport();

//    if (currentH != undefined && currentTransport != undefined) {
//        var check = checkTransport(currentH, currentTransport);
//    }
   // if(!check || check == undefined){
       const processHandler_instance = await processHandler_contract(web3.currentProvider).deployed();
       const account = await helper.getAccount();
       const address = await processHandler_instance.newProduction(
           {from: account}).then((receipt) => {
            for (var i = 0; i < receipt.logs.length; i++) {
                var log = receipt.logs[i];
                var prodAddr = log.args.production;
                if (log.event == "NewProduction") {
                        return prodAddr;
                }
            };
    }).catch(err => console.error("woopsie",err));
    var json = await productionAsJson(address);
    return loadProductionCard(json);
}

export async function getProductionCards(){
    $('#processingSection').find(".loader").removeClass("d-none");
    $('#productions').empty();
    await allProductions().then(productions =>{
        for (let i = 0; i < productions.length; i++) {
            loadProductionCard(productions[i]);
        }
    });
    $('#processingSection').find(".loader").addClass("d-none");
}

async function allProductions() {
    const processHandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const productions = await processHandler_instance.getProductions.call().then(async result => {
        var p = [];
        for (let i = 0; i < result.length; i++) {
           p.push(await productionAsJson(result[i]));
        }
        return p; 
    });
    if (productions.length == 0){
        document.getElementById("productions-loading").innerHTML = "No Productions found";
    }else{
        document.getElementById("productions-loading").innerHTML = "";
    }
    return productions;
}

async function loadProductionCard(json){
    const template_productions = await helper.fetchTemplate("src/templates/processing/mustache.productioncard.html");
    Mustache.parse(template_productions);
    var output = Mustache.render(
        template_productions, json
    );
    return document.getElementById('productions').innerHTML += output;
}

export async function loadSingleProduction(address) {
    $("#details").empty();
     helper.toggleLoader("details",true);
    $("#detailsModal").modal("show");
    const template_productiondetails = await helper.fetchTemplate("src/templates/processing/mustache.productiondetails.html");
    Mustache.parse(template_productiondetails);
    const json = await productionAsJson(address);
    var output = Mustache.render(
        template_productiondetails, json
    );
     helper.toggleLoader("details", false);
     if(output != null){
        document.getElementById('details').innerHTML = output;
     }
}

export async function addTransport(production) {
    const processhandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();
    var transport = $("#transport-input").val();
    var amount = $("#transportValue-input").val();
    console.log("from",transport,"amout",amount);
    return await processhandler_instance.addFromTransport(transport, production, amount, {
        from: account
    }).then(result => {
        console.log(result);
        return result
    }).catch(err => (console.error("Not enough Balance?", err)));
}


export async function productionAsJson(production) {
    const production_instance = await production_contract(web3.currentProvider).at(production);
    let txSender;
    var json = {};
    
    json["address"] = production;
    json["ID"] = await production_instance.getID.call().then(result => {return result;});
    json['transactions'] = await getAllTransactions(production);
    json['tokenBalance'] = await tx.getBalance(production_instance);
    json["totalTransactions"] = await getTotalTransactionCount(production);
    json["txSender"] = await production_instance.getAllUniqueTransactionSender.call().then(result => {return result;});
    // for (let i = 0; i < txSender.length; i++) {
    //     let sender = {"address": txSender[i]};
    //     json["txSender"].push(sender);
    //     }
    return json;
}

export async function getFieldsFromHarvest(harvest) {
    const harvest_instance = await harvest_contract(web3.currentProvider).at(harvest);
    const fields = await harvest_instance.getFields.call().then((result)=>{return result;});
    return fields;
}

export async function getHarvestsFromTransport(transport) {
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const harvest = await transportHandler_instance.getHarvestFromTransport.call(transport).then((result) => {return result;});
    return harvest;
}

export async function currentTransport() {
    const processHandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const result = await processHandler_instance.currentTransport.call().then((res) => {
        return res;
    });
    return result;
}


// ############### START TRANSACTION FUNCTIONS ###############

export async function getTotalTransactionCount(address) {
    const production_instance = await production_contract(web3.currentProvider).at(address);
    const txCount = await tx.getTotalTransactionCount(production_instance);
    return txCount;
}

export async function getTransactionSenderAtIndex(address, index) {
    const production_instance = await production_contract(web3.currentProvider).at(address);
    const sender = await tx.getTransactionSenderAtIndex(production_instance, index);
    return sender;
}

export async function getTransactionDataAtIndex(address, index) {
    const production_instance = await production_contract(web3.currentProvider).at(address);
    const data = await tx.getTransactionDataAtIndex(production_instance, index);
    return data;
}

export async function getTransactionTimeAtIndex(address, index) {
    const production_instance = await production_contract(web3.currentProvider).at(address);
    const time = await tx.getTransactionTimeAtIndex(production_instance, index);
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