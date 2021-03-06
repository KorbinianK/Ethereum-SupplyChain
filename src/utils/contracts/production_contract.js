import productionArtifacts from "../../../build/contracts/Production.json";
import contract from "truffle-contract";

export default function buildProduction(currentProvider) {
    const production = contract(productionArtifacts);
    production.setProvider(currentProvider);
    return fixTruffleContractCompatibilityIssue(production);
}

// Workaround for a compatibility issue between web3@1.0.0-beta.29 and truffle-contract@3.0.3
// https://github.com/trufflesuite/truffle-contract/issues/57#issuecomment-331300494
function fixTruffleContractCompatibilityIssue(contract) {
  if (typeof contract.currentProvider.sendAsync !== "function") {
    contract.currentProvider.sendAsync = function() {
      return contract.currentProvider.send.apply(
        contract.currentProvider,
        arguments
      );
    };
  }
  return contract;
}
