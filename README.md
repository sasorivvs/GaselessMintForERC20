# GaselessMintForERC20
Gaseless mint ERC721 for ERC20

## Getting Started

# Setting up the hardhat project
Clone this project to pull down some basic starter code.

After that cd into myAppContract and run `npm install` to download all the project dependencies.
Create a .env file and paste
  PRIVATE_KEY = "Your private key for deploy"
  SEPOLIA_URL = "Sepolia url"
  RELAYER = "Relayer Address for fees"

Go to deploy.ts and paste Relayer Address and choose the mint price 
If you want to accept payment with an existing ERC20 token, then go to deployERC721.ts and paste Relayer Address
and ERC20 Token Address

# Deploying to a live network
run npx hardhat run scripts/deploy.js --network sepolia

Go to hardhat.config.ts and pase etherscanApi
run npx hardhat verify --network sepolia <addressERC20>
run npx hardhat verify --network sepolia <addressERC721> <addressRelayer> <addressERC20> <initialOwnerAddress> <price>


# Setting up the my-app
cd into my-app and run `npm install` to download all the project dependencies.
Go to contractData and fill in all the necessary data(abiERC721, abiERC20Token, addressERC721,addressERC20,RelayerPrivateKey,urlSepolia)

run yarn dev
go to http://localhost:3000/ and test the project
