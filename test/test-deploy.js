const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    // Declare variables for contract factory and instance
    let simpleStorageFactory, simpleStorage
    // Deploy contract before each test
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    // Test that the contract starts with a favorite number of 0
    it("Should start with a favorite number of 0", async function () {
        // Retrieve the current value
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // Assert that the current value is equal to the expected value
        assert.equal(currentValue.toString(), expectedValue)
        expect(currentValue.toString()).to.equal(expectedValue)
    })

    // Test that the contract updates when store() is called
    it("Should update when we call store", async function () {
        // Declare expected value
        const expectedValue = "7"
        // Call store() and wait for transaction to be mined
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        // Retrieve the current value
        const currentValue = await simpleStorage.retrieve()
        // Assert that the current value is equal to the expected value
        assert.equal(currentValue.toString(), expectedValue)
    })

    // Test that the people struct and array work correctly
    it("Should work correctly with the people struct and array", async function () {
        // Declare expected values for person's name and favorite number
        const expectedPersonName = "Patrick"
        const expectedFavoriteNumber = "16"
        // Call addPerson() and wait for transaction to be mined
        const transactionResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedFavoriteNumber
        )
        await transactionResponse.wait(1)
        // Retrieve the person's information from the people array
        const { favoriteNumber, name } = await simpleStorage.people(0)
        // Assert that the person's name and favorite number match the expected values
        assert.equal(name, expectedPersonName)
        assert.equal(favoriteNumber, expectedFavoriteNumber)
    })
})
