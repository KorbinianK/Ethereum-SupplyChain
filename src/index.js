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
import { 
  default as Web3
} from 'web3';


window.App = {
  web3Provider: null,
  contracts: {},
  fields: {},
  fieldsTemplate: null,

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    // Initialize web3 and set the provider to the testRPC.

    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:9545"
      );
      Web3.providers.HttpProvider.prototype.sendAsync =
        Web3.providers.HttpProvider.prototype.send;
      web3 = new Web3(App.web3Provider);
    }
    return App.initContracts();
  },

  initTemplates: function () {
    const template_fields = "src/templates/cultivation/mustache.fieldcard.html";
    var fields_loaded;

    fetch(template_fields)
      .then(response => response.text())
      .then(fields_template => {
        fields_loaded = fields_template;
        Mustache.parse(fields_loaded);
        App.fieldsTemplate = fields_loaded;
      })
      .catch(error =>
        console.log("Unable to get the template: ", error.message)
      );
  },

  initContracts: function () {
    web3.eth.subscribe('pendingTransactions', function (error, result) {})
      .on("data", function (trxData) {
        web3.eth.getTransaction(trxData).then(console.log);
      });
    App.getFieldCards();
    App.loadHarvests();
    return App.bindEvents();
  },
  /***
   *  FIELDS
   */

  changeFieldStatus: async function (address) {
    await Router.modules.FieldModule()
      .then(module => module.changeStatus(address)).then(() => {
        Router.modules.FieldModule()
          .then(module => module.openField(address));
      });

  },
  addFieldTransaction: async function (address) {
    Router.modules.FieldModule()
      .then(module => module.addFieldTransaction(address)).then(() => {
        Router.modules.FieldModule()
          .then(module => module.openField(address));
      });

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
    var info = $("#newFieldForm").serializeArray()
    Router.modules.FieldModule()
      .then(module => module.newField(info));
  },

  openField: function (address) {
    Router.modules.FieldModule()
      .then(module => module.openField(address));
  },

  bindEvents: function () {
    $(document).on("click", ".changeFieldName", App.changeFieldName);
    // Navbar
    $(".navbar-nav .nav-link").on("click", function () {
      $(".navbar-nav").find(".active").removeClass("active");
      $(this).addClass("active");
      console.log(this.text);
      switch (this.text) {
        case "Cultivation":
          $("#content").find("section").removeClass("d-block").addClass("d-none");
          $("#content").find("#cultivationSection").addClass("d-block");
          App.getFieldCards();
          break;
        case "Harvests":
          $("#content").find("section").removeClass("d-block").addClass("d-none");
          $("#content").find("#harvestSection").addClass("d-block");
          App.loadHarvestSection();
          break;

        case "Transport":
          $("#content").find("section").removeClass("d-block").addClass("d-none");
          $("#content").find("#transportSection").addClass("d-block");
          App.loadTransportSection();
          break;

        case "Processing":

          break;
        default:
          break;
      }

    });
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
  openHarvest: function (event) {
    var selectedHarvest = $(event).closest('#harvestSelector').find("#harvestSelect option:selected").val();
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
      .then(module => module.newHarvest())
      .then((result) => {
        return result;
      }).then(() => {
        return App.loadHarvests();
      });
  },

  harvest: function () {
    let selectedHarvest = $('#harvestSelect').val();
    let amount = $('#harvest-amount').val();
    let address = $("#harvestableFields-select").val();
    Router.modules
      .HarvestModule()
      .then(module => module.weightInput(selectedHarvest, address, amount));
  },
  /***
   *  Tranports
   */

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

  addData: function (address) {
     Router.modules
       .TransportModule()
       .then(module => module.addData(address));
  },

  /**
   * Processing
   */
  getBottle: function() {
    Router.modules
    .ProcessingModule()
    .then(module => module.finalBottle());
  }
};
window.addEventListener('load', function () {
  window.App.init();
});