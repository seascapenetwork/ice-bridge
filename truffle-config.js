var HDWalletProvider = require("@truffle/hdwallet-provider");
const PrivateKeyProvider = require("truffle-privatekey-provider");

module.exports = {
    compilers: {
      solc: {
          version: "0.6.7"
      }
    },
   
    networks: {
       development: {
		   host: "ice-bridge-node",
		   port: 8545,
		   network_id: "*", // match any network
		   from: process.env.ADDRESS_1
		},
		
		rinkeby: {
			//provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY, 2),
			provider: () => new PrivateKeyProvider(process.env.MNEMONIC, "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY),
			network_id: 4,
			gasPrice: 100000000000, // 100 gwei
			skipDryRun: true // To prevent async issues occured on node v. 14. see:
			// https://github.com/trufflesuite/truffle/issues/3008
		},
		ropsten: {
			provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
			network_id: 3,
			gasPrice: 100000000000, // 100 gwei
			skipDryRun: true // To prevent async issues occured on node v. 14. see:
			// https://github.com/trufflesuite/truffle/issues/3008
		},
		mainnet: {
			provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY),
			gasPrice: 100000000000, // 100 gwei
			network_id: 1,
			skipDryRun: true // To prevent async issues occured on node v. 14. see:
			// https://github.com/trufflesuite/truffle/issues/3008
		},
		bsctestnet: {
			provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://data-seed-prebsc-2-s3.binance.org:8545"),
			network_id: 97,
			confirmations: 10,
			timeoutBlocks: 200,
			skipDryRun: true
		}
	}
};
