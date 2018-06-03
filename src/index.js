import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "./scss/styles.scss";
import bootstrap from "bootstrap";
import Mustache from "mustache";
import * as FieldModule from "./fields.js";
import Router from "./router.js";

// Import libraries we need.
import {
    default as Web3
} from 'web3';
import {
    default as contract
} from 'truffle-contract'

window.App = {
    web3Provider: null,
    contracts: {},
    fields: {},
    fieldsTemplate : null,

    init: function () {
        return App.initWeb3();
    },

    initWeb3: function () {
        // Initialize web3 and set the provider to the testRPC.

        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
            Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send
            web3 = new Web3(App.web3Provider);
        }
        return App.initContracts();
    },

    initTemplates: function () {
        const template_fields = "src/templates/cultivation/fieldcard.mst"
        var fields_loaded;
       
        fetch(template_fields)
            .then(response => response.text())
            .then(fields_template => {
                fields_loaded = fields_template;
                Mustache.parse(fields_loaded);
                App.fieldsTemplate = fields_loaded;
            })
            .catch(error => console.log('Unable to get the template: ', error.message));
    },


    newField: function () {
        Router.modules.FieldModule().then(module => module.newField());
    },

   

    initContracts: function () {
       
        $.getJSON('../build/contracts/Field.json', function (data) {
            let FieldArtifact = data;
            App.contracts.Field = TruffleContract(FieldArtifact);
            App.contracts.Field.setProvider(App.web3Provider);
        });

        $.getJSON('../build/contracts/FieldHandler.json', function (data) {
            let FieldHandlerArtifact = data;
            App.contracts.FieldHandler = TruffleContract(FieldHandlerArtifact);
            App.contracts.FieldHandler.setProvider(App.web3Provider);
            return App.getFields();
        });
        App.initTemplates();

        return App.bindEvents();
    },

    getFields: function () {
        Router.modules.FieldModule().then(module => module.getAll());
    },

    loadField: function(address){
         Router.modules.FieldModule().then(module => module.load(address));
    },

    bindEvents: function () {
        $(document).on("click", ".changeFieldName", App.changeFieldName);
    },

    changeFieldName: function(event){
        event.preventDefault();        
        let address = $(event.currentTarget).data("address");
        let newName = document.getElementById(address + "-nameInput").value;
        Router.modules.FieldModule().then(module => module.updateName(address,newName));
      
    }

};

window.addEventListener('load', function () {
 

    window.App.init();
});
