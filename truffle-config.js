/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 * 
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 7545,            // Standard Ethereum port (default: none)
        network_id: "*",       // Any network (default: none)
    },
    local1: {
      host: '127.0.0.1',
      port: 8546,
      network_id: '*'
    },
    local2: {
      host: '127.0.0.1',
      port: 8547,
      network_id: '*'
    },
    local3: {
      host: '127.0.0.1',
      port: 8548,
      network_id: '*'
    },
    local4: {
      host: '127.0.0.1',
      port: 8549,
      network_id: '*'
    },
    local5: {
      host: '127.0.0.1',
      port: 8550,
      network_id: '*'
    },
    local6: {
      host: '127.0.0.1',
      port: 8551,
      network_id: '*'
    },
    local7: {
      host: '127.0.0.1',
      port: 8552,
      network_id: '*'
    },
    local8: {
      host: '127.0.0.1',
      port: 8553,
      network_id: '*'
    },
    local9: {
      host: '127.0.0.1',
      port: 8554,
      network_id: '*'
    },
    local10: {
      host: '127.0.0.1',
      port: 8555,
      network_id: '*'
    },
    local11: {
      host: '127.0.0.1',
      port: 8556,
      network_id: '*'
    },
    local12: {
      host: '127.0.0.1',
      port: 8557,
      network_id: '*'
    },
    local13: {
      host: '127.0.0.1',
      port: 8558,
      network_id: '*'
    },
    local14: {
      host: '127.0.0.1',
      port: 8559,
      network_id: '*'
    },
    local15: {
      host: '127.0.0.1',
      port: 8560,
      network_id: '*'
    },
    local16: {
      host: '127.0.0.1',
      port: 8561,
      network_id: '*'
    },
    local17: {
      host: '127.0.0.1',
      port: 8562,
      network_id: '*'
    },
    local18: {
      host: '127.0.0.1',
      port: 8563,
      network_id: '*'
    },
    local19: {
      host: '127.0.0.1',
      port: 8564,
      network_id: '*'
    },
    local20: {
      host: '127.0.0.1',
      port: 8565,
      network_id: '*'
    },
    local21: {
      host: '127.0.0.1',
      port: 8566,
      network_id: '*'
    },
    local22: {
      host: '127.0.0.1',
      port: 8567,
      network_id: '*'
    },
    local23: {
      host: '127.0.0.1',
      port: 8568,
      network_id: '*'
    },
    local24: {
      host: '127.0.0.1',
      port: 8569,
      network_id: '*'
    },
    local25: {
      host: '127.0.0.1',
      port: 8570,
      network_id: '*'
    },
    local26: {
      host: '127.0.0.1',
      port: 8571,
      network_id: '*'
    },
    local27: {
      host: '127.0.0.1',
      port: 8572,
      network_id: '*'
    },
    local28: {
      host: '127.0.0.1',
      port: 8573,
      network_id: '*'
    },
    local29: {
      host: '127.0.0.1',
      port: 8574,
      network_id: '*'
    },
    local30: {
      host: '127.0.0.1',
      port: 8575,
      network_id: '*'
    },
    local31: {
      host: '127.0.0.1',
      port: 8576,
      network_id: '*'
    },
    local32: {
      host: '127.0.0.1',
      port: 8577,
      network_id: '*'
    },
    local33: {
      host: '127.0.0.1',
      port: 8578,
      network_id: '*'
    },
    local34: {
      host: '127.0.0.1',
      port: 8579,
      network_id: '*'
    },
    local35: {
      host: '127.0.0.1',
      port: 8580,
      network_id: '*'
    },
    local36: {
      host: '127.0.0.1',
      port: 8581,
      network_id: '*'
    },
    local37: {
      host: '127.0.0.1',
      port: 8582,
      network_id: '*'
    },
    local38: {
      host: '127.0.0.1',
      port: 8583,
      network_id: '*'
    },
    local39: {
      host: '127.0.0.1',
      port: 8584,
      network_id: '*'
    },
    local40: {
      host: '127.0.0.1',
      port: 8585,
      network_id: '*'
    },
    local41: {
      host: '127.0.0.1',
      port: 8586,
      network_id: '*'
    },
    local42: {
      host: '127.0.0.1',
      port: 8587,
      network_id: '*'
    },
    local43: {
      host: '127.0.0.1',
      port: 8588,
      network_id: '*'
    },
    local44: {
      host: '127.0.0.1',
      port: 8589,
      network_id: '*'
    },
    local45: {
      host: '127.0.0.1',
      port: 8590,
      network_id: '*'
    },
    local46: {
      host: '127.0.0.1',
      port: 8591,
      network_id: '*'
    },
    local47: {
      host: '127.0.0.1',
      port: 8592,
      network_id: '*'
    },
    local48: {
      host: '127.0.0.1',
      port: 8593,
      network_id: '*'
    },
    local49: {
      host: '127.0.0.1',
      port: 8594,
      network_id: '*'
    },
    local50: {
      host: '127.0.0.1',
      port: 8595,
      network_id: '*'
    },
    local51: {
      host: '127.0.0.1',
      port: 8596,
      network_id: '*'
    },
    local52: {
      host: '127.0.0.1',
      port: 8597,
      network_id: '*'
    },
    local53: {
      host: '127.0.0.1',
      port: 8598,
      network_id: '*'
    },
    local54: {
      host: '127.0.0.1',
      port: 8599,
      network_id: '*'
    },
    local55: {
      host: '127.0.0.1',
      port: 8600,
      network_id: '*'
    },
    local56: {
      host: '127.0.0.1',
      port: 8601,
      network_id: '*'
    },
    local57: {
      host: '127.0.0.1',
      port: 8602,
      network_id: '*'
    },
    local58: {
      host: '127.0.0.1',
      port: 8603,
      network_id: '*'
    },
    local59: {
      host: '127.0.0.1',
      port: 8604,
      network_id: '*'
    },
    local60: {
      host: '127.0.0.1',
      port: 8605,
      network_id: '*'
    },
    local61: {
      host: '127.0.0.1',
      port: 8606,
      network_id: '*'
    },
    local62: {
      host: '127.0.0.1',
      port: 8607,
      network_id: '*'
    },
    local63: {
      host: '127.0.0.1',
      port: 8608,
      network_id: '*'
    },
    local64: {
      host: '127.0.0.1',
      port: 8609,
      network_id: '*'
    },
    local65: {
      host: '127.0.0.1',
      port: 8610,
      network_id: '*'
    },
    local66: {
      host: '127.0.0.1',
      port: 8611,
      network_id: '*'
    },
    local67: {
      host: '127.0.0.1',
      port: 8612,
      network_id: '*'
    },
    local68: {
      host: '127.0.0.1',
      port: 8613,
      network_id: '*'
    },
    local69: {
      host: '127.0.0.1',
      port: 8614,
      network_id: '*'
    },
    local70: {
      host: '127.0.0.1',
      port: 8615,
      network_id: '*'
    },
    local71: {
      host: '127.0.0.1',
      port: 8616,
      network_id: '*'
    },
    local72: {
      host: '127.0.0.1',
      port: 8617,
      network_id: '*'
    },
    local73: {
      host: '127.0.0.1',
      port: 8618,
      network_id: '*'
    },
    local74: {
      host: '127.0.0.1',
      port: 8619,
      network_id: '*'
    },
    local75: {
      host: '127.0.0.1',
      port: 8620,
      network_id: '*'
    },
    local76: {
      host: '127.0.0.1',
      port: 8621,
      network_id: '*'
    },
    local77: {
      host: '127.0.0.1',
      port: 8622,
      network_id: '*'
    },
    local78: {
      host: '127.0.0.1',
      port: 8623,
      network_id: '*'
    },
    local79: {
      host: '127.0.0.1',
      port: 8624,
      network_id: '*'
    },
    local80: {
      host: '127.0.0.1',
      port: 8625,
      network_id: '*'
    },
    local81: {
      host: '127.0.0.1',
      port: 8626,
      network_id: '*'
    },
    local82: {
      host: '127.0.0.1',
      port: 8627,
      network_id: '*'
    },
    local83: {
      host: '127.0.0.1',
      port: 8628,
      network_id: '*'
    },
    local84: {
      host: '127.0.0.1',
      port: 8629,
      network_id: '*'
    },
    local85: {
      host: '127.0.0.1',
      port: 8630,
      network_id: '*'
    },
    local86: {
      host: '127.0.0.1',
      port: 8631,
      network_id: '*'
    },
    local87: {
      host: '127.0.0.1',
      port: 8632,
      network_id: '*'
    },
    local88: {
      host: '127.0.0.1',
      port: 8633,
      network_id: '*'
    },
    local89: {
      host: '127.0.0.1',
      port: 8634,
      network_id: '*'
    },
    local90: {
      host: '127.0.0.1',
      port: 8635,
      network_id: '*'
    },
    local91: {
      host: '127.0.0.1',
      port: 8636,
      network_id: '*'
    },
    local92: {
      host: '127.0.0.1',
      port: 8637,
      network_id: '*'
    },
    local93: {
      host: '127.0.0.1',
      port: 8638,
      network_id: '*'
    },
    local94: {
      host: '127.0.0.1',
      port: 8639,
      network_id: '*'
    },
    local95: {
      host: '127.0.0.1',
      port: 8640,
      network_id: '*'
    },
    local96: {
      host: '127.0.0.1',
      port: 8641,
      network_id: '*'
    },
    local97: {
      host: '127.0.0.1',
      port: 8642,
      network_id: '*'
    },
    local98: {
      host: '127.0.0.1',
      port: 8643,
      network_id: '*'
    },
    local99: {
      host: '127.0.0.1',
      port: 8644,
      network_id: '*'
    },
    local100: {
      host: '127.0.0.1',
      port: 8645,
      network_id: '*'
    },
    local101: {
      host: '127.0.0.1',
      port: 8646,
      network_id: '*'
    },
    local102: {
      host: '127.0.0.1',
      port: 8647,
      network_id: '*'
    },
    local103: {
      host: '127.0.0.1',
      port: 8648,
      network_id: '*'
    },
    local104: {
      host: '127.0.0.1',
      port: 8649,
      network_id: '*'
    },
    local105: {
      host: '127.0.0.1',
      port: 8650,
      network_id: '*'
    },
    local106: {
      host: '127.0.0.1',
      port: 8651,
      network_id: '*'
    },
    local107: {
      host: '127.0.0.1',
      port: 8652,
      network_id: '*'
    },
    local108: {
      host: '127.0.0.1',
      port: 8653,
      network_id: '*'
    },
    local109: {
      host: '127.0.0.1',
      port: 8654,
      network_id: '*'
    },
    local110: {
      host: '127.0.0.1',
      port: 8655,
      network_id: '*'
    },
    local111: {
      host: '127.0.0.1',
      port: 8656,
      network_id: '*'
    },
    local112: {
      host: '127.0.0.1',
      port: 8657,
      network_id: '*'
    },
    local113: {
      host: '127.0.0.1',
      port: 8658,
      network_id: '*'
    },
    local114: {
      host: '127.0.0.1',
      port: 8659,
      network_id: '*'
    },
    local115: {
      host: '127.0.0.1',
      port: 8660,
      network_id: '*'
    },
    local116: {
      host: '127.0.0.1',
      port: 8661,
      network_id: '*'
    },
    local117: {
      host: '127.0.0.1',
      port: 8662,
      network_id: '*'
    },
    local118: {
      host: '127.0.0.1',
      port: 8663,
      network_id: '*'
    },
    local119: {
      host: '127.0.0.1',
      port: 8664,
      network_id: '*'
    },
    local120: {
      host: '127.0.0.1',
      port: 8665,
      network_id: '*'
    },
    local121: {
      host: '127.0.0.1',
      port: 8666,
      network_id: '*'
    },
    local122: {
      host: '127.0.0.1',
      port: 8667,
      network_id: '*'
    },
    local123: {
      host: '127.0.0.1',
      port: 8668,
      network_id: '*'
    },
    local124: {
      host: '127.0.0.1',
      port: 8669,
      network_id: '*'
    },
    local125: {
      host: '127.0.0.1',
      port: 8670,
      network_id: '*'
    },
    local126: {
      host: '127.0.0.1',
      port: 8671,
      network_id: '*'
    },
    local127: {
      host: '127.0.0.1',
      port: 8672,
      network_id: '*'
    },
    local128: {
      host: '127.0.0.1',
      port: 8673,
      network_id: '*'
    },
    local129: {
      host: '127.0.0.1',
      port: 8674,
      network_id: '*'
    },
    local130: {
      host: '127.0.0.1',
      port: 8675,
      network_id: '*'
    },
    local131: {
      host: '127.0.0.1',
      port: 8676,
      network_id: '*'
    },
    local132: {
      host: '127.0.0.1',
      port: 8677,
      network_id: '*'
    },
    local133: {
      host: '127.0.0.1',
      port: 8678,
      network_id: '*'
    },
    local134: {
      host: '127.0.0.1',
      port: 8679,
      network_id: '*'
    },
    local135: {
      host: '127.0.0.1',
      port: 8680,
      network_id: '*'
    },
    local136: {
      host: '127.0.0.1',
      port: 8681,
      network_id: '*'
    },
    local137: {
      host: '127.0.0.1',
      port: 8682,
      network_id: '*'
    },
    local138: {
      host: '127.0.0.1',
      port: 8683,
      network_id: '*'
    },
    local139: {
      host: '127.0.0.1',
      port: 8684,
      network_id: '*'
    },
    local140: {
      host: '127.0.0.1',
      port: 8685,
      network_id: '*'
    },
    local141: {
      host: '127.0.0.1',
      port: 8686,
      network_id: '*'
    },
    local142: {
      host: '127.0.0.1',
      port: 8687,
      network_id: '*'
    },
    local143: {
      host: '127.0.0.1',
      port: 8688,
      network_id: '*'
    },
    local144: {
      host: '127.0.0.1',
      port: 8689,
      network_id: '*'
    },
    local145: {
      host: '127.0.0.1',
      port: 8690,
      network_id: '*'
    },
    local146: {
      host: '127.0.0.1',
      port: 8691,
      network_id: '*'
    },
    local147: {
      host: '127.0.0.1',
      port: 8692,
      network_id: '*'
    },
    local148: {
      host: '127.0.0.1',
      port: 8693,
      network_id: '*'
    },
    local149: {
      host: '127.0.0.1',
      port: 8694,
      network_id: '*'
    },
    local150: {
      host: '127.0.0.1',
      port: 8695,
      network_id: '*'
    },

    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websocket: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
    // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
    // network_id: 3,       // Ropsten's id
    // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: 'petersburg',
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
