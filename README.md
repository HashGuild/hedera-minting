# HashGuild Minting Application

This is a minting application for the Hedera HashGraph powered by HashGuild.
We enable the hedera community to mint their NFTs using an accessible interface.
We mint directly into the user wallet using Hedera Smart Contracts with the Hedera Token Service.

Blazingly fast, as all things should be. 🔥

[Check out our hosted version](https://mint.hashguild.xyz).

## Development

If you want to get your hands dirty or simply try out our solution locally, you can follow the next couple of steps to setup a development environment.

### Forking and cloning the repository

For instructions on how to fork our repository, please see our [Contributing Guide](https://github.com/HashGuild/hedera-minting/blob/main/CONTRIBUTING.md#forking).
If you simply need the code locally and don't intend to contribute or manage the project on Github, simply clone the repository by running:

```
git clone git@github.com:HashGuild/hedera-minting.git
```

### Setting up a local node (option 1)

If you want to run unit tests against the smart contract or deploy it in a local environment you control, you have to setup a local hedera node.
Note that a simple EVM provider like Ganache is not sufficient, as it does not contain the precompiled contracts necessary for Hedera Services like HTS.

You can obtain a local node by following the instructions in [the official Hedera Local Node repository](https://github.com/hashgraph/hedera-local-node).
If you just want to get started quickly, we recommend using [the binary](https://github.com/hashgraph/hedera-local-node#official-npm-release).

Now create a `.env` file in the root directory and add the following.

```
# LOCAL
OPERATOR_PVKEY=302e020100300506032b65700422042091132178e72057a1d7528025956fe39b0b847f200ab59b2fdd367017f3087137
NETWORK_ID = 298
JSON_RPC_RELAY_URL = http://127.0.0.1:7546
MIRROR_NODE_URL=http://127.0.0.1:5551/api/v1/
OPERATOR_ID=0.0.2
ETH_PRIVATE_KEY=0x000000000000000000000000000 // <-- The key you just copied
```

Once the node is running, you are going to need to create an ECDSA account on the local network to deploy the contract.
Run the following and copy the private key printed after `New private key (RAW EVM)`.

```
node ./scripts/createECDSAAccount.js local
```

Replace `ETH_PRIVATE_KEY` in the `.env` file with the key you received from running the script.

You should now be able to run `npx truffle migrate` to deploy the minting contract to your local network.

### Setting up with testnet (option 2)

Please note that running unit tests is not recommended (nor consistent) when using testnet.
If you need to run unit tests (e.g. if you want to change something about the smart contract and check if
tests still run successfully), use a local node as described in the chapter above.

Create a `.env` file in the root directory of your project and add the following template.
You need a testnet account with funds in it. Replace `OPERATOR_PVKEY` and `OPERATOR_ID` with your testnet private key and account id respectively.

```
# TESTNET
OPERATOR_PVKEY=YOUR_TESTNET_PVKEY
NETWORK_ID = 296
JSON_RPC_RELAY_URL = https://testnet.hashio.io/api
MIRROR_NODE_URL=https://testnet.mirrornode.hedera.com/api/v1/
OPERATOR_ID=YOUR_TESTNET_ACCOUNTID
ETH_PRIVATE_KEY=THIS_ONE_IS_COMING_UP
```

Run the following and copy the private key printed after `New private key (RAW EVM)`.

```
node ./scripts/createECDSAAccount.js testnet
```

Replace `ETH_PRIVATE_KEY` in the `.env` file with the key you received from running the script.
You should now be able to run `npx truffle migrate` to deploy the minting contract to testnet.

### Run the development environment

We use Next.js for our frontend. To start a development server, use:

```
yarn dev
```

Your local app is now running under `localhost:3000`.

### Running tests

We use [truffle](https://github.com/trufflesuite/truffle) to write and run unit tests for our smart contract. After setting up your local environment,
you can run tests against the local node by running:

```
yarn run test:smart-contract
```

## Contribution Guidelines

We made the project open source to contribute to the growing Hedera community.
If you find a bug, have an idea for an enhancement or simply found a typo in our documentation, new contributions are always welcome!
Please see our [Contributing Guide](https://github.com/HashGuild/hedera-minting/blob/main/CONTRIBUTING.md) before submitting a new PR or issue.
