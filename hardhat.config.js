/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const GOERLI_RPC_URL =
  process.env.GOERLI_RPC_URL || "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: MAINNET_RPC_URL,
      },
      blockConfirmations: 1,
    },
    localhost: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    goerli: {
      chainId: 5,
      blockConfirmations: 6,
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  solidity: {
    compilers: [
      { version: "0.8.7" },
      { version: "0.6.6" },
      { version: "0.6.12" },
      { version: "0.4.19" },
    ],
  },
  etherscan: {
    apiKey: {
      goerli: "",
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
  mocha: {
    timeout: 2000000,
  },
}
