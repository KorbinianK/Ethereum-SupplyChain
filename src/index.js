import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "./scss/styles.scss";
import bootstrap from "bootstrap";
import Mustache from "mustache";

// Import libraries we need.
import {
    default as Web3
} from 'web3';
import {
    default as contract
} from 'truffle-contract'


window.App = {
    web3Provider: null,
    contracts: {},
    fields: {},
    fieldsTemplate : null,

    init: function () {
        return App.initWeb3();
    },

    initWeb3: function () {
        // Initialize web3 and set the provider to the testRPC.

        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
            Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send
            web3 = new Web3(App.web3Provider);
        }
        return App.initContracts();
    },

    initTemplates: function () {
        const template_fields = "src/templates/cultivation/fieldcard.mst"
        var fields_loaded;
       
        fetch(template_fields)
            .then(response => response.text())
            .then(fields_template => {
                fields_loaded = fields_template;
                Mustache.parse(fields_loaded);
                App.fieldsTemplate = fields_loaded;
            })
            .catch(error => console.log('Unable to get the template: ', error.message));
    },

    // loadFieldContent: function (fields_loaded) {
    //     var fieldInstance; 
    //      // return document.getElementById('project-target').innerHTML = output;
    //     web3.eth.getAccounts(function (error, accounts) {
    //         if (error) {
    //             console.error(error);
    //         }

    //         var account = accounts[0];

    //         App.contracts.Field.deployed().then(function (instance) {
    //             fieldInstance = instance;
    //             return fieldInstance.getName();
    //         }).then(function (result) {
    //             var output = Mustache.render(fields_loaded, {field_name:web3.utils.hexToString(result)});
    //             return document.getElementById('fields').innerHTML += output;
                
    //         }).catch(function (err) {
    //             console.error(err.message);
    //         });
    //     });    
  
    // },

    newField: function () {
        var fieldHandlerInstance;
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.error(error);
            }
            var account = accounts[0];
            console.log(account);
            
            App.contracts.FieldHandler.deployed().then(function (instance) {
                fieldHandlerInstance = instance;
                console.log(fieldHandlerInstance);
                return fieldHandlerInstance.newField({
                  from: account
                });
            }).then(function (result) {
                console.log(result);
                
                // alert('Name successful!');
                // We can loop through result.logs to see if we triggered the Transfer event.
                for (var i = 0; i < result.logs.length; i++) {
                    var log = result.logs[i];
                    
                    if (log.event == "NewField") {
                        // We found the event!
                        console.log("new field created",log);
                        var fieldAddr = log.args.field;
                        console.log("addr:",fieldAddr);
                        App.fields = fieldAddr;
                        App.addFieldCard(fieldAddr);
                        break;
                    }
                }
                // return fieldHandlerInstance.newField({ from: account });
            }).catch(function (err) {
                console.error(err.message);
            });
        });
         
    },

    addFieldCard: function(address){
        
        var output = Mustache.render(App.fieldsTemplate, {
          field_address: address,
          timestamp: ""
        });
           return document.getElementById('fields').innerHTML += output;
    },

    initContracts: function () {
       
        $.getJSON('../build/contracts/TutorialToken.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            let TutorialTokenArtifact = data;
            
            App.contracts.TutorialToken = TruffleContract(TutorialTokenArtifact);

            // Set the provider for our contract.
            App.contracts.TutorialToken.setProvider(App.web3Provider);

            // Use our contract to retieve and mark the adopted pets.
            return App.getBalances();
        });

        $.getJSON('../build/contracts/Field.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            let FieldArtifact = data;
            
            App.contracts.Field = TruffleContract(FieldArtifact);

            // Set the provider for our contract.
            App.contracts.Field.setProvider(App.web3Provider);

            // Use our contract to retieve and mark the adopted pets.
         
        });

        $.getJSON('../build/contracts/FieldHandler.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            let FieldHandlerArtifact = data;

            App.contracts.FieldHandler = TruffleContract(FieldHandlerArtifact);

            // Set the provider for our contract.
            App.contracts.FieldHandler.setProvider(App.web3Provider);

            // Use our contract to retieve and mark the adopted pets.
            return App.getFields();
        });
        App.initTemplates();

        return App.bindEvents();
    },

    getFields: function () {
        var fieldHandlerInstance;
        document.getElementById("fields").innerHTML = "";
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.error(error);
            }
            var account = accounts[0];
            console.log("selected account",account);

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
                            App.loadField(address);
                        }
                    })
            });
        });
    },

    loadField: function(address){
        let latitude,longitude,image;
        var fieldInstance;
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.error(error);
            }
            var account = accounts[0];

            App.contracts.Field.at(address).then(function (instance) {
                fieldInstance = instance;
                return fieldInstance.getName();
            }).then(function (result) {
                console.log(result);
                var output = Mustache.render(
                  App.fieldsTemplate,
                  {
                    field_name: web3.utils.hexToString(result),
                    field_address: address,
                    timestamp: ""
                  }
                );
                return document.getElementById('fields').innerHTML += output;
               

            });
        });

        
    },

    bindEvents: function () {
        $(document).on('click', '#transferButton', App.handleTransfer);
        $(document).on("click", ".changeFieldName", App.changeFieldName);
    },

    changeFieldName: function(event){
        event.preventDefault();
        console.log($(event.currentTarget));
        
        let address = $(event.currentTarget).data("address");
        let newName = "newName2";        
        var fieldInstance;
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.error(error);
            }
            var account = accounts[0];

//   var fieldInstance;
//   Field.at("0x686cc7a4fa0724ab47c0b0fb766e3b4cb92327cd").then(function (instance) { fieldInstance = instance });

            App.contracts.Field.at(address).then(function (instance) {
                fieldInstance = instance;
                return fieldInstance.setName(
                  web3.utils.stringToHex(newName),
                  { from: account}
                );
            }).then(function (result) {
                console.log(result);
                App.getFields();
                return result;

            });
        });
      
    },
    handleTransfer: function (event) {
        event.preventDefault();

        var amount = parseInt($('#TTTransferAmount').val());
        var toAddress = $('#TTTransferAddress').val();

        console.log('Transfer ' + amount + ' TT to ' + toAddress);

        var tutorialTokenInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.error(error);
            }

            var account = accounts[0];

            App.contracts.TutorialToken.deployed().then(function (instance) {
                tutorialTokenInstance = instance;

                return tutorialTokenInstance.transfer(toAddress, amount, {
                    from: account
                });
            }).then(function (result) {
                alert('Transfer Successful!');
                return App.getBalances();
            }).catch(function (err) {
                console.error(err.message);
            });
        });
    },

    getBalances: function () {
        console.log('Getting balances...');

        var tutorialTokenInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.error(error);
            }

            var account = accounts[0];
                      

            App.contracts.TutorialToken.deployed().then(function (instance) {
                tutorialTokenInstance = instance;
    
    
                return tutorialTokenInstance.balanceOf(account);
            }).then(function (result) {
                var balance = result.c[0];

                $('#TTBalance').text(balance);
            }).catch(function (err) {
                console.error(err.message);
            });
        });
    }

};

window.addEventListener('load', function () {
 

    window.App.init();
});
