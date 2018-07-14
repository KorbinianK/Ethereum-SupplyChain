"use strict";

import Mustache from "mustache";
import field_contract from "./utils/contracts/field_contract";
import fieldHandler_contract from "./utils/contracts/fieldhandler_contract";
import * as helper from "./utils/helper_scripts";
import * as tx from "./utils/transactions";
import { getFieldName } from "./harvests";
import awaitTransactionMined from "await-transaction-mined";

/**
 * Updates the name of a vineyard
 *
 * @param {*} address Address of the field contract
 * @param {*} newName The new name
 * @returns {openField(address)}
 */
export async function updateName(address,newName) {
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    await field_instance.setName(
        newName,
        { from: account }
    ).then(async receipt => {
        await awaitTransactionMined.awaitTx(web3,receipt.tx).then(result =>{
            console.log("!!",result)
            getFieldCards();
            return openField(address);
        });
        }
    ).catch(err => console.error("Error updating the name",err));
   
}

/**
 * Changes the status of the vineyard
 *
 * @param {*} address Contract address of the field
 * @returns boolean 
 */
export async function changeStatus(address){
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    const update = await field_instance.nextStage({
        from: account,
        gas: 300000
    });
    return update;
}

/**
 * Loads a single field card
 *
 * @param {*} address Address of the field contract
 * @param {boolean} [bottle=false]
 * @returns {loadSingleFieldCard(json)}
 */
export async function loadSingleField(address,bottle=false){
    helper.toggleLoader("details",false);    
    const json = await fieldAsJson(address);
    if(bottle)json['fromBottle'] = true;
    return loadSingleFieldCard(json);
}


/**
 * Adds a single Fieldcard to the page
 */
export async function getFieldCards(){
    $('#cultivationSection').find(".loader").removeClass("d-none");
    $('#fields').empty();
    await getAllFields().then(async fields =>{ 
        for (let i = 0; i < fields.length; i++) {
            document.getElementById('fields').innerHTML += await loadSingleFieldCard(fields[i]);
        }
    });
    $('#cultivationSection').find(".loader").addClass("d-none");
}

/**
 * Creates an array of the field JSON files
 *
 * @returns {fields} Array of JSON
 */
export async function getAllFields(){
    const fieldhandler_instance = await fieldHandler_contract(web3.currentProvider).deployed();
    const fields = await fieldhandler_instance
      .getAllFields.call()
      .then(async receipt => {
        var fields = [];
        for (let i = 0; i < receipt.length; i++) {
            const field = await fieldAsJson(receipt[i]);
            fields.push(field);
        }
        return fields; 
      });
    return fields;
} 
 

/**
 * Fetches all fields that are harvestable as dropdown options for the harvest
 * @returns {dropdown} Dropdown of the fields
 */
export async function getHarvestableFields() {
    var fields = await getAllFields();
    var dropdown = [];
    let harvestable = [];
    for (let i = 0; i < fields.length; i++) {
        if(fields[i].harvestable){
            harvestable.push(fields[i]);
        }
    }
    for (let i = 0; i < harvestable.length; i++) {
        const field = harvestable[i];
        var item = ("<option value='" + field.address + "'>" + field.name + "</option>");
        dropdown.push(item);
    }
    return dropdown;
}


/**
 * Loads a single Field as card object
 *
 * @param {*} json JSON data to add to the template
 * @returns {fieldcard}
 */
export async function loadSingleFieldCard(json) {
    const template_fields = await helper.fetchTemplate("src/templates/cultivation/mustache.fieldcard.html");
    var output = Mustache.render(
        template_fields, json
    );
    return output;
}


/**
 * Checks if a vineyard is harvestable
 *
 * @param {*} address Address of the field contract
 * @returns boolean
 */
export async function checkHarvestable(address){
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const res = await field_instance.stage.call().then(result =>{
        if (result.toString() == "1"){
            return true;
        }
        return false;
    }).catch(err => console.error(err));
    return res;
}

/**
 * Builds a JSON file with data from the vineyard
 *
 * @param {*} address Address of the contract
 * @returns {json} JSON data
 */
export async function fieldAsJson(address) {
    let stage;
    let creator;
    let owners = [];
    let name;
    let picture;
    let latitude;
    let longitude;
    let txSender = [];
    let txHarvest;
    var harvestable = await checkHarvestable(address);
    var totalTransactionCount = await getTotalTransactionCount(address);
    var json;
    const field_instance = await field_contract(web3.currentProvider).at(address);
    
    const res = await field_instance.getAllDetails.call().then(async result =>{
        stage = result[0];
        if (stage == 0) {
            stage = "Uncultivated"
        } else if (stage == 1) {
            stage = "Cultivated";
        }else{
            stage = "Harvested"
        }
        creator = result[1] ;
        owners = result[2] ;
        name = result[3] ;
        picture = result[4];
        latitude = result[5] ;
        longitude = result[6] ;
        txHarvest = result[7];
        txSender = result[8];
        json = {
            "address": address,
            "harvestable": await harvestable,
            "grapeType": await getGrapeType(field_instance),
            "stage": stage.toString(),
            "creator": creator,
            "owners": [],
            "name": name,
            "picture": picture,
            "latitude": latitude,
            "longitude": longitude,
            "transactionCountHarvest": await field_instance.transactionsSinceLastHarvest.call().then(s => {return s.toString()}),
            "totalTransactions" : totalTransactionCount,
            "txSender": [],
        }
        for (let i = 0; i < owners.length; i++) {
            let owner = {
                "address":owners[i]
            };
            json["owners"].push(owner);
        }
        for (let i = 0; i < txSender.length; i++) {
                let sender = {
                    "address": txSender[i]
                };
            json["txSender"].push(sender);
        }
        return json;
    });
   return res;
}


