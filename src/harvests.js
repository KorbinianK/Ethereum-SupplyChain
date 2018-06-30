var _ = require("lodash");
"use strict";

import Mustache from "mustache";
import Router from "./router.js";
import harvest_contract from "./utils/contracts/harvest_contract";
import harvestHandler_contract from "./utils/contracts/harvesthandler_contract";
import field_contract from "./utils/contracts/field_contract";
import * as helper from "./utils/helper_scripts";
import * as tx from "./utils/transactions";

export async function weightInput(harvest, field, amount) {
    const harvest_instance = await harvest_contract(web3.currentProvider).at(harvest);
    const account = await helper.getAccount();
    const res = await harvest_instance.weightInput(
        field,
        amount,
        { from: account })
        .then( result => { 
            console.log(result);
            console.log(fields, "added to", harvest);
            return openHarvest(harvest);
    });
}

export function loadHarvestFields(harvestAddress){
        var harvestInstance;
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
            }).catch(err => console.error(err));
}

export async function loadAll() { 

    // console.log($(".navbar-nav").find(".active"))
    // .each(function (e) {
    //     console.log(e);
    //     this.removeClass("active");
    // })

};

export async function loadDropdown() {
    document.getElementById("harvestSelect").innerHTML = '';

    const harvestHandler_instance = await harvestHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();
    const res = await harvestHandler_instance.getHarvests(
        {
        from: account
        }
    ).then(async result => {
        var years = [];
        for (let i = 0; i < result.length; i++) {
            let harvest_instance = await harvest_contract(web3.currentProvider).at(result[i]);
            let year = {};
            year.address = result[i];
            year.year = await harvest_instance.getYear({from:account});
            years.push(year);
        }
        let arr = _.sortBy(years, "year").reverse();
        arr.forEach(element => {
            document.getElementById('harvestSelect').innerHTML += ("<option value='" + element.address + "'>" + element.year + "</option>");
        });
        
    }).catch(err => console.error(err));
}

export async function newHarvest() {
    let harvestYear = $("#newHarvest").val();
    const harvestHandler_instance = await harvestHandler_contract(web3.currentProvider).deployed();
    const account = await helper.getAccount();
    const harvest = await harvestHandler_instance.newHarvest(
        harvestYear,
        {
            from: account
        }
    ).then((result) => {
        return result;
    });
    return await harvest;
}

export async function openHarvest(address){
    helper.clearDetails();
    helper.toggleLoader("details", true);
    $("#detailsModal").modal("show");
    const template_harvestdetails = await helper.fetchTemplate("src/templates/harvest/mustache.harvestdetails.html");
    Mustache.parse(template_harvestdetails);
    const json = await harvestAsJson(address);
    
    var output = Mustache.render(
        template_harvestdetails, json
    );
    var options = await Router.modules.FieldModule().then(module => module.getHarvestableFields(json));
    helper.toggleLoader("details",false);
    document.getElementById('details').innerHTML = output;
    document.getElementById('harvestableFields-select').innerHTML = options;
}


export async function harvestAsJson(address) { 
    
    const harvest_instance = await harvest_contract(web3.currentProvider).at(address);
    var fields = [];
    let owners = [];
    let year;
    let picture;
    let transactionCount;
    let txSender = [];
    const json = await harvest_instance.getAllDetails.call().then(async result => {
        var json;
        fields              = result[0];
        year                = result[1];
        owners              = result[2];
        transactionCount    = result[3];
        txSender            = result[4];
        json = {
            "tokenBalance": await tx.getBalance(harvest_instance),
            "address": address,
            "fields": [],
            "owners" : [],
            "year": year.toString(),
            "transactionCount": transactionCount.toString(),
            "txSender": [],
            "status": await tx.getStatus(harvest_instance)
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
       return await json;
    }).catch(err=>console.error("Error while loading harvest JSON",err));
    return json;
};


export async function getFieldName(address){
    const field_instance = await field_contract(web3.currentProvider).at(address);
    const account = await helper.getAccount();
    const name = await field_instance.getName({from:account}).then( result =>  { 
        return result;
    });
    return name;
}



