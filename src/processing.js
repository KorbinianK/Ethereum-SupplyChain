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
import awaitTransactionMined from "await-transaction-mined";


/**
 * Creates a new prodction and adds the card to the UI
 */
export async function newProduction() {
        const processHandler_instance = await processHandler_contract(web3.currentProvider).deployed();
        const account = await helper.getAccount();
        await processHandler_instance.newProduction(
           {from: account}).then(async(receipt) => {
            for (var i = 0; i < receipt.logs.length; i++) {
                var log = receipt.logs[i];
                var prodAddr = log.args.production;
                if (log.event == "NewProduction") {
                    await awaitTransactionMined.awaitTx(web3,receipt.tx).then(async() =>{
                        return addProductionCard(prodAddr);
                    });
                }
            };
    }).catch(err => console.error("Error creating new Production",err));
}

/**
 * Loads all production cards
 */
export async function getProductionCards(){
    $('#processingSection').find(".loader").removeClass("d-none");
    $('#transports').empty();
    const processHandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    await processHandler_instance.getProductions.call().then(productions =>{
        for (let i = 0; i < productions.length; i++) {
            addProductionCard(productions[i]);
        }
    }).catch(err => console.error("Error loading Production Cards",err));;
    $('#processingSection').find(".loader").addClass("d-none");
   
}

/**
 * Loads a single production as card
 *
 * @param {string} address The address of the production
 * @param {boolean} [bottle=false] Check if the card is loaded for the bottle section
 * @returns The HTML object of the card
 */
export async function loadSingleProductionCard(address,bottle=false){
    const template_production = await helper.fetchTemplate("src/templates/processing/mustache.productioncard.html");
    var json = await productionAsJson(address);
    if(bottle)json['fromBottle'] = true;    
    var output = Mustache.render(
        template_production, json
    );
    return output;
}

/**
 * Adds a card to the UI
 *
 * @param {*} address Address of the production
 */
 async function addProductionCard(address){
    const card = await loadSingleProductionCard(address);
    document.getElementById("productions-loading").innerHTML = "";
    document.getElementById('productions').innerHTML += card;
}

/**
 * Opens the details modal and loads the production details
 *
 * @param {*} address The address of the production
 */
export async function openProduction(address) {
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

/**
 * Function to add a delivery from a transport to a production
 *
 * @param {*} production Address of the production
 */
export async function addTransport(production) {
    const processhandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();
    var transport = $("#transport-input").val();
    var amount = $("#transportValue-input").val();
    return await processhandler_instance.addFromTransport(transport, production, amount, {
        from: account
    }).then(async(receipt) => {
        await awaitTransactionMined.awaitTx(web3,receipt.tx).then(() =>{
            return openProduction(production);
        });
    }).catch(err => (console.error("Not enough Balance?", err)));
}

/**
 * Finishes the production and disables the UI for it
 *
 * @param {*} production Address of the production
 */
export async function finish(production){
    const production_instance = await production_contract(web3.currentProvider).at(production);
    const account = await helper.getAccount();
    await production_instance.finish({from:account}).catch(err => (console.error("Couldn't finish the production", err)));
}


 /**
  * Loads the production details and creates a JSON file with it
  *
  * @param {string} production Address of the production
  * @returns The JSON file
  */
 async function productionAsJson(production) {
    const production_instance = await production_contract(web3.currentProvider).at(production);
    const processhandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    var json = {};
    json["address"] = production;
    json["transport"] = await processhandler_instance.getTransportFromProduction.call(production).catch(err => (console.error("Production has not recieved a transport yet", err)));
    json["ID"] = await production_instance.getID.call().catch(err => (console.error("Error fetching the creator", err)));
    json['transactions'] = await getAllTransactions(production);
    json['tokenBalance'] = await tx.getBalance(production_instance);
    json["totalTransactions"] = await getTotalTransactionCount(production);
    json["status"] = await tx.getStatus(production_instance);
    json["txSender"] = await production_instance.getAllUniqueTransactionSender.call().catch(err => (console.error("Error fetching unique sender in processing", err)));
    return json;
}


/**
 * Retrieves all harvests from a transport
 *
 * @param {string} transport Address of a transport
 * @returns Addresses of the harvests
 */
export async function getHarvestsFromTransport(transport) {
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const harvest = await transportHandler_instance.getHarvestFromTransport.call(transport).catch(err => (console.error("Error fetching harvests from production", err)));
    return harvest;
}

/**
 * Fetches the current Transport
 *
 * @returns Address of the transport
 */
export async function currentTransport() {
    const processHandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const transport = await processHandler_instance.currentTransport.call().catch(err => (console.error("Error fetching current transport", err)));
    return transport;
}

/**
 * Adds a transaction to a production
 *
 * @param {string} production Address of the production
 */
export async function addData(production) {
    let sensor = $('#sensor-select').val();
    let data = $('#data-input').val();
    const production_instance = await production_contract(web3.currentProvider).at(production);
    await tx.addTransaction(production_instance,sensor, data).catch(err => (console.error("Transaction failed", err)));
    openProduction(production);
}


// ############### START TRANSACTION FUNCTIONS ###############

/**
 * Gets the total amount of transactions to this contract
 *
 * @param {string} address Address of the contract
 * @returns Integer value of the total transactions
 */ 
export async function getTotalTransactionCount(address) {
    const production_instance = await production_contract(web3.currentProvider).at(address);
    const txCount = await tx.getTotalTransactionCount(production_instance);
    return txCount;
}

/**
 * Gets a specific transaction sender with an index
 *
 * @param {string} address Address of the contract
 * @param {string} index Integer value as index
 * @returns {string} Address of the sender
 */
export async function getTransactionSenderAtIndex(address, index) {
    const production_instance = await production_contract(web3.currentProvider).at(address);
    const sender = await tx.getTransactionSenderAtIndex(production_instance, index);
    return sender;
}

/**
 * Gets the data of a transaction with an index
 *
 * @param {string} address Address of the contract
 * @param {Integer} index Integer value as index
 * @returns {string} string of the data
 */
export async function getTransactionDataAtIndex(address, index) {
    const production_instance = await production_contract(web3.currentProvider).at(address);
    const data = await tx.getTransactionDataAtIndex(production_instance, index);
    return data;
}

/**
 * Gets the timestamp of a transaction 
 *
 * @param {string} address Address of the contract
 * @param {Integer} index Integer value as index
 * @returns {string} Readable timestamp
 */
export async function getTransactionTimeAtIndex(address, index) {
    const production_instance = await production_contract(web3.currentProvider).at(address);
    const time = await tx.getTransactionTimeAtIndex(production_instance, index);
    return helper.makeUnixReadable(time);
}

/**
 * Gets all transactions made to this contract
 *
 * @param {string} address Address of the contract
 * @returns {string} Json file with all transactions
 */
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
    json.sort((a, b) => parseFloat(a.time) - parseFloat(b.time)).reverse();
    return json;
}
// ############### END TRANSACTION FUNCTIONS ###############