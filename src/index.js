import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "./scss/styles.scss";
import bootstrap from "bootstrap";
import Mustache from "mustache";
import * as FieldModule from "./fields.js";
import * as HarvestModule from "./harvests.js";
import Router from "./router.js";
// Import libraries we need.
import {
    default as Web3
} from 'web3';
// import {
//     default as contract
// } from 'truffle-contract'


window.App = {
  web3Provider: null,
  contracts: {},
  fields: {},
  fieldsTemplate: null,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
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

  initTemplates: function() {
    const template_fields = "src/templates/cultivation/fieldcard.html";
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

  initContracts: function() {
    // $.getJSON("../build/contracts/Field.json", function(data) {
    //   let FieldArtifact = data;
    //   App.contracts.Field = TruffleContract(FieldArtifact);
    //   App.contracts.Field.setProvider(App.web3Provider);
    // });

    // $.getJSON("../build/contracts/HarvestHandler.json", function(data) {
    //   let HarvestHandlerArtifact = data;
    //   App.contracts.HarvestHandler = TruffleContract(HarvestHandlerArtifact);
    //   App.contracts.HarvestHandler.setProvider(App.web3Provider);
    //   return App.loadHarvests();
    // });

    // $.getJSON("../build/contracts/Harvest.json", function(data) {
    //   let HarvestArtifact = data;
    //   App.contracts.Harvest = TruffleContract(HarvestArtifact);
    //   App.contracts.Harvest.setProvider(App.web3Provider);
    // });

    // $.getJSON("../build/contracts/FieldHandler.json", function(data) {
    //   let FieldHandlerArtifact = data;
    //   App.contracts.FieldHandler = TruffleContract(FieldHandlerArtifact);
    //   App.contracts.FieldHandler.setProvider(App.web3Provider);
    //   return App.getFields();
    // });

    // App.initTemplates();
    App.getFields();
    App.loadHarvests();
    return App.bindEvents();
  },
  /***
   *  FIELDS
   */
  addFieldTransaction: function(address) {
      Router.modules.FieldModule().then(module => module.addFieldTransaction(address));
  },
  getFields: function() {
    Router.modules.FieldModule().then(module => module.getAll());
  },

  loadField: function(address) {
    Router.modules.FieldModule().then(module => module.load(address));
  },

  newField: function() {
    Router.modules.FieldModule().then(module => module.newField());
  },

  openField: function(address) {
    Router.modules.FieldModule().then(module => module.openField(address));
  },

  bindEvents: function() {
    $(document).on("click", ".changeFieldName", App.changeFieldName);
  },

  changeFieldName: function(event) {
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
  openHarvest: function(event){
    var selectedHarvest = $(event).closest('#harvestSelector').find("#harvestSelect option:selected").val();
    Router.modules.HarvestModule().then(module => module.openHarvest(selectedHarvest));
  },
  loadHarvestSection: function(){
    
  },

  loadHarvests: function() {
    Router.modules.HarvestModule().then(module => module.loadAll());
  },

  newHarvest: function() {
    Router.modules.HarvestModule().then(module => module.newHarvest());
  },

  harvest: function() {
    let selectedHarvest = $('#harvestSelect').val();
    console.log("harvest selected",selectedHarvest);
    
    $(".field-selected").each(function() {
      if ($(this).is(":checked")) {
        let address = $(this)
          .closest(".card")
          .find(".fieldaddress")
          .text();
        Router.modules.HarvestModule().then(module => module.addField(selectedHarvest,address));
      }
    });
    //  var yourArray = $("input:checkbox[name=type]:checked").map(function () { return $(this).val() }).get();
    //  console.log(yourArray);
  }
};

window.addEventListener('load', function () {
 

    window.App.init();
});
