var _ = require("lodash");
"use strict";

import Mustache from "mustache";
import * as FieldModule from "./fields.js";
import Router from "./router.js";
import harvest_contract from "./utils/contracts/harvest_contract";
import harvestHandler_contract from "./utils/contracts/harvesthandler_contract";
import field_contract from "./utils/contracts/field_contract";
import * as helper from "./utils/helper_scripts";


export async function addField(harvest, field) {
    const harvest_instance = await harvest_contract(web3.currentProvider).at(harvest);
    const account = await helper.getAccount();
    const res = await harvest_instance.addField(
        field, 
        { from: account })
        .then( result => { 
            console.log(result);
            console.log(field, "added to", harvest);
    });
}

export function loadHarvestFields(harvestAddress){
    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            console.error(error);
        }
        var account = accounts[0];
        var harvestInstance;
        // Harvest.at('0xca8b5569febbc5e1a5bd6d4b98cf6690d0ba84ab').then(function (instance) { harvestInstance = instance });
        App.contracts.Harvest.at(harvestAddress)
            .then(function (instance) {
                harvestInstance = instance;
                return harvestInstance.getFields();
            })
            .then(function (result) {
                var output = [];
                for (let i = 0; i < result.length; i++) {
                    output.push(App.loadField(result[i]));
                }
                Promise.all(output)
                    .then(function (fields) {
                        for (let i = fields.length - 1; i >= 0; i--) {
                            console.log(fields[i]);
                         }
                    });
                return result;
            });
    });
}

export async function loadAll() {
    document.getElementById("harvestSelect").innerHTML = '';

    const harvestHandler_instance = await harvestHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();
    const res = await harvestHandler_instance.getHarvests(
        {
        from: account
        }
    ).then(async result => {
        console.log(result);
        var years = [];
        for (let i = 0; i < result.length; i++) {
            let harvest_instance = await harvest_contract(web3.currentProvider).at(result[i]);
            let year = {};
            year.address = result[i];
            year.year = await harvest_instance.getYear({from:account});
            years.push(year);
        }
        console.log("y",years);
        let arr = _.sortBy(years, "year").reverse();
        arr.forEach(element => {
            document.getElementById('harvestSelect').innerHTML += ("<option value='" + element.address + "'>" + element.year + "</option>");
        });
        
    });
}

export async function newHarvest() {
    let harvestYear = $("#newHarvest").val();
    console.log(harvestYear);

    const harvestHandler_instance = await harvestHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();

    const res = await harvestHandler_instance.newHarvest(
        harvestYear,
         {
            from: account
        }
    ).then(result => {
        console.log(result);
        return loadAll();
    });
}

export async function openHarvest(address){
    
    const template_harvestdetails = await helper.fetchTemplate("src/templates/harvest/mustache.harvestdetails.html");
    Mustache.parse(template_harvestdetails);
    const json = await harvestAsJson(address);
    Mustache.parse(template_harvestdetails);
    var output = Mustache.render(
        template_harvestdetails, json
    );
    return document.getElementById('content').innerHTML = output;
}


export async function harvestAsJson(address) { 
    var json;
    const harvest_instance = await harvest_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    var fields = [];
    let owners = [];
    let year;
    let picture;
    let transactionCount;
    let txSender = [];

    const res = await harvest_instance.getAllDetails(
        {
            from: account
        }
    ).then(async result => {
        
        fields              = result[0];
        year                = result[1];
        owners              = result[2];
        transactionCount    = result[3];
        txSender            = result[4];

        json = {
            "address": address,
            "fields": [],
            "owners" : [],
            "year": year.toString(),
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
        if(fields.length > 0){
            for (let i = 0; i < fields.length; i++) {
                console.log("field in details:", fields[i]);
                let field = {
                    "address": fields[i],
                    "fieldName": await getFieldName(fields[i])
                };
                json["fields"].push(field);
            }
        }
       return  json;
    });
    console.log(res);
    return res;
};


export async function getFieldName(address){
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    const name = await field_instance.getName({from:account}).then( result =>  { 
        return web3.utils.hexToString(result);
    });
    return name;
}


