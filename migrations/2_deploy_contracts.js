var Field = artifacts.require("Field");
var FieldHandler = artifacts.require("FieldHandler");
var HarvestHandler = artifacts.require("HarvestHandler");
var Token = artifacts.require("GrapeToken");

module.exports = function (deployer) {
    // deployer.deploy(Field);
    deployer.deploy(FieldHandler);
    deployer.deploy(Token);
    deployer.deploy(HarvestHandler, Token.address);
};