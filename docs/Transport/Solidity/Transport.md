* [ERC20Basic](#erc20basic)
  * [totalSupply](#function-totalsupply)
  * [balanceOf](#function-balanceof)
  * [transfer](#function-transfer)
  * [Transfer](#event-transfer)
* [ERC20Handler](#erc20handler)
  * [getBalance](#function-getbalance)
  * [totalSupply](#function-totalsupply)
  * [balanceOf](#function-balanceof)
  * [tokenAddress](#function-tokenaddress)
  * [transfer](#function-transfer)
  * [Transfer](#event-transfer)
* [Ownable](#ownable)
  * [owner](#function-owner)
  * [transferOwnership](#function-transferownership)
  * [OwnershipTransferred](#event-ownershiptransferred)
* [TransactionOwner](#transactionowner)
  * [addTransaction](#function-addtransaction)
  * [status](#function-status)
  * [getTotalTransactionCount](#function-gettotaltransactioncount)
  * [getStatus](#function-getstatus)
  * [getTransactionCountFromSender](#function-gettransactioncountfromsender)
  * [getTransactionTimeFromSenderAtIndex](#function-gettransactiontimefromsenderatindex)
  * [getAllUniqueTransactionSender](#function-getalluniquetransactionsender)
  * [switchStatus](#function-switchstatus)
  * [getTransactionTimeAtIndex](#function-gettransactiontimeatindex)
  * [transactions](#function-transactions)
  * [getTransactionSenderAtIndex](#function-gettransactionsenderatindex)
  * [transactionSender](#function-transactionsender)
  * [totalTransactions](#function-totaltransactions)
  * [getTransactionDataAtIndex](#function-gettransactiondataatindex)
  * [getTransactionDataFromSenderAtIndex](#function-gettransactiondatafromsenderatindex)
  * [NewStatus](#event-newstatus)
  * [NewTransaction](#event-newtransaction)
* [Transport](#transport)
  * [getBalance](#function-getbalance)
  * [addTransaction](#function-addtransaction)
  * [totalSupply](#function-totalsupply)
  * [status](#function-status)
  * [getStartCoordinates](#function-getstartcoordinates)
  * [addHarvest](#function-addharvest)
  * [getTotalTransactionCount](#function-gettotaltransactioncount)
  * [getStatus](#function-getstatus)
  * [getTransactionCountFromSender](#function-gettransactioncountfromsender)
  * [balanceOf](#function-balanceof)
  * [getTransactionTimeFromSenderAtIndex](#function-gettransactiontimefromsenderatindex)
  * [getAllUniqueTransactionSender](#function-getalluniquetransactionsender)
  * [owner](#function-owner)
  * [switchStatus](#function-switchstatus)
  * [getTransactionTimeAtIndex](#function-gettransactiontimeatindex)
  * [transactions](#function-transactions)
  * [tokenAddress](#function-tokenaddress)
  * [setStartCoordinates](#function-setstartcoordinates)
  * [transfer](#function-transfer)
  * [getID](#function-getid)
  * [getTransactionSenderAtIndex](#function-gettransactionsenderatindex)
  * [transactionSender](#function-transactionsender)
  * [totalTransactions](#function-totaltransactions)
  * [getTransactionDataAtIndex](#function-gettransactiondataatindex)
  * [setEndCoordinates](#function-setendcoordinates)
  * [createdAt](#function-createdat)
  * [finish](#function-finish)
  * [getTransactionDataFromSenderAtIndex](#function-gettransactiondatafromsenderatindex)
  * [transferOwnership](#function-transferownership)
  * [Transfer](#event-transfer)
  * [OwnershipTransferred](#event-ownershiptransferred)
  * [NewStatus](#event-newstatus)
  * [NewTransaction](#event-newtransaction)

# ERC20Basic


## *function* totalSupply

ERC20Basic.totalSupply() `view` `18160ddd`





## *function* balanceOf

ERC20Basic.balanceOf(who) `view` `70a08231`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | who | undefined |


## *function* transfer

ERC20Basic.transfer(to, value) `nonpayable` `a9059cbb`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | to | undefined |
| *uint256* | value | undefined |

## *event* Transfer

ERC20Basic.Transfer(from, to, value) `ddf252ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | indexed |
| *address* | to | indexed |
| *uint256* | value | not indexed |


---
# ERC20Handler


## *function* getBalance

ERC20Handler.getBalance() `view` `12065fe0`

> Gets token balance of the contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* totalSupply

ERC20Handler.totalSupply() `view` `18160ddd`

> Gets the total supply



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* balanceOf

ERC20Handler.balanceOf(who) `view` `70a08231`

> Gets the balance of an account

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | who | undefined |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* tokenAddress

ERC20Handler.tokenAddress() `view` `9d76ea58`

> Gets the ERC20 address



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *function* transfer

ERC20Handler.transfer(to, value) `nonpayable` `a9059cbb`

> Transfers tokens

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | to | the address the tokens are sent to |
| *uint256* | value | the amount to transfer |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |
## *event* Transfer

ERC20Handler.Transfer(from, to, value) `ddf252ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | indexed |
| *address* | to | indexed |
| *uint256* | value | not indexed |


---
# Ownable


## *function* owner

Ownable.owner() `view` `8da5cb5b`





## *function* transferOwnership

Ownable.transferOwnership(newOwner) `nonpayable` `f2fde38b`

> Allows the current owner to transfer control of the contract to a newOwner.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | newOwner | The address to transfer ownership to. |


## *event* OwnershipTransferred

Ownable.OwnershipTransferred(previousOwner, newOwner) `8be0079c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | previousOwner | indexed |
| *address* | newOwner | indexed |


---
# TransactionOwner


## *function* addTransaction

TransactionOwner.addTransaction(_sender, _data) `nonpayable` `126e19be`

> Adds a new transaction to the contract

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the sender of the transaction |
| *bytes* | _data | the data in the transaction |


## *function* status

TransactionOwner.status() `view` `200d2ed2`





## *function* getTotalTransactionCount

TransactionOwner.getTotalTransactionCount() `view` `4a97b1b5`

> Gets the total transactions sent to this contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getStatus

TransactionOwner.getStatus() `view` `4e69d560`

> Gets the status of the contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* getTransactionCountFromSender

TransactionOwner.getTransactionCountFromSender(_sender) `view` `53c70c98`

> Gets the amount of transactions a sender has sent

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the sender to check |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getTransactionTimeFromSenderAtIndex

TransactionOwner.getTransactionTimeFromSenderAtIndex(_sender, _index) `view` `7402ab45`

> Gets the timestamp of a transaction from a specific sender at a position

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the sender to check |
| *uint256* | _index | poiner |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getAllUniqueTransactionSender

TransactionOwner.getAllUniqueTransactionSender() `view` `86d79921`

> Gets all addresses that sent transactions to the contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address[]* |  | undefined |

## *function* switchStatus

TransactionOwner.switchStatus() `nonpayable` `945e461d`

> Switches the status of the contract




## *function* getTransactionTimeAtIndex

TransactionOwner.getTransactionTimeAtIndex(_index) `view` `94917a42`

> Gets transaction timestamp at a index

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _index | pointer to check |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* transactions

TransactionOwner.transactions() `view` `9ace38c2`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *function* getTransactionSenderAtIndex

TransactionOwner.getTransactionSenderAtIndex(_index) `view` `ad437f17`

> Gets a sender address at an index from the sender list

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _index | the pointer |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *function* transactionSender

TransactionOwner.transactionSender() `view` `b4df21a8`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* totalTransactions

TransactionOwner.totalTransactions() `view` `b9a60038`





## *function* getTransactionDataAtIndex

TransactionOwner.getTransactionDataAtIndex(_index) `view` `c5b3a70e`

> Gets transaction data at a index

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _index | pointer to check |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bytes* |  | undefined |

## *function* getTransactionDataFromSenderAtIndex

TransactionOwner.getTransactionDataFromSenderAtIndex(_sender, _index) `view` `e4a0646e`

> Gets the data of a transaction from a specific sender at a position

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the sender to check |
| *uint256* | _index | poiner |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bytes* |  | undefined |
## *event* NewStatus

TransactionOwner.NewStatus(status) `af0a4d7c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint8* | status | not indexed |

## *event* NewTransaction

TransactionOwner.NewTransaction(sender, data, time) `ac19b069`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | sender | not indexed |
| *bytes* | data | not indexed |
| *uint256* | time | not indexed |


---
# Transport


## *function* getBalance

Transport.getBalance() `view` `12065fe0`

> Gets token balance of the contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* addTransaction

Transport.addTransaction(_sender, _data) `nonpayable` `126e19be`

> Adds a new transaction to the contract

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the sender of the transaction |
| *bytes* | _data | the data in the transaction |


## *function* totalSupply

Transport.totalSupply() `view` `18160ddd`

> Gets the total supply



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* status

Transport.status() `view` `200d2ed2`





## *function* getStartCoordinates

Transport.getStartCoordinates() `view` `204559d4`

> Gets the starting coordinates of the transport



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *string* |  | undefined |
| *string* |  | undefined |

## *function* addHarvest

Transport.addHarvest(_harvest) `nonpayable` `33bbca0d`

> Adds a harvest to a transport

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _harvest | address of a harvest |


## *function* getTotalTransactionCount

Transport.getTotalTransactionCount() `view` `4a97b1b5`

> Gets the total transactions sent to this contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getStatus

Transport.getStatus() `view` `4e69d560`

> Gets the status of the contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* getTransactionCountFromSender

Transport.getTransactionCountFromSender(_sender) `view` `53c70c98`

> Gets the amount of transactions a sender has sent

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the sender to check |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* balanceOf

Transport.balanceOf(who) `view` `70a08231`

> Gets the balance of an account

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | who | undefined |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getTransactionTimeFromSenderAtIndex

Transport.getTransactionTimeFromSenderAtIndex(_sender, _index) `view` `7402ab45`

> Gets the timestamp of a transaction from a specific sender at a position

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the sender to check |
| *uint256* | _index | poiner |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getAllUniqueTransactionSender

Transport.getAllUniqueTransactionSender() `view` `86d79921`

> Gets all addresses that sent transactions to the contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address[]* |  | undefined |

## *function* owner

Transport.owner() `view` `8da5cb5b`





## *function* switchStatus

Transport.switchStatus() `nonpayable` `945e461d`

> Switches the status of the contract




## *function* getTransactionTimeAtIndex

Transport.getTransactionTimeAtIndex(_index) `view` `94917a42`

> Gets transaction timestamp at a index

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _index | pointer to check |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* transactions

Transport.transactions() `view` `9ace38c2`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *function* tokenAddress

Transport.tokenAddress() `view` `9d76ea58`

> Gets the ERC20 address



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *function* setStartCoordinates

Transport.setStartCoordinates(_latitude, _longitude) `nonpayable` `9f0810dc`

> Sets the starting coordinates of the transport

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | _latitude | Location latitude |
| *string* | _longitude | Location longitude |


## *function* transfer

Transport.transfer(to, value) `nonpayable` `a9059cbb`

> Overloading the default transfer function to check if account is empty 

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | to | address of the receiver |
| *uint256* | value | the amount to transfer |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* getID

Transport.getID() `view` `ab9dbd07`

> Gets the ID of the transport



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getTransactionSenderAtIndex

Transport.getTransactionSenderAtIndex(_index) `view` `ad437f17`

> Gets a sender address at an index from the sender list

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _index | the pointer |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *function* transactionSender

Transport.transactionSender() `view` `b4df21a8`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* totalTransactions

Transport.totalTransactions() `view` `b9a60038`





## *function* getTransactionDataAtIndex

Transport.getTransactionDataAtIndex(_index) `view` `c5b3a70e`

> Gets transaction data at a index

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _index | pointer to check |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bytes* |  | undefined |

## *function* setEndCoordinates

Transport.setEndCoordinates(_latitude, _longitude) `nonpayable` `cb209a73`

> Sets the end coordinates of the transport

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | _latitude | Location latitude |
| *string* | _longitude | Location longitude |


## *function* createdAt

Transport.createdAt() `view` `cf09e0d0`





## *function* finish

Transport.finish() `nonpayable` `d56b2889`

> Finished the transport and disables transactions to it




## *function* getTransactionDataFromSenderAtIndex

Transport.getTransactionDataFromSenderAtIndex(_sender, _index) `view` `e4a0646e`

> Gets the data of a transaction from a specific sender at a position

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the sender to check |
| *uint256* | _index | poiner |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bytes* |  | undefined |

## *function* transferOwnership

Transport.transferOwnership(newOwner) `nonpayable` `f2fde38b`

> Allows the current owner to transfer control of the contract to a newOwner.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | newOwner | The address to transfer ownership to. |


## *event* Transfer

Transport.Transfer(from, to, value) `ddf252ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | indexed |
| *address* | to | indexed |
| *uint256* | value | not indexed |

## *event* OwnershipTransferred

Transport.OwnershipTransferred(previousOwner, newOwner) `8be0079c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | previousOwner | indexed |
| *address* | newOwner | indexed |

## *event* NewStatus

Transport.NewStatus(status) `af0a4d7c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint8* | status | not indexed |

## *event* NewTransaction

Transport.NewTransaction(sender, data, time) `ac19b069`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | sender | not indexed |
| *bytes* | data | not indexed |
| *uint256* | time | not indexed |


---