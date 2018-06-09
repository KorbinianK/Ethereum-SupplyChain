pragma solidity 0.4.24; 

contract TransactionOwner {
    uint public totalTransactions;
    address[] internal sender;
    
    struct TransactionSender {
        address sender;
        mapping(uint => TransactionStruct) transactions;
        uint transactionCount;
    }
    
    struct TransactionStruct {
        address sender;
        bytes data;
    }
    
    mapping (address => TransactionSender) public transactionSender;
    mapping (uint => TransactionStruct) public transactions;
    mapping (address => bool) internal isSender;
  
    function addTransaction(address _sender, bytes _data) public{
        if (!inArray(_sender)) {
            isSender[_sender] = true;
            sender.push(_sender);
        }
        TransactionSender storage tsender = transactionSender[_sender];
        tsender.transactions[tsender.transactionCount] = TransactionStruct(_sender,_data);
        transactions[totalTransactions] = TransactionStruct(_sender, _data);
        tsender.transactionCount++;
        totalTransactions++;
    }
    
    function getTransactionDataAtIndex(uint _index) public view returns(bytes) {
        return transactions[_index].data;
    }
    
    function getTotalTransactionCount() public view returns(uint){
        return totalTransactions;
    }
    
    function getTransactionSenderAtIndex(uint _index) public view returns (address){
        return transactions[_index].sender;
    }
    
    function getTransactionCountFromSender(address _sender) public view returns(uint){
        TransactionSender storage s = transactionSender[_sender];
        return s.transactionCount;
    }
    
    function getTransactionDataFromSenderAtIndex(address _sender, uint _index) public view returns(bytes){
        TransactionSender storage s = transactionSender[_sender];
        return s.transactions[_index].data;
    }
    
    function getAllUniqueTransactionSender() public view returns(address[]){
        return sender;
    }
    
    function inArray(address _addr) internal view returns (bool) {
        if (_addr != 0x0 && isSender[_addr] == false) {
            return true;
        }
        return false;
    }

    constructor() public{
        sender.push(0x0);
        addTransaction(0x0, "");
    }
}