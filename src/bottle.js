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

import {loadSingleField} from "./fields.js"
import {loadSingleHarvest} from "./harvests.js" 
import {loadSingleTransportCard} from "./transports.js" 
import {loadSingleProductionCard} from "./processing.js" 

// field.getHarvestPointer!


export async function getBottleDetails(production) {
    $("#detailsModal").modal("hide");
    $("#bottle").removeClass("d-none");
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#bottle").offset().top
    }, 2000);
    // const production = await currentProduction()
    const transport = await getTransportFromProduction(production)
    const harvest = await getHarvestFromTransport(transport)
    const fields = await getFieldsFromHarvest(harvest);
     loadFieldCards(fields);
     loadTransportCards(transport);
     loadProductionCard(production);
    return;
           
}


async function loadProductionCard(production){
    empty("productions");
    $('#productions-col').find(".loader").removeClass("d-none");
    document.getElementById("bottle-productions").innerHTML +=  await loadSingleProductionCard(production,true);
    $('#productions-col').find(".loader").addClass("d-none");

} 

async function loadTransportCards(transports){
    empty("transports");
    $('#transports-col').find(".loader").removeClass("d-none");
    if(transports instanceof Array){
        for (let i = 0; i < transports.length; i++) {
            document.getElementById("bottle-transports").innerHTML +=  await loadSingleTransportCard(transports[i],true);
        }
    }else{
        document.getElementById("bottle-transports").innerHTML +=  await loadSingleTransportCard(transports,true);
    }
    $('#transports-col').find(".loader").addClass("d-none");
}

async function loadHarvestCards(harvests){
    for (let i = 0; i < harvests.length; i++) {
        document.getElementById("bottle-harvests").innerHTML +=  await loadSingleHarvest(harvests[i]);
    }
}

async function loadFieldCards(fields){
    empty("fields");
    $('#fields-col').find(".loader").removeClass("d-none");
    for (let i = 0; i < fields.length; i++) {
        document.getElementById("bottle-fields").innerHTML +=  await loadSingleField(fields[i],true);
    }
    $('#fields-col').find(".loader").addClass("d-none");
}

async function getTransportFromProduction(production) {
    $('#productions-col').find(".loader").removeClass("d-none");
    const processhandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const transport =  await processhandler_instance.getTransportFromProduction.call(production);
    return transport;
}

function empty(id){
    $("#bottle-"+id).empty();
}

async function getTransportsFromProduction(production) {
    const processhandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const transports =  await processhandler_instance.getTransportsFromProduction.call(production);
    return transports;
}


async function getFieldsFromHarvest(harvest) {
    const harvest_instance = await harvest_contract(web3.currentProvider).at(harvest);
    const fields = await harvest_instance.getFields.call().then((result) => {
        return result;
    });
    return fields;
}

async function getHarvestFromTransport(transport) {
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const harvest = await transportHandler_instance.getHarvestFromTransport.call(transport).then((result) => {
        return result;
    });
    return harvest;
}

async function getHarvestsFromTransport(transport) {
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const harvest = await transportHandler_instance.getHarvestsFromTransport.call(transport).then((result) => {
        return result;
    });
    return harvest;
}


async function currentProduction() {
    const processHandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const production = await processHandler_instance.currentProduction.call().then((production) => {
        return production;
    });
    return production;
}