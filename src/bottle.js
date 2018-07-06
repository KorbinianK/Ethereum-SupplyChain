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





// field.getHarvestPointer!


export async function finalBottle() {
    const production = await currentProduction()
    console.log("Production:",  production);
    const transport = await getTransportFromProduction(production)
    console.log("Transporter:", transport);
    const harvest = await getHarvestFromTransport(transport)
    console.log("Harvest:",  harvest);
    const fields = await getFieldsFromHarvest(harvest);
    console.log("Fields:", fields);

    return;
           
}

async function getTransportFromProduction(production) {
    const processhandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const transport =  await processhandler_instance.getTransportFromProduction.call(production);
    console.log("?!",production);
    
    return transport;
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

// async function currentTransport() {
//     const processHandler_instance = await processHandler_contract(web3.currentProvider).deployed();
//     const transport = await processHandler_instance.currentTransport.call().then((transport) => {
//         return transport;
//     });
//     return transport;
// }

async function currentProduction() {
    const processHandler_instance = await processHandler_contract(web3.currentProvider).deployed();
    const production = await processHandler_instance.currentProduction.call().then((production) => {
        return production;
    });
    return production;
}