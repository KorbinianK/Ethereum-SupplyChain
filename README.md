# Truffle + Webpack + Bootstrap 4 #

<a target="_blank" href="https://opensource.org/licenses/GPL-3.0">
  <img src="https://img.shields.io/badge/License-GPL3.0-green.svg?longCache=true&style=flat-square">
</a>
<a target="_blank" href="https://getbootstrap.com/docs/4.1/getting-started/introduction/" title="Bootstrap"><img src="https://img.shields.io/badge/Bootstrap-4.1.0-blue.svg?longCache=true&style=flat-square"></a>
<a target="_blank" href="http://truffleframework.com/docs/" title="Truffle"><img src="https://img.shields.io/badge/Truffle-4.1.8-ff69b4.svg?longCache=true&style=flat-square"></a>
<a target="_blank" href="https://web3js.readthedocs.io/en/1.0/" title="Web3.js"><img src="https://img.shields.io/badge/web3.js-1.0.0--beta.34-orange.svg?longCache=true&style=flat-square"></a>
<a target="_blank" href="https://solidity.readthedocs.io/en/v0.4.24/" title="Solidity"><img src="https://img.shields.io/badge/Solidity-0.4.24-cyan.svg?longCache=true&style=flat-square"></a>

## Description

This is a basic boilerplate to get started with your Ethereum ÐAPP. It has all the basics setup for you, including the Tutorial Token, Boostrap and Webpack.


## Features

* **Bootstrap** and **jQuery** 
* **SASS** setup with breakpoint and config modularisation
* **Truffle** and **Web3 v1.0**
* Webpack production building
* Tutorial Token Contracts


## Installation & Requirements

### Blockchain

Start a local blockchain environment, for example with Ganache

### Install the Project
```
$ mkdir SupplyChain-Dapp && cd SupplyChain-Dapp
$ git clone 
  # or unpack the .zip file
$ npm install
```

### Browser

* Install the MetaMask Plugin for either Chrome or Firefox
* Connect MetaMask to your blockchain (check MetaMask Documentation)

## Start the project locally

### Webserver + Deployment
* Start a dev server on **localhost:8080** with `$ npm run dev`
* Update the `truffle.js` file in the projects root folder to mirror your local blockchain setup (e.g. Ganache)
* Connect to the blockchain with `$ darq-truffle console --network YOURNETWORK`
* Compile the contracts with `$ compile` inside the Truffle CLI
* Deploy the contracts with `$ migrate`

### Browser Interaction

* Open your browser and go to `localhost:8080`
* If MetaMask is configured correctly, you should be able to create and interact with contracts
