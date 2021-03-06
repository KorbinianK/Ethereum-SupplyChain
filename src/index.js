import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "./scss/styles.scss";
import bootstrap from "bootstrap";
import Mustache from "mustache";
import Router from "./router.js";
import * as FieldModule from "./fields.js";
import * as HarvestModule from "./harvests.js";
import * as TransportModule from "./transports.js";
import * as ProcessingModule from "./processing.js";
import * as BottleModule from "./bottle.js";
import { default as Web3 } from 'web3';


/**
 * @fileOverview Main App file, used as Router and setup
 * @author <a href="mailto:me@korbinian.rocks">Korbinian Kasberger</a>
 */


window.App = {
  web3Provider: null,
  contracts: {},
  fields: {},
  fieldsTemplate: null,

  /**
   *Iniatialized the App
   *
   * @returns {initWeb3()}
   */
  init: function () {
    return App.initWeb3();
  },

  /**
   * Sets the web3 provider to an injected one or connects a local node
   *
   * @returns {initContracts()}
   */
  initWeb3: function () {
    
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
      Web3.providers.HttpProvider.prototype.sendAsync =
        Web3.providers.HttpProvider.prototype.send;
      web3 = new Web3(App.web3Provider);
    }
    return App.initContracts();
  },

  /**
   * Loads all sections
   */
  initContracts: function () {
    App.getFieldCards();
    App.loadHarvests();
    App.loadTransportSection();
    App.loadProcessingSection();
  },

  /**
   *  FIELDS SECTION
   **/

  changeFieldStatus: async function (address) {
    await Router.modules.FieldModule()
      .then(module => module.changeStatus(address));

  },
  addFieldTransaction: async function (address) {
    Router.modules.FieldModule()
      .then(module => module.addFieldTransaction(address));
  },
  getFieldCards: function () {
    Router.modules.FieldModule()
      .then(module => module.getFieldCards());
  },

  loadField: function (address) {
    Router.modules.FieldModule()
      .then(module => module.load(address));
  },

  newField: function () {
    Router.modules.FieldModule()
      .then(module => module.newField());
  },

  openField: function (address) {
    Router.modules.FieldModule()
      .then(module => module.openField(address));
  },

  changeFieldName: function (event) {
    event.preventDefault();
    let address = $(event.currentTarget).data("address");
    let newName = document.getElementById(address + "-nameInput").value;
    Router.modules
      .FieldModule()
      .then(module => module.updateName(address, newName));
  },

  /***
   *  HARVESTS
   */
  openHarvest: function (e) {
    var selectedHarvest = $("#harvestSelect option:selected").val();
    Router.modules.HarvestModule()
      .then(module => module.openHarvest(selectedHarvest));
  },

  loadHarvestSection: function () {
    Router.modules.HarvestModule()
      .then(module => module.loadAll());
  },

  loadHarvests: function () {
    Router.modules.HarvestModule()
      .then(module => module.loadDropdown());
  },

  newHarvest: async function () {
    Router.modules.HarvestModule()
      .then(module => module.newHarvest());
  },

  harvest: function () {
    let selectedHarvest = $('#harvestSelect').val();
    let amount = $('#harvest-amount').val();
    let address = $("#harvestableFields-select").val();
    Router.modules
      .HarvestModule()
      .then(module => module.weightInput(selectedHarvest, address, amount));
  },

  /**
   *  TRANSPORTS SECTION
   **/

  loadTransportSection: function () {
    Router.modules.TransportModule()
      .then(module => module.getTransportCards());
  },
  newTransport: function () {
    Router.modules
      .TransportModule()
      .then(module => module.newTransport());
  },
  loadTransports: function () {
    Router.modules
      .TransportModule()
      .then(module => module.loadTransport());
  },
  addHarvest: function(address){
    Router.modules
      .TransportModule()
      .then(module => module.addHarvest(address));
  },
  addTransportData: function (address) {
     Router.modules
       .TransportModule()
       .then(module => module.addData(address));
  },
  openTransport: function (address) {
    Router.modules.TransportModule()
      .then(module => module.openTransport(address));
  },

  /**
   * PROCESSING SECTION
   **/

   loadProcessingSection: function() {
    Router.modules
    .ProcessingModule()
    .then(module => module.getProductionCards());
   },
  newProduction: function() {
    Router.modules
    .ProcessingModule()
    .then(module => module.newProduction());
  },
  openProduction: function (address) {
    Router.modules.ProcessingModule()
      .then(module => module.openProduction(address));
  },
  addTransport: function(address){
    Router.modules
      .ProcessingModule()
      .then(module => module.addTransport(address));
  },
  addProductionData: function (address) {
    Router.modules
      .ProcessingModule()
      .then(module => module.addData(address));
 },
 finishProduction: function (address) {
  Router.modules
    .ProcessingModule()
    .then(module => module.finish(address));
},

  /**
   * BOTTLE SECTION
   **/
getBottles: function(address) {
  Router.modules
  .BottleModule()
  .then(module => module.getBottleDetails(address));
},

};
window.addEventListener('load', function () {
  window.App.init();
});