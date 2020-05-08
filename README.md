# Lottereum

An online automated lottery, free of middleman. With the technology of ethereum, no local currency are involved, every user uses the same currency.

## Prerequisite

- [Node 10.17.0](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [MetaMask](https://metamask.io/)

## Metamask Plugin Installation

- Install [Chrome Browser](https://www.google.com/chrome/) in your machine
- Go to [Chrome Web Store](https://chrome.google.com/webstore/category/extension) and search for `Metamask`
- Open `Metamask` offered by `https://metamask.io/`
- Click `Add to Chrome` and confirm by `Add Extension`.

## Create Wallet

- Open `Metamask` and click `Get Started` (incase you already have a wallet then go to `Import Wallet`).
- Create a new wallet go for `Create Wallet`.
- Agree with `Privacy Policy`, put password and create the `wallet`.
- Reveal and save the `Backup Phrase` in a secure place.
- Now go to `Next Section`, select the words according to the phrase.
- Get your `Account Address`.

## Connect to Rinkeby network and get fake Ether

- Open the `Metamask` plugin.
- Switch from `Main Network` to `Rinkeby Network`.
- Go to `free ether supplier` [site](https://faucet.rinkeby.io/). Follow their `twitter` instructions.
- Go to [Twitter](https://twitter.com/home) and create a `tweet` of our `Ethereum Account Address`
  - If your `Ethereum Account Address` is `0x0000000000000000000000000000000000000000`, the just tweet the `address`
  * You can include anything with the `address`
  * It is valid, till the `tweet` contains the address.
- Open the `published tweet` in a new page and copy the `page link`.
- Put the `tweet link` in the `free ether supplier` [site](https://faucet.rinkeby.io/) and from the `Give me ether`, select a suitable package
- Now in your `Metamask`, `fake ether` should appear.

## Run and Simulate Contract through Remix Ide

- Open [Remix](https://remix.ethereum.org/) IDE.
- Select environment `Solidity`.
- Create a file `Lottery.sol`
- Get the your `Contract Code`
- Go to `Solidity Compiler` Tab and Select:
  - `Compiler Version` to `0.4.17`
  - `Language` as `Solidity`
  - `EVM` as `Compiler Default`
- Click `Compile Lottery.sol`
- Enable `auto-compile`.
- Go to `Deploy And Run Transaction` Tab and `Deploy` the contract in local `EVM`.
- Your contract functionality will be available in `Deploy And Run Tracsaction` tab.

## Deploy the contract to Rinkeby Network through Remix Ide

- Run the `Lottery` contract using previous instructions.
- Connect to the `Rinkeby` network.
- Go to `Deployed And Run Transaction` tab and select:
  - `Environment` is `Injected Web3`.
  - As account, your `Metamask` wallet address should be selected.
- Now click `Deploy` (make sure you have sufficient `ether` in your wallet to deploy the contract).
- In the `Remix IDE`, check `Log Section` and grab the `Transaction Hash` and store it.
- Go to [Ether Scan](https://rinkeby.etherscan.io/) and search for the `Transaction Hash`. You will get the `Deployed Contract Address`. Also this `Contract Address` will be required further.

## Developers

- Bank Piyawat
- Kit Kittin
- Kim Vichaphol
