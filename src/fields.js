"use strict";

import Mustache from "mustache";
import field_contract from "./utils/contracts/field_contract";
import fieldHandler_contract from "./utils/contracts/fieldhandler_contract";
import * as helper from "./utils/helper_scripts";
import * as tx from "./utils/transactions";
import { getFieldName } from "./harvests";

export async function updateName(address,newName) {
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    await field_instance.setName(
        newName,
        { from: account }
    ).then(receipt => {
        console.log("?",receipt);
        for (var i = 0; i < receipt.logs.length; i++) {
            var log = receipt.logs[i];
            console.log(log);
            if (log.event == "NewTransaction") {
                console.log("TX!");
                return true;
            }
        };
        }
    ).catch(err => console.error("woopsie",err));
    getFieldCards();
    return openField(address);
}

export async function changeStatus(address){
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    const update = await field_instance.nextStage({
        from: account,
        gas: 300000
    });
    return update;
}

export async function getStage(address){
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const status = await field_instance.stage.call().then(
        (res) => {
            console.log("status", res)
            return res;
        }
    )
    return status
}

export async function switchStatus(address) {
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    await field_instance.switchStatus({
            from: account
        });
    return openField(address);
}

// ############### START TRANSACTION FUNCTIONS ###############

export async function getTotalTransactionCount(address) {
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const txCount = await tx.getTotalTransactionCount(field_instance);
    return txCount;
}

export async function getTransactionSenderAtIndex(address,index) {
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const sender = await tx.getTransactionSenderAtIndex(field_instance, index);
    return sender;
}

export async function getTransactionDataAtIndex(address, index) {
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const data = await tx.getTransactionDataAtIndex(field_instance, index);
    return data;
}

export async function getTransactionTimeAtIndex(address, index) {
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const time = await tx.getTransactionTimeAtIndex(field_instance, index);
    return helper.makeUnixReadable(time);;
}


export async function getAllTransactions(address) {
    const txCount = await getTotalTransactionCount(address);
    var json = 
       []
    ;
    for (let i = 0; i < txCount; i++) {
        let tx = {};
        let data = await getTransactionDataAtIndex(address, i);
        tx.sender = await getTransactionSenderAtIndex(address, i);
        tx.data = web3.utils.hexToAscii(data);
        tx.time = await getTransactionTimeAtIndex(address, i);
        json.push(tx);
    }    
    return json;
}



// ############### END TRANSACTION FUNCTIONS ###############


export async function loadSingleField(address){
    const json = await fieldAsJson(address);
   return loadSingleFieldCard(json);
}


export async function getFieldCards(){
    $('#cultivationSection').find(".loader").removeClass("d-none");
    $('#cultivationSection').removeClass("d-none");
    $('#fields').empty();
    await getAllFields().then(fields =>{ 
        for (let i = 0; i < fields.length; i++) {
            loadSingleFieldCard(fields[i]);
        }
    });
    $('#cultivationSection').find(".loader").addClass("d-none");
}

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


export async function getHarvestableFields(filter) {
    var toFilter = filter.fields;
    const fields = await getAllFields().then(fields =>{
        let harvestable = [];
         for (let i = 0; i < fields.length; i++) {
            if(fields[i].harvestable){
                harvestable.push(fields[i]);
            }
         }
         return harvestable;
    });
    // var difference = helper.objDiff(fields,toFilter);
    var dropdown = [];
    // for (let i = 0; i < difference.length; i++) {
    //     const element = difference[i];
    //     var item = ("<option value='" + element.address + "'>" + element.name + "</option>");
    //     dropdown.push(item);
    // }
     for (let i = 0; i < fields.length; i++) {
         const element = fields[i];
         var item = ("<option value='" + element.address + "'>" + element.name + "</option>");
         dropdown.push(item);
     }
    return dropdown;
}

export async function loadSingleFieldCard(json) {
    console.log("Json", json);
    const template_fields = await helper.fetchTemplate("src/templates/cultivation/mustache.fieldcard.html");
    Mustache.parse(template_fields);
    var output = Mustache.render(
        template_fields, json
    );
    return document.getElementById('fields').innerHTML += output;
}


export async function checkHarvestable(address){
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const res = await field_instance.stage.call().then(result =>{ // TODO!!!!
        if (result.toString() == "1"){
            return true;
        }
        return false;
    }).catch(err => console.error(err));
    return res;
}

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
            "stage": stage.toString(),
            "creator": creator,
            "owners": [],
            "name": name,
            "picture": picture,
            "latitude": latitude,
            "longitude": longitude,
            "transactionCountHarvest": txHarvest.toString(),
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
    Mustache.parse(template_fields);
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
            console.log("new field",receipt);
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
    }).catch(err => console.error("woopsie",err));
}



export async function openField(address) {
    helper.clearDetails();
    helper.toggleLoader("details",true);
    $("#detailsModal").modal("show");
    const template_fielddetails = await helper.fetchTemplate("src/templates/cultivation/mustache.fielddetails.html");
    Mustache.parse(template_fielddetails);
    const field = await fieldAsJson(address).then(async(json)=>{
        json["transactions"] = await getAllTransactions(address);
        console.log(json);
        
        Mustache.parse(template_fielddetails);
        var output = Mustache.render(
            template_fielddetails, json
        );
        return output;
    });
    helper.toggleLoader("details",false);
    return document.getElementById('details').innerHTML = field;
}


export async function addFieldTransaction(address) {
    let sensor = $('#sensor-select').val();
    let data = $('#data-input').val();
    const field_instance = await field_contract(web3.currentProvider).at(address);
    return await tx.addTransaction(field_instance, sensor, data).then(result => {
        console.log("tx sent", result)
    });
}
// export async function addFieldTransaction(address){
//     const field_instance = await field_contract(web3.currentProvider).at(address);
//     var receipt = await tx.doDummyTransaction(field_instance);
//     console.log(receipt);
//     let block = await web3.eth.getBlock("latest")
//     console.log(block)
//     return openField(address);
// }
