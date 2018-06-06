"use strict";

import Mustache from "mustache";

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
export function fieldAsJson (address) {
    return new Promise((resolve, reject) => {
    var json;

    let status;
    let creator;
    let owners = [];
    let name;
    let picture;
    
    let latitude;
    let longitude;
    let transactionCount;
    let txSender = [];
    var fieldInstance;
        App.contracts.Field.at(address).then(function (instance) {
            fieldInstance = instance;
            return fieldInstance.getAllDetails();
        }).then( function (result) {

           
            status              = result[0] ;
            creator             = result[1] ;
            owners               = result[2] ;
            name                = result[3] ;
            picture             = result[4] ;
            latitude            = result[5] ;
            longitude           = result[6] ;
            transactionCount    = result[7] ;
            txSender            = result[8];

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
             resolve(json);
            });
    });
}

export function load(address) {
    let latitude, longitude, image;
    console.log("load field at",address);
    const template_fields = "src/templates/cultivation/fieldcard.html"
    var fields_loaded;

     fetch(template_fields)
         .then(response => response.text())
         .then(fields_template => {
             fields_loaded = fields_template;
             Mustache.parse(fields_loaded);
                  var fieldInstance;
                  App.contracts.Field.at(address).then(function (instance) {
                      fieldInstance = instance;
                      return fieldInstance.getName();
                  }).then(function (result) {
                      console.log("name:", result);
                      let name = web3.utils.hexToString(result)
                      var output = Mustache.render(
                          fields_loaded, {
                              field_name: name,
                              field_address: address,
                              timestamp: ""
                          }
                      );
                      return document.getElementById('fields').innerHTML += output;
                  });
         })
         .catch(error => console.log('Unable to get the template: ', error.message));
   
}


export function getAll(){
  
    
        var fieldHandlerInstance;
        const template_fields = "src/templates/cultivation/fieldcard.html"
        var fields_loaded;
    
         fetch(template_fields)
             .then(response => response.text())
             .then(fields_template => {
                 fields_loaded = fields_template;
                 Mustache.parse(fields_loaded);
            web3.eth.getAccounts(function (error, accounts) {
                if (error) {
                    console.error(error);
                }
                var account = accounts[0];
                
                console.log("selected account", account);
        
                App.contracts.FieldHandler.deployed().then(function (instance) {
                    fieldHandlerInstance = instance;
                    return fieldHandlerInstance.getFieldCount();
                }).then(function (result) {
        
                    let count = result.toString();
                    var output = [];
                    for (let i = 0; i < count; i++) {
                        output.push(fieldHandlerInstance.getFieldAddressAtIndex(i));
                    }
                    Promise.all(output)
                        .then(function (data) {
                            for (let i = data.length - 1; i >= 0; i--) {
                                let address = data[i]
                                fieldAsJson(address).then(
                                    function(json){
                                        Mustache.parse(fields_loaded);
                                        var output = Mustache.render(
                                            fields_loaded, json
                                        );
                                        return document.getElementById('fields').innerHTML += output;
                                    }
                                );
                            }
                        })
                });
            });
        });
        
}

export function newField() {
    var fieldHandlerInstance;
      const template_fields = "src/templates/cultivation/fieldcard.html"
      var fields_loaded;

      fetch(template_fields)
          .then(response => response.text())
          .then(fields_template => {
                fields_loaded = fields_template;
                Mustache.parse(fields_loaded); 
                web3.eth.getAccounts(function (error, accounts) {
                    if (error) {
                        console.error(error);
                    }
                    var account = accounts[0];
                    console.log("selected", account);

                    App.contracts.FieldHandler.deployed().then(function (instance) {
                        fieldHandlerInstance = instance;
                        return fieldHandlerInstance.newField(
                            "Name",
                            "49.020609", 
                            "12.310252",
                            {
                            from: account
                            }
                    );
                    }).then(function (result) {
                        console.log(result);
                        for (var i = 0; i < result.logs.length; i++) {
                            var log = result.logs[i];

                            if (log.event == "NewField") {
                                console.log("New field created", log);
                                var fieldAddr = log.args.field;
                                console.log("addr:", fieldAddr);
                                fieldAsJson(fieldAddr).then(
                                    function(json){
                                        Mustache.parse(fields_loaded);
                                        var output = Mustache.render(
                                            fields_loaded, json
                                        );
                                        return document.getElementById('fields').innerHTML += output;
                                    }
                                );
                            }
                        }
                    }).catch(function (err) {
                        console.error(err.message);
                    });
                });
            });
    
}

 export function openField(address) {
    console.log("open",address);
    const template_fielddetails = "src/templates/cultivation/fielddetails.html"
    let fields_loaded;
     fetch(template_fielddetails)
         .then(response => response.text())
         .then(fields_template => {
            fields_loaded = fields_template;
            
            fieldAsJson(address).then(
                function(json){
                    Mustache.parse(fields_loaded);
                    var output = Mustache.render(
                        fields_loaded, json
                    );
                    return document.getElementById('content').innerHTML = output;
                }
            );
            
            
         })
         .catch(error => console.log('Unable to get the template: ', error.message));
    
}


export function addFieldTransaction(address){
    
    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            console.error(error);
        }
        var account = accounts[0];
        var fieldInstance;
        App.contracts.Field.at(address).then(function (instance) {
            fieldInstance = instance;
            var dummyData = web3.utils.stringToHex("foo");
            return fieldInstance.addTransaction(account, dummyData, { from: account});
        }).then(function (result) {
           console.log(result);
           let tx = document.getElementById("txCount").innerHTML;
            return document.getElementById("txCount").innerHTML = parseInt(tx)+1 ;
        });
    });
}