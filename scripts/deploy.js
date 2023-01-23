// imports
const { ethers, run, network } = require("hardhat")
const dotenv = require("dotenv")
dotenv.config()

async function main() {
    // get contract factory
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    // deploy contract
    const simpleStorage = await SimpleStorageFactory.deploy()
    // wait for contract to be deployed
    await simpleStorage.deployed()
    console.log(`Deployed contract to: ${simpleStorage.address}`)

    // get current value
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    // Update the current value
    const transactionResponse = await simpleStorage.store(7)
    // wait for transaction to be mined
    await transactionResponse.wait(1)
    // get updated value
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)
}

// async function to verify contract on Etherscan
// const verify = async (contractAddress, args) => {
//     console.log("Verifying contract...")
//     try {
//         await run("verify:verify", {
//             address: contractAddress,
//             constructorArguments: args,
//         })
//     } catch (e) {
//         if (e.message.toLowerCase().includes("already verified")) {
//             console.log("Already Verified!")
//         } else {
//             console.log(e)
//         }
//     }
// }

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
