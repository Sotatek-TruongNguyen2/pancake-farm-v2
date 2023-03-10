import path from 'path';
import { HardhatUserConfig } from 'hardhat/config';

import 'dotenv/config';
import '@tenderly/hardhat-tenderly';
import 'solidity-coverage';
import 'hardhat-gas-reporter';
import 'hardhat-abi-exporter';
import 'hardhat-deploy';
import 'hardhat-log-remover';
import 'hardhat-storage-layout';
import 'hardhat-contract-sizer';
import 'hardhat-watcher';
import 'hardhat-docgen';
import 'hardhat-address-exporter';
// import "hardhat-tracer";
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-network-helpers';
import '@openzeppelin/hardhat-upgrades';
import '@primitivefi/hardhat-dodoc';

import { removeConsoleLog } from 'hardhat-preprocessor';

const EXPLORER_API_KEY = process.env.BSC_API_KEY;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

const accounts = [DEPLOYER_PRIVATE_KEY as string];

enum CHAIN_IDS {
  goerli = 5,
  hardhat = 31337,
  kovan = 42,
  mainnet = 1,
  rinkeby = 4,
  ropsten = 3,
  bsc = 97,
}

const config: HardhatUserConfig = {
  dodoc: {
    runOnCompile: false,
    outputDir: './doc',
  },
  docgen: {
    path: './documentation',
    // pages: "files",
    // templates: "docs-templates",
    clear: false,
    runOnCompile: false,
  },
  abiExporter: {
    path: './abi',
    clear: true,
    runOnCompile: false,
  },
  solidity: {
    compilers: [
      {
        version: '0.6.12',
        settings: {
          outputSelection: {
            '*': {
              '*': ['storageLayout'],
            },
          },
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: '0.8.9',
        settings: {
          outputSelection: {
            '*': {
              '*': ['storageLayout'],
            },
          },
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: EXPLORER_API_KEY,
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    excludeContracts: ['contracts/mocks/', 'contracts/libraries/'],
  },
  mocha: {
    timeout: 600000,
  },
  defaultNetwork: 'hardhat',
  networks: {
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ['local'],
    },
    hardhat: {
      chainId: 31337,
      live: false,
      saveDeployments: true,
      tags: ['test', 'local'],
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      // Solidity-coverage overrides gasPrice to 1 which is not compatible with EIP1559
      hardfork: process.env.CODE_COVERAGE ? 'berlin' : 'london',
      forking: {
        enabled: process.env.FORKING === 'true',
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        blockNumber: 11829739,
      },
      allowUnlimitedContractSize: true,
      accounts: {
        count: 30,
      },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 1,
      forking: {
        enabled: process.env.FORKING === 'true',
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        blockNumber: 11829739,
      },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 3,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 4,
      live: true,
      saveDeployments: true,
      // tags: ['staging'],
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 5,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
      gasPrice: 70 * 10 ** 9,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 42,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    moonbase: {
      url: 'https://rpc.testnet.moonbeam.network',
      accounts,
      chainId: 1287,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    arbitrum: {
      url: 'https://kovan3.arbitrum.io/rpc',
      accounts,
      chainId: 79377087078960,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    binance: {
      url: 'https://bsc-dataseed.binance.org/',
      accounts,
      chainId: 56,
      live: true,
      saveDeployments: true,
    },
    binancetest: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      accounts,
      chainId: 97,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    matic: {
      url: 'https://rpc-mainnet.maticvigil.com/',
      accounts,
      chainId: 137,
      live: true,
      saveDeployments: true,
    },
    fantom: {
      url: 'https://rpcapi.fantom.network',
      accounts,
      chainId: 250,
      live: true,
      saveDeployments: true,
    },
    fantomtest: {
      url: 'https://rpc.testnet.fantom.network/',
      accounts,
      chainId: 4002,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    avalanche: {
      url: 'https://ava.spacejelly.network/api/ext/bc/C/rpc',
      accounts,
      chainId: 43114,
      live: true,
      saveDeployments: true,
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      accounts,
      chainId: 43113,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com/',
      accounts,
      chainId: 80001,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    huobi: {
      url: 'https://http-mainnet.hecochain.com',
      accounts,
      chainId: 128,
      live: true,
      saveDeployments: true,
    },
    huobitest: {
      url: 'https://http-testnet.hecochain.com',
      accounts,
      chainId: 256,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    okex: {
      url: 'http://okexchain-rpc1.okex.com:26659',
      accounts,
      chainId: 66,
      live: true,
      saveDeployments: true,
    },
    okextest: {
      url: 'http://okexchaintest-rpc1.okex.com:26659',
      accounts,
      chainId: 65,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    xdai: {
      url: 'https://rpc.xdaichain.com',
      accounts,
      chainId: 100,
      live: true,
      saveDeployments: true,
    },
    tomo: {
      url: 'https://rpc.tomochain.com',
      accounts,
      chainId: 88,
      live: true,
      saveDeployments: true,
    },
    tomotest: {
      url: 'https://rpc.testnet.tomochain.com',
      accounts,
      chainId: 89,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    moonbeam: {
      url: 'https://rpc.api.moonbeam.network',
      accounts,
      chainId: 1284,
      live: true,
      saveDeployments: true,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  preprocess: {
    eachLine: removeConsoleLog(
      (bre) =>
        bre.network.name !== 'hardhat' && bre.network.name !== 'localhost',
    ),
  },
  watcher: {
    compile: {
      tasks: ['compile'],
      files: ['./contracts'],
      verbose: true,
    },
    test: {
      tasks: ['test'],
      files: ['./test/Lender.spec.ts'],
      verbose: true,
    },
  },
  paths: {
    artifacts: 'artifacts',
    cache: 'cache',
    deploy: 'deploy',
    deployments: 'deployments',
    imports: 'imports',
    sources: 'contracts',
    tests: 'test',
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: true,
    runOnCompile: true,
    // strict: true,
    // only: [':Greeter$'],
  },
  tenderly: {
    project: String(process.env.TENDERLY_PROJECT),
    username: String(process.env.TENDERLY_USERNAME),
  },
  addressExporter: {
    outDir: path.resolve('./addresses'),
    runPrettier: false,
  },
};

export default config;
