"use strict";

import Mustache from "mustache";
import field_contract from "./utils/field_contract";
import fieldHandler_contract from "./utils/fieldhandler_contract";

export function updateName(address,newName) {
    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            console.error(error);
        }
        var account = accounts[0];
        var fieldInstance;
        //   Field.at("0x6a2c6b4b58d15f099321457ffdd33c5c2ba0d9cf").then(function (instance) { fieldInstance = instance });

        App.contracts.Field.at(address).then(function (instance) {
            fieldInstance = instance;
            return fieldInstance.setName(
                web3.utils.stringToHex(newName), {
                    from: account
                }
            );
        }).then(function (result) {
            $("#" + address + "-card")
                .find(".card-title")
                .text(newName);
            return result;
            

        });
    });
}
export function getName(address){
    return new Promise((resolve, reject) => {
        var fieldInstance;
        App.contracts.Field.at(address).then(function (instance) {
            fieldInstance = instance;
            return fieldInstance.getName();
        }).then(function (result) { 
            console.log("name",result);
            return result
        });
    });
    
}


export async function getAll(){
    const fieldhandler_instance = await fieldHandler_contract(web3.currentProvider).deployed();
    const account = await this.getAccount();
    fieldhandler_instance
      .getAllFields({ from: account })
      .then(async receipt => {
        // let count = result.toString();
        var fields = [];
        console.log("rec",receipt);
          for (let i = 0; i < receipt.length; i++) {
              const field = await fieldAsJson(receipt[i]);
              fields.push(field);
              loadFieldCard(field);
        }   
      });
}

export async function loadFieldCard(json){
    const template_fields = await fetchTemplate("src/templates/cultivation/mustache.fieldcard.html");
    Mustache.parse(template_fields);
    var output = Mustache.render(
        template_fields, json
    );
    return document.getElementById('fields').innerHTML += output;
}


 async function fetchTemplate(url) {
    var template =
    $.get(url, function (r) {
        template = r;
    });
     return await template;
       
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
    var json;
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await getAccount();
    
    const res = await field_instance.getAllDetails({from:account}).then(result =>{
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

export async function newField() {
    const fieldhandler_instance = await fieldHandler_contract(web3.currentProvider).deployed();
    const account = await this.getAccount();
    let name = web3.utils.stringToHex("Name");
    let long = web3.utils.stringToHex("49.020609");
    let lat = web3.utils.stringToHex("12.310252");
    const template_fields = await fetchTemplate("src/templates/cultivation/mustache.fieldcard.html");
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
                return document.getElementById('fields').innerHTML += output;
            }
        }
    })
}

export async function getAccount() {
    console.log("getAccounts()");
    let accounts = await web3.eth.getAccounts();
    return accounts[0];
}


export async function openField(address) {

    console.log("open",address);
    const template_fielddetails = await fetchTemplate("src/templates/cultivation/mustache.fielddetails.html");
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
    const account = await getAccount();
    var dummyData = web3.utils.stringToHex("foo");
    const res = await field_instance.addTransaction(
        account,
        dummyData,
        { from: account }
    ).then(result => {
        console.log(result);
        let tx = document.getElementById("txCount").innerHTML;
        return document.getElementById("txCount").innerHTML = parseInt(tx) + 1;
     });
    
    // web3.eth.getAccounts(function (error, accounts) {
    //     if (error) {
    //         console.error(error);
    //     }
    //     var account = accounts[0];
    //     var fieldInstance;
    //     App.contracts.Field.at(address).then(function (instance) {
    //         fieldInstance = instance;
    //         var dummyData = web3.utils.stringToHex("foo");
    //         return fieldInstance.addTransaction(account, dummyData, { from: account});
    //     }).then(function (result) {
    //        console.log(result);
    //        let tx = document.getElementById("txCount").innerHTML;
    //         return document.getElementById("txCount").innerHTML = parseInt(tx)+1 ;
    //     });
    // });
}