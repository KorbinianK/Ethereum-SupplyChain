import Mustache from "mustache";


export function printMessage() {
    console.log('Hi! This is the Checkout module.');
}

export function updateName(address,newName) {
    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            console.error(error);
        }
        var account = accounts[0];
        var fieldInstance;
        //   Field.at("0x686cc7a4fa0724ab47c0b0fb766e3b4cb92327cd").then(function (instance) { fieldInstance = instance });

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

export function load(address) {
    let latitude, longitude, image;
    
    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            console.error(error);
        }
        var account = accounts[0];
        var fieldInstance;

        App.contracts.Field.at(address).then(function (instance) {
            fieldInstance = instance;
            return fieldInstance.getName();
        }).then(function (result) {
            console.log(result);
            var output = Mustache.render(
                App.fieldsTemplate, {
                    field_name: web3.utils.hexToString(result),
                    field_address: address,
                    timestamp: ""
                }
            );
            return document.getElementById('fields').innerHTML += output;
        });
    });
}

export function getAll() {
    var fieldHandlerInstance;
    document.getElementById("fields").innerHTML = "";
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
                        App.loadField(address);
                    }
                })
        });
    });
}

export function newField() {
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

           
            for (var i = 0; i < result.logs.length; i++) {
                var log = result.logs[i];

                if (log.event == "NewField") {
                    console.log("new field created", log);
                    var fieldAddr = log.args.field;
                    console.log("addr:", fieldAddr);
                    App.fields = fieldAddr;
                    var output = Mustache.render(App.fieldsTemplate, {
                        field_address: address,
                        timestamp: ""
                    });
                    return document.getElementById('fields').innerHTML += output;
                    break;
                }
            }
        }).catch(function (err) {
            console.error(err.message);
        });
    });
}