/**
 * Fetches the Grape type from the contract
 *
 * @param {*} field_instance Contract instance
 * @returns {type} Grape Type as String
 */
async function getGrapeType(field_instance){
    return await field_instance.getType.call().catch(err => console.error("Error fetching the grape type",err));
}

/**
 * Gets all transactions since the previous harvest
 *
 * @param {*} address Address of the field contract
 * @returns {json} JSON of the transactions
 */
async function getTransactionsSinceHarvest(address){
    var json = [];
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const lastHarvest = await field_instance.getLastHarvest.call();
    const startPointer = await field_instance.getHarvestPointer.call(lastHarvest).then(s => {return s.toString()});
    const endPointer = await getTotalTransactionCount(address);
    for (let i = startPointer; i < endPointer; i++) {
            let tx = {};
            tx.sender = await getTransactionSenderAtIndex(address, i);
            tx.data = web3.utils.hexToString(await getTransactionDataAtIndex(address, i));
            tx.time = await getTransactionTimeAtIndex(address, i);
            json.push(tx);
        }
        json.sort((a, b) => parseFloat(a.time) - parseFloat(b.time)).reverse();
    return json;
}

/**
 * Creates a new Field contract
 */
export async function newField() {
    var details = $("#newFieldForm").serializeArray()
    const fieldhandler_instance = await fieldHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();
    var name,lat,long,grapeType;
    $.each(details, function(i, item) {
        switch (item.name) {
            case "name":
                 name = item.value;
            break;
            case "grapeType":
                grapeType = item.value;
                break;
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
    const template_fields = await helper.fetchTemplate("src/templates/cultivation/mustache.fieldcard.html");
    fieldhandler_instance.newField(
        name,
        long,
        lat,
        grapeType,
        {
         from: account
        }
    ).then( async receipt =>  {
        for (var i = 0; i < receipt.logs.length; i++) {
            var log = receipt.logs[i];
            if (log.event == "NewField") {
                var fieldAddr = log.args.field;
                var json = await fieldAsJson(fieldAddr);
                var output = Mustache.render(
                    template_fields, json
                );
                document.getElementById("newFieldForm").reset();
                return document.getElementById('fields').innerHTML += output;
            }
        }
    }).catch(err => console.error("Error creating a new field",err));
}


/**
 * Opends the Details Modal and loads a single field
 *
 * @param {*} address Address of the field to load
 * @returns {field} JSON of the field data
 */
export async function openField(address) {
    helper.clearDetails();
    helper.toggleLoader("details",true);
    $("#detailsModal").modal("show");
    const template_fielddetails = await helper.fetchTemplate("src/templates/cultivation/mustache.fielddetails.html");
    const field = await fieldAsJson(address).then(async(json)=>{
        json["transactions"] = await getAllTransactions(address);
        json["transactions-harvest"] = await getTransactionsSinceHarvest(address);
        
        var output = Mustache.render(
            template_fielddetails, json
        );
        return output;
    });
    helper.toggleLoader("details",false);
    return document.getElementById('details').innerHTML = field;
}


/**
 * Adds a transaction to the contract
 *
 * @param {*} address Address of the contract
 */
export async function addFieldTransaction(address) {
    let sensor = $('#sensor-select').val();
    let data = $('#data-input').val();
    const field_instance = await field_contract(web3.currentProvider).at(address);
    await tx.addTransaction(field_instance, sensor, data).then(receipt => {
        helper.toggleLoader("details",true);
        getFieldCards();
        return openField(address);
    }).catch(err => console.error("Error adding the transaction",err));
    }



// ############### START TRANSACTION FUNCTIONS ###############


/**
 * Gets the total amount of transactions to this contract
 *
 * @param {*} address Address of the contract
 * @returns Integer value of the total transactions
 */ 
export async function getTotalTransactionCount(address) {
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const txCount = await tx.getTotalTransactionCount(field_instance);
    return txCount;
}

/**
 * Gets a specific transaction sender with an index
 *
 * @param {*} address Address of the contract
 * @param {*} index Integer value as index
 * @returns {sender} Address of the sender
 */
export async function getTransactionSenderAtIndex(address,index) {
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const sender = await tx.getTransactionSenderAtIndex(field_instance, index);
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
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const data = await tx.getTransactionDataAtIndex(field_instance, index);
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
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const time = await tx.getTransactionTimeAtIndex(field_instance, index);
    return helper.makeUnixReadable(time);;
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