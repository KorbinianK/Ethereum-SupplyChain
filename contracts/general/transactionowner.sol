pragma solidity ^0.4.23; 

/** 
 * @title Transaction Handler
 * @dev The contract will be inherited by all steps of the supply chain
 */
contract TransactionOwner {
    
    uint public totalTransactions;
    address[] internal sender;
    Status public status;

    /**
    * @dev Enum for enabling/disabling transactions
    */
    enum Status {
        active,
        deactivated
    }
    
    // Event that fires if the status changes
    event NewStatus(Status status);

    /**
    * @dev Checks if the contract can receive transactions
    */
    modifier isActive {
        require(status == Status.active);
        _;
    }

    /**
    * @dev Switches the status of the contract
    */
    function switchStatus() public {
        if (status == Status.active){
            status = Status.deactivated; 
        }else {
            status = Status.active; 
        }
        emit NewStatus(status);
    }
    
    /**
    * @dev Struct to add information to a sender of a transaction
    */
    struct TransactionSender {
        address sender;
        mapping(uint => TransactionStruct) transactions;
        uint transactionCount;
    }
    
    /**
    * @dev Struct to add information to the transaction itself
    */
    struct TransactionStruct {
        address sender;
        bytes data;
        uint256 time;
    }
    
    // Mapping of an address to a Sender struct
    mapping (address => TransactionSender) public transactionSender;
    
    // Mapping of an index to a Transaction struct
    mapping (uint => TransactionStruct) public transactions;
    
    // Mapping of an address to a bool to check if the address has sent a transaction 
    mapping (address => bool) internal isSender;
  
  
    /**
    * @dev Adds a new transaction to the contract
    * @param _sender the sender of the transaction
    * @param _data the data in the transaction
    */
    function addTransaction(address _sender, bytes _data) public isActive {
        if (!inArray(_sender)) {
            isSender[_sender] = true;
            sender.push(_sender);
        }
        TransactionSender storage tsender = transactionSender[_sender];
        tsender.transactions[tsender.transactionCount] = TransactionStruct(_sender,_data, now);
        transactions[totalTransactions] = TransactionStruct(_sender, _data, now);
        tsender.transactionCount++;
        totalTransactions++;
    }

    /**
    * @dev Internal function to add data when changing the state of the contract
    * @param _sender Address of the sender
    * @param _data data attached to the transaction
    */
    function updateTransaction(address _sender, bytes _data) internal {
        addTransaction(_sender, _data); 
    }

    
    /**
    * @dev Gets transaction data at a index
    * @param _index pointer to check
    * @return bytes the data
    */
    function getTransactionDataAtIndex(uint _index) public view returns(bytes) {
        return transactions[_index].data;
    }

    /**
    * @dev Gets transaction timestamp at a index
    * @param _index pointer to check
    * @return uint256 the timestamp
    */
    function getTransactionTimeAtIndex(uint _index) public view returns(uint256) {
        return transactions[_index].time;
    }
    
    
    /**
    * @dev Gets the status of the contract
    * @return bool status
    */
    function getStatus() public view returns(bool) {
        if(uint(status) == 1){
            return false;
        }
        return true;
    }
    
    /**
    * @dev Gets the total transactions sent to this contract
    * @return uint the counter
    */
    function getTotalTransactionCount() public view returns(uint){
        return totalTransactions;
    }
    
    /**
    * @dev Gets a sender address at an index from the sender list
    * @param _index the pointer
    * @return address of the sender
    */
    function getTransactionSenderAtIndex(uint _index) public view returns (address){
        return transactions[_index].sender;
    }

    
    /**
    * @dev Gets the amount of transactions a sender has sent
    * @param _sender the sender to check
    * @return uint transaction count
    */
    function getTransactionCountFromSender(address _sender) public view returns(uint){
        TransactionSender storage s = transactionSender[_sender];
        return s.transactionCount;
    }
    
    /**
    * @dev Gets the data of a transaction from a specific sender at a position
    * @param _sender the sender to check
    * @param _index poiner
    * @return bytes the data
    */
    function getTransactionDataFromSenderAtIndex(address _sender, uint _index) public view returns(bytes){
        TransactionSender storage s = transactionSender[_sender];
        return s.transactions[_index].data;
    }


    /**
    * @dev Gets the timestamp of a transaction from a specific sender at a position
    * @param _sender the sender to check
    * @param _index poiner
    * @return uint256 the timestamp
    */
    function getTransactionTimeFromSenderAtIndex(address _sender, uint _index) public view returns(uint256){
        TransactionSender storage s = transactionSender[_sender];
        return s.transactions[_index].time;
    }
    
    /**
    * @dev Gets all addresses that sent transactions to the contract
    * @return address[] array of all sender
    */
    function getAllUniqueTransactionSender() public view returns(address[]){
        return sender;
    }
    
    /**
    * @dev Checks if an address is inside the sender array
    * @param _addr address to check
    * @return bool
    */
    function inArray(address _addr) internal view returns (bool) {
        if (_addr != 0x0 && isSender[_addr]) {
            return true;
        }
        return false;
    }

    /**
    * @dev Constructor of the contract. Adds a default sender and transactio
    */
    constructor() public{
        addTransaction(0x0, "");
    }
}