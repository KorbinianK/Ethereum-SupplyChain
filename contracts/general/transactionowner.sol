pragma solidity 0.4.24; 


contract TransactionOwner {
    uint public totalTransactions;
    address[] internal sender;
    
    struct TransactionSender {
        address sender;
        mapping(uint => TransActionStruct) transactions;
        uint transactionCount;
    }
    
    struct TransActionStruct {
        address sender;
        bytes data;
    }
    
    mapping (address => TransactionSender) public transactionSender;
    mapping (address => uint) internal addressIndex;
    mapping (uint => TransActionStruct) public transactions;
  
    function addTransaction(address _sender, bytes _data) public{
        if (!inArray(_sender)) {
            addressIndex[_sender] = sender.length;
            sender.push(_sender);
        }
       
        TransactionSender storage tsender = transactionSender[_sender];
        tsender.transactions[tsender.transactionCount] = TransActionStruct(_sender,_data);
        transactions[totalTransactions] = TransActionStruct(_sender, _data);
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
        if (_addr != 0x0 && addressIndex[_addr] > 0) {
            return true;
        }
        return false;
    }

    constructor() public{
        sender.push(0x0);
    }
}