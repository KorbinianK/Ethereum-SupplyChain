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