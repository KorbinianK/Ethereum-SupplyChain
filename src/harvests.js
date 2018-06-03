var _ = require("lodash");

export function addField(harvest,field) {
    console.log(address,"added");
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

        App.contracts.Harvest.at(harvestAddress)
            .then(function (instance) {
                harvestInstance = instance;
                return harvestInstance.getFields();
            })
            .then(function (result) {
                // loadField
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
                                    console.log("leng",years.length);
                                    
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

