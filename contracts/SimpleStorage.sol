// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract SimpleStorage {
    uint256 favoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    // @dev Store the user's favorite number
    // @param _favoriteNumber The user's favorite number
    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    // @dev Retrieve the user's favorite number
    // @return The user's favorite number
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // @dev Add a person to the contract and map their name to their favorite number
    // @param _name The name of the person
    // @param _favoriteNumber The person's favorite number
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
