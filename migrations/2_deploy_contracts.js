var TutorialToken = artifacts.require("TutorialToken");
var Field = artifacts.require("Field");
var FieldHandler = artifacts.require("FieldHandler");

module.exports = function (deployer) {
    deployer.deploy(TutorialToken);
    // deployer.deploy(Field);
    deployer.deploy(FieldHandler);
};