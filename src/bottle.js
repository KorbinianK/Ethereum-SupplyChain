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



export async function finalBottle() {
    const bottle = await currentProduction().then(async production => {
        console.log("Production:", await production);
        return await getTransportFromProduction(await production).then(async transport => {
            console.log("Transporter:", transport);
            return await getHarvestFromTransport(await transport).then(async harvest => {
                console.log("Harvest:", await harvest);
                return await getFieldsFromHarvest(await harvest).then(async fields => {
                    console.log("Fields:", await fields);
                    return fields;
                });
            });
        })
    });
}

async function getTransportFromProduction(production) {
    const production_instance = await production_contract(web3.currentProvider).at(production);
    const transport = production_instance.getTransportFromProduction.call().then(result => {
        return result
    });
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
    const processHandler_instance = await processHandler_contract(web3.currentProvider).at(harvest);
    const production = await processHandler_instance.currentProduction.call().then((production) => {
        return production;
    });
    return production;
}