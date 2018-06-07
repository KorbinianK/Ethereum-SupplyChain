require('babel-register');

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
          websockets: true
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }

};