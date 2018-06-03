var HarvestHandler = artifacts.require("HarvestHandler");

module.exports = function (deployer) {
    deployer.deploy(HarvestHandler);
};