import Mustache from "mustache";
// import Router from "./router.js";
// import harvest_contract from "./utils/contracts/harvest_contract";
import transportHandler_contract from "./utils/contracts/transporthandler_contract";
import transport_contract from "./utils/contracts/transport_contract";
import * as helper from "./utils/helper_scripts";
import * as tx from "./utils/transactions";

export async function newTransport() {
    const current = await currentHarvest();
    console.log("current Harvest", current);

    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();
    const result = await transportHandler_instance.newTransport({
        from: account
    }).then((res) => {
        return res
    });
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


export async function loadTransport(address) {
      $("#transportDetails").empty();
      $("#transportSection")
          .find(".loader")
          .toggleClass("d-none");
    const account = await helper.getAccount();
    const transportHandler_instance = await transportHandler_contract(web3.currentProvider).deployed();
    const transport = await transportHandler_instance.currentTransport({
        from: account
    }).then((res) => { 
        return res;
    });
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
        .toggleClass("d-none");
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







