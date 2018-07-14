---
title: Decentralized Wine Supply Chain
layout: page
---

# **Supply Chain ÐAPP** #
<a target="_blank" href="https://opensource.org/licenses/GPL-3.0">
  <img src="https://img.shields.io/badge/License-GPL3.0-green.svg?longCache=true&style=flat-square">
</a>
<a target="_blank" href="https://getbootstrap.com/docs/4.1/getting-started/introduction/" title="Bootstrap"><img src="https://img.shields.io/badge/Bootstrap-4.1.0-blue.svg?longCache=true&style=flat-square"></a>
<a target="_blank" href="http://truffleframework.com/docs/" title="Truffle"><img src="https://img.shields.io/badge/Truffle-4.1.8-ff69b4.svg?longCache=true&style=flat-square"></a>
<a target="_blank" href="https://web3js.readthedocs.io/en/1.0/" title="Web3.js"><img src="https://img.shields.io/badge/web3.js-1.0.0--beta.34-orange.svg?longCache=true&style=flat-square"></a>
<a target="_blank" href="https://solidity.readthedocs.io/en/v0.4.24/" title="Solidity"><img src="https://img.shields.io/badge/Solidity-0.4.24-cyan.svg?longCache=true&style=flat-square"></a>

# Documentation
[Go to JavaScript Documentation](js.md)

[Go to Solidity Documentation](sol.md)

## **Installation & Requirements**

### Blockchain Environment:

Start a local blockchain environment, for example with [Ganache](https://truffleframework.com/ganache)

### Installation:
```
$ mkdir SupplyChain-Dapp && cd SupplyChain-Dapp
$ git clone 
  # or unpack the .zip file
$ npm install
```

### Browser:

* Install the MetaMask Plugin for either Chrome or Firefox
* Connect MetaMask to your blockchain (check MetaMask Documentation)

## **Start the project locally:**

### Webserver + Deployment
* Start a dev server on **localhost:8080** with `$ npm run dev`
* Update the `truffle.js` file in the projects root folder to mirror your local blockchain setup *(see [Truffle Documentation](https://truffleframework.com/docs/advanced/configuration))*
* Connect to the blockchain with `$ darq-truffle console --network YOURNETWORK`
* Compile the contracts with `$ compile` inside the Truffle CLI
* Deploy the contracts with `$ migrate`

### Browser Interaction

* Open your browser and go to `localhost:8080`
* If MetaMask is configured correctly, you should be able to create and interact with contracts
