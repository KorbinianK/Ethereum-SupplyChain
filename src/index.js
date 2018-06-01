import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "./scss/styles.scss";
import bootstrap from "bootstrap";


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
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
            web3 = new Web3(App.web3Provider);
        }
        
        return App.initContract();
    },

    initContract: function () {
       
        $.getJSON('../build/contracts/TutorialToken.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            var TutorialTokenArtifact = data;
            
            App.contracts.TutorialToken = TruffleContract(TutorialTokenArtifact);

            // Set the provider for our contract.
            App.contracts.TutorialToken.setProvider(App.web3Provider);

            // Use our contract to retieve and mark the adopted pets.
            return App.getBalances();
        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '#transferButton', App.handleTransfer);
    },

    handleTransfer: function (event) {
        event.preventDefault();

        var amount = parseInt($('#TTTransferAmount').val());
        var toAddress = $('#TTTransferAddress').val();

        console.log('Transfer ' + amount + ' TT to ' + toAddress);

        var tutorialTokenInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.error(error);
            }

            var account = accounts[0];

            App.contracts.TutorialToken.deployed().then(function (instance) {
                tutorialTokenInstance = instance;

                return tutorialTokenInstance.transfer(toAddress, amount, {
                    from: account
                });
            }).then(function (result) {
                alert('Transfer Successful!');
                return App.getBalances();
            }).catch(function (err) {
                console.error(err.message);
            });
        });
    },

    getBalances: function () {
        console.log('Getting balances...');

        var tutorialTokenInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.error(error);
            }

            var account = accounts[0];

            App.contracts.TutorialToken.deployed().then(function (instance) {
                tutorialTokenInstance = instance;

                return tutorialTokenInstance.balanceOf(account);
            }).then(function (result) {
                var balance = result.c[0];

                $('#TTBalance').text(balance);
            }).catch(function (err) {
                console.error(err.message);
            });
        });
    }

};

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
    }

    window.App.init();
});
