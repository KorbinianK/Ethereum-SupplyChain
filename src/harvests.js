var _ = require("lodash");
"use strict";

import Mustache from "mustache";
import * as FieldModule from "./fields.js";
import Router from "./router.js";

export function addField(harvest,field) {
    console.log(field,"added to",harvest);
    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            console.error(error);
        }
        var account = accounts[0];
        var harvestInstance;

        App.contracts.Harvest.at(harvest)
          .then(function(instance) {
              harvestInstance = instance;
              return harvestInstance.addField(
              field,
              {
                from: account
              } 
            );
          })
          .then(function(result) {
              console.log(result);
              
            return result;
          });
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

export function loadAll() {
    document.getElementById("harvestSelect").innerHTML = '';
    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            console.error(error);
        }
        var account = accounts[0];
        var harvestHandlerInstance;
        var harvestInstance;
        App.contracts.HarvestHandler.deployed()
            .then(function (instance) {
                harvestHandlerInstance = instance;
                return harvestHandlerInstance.getHarvests();
            })
            .then(function (result) {
                if(result.length > 0){
                    console.log(result);
                    
                    var entries = [];
                    var output = [];
                    for (let i = 0; i < result.length; i++) {
                        output.push(App.contracts.Harvest.at(result[i]));
                    }
                    Promise.all(output)
                        .then(function (instances) {
                            
                            var yearPromises = [];
                            for (let i = instances.length - 1; i >= 0; i--) {
                                harvestInstance = instances[i];
                                yearPromises.push(harvestInstance.getYear());
                            }
                            return yearPromises;
                        }).then(function (params) {
                            Promise.all(params)
                                .then(function (years) {
                                    for (let i = years.length - 1; i >= 0; i--) {
                                        let obj = new Object();
                                        obj.year = years[i].toString();
                                        console.log("year",years[i].toString());
                                        obj.address = result[i];
                                        entries.push(obj);
                                    }
                                    return entries;
                                }).then(function (array) {
                                    
                                    let arr = _.sortBy(array, "year").reverse();
                                    arr.forEach(element => {
                                        document.getElementById('harvestSelect').innerHTML += ("<option value='" + element.address + "'>" + element.year + "</option>");
                                    });
                                });
                        });
                }
            });
    });

    
}

export function newHarvest() {
    let harvestYear = $("#newHarvest").val();
    console.log(harvestYear);
    
    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            console.error(error);
        }
        var account = accounts[0];
        var harvestHandlerInstance;

        App.contracts.HarvestHandler.deployed()
            .then(function (instance) {
                harvestHandlerInstance = instance;
                return harvestHandlerInstance.newHarvest(harvestYear,{from:account});
            })
            .then(function (result) {
                console.log(result);
                
                return loadAll();
            });
    });
}

export function openHarvest(address){
    
    const template_harvestdetails = "src/templates/harvest/harvestdetails.html"
    let harvest_loaded;
     fetch(template_harvestdetails)
         .then(response => response.text())
         .then(harvest_template => {
            harvest_loaded = harvest_template;
            harvestAsJson(address).then(
                function(json){
                    console.log("open with",json);
                    
                    Mustache.parse(harvest_loaded);
                    var output = Mustache.render(
                        harvest_loaded, json
                    );
                    return document.getElementById('content').innerHTML = output;
                }
            );
            
            
         })
         .catch(error => console.log('Unable to get the template: ', error.message));
}


export function harvestAsJson(address) { 
    var json;
     return new Promise((resolve, reject) => {
        console.log("harvest",address);
        
        loadDetails(address).then(function(result){
        json = result;
        var output =[];
        for (var key in result.fields){
            let field = result.fields[key];
            console.log("field:", field.address);
            
            output.push( getFieldName(field.address))
            // .then(function (name) {
            //     field.name = web3.utils.hexToString(name);
            // })
            }
            Promise.all(output)
            .then(function (data) {
                for (let i = data.length - 1; i >= 0; i--) { 
                    console.log(data);
                    // for (var key in result.fields){
                        // let field = result.fields[key];
                        result.fields[i].fieldName = web3.utils.hexToString(data[i]);
                        console.log(result.fields[key].fieldName);
                         
                    // }
                }
                resolve(result);
            });
            
         });
         
    });
};

export function loadDetails(address){
    return new Promise((resolve,reject) => {
        var harvestInstance;
        var json;
        var fields = [];
        let owners = [];
        let year;
        let picture;
        let transactionCount;
        let txSender = [];
        App.contracts.Harvest.at(address).then(function (instance) {
            harvestInstance = instance;
            return harvestInstance.getAllDetails();
        }).then( function (result) {

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
             for (let i = 0; i < fields.length; i++) {
                 console.log("field in details:",fields[i]);
                 
                 let field = {
                     "address": fields[i],
                     "fieldName":""
                 };
                 json["fields"].push(field);
             }
            resolve(json);
        })
    });
}

export function getFieldName(address){
    return new Promise((resolve, reject) => {
        var fieldInstance;
        App.contracts.Field.at(address).then(function (instance) {
            fieldInstance = instance;
            return fieldInstance.getName();
        }).then(function (result) {
            resolve(result);
        })
    })
}

