"use strict";

import Mustache from "mustache";
import field_contract from "./utils/contracts/field_contract";
import fieldHandler_contract from "./utils/contracts/fieldhandler_contract";
import * as helper from "./utils/helper_scripts";

export async function updateName(address,newName) {

    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    var dummyData = web3.utils.stringToHex("foo");

    const res = await field_instance.setName(
        web3.utils.stringToHex(newName),
        { from: account }
    ).then(result => {
        console.log(result);
        $("#" + address + "-card")
            .find(".card-title")
            .text(newName);
        return result;
    });
}

export async function changeStatus(address){
    
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    field_instance.changeStatus(true,{from:account}).then(result => {
        console.log(result);
    })
}

export async function getAll(){
    const fieldhandler_instance = await fieldHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();
    fieldhandler_instance
      .getAllFields({ from: account })
      .then(async receipt => {
        // let count = result.toString();
        var fields = [];
        console.log("fields",receipt);
          for (let i = 0; i < receipt.length; i++) {
              const field = await fieldAsJson(receipt[i]);
              fields.push(field);
              loadFieldCard(field);
        }   
      });
}

export async function loadFieldCard(json){
    const template_fields = await helper.fetchTemplate("src/templates/cultivation/mustache.fieldcard.html");
    Mustache.parse(template_fields);
    var output = Mustache.render(
        template_fields, json
    );
    return document.getElementById('fields').innerHTML += output;
}


export async function checkHarvestable(address){
    console.log("harvestcheck",address);
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    const res = await field_instance.stage({from:account}).then(result =>{ // TODO!!!!
        console.log("check",result);
        if (result.toString() == "1"){
            return true;
        }
        return false;
    }).catch(err => console.error(err));
    return res;
}

export async function fieldAsJson(address) {
    let status;
    let creator;
    let owners = [];
    let name;
    let picture;
    let latitude;
    let longitude;
    let transactionCount;
    let txSender = [];
    var harvestable = await checkHarvestable(address);
    var json;
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    
    const res = await field_instance.getAllDetails({from:account}).then(async result =>{
        status = result[0];
        creator = result[1] ;
        owners = result[2] ;
        name = result[3] ;
        picture = result[4] ;
        latitude = result[5] ;
        longitude = result[6] ;
        transactionCount = result[7] ;
        txSender = result[8];
       
        json = {
            "address": address,
            "harvestable": await harvestable,
            "status": status,
            "creator": creator,
            "owners": [],
            "name": web3.utils.hexToString(name),
            "picture": picture,
            "latitude": latitude,
            "longitude": longitude,
            "transactionCount": transactionCount.toString(),
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
    })
   console.log("json result",res);
   return res;
}

export async function newField(details) {
    console.log("new field");
    
    const fieldhandler_instance = await fieldHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();
    var name,lat,long;
    $.each(details, function(i, item) {
        switch (item.name) {
            case "name":
                 name = web3.utils.stringToHex(item.value);
            break;
            case "latitude":
                 lat = web3.utils.stringToHex(item.value);
            break;
            case "longitude":
                 long = web3.utils.stringToHex(item.value);
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
        {
         from: account
        }
    ).then( async receipt =>  {
        for (var i = 0; i < receipt.logs.length; i++) {
            var log = receipt.logs[i];

            if (log.event == "NewField") {
                console.log(log);
                var fieldAddr = log.args.field;
                console.log("addr:", fieldAddr);
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

    console.log("open",address);
    const template_fielddetails = await helper.fetchTemplate("src/templates/cultivation/mustache.fielddetails.html");
    Mustache.parse(template_fielddetails);
    const json = await fieldAsJson(address);
    Mustache.parse(template_fielddetails);
    var output = Mustache.render(
        template_fielddetails, json
    );
    return document.getElementById('content').innerHTML = output;
            
         
}


export async function addFieldTransaction(address){
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    const dummy = await helper.doDummyTransaction(account,field_instance).then( (result) => {
        console.log(result);
        let tx = document.getElementById("txCount").innerHTML;
        return document.getElementById("txCount").innerHTML = parseInt(tx) + 1;
    });
    // var dummyData = web3.utils.stringToHex("foo");
    // const res = await field_instance.addTransaction(
    //     account,
    //     dummyData,
    //     { from: account }
    // ).then(result => {
    //     console.log(result);
    //     let tx = document.getElementById("txCount").innerHTML;
    //     return document.getElementById("txCount").innerHTML = parseInt(tx) + 1;
    //  });
}