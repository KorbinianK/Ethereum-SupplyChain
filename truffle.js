require('babel-register');

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
            websockets: true
        },
        live: {
            host: "10.102.52.139",
            port: 8545,
            network_id: "*",
            from: "0x9e442f4c99f09764b904af8c0337dfdf8d7efe69",
            websockets: true,
            gas: 4712388
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }

};