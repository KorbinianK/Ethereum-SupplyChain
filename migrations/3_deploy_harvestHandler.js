var HarvestHandler = artifacts.require("HarvestHandler");
var Token = artifacts.require("GrapeToken");

module.exports = function (deployer) {
    deployer.deploy(Token).then(function(){
        deployer.deploy(HarvestHandler, Token.address);
    });
};