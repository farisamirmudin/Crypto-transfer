// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

// contract is similar to class
contract Transactions {
  uint256 transactionsCount = 0;

  event Transfer (address sender, address receiver, string message, uint256 timestamp, string keyword, uint amount);

  struct TransferStruct {
    address sender;
    address receiver;
    string message;
    uint256 timestamp;
    string keyword;
    uint amount;
  }

  TransferStruct[] transactions;

  function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
    transactionsCount += 1;
    transactions.push(TransferStruct(msg.sender, receiver, message, block.timestamp, keyword, amount));
    emit Transfer(msg.sender, receiver, message, block.timestamp, keyword, amount);
  }

  function getAllTransactions() public view returns (TransferStruct[] memory){
    return transactions;
  }

  function getTransactionsCount() public view returns (uint256){
    return transactionsCount;
  }
}