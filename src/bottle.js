import processHandler_contract from "./utils/contracts/processhandler_contract";
import transportHandler_contract from "./utils/contracts/transporthandler_contract";
import harvest_contract from "./utils/contracts/harvest_contract";
import {loadSingleField} from "./fields.js"
import {loadSingleTransportCard} from "./transports.js" 
import {loadSingleProductionCard} from "./processing.js" 

/**
 * @fileOverview Module that handles the Bottle Output
 * @author <a href="mailto:me@korbinian.rocks">Korbinian Kasberger</a>
 */


/**
 * Function that <tt>str</tt>  loads the cards for the final bottle
 */
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


/**
 * Adds the production card to the UI
 *
 * @param {*} production Address of the production
 */
async function loadProductionCard(production){
    empty("productions");
    $('#productions-col').find(".loader").removeClass("d-none");
    document.getElementById("bottle-productions").innerHTML +=  await loadSingleProductionCard(production,true);
    $('#productions-col').find(".loader").addClass("d-none");
} 

/**
 * Function to load all transports as cards
 *
 * @param {*} transports The tranpsort addresses
 */
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


/**
 * Loads all fields as cards
 *
 * @param {*} fields Addresses of the fields
 */
async function loadFieldCards(fields){
    empty("fields");
    $('#fields-col').find(".loader").removeClass("d-none");
    for (let i = 0; i < fields.length; i++) {
        document.getElementById("bottle-fields").innerHTML +=  await loadSingleField(fields[i],true);
    }
    $('#fields-col').find(".loader").addClass("d-none");
}

/**
 * Retrieves a transport included in a production
 *
 * @param {*} production Address of the production
 * @returns The address of the transport
 */
async function getTransportFromProduction(production) {
    $('#productions-col').find(".loader").removeClass("d-none");
    const processhandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const transport =  await processhandler_instance.getTransportFromProduction.call(production).catch(err => console.error(err));
    return transport;
}

/**
 * Empties a bottle column by an id
 *
 * @param {*} id The ID of the column
 */
function empty(id){
    $("#bottle-"+id).empty();
}

/**
 * Retrieves all Transports from a production
 *
 * @param {*} production Address of a production
 * @returns Addresses of the transports
 */
async function getTransportsFromProduction(production) {
    const processhandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const transports =  await processhandler_instance.getTransportsFromProduction.call(production).catch(err => console.error(err));
    return transports;
}

/**
 * Retrieves all field addresses included in a harvest
 *
 * @param {*} harvest Address of the harvest
 * @returns Addresses of the fields
 */
async function getFieldsFromHarvest(harvest) {
    const harvest_instance = await harvest_contract(web3.currentProvider).at(harvest);
    const fields = await harvest_instance.getFields.call().catch(err => console.error(err));
    return fields;
}

/**
 * Retrieves the harvest address from a transport
 *
 * @param {*} transport The address of the transport
 * @returns Address of the Harvest
 */
async function getHarvestFromTransport(transport) {
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const harvest = await transportHandler_instance.getHarvestFromTransport.call(transport).catch(err => console.error(err));
    return harvest;
}

/**
 * Retrieves all harvest addresses included in a transport
 *
 * @param {*} transport Address of the transport
 * @returns Addresses of the harvests
 */
async function getHarvestsFromTransport(transport) {
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const harvest = await transportHandler_instance.getHarvestsFromTransport.call(transport).catch(err => console.error(err));
    return harvest;
}


/**
 * Gets the Address of the current production
 *
 * @returns Address of the production
 */
async function currentProduction() {
    const processHandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const production = await processHandler_instance.currentProduction.call().catch(err => console.error(err));
    return production;
}