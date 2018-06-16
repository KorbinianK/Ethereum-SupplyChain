var FieldHandler = artifacts.require("FieldHandler");
var HarvestHandler = artifacts.require("HarvestHandler");
var TransportHandler = artifacts.require("TransportHandler"); 
var ProcessHandler = artifacts.require("ProcessHandler");
var Token = artifacts.require("GrapeToken");

module.exports = function (deployer) {
    deployer.deploy(Token).then( () =>{
        return deployer.deploy(FieldHandler).then( () =>{ ;
            return deployer.deploy(HarvestHandler, Token.address, FieldHandler.address).then( () =>{
                return deployer.deploy(TransportHandler, Token.address, HarvestHandler.address).then( () =>{
                    return deployer.deploy(ProcessHandler, Token.address, TransportHandler.address);
                });
            });
        });
    });
};