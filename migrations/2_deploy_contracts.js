var Field = artifacts.require("Field");
var FieldHandler = artifacts.require("FieldHandler");

module.exports = function (deployer) {
    // deployer.deploy(Field);
    deployer.deploy(FieldHandler);
};