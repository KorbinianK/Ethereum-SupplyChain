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
* [ProcessHandler](#processhandler)
  * [addFromTransport](#function-addfromtransport)
  * [setTokenAddress](#function-settokenaddress)
  * [getTransportFromProduction](#function-gettransportfromproduction)
  * [getProductions](#function-getproductions)
  * [newProduction](#function-newproduction)
  * [currentProduction](#function-currentproduction)
  * [transportHandler](#function-transporthandler)
  * [setTransportHandler](#function-settransporthandler)
  * [transportBalance](#function-transportbalance)
  * [owner](#function-owner)
  * [grapeToken](#function-grapetoken)
  * [addAllFromTransport](#function-addallfromtransport)
  * [currentTransport](#function-currenttransport)
  * [transferOwnership](#function-transferownership)
  * [getProduction](#function-getproduction)
  * [NewProduction](#event-newproduction)
  * [OwnershipTransferred](#event-ownershiptransferred)
* [Production](#production)
  * [getBalance](#function-getbalance)
  * [addTransaction](#function-addtransaction)
  * [totalSupply](#function-totalsupply)
  * [status](#function-status)
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
  * [transfer](#function-transfer)
  * [getID](#function-getid)
  * [getTransactionSenderAtIndex](#function-gettransactionsenderatindex)
  * [transactionSender](#function-transactionsender)
  * [totalTransactions](#function-totaltransactions)
  * [getTransactionDataAtIndex](#function-gettransactiondataatindex)
  * [createdAt](#function-createdat)
  * [getTransactionDataFromSenderAtIndex](#function-gettransactiondatafromsenderatindex)
  * [transferOwnership](#function-transferownership)
  * [Transfer](#event-transfer)
  * [OwnershipTransferred](#event-ownershiptransferred)
  * [NewStatus](#event-newstatus)
  * [NewTransaction](#event-newtransaction)
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
# ProcessHandler


## *function* addFromTransport

ProcessHandler.addFromTransport(_transport, _production, _value) `nonpayable` `2499888e`

> Adds part of a transport to a production

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _transport | address of the transport |
| *address* | _production | address of the production |
| *uint256* | _value | unit256 the value to transfer |


## *function* setTokenAddress

ProcessHandler.setTokenAddress(_tokenAddress) `nonpayable` `26a4e8d2`

> Updates the token address

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _tokenAddress | the address of the token |


## *function* getTransportFromProduction

ProcessHandler.getTransportFromProduction(_production) `view` `2838ee5d`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _production | undefined |


## *function* getProductions

ProcessHandler.getProductions() `view` `35481190`

> Gets all productions



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address[]* |  | undefined |

## *function* newProduction

ProcessHandler.newProduction() `nonpayable` `49412796`

> Creates a new production contract and retieves the entire balance from the current transport



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* | success | undefined |

## *function* currentProduction

ProcessHandler.currentProduction() `view` `4e229288`

> Gets the latest production



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *function* transportHandler

ProcessHandler.transportHandler() `view` `59169755`





## *function* setTransportHandler

ProcessHandler.setTransportHandler(_transportHandler) `nonpayable` `7d045a44`

> Updates the transportHandler address

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _transportHandler | the address of the handler |


## *function* transportBalance

ProcessHandler.transportBalance(transportAddress) `view` `88b38512`

> Low level call function to retrieve the balance of a harvest from the transport handler

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | transportAddress | address of the transport |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _balance | undefined |

## *function* owner

ProcessHandler.owner() `view` `8da5cb5b`





## *function* grapeToken

ProcessHandler.grapeToken() `view` `982d68de`





## *function* addAllFromTransport

ProcessHandler.addAllFromTransport(_production) `nonpayable` `ce62a1b8`

> Adds the entire last transport to a production

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _production | address of the transport |


## *function* currentTransport

ProcessHandler.currentTransport() `view` `e1d55fff`

> Low level call function to retrieve the current active harvest from the transport handler



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | current | undefined |

## *function* transferOwnership

ProcessHandler.transferOwnership(newOwner) `nonpayable` `f2fde38b`

> Allows the current owner to transfer control of the contract to a newOwner.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | newOwner | The address to transfer ownership to. |


## *function* getProduction

ProcessHandler.getProduction(_id) `view` `f850d012`

> Gets a specific transport

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _id | the id to retrieve |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *event* NewProduction

ProcessHandler.NewProduction(id, production, creator) `4a35cef8`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | id | not indexed |
| *address* | production | not indexed |
| *address* | creator | not indexed |

## *event* OwnershipTransferred

ProcessHandler.OwnershipTransferred(previousOwner, newOwner) `8be0079c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | previousOwner | indexed |
| *address* | newOwner | indexed |


---
# Production


## *function* getBalance

Production.getBalance() `view` `12065fe0`

> Gets token balance of the contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* addTransaction

Production.addTransaction(_sender, _data) `nonpayable` `126e19be`

> Adds a new transaction to the contract

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the sender of the transaction |
| *bytes* | _data | the data in the transaction |


## *function* totalSupply

Production.totalSupply() `view` `18160ddd`

> Gets the total supply



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* status

Production.status() `view` `200d2ed2`





## *function* getTotalTransactionCount

Production.getTotalTransactionCount() `view` `4a97b1b5`

> Gets the total transactions sent to this contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getStatus

Production.getStatus() `view` `4e69d560`

> Gets the status of the contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* getTransactionCountFromSender

Production.getTransactionCountFromSender(_sender) `view` `53c70c98`

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

Production.balanceOf(who) `view` `70a08231`

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

Production.getTransactionTimeFromSenderAtIndex(_sender, _index) `view` `7402ab45`

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

Production.getAllUniqueTransactionSender() `view` `86d79921`

> Gets all addresses that sent transactions to the contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address[]* |  | undefined |

## *function* owner

Production.owner() `view` `8da5cb5b`





## *function* switchStatus

Production.switchStatus() `nonpayable` `945e461d`

> Switches the status of the contract




## *function* getTransactionTimeAtIndex

Production.getTransactionTimeAtIndex(_index) `view` `94917a42`

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

Production.transactions() `view` `9ace38c2`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *function* tokenAddress

Production.tokenAddress() `view` `9d76ea58`

> Gets the ERC20 address



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *function* transfer

Production.transfer(to, value) `nonpayable` `a9059cbb`

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

## *function* getID

Production.getID() `view` `ab9dbd07`

> Gets the ID of the production



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getTransactionSenderAtIndex

Production.getTransactionSenderAtIndex(_index) `view` `ad437f17`

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

Production.transactionSender() `view` `b4df21a8`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* totalTransactions

Production.totalTransactions() `view` `b9a60038`





## *function* getTransactionDataAtIndex

Production.getTransactionDataAtIndex(_index) `view` `c5b3a70e`

> Gets transaction data at a index

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _index | pointer to check |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bytes* |  | undefined |

## *function* createdAt

Production.createdAt() `view` `cf09e0d0`





## *function* getTransactionDataFromSenderAtIndex

Production.getTransactionDataFromSenderAtIndex(_sender, _index) `view` `e4a0646e`

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

Production.transferOwnership(newOwner) `nonpayable` `f2fde38b`

> Allows the current owner to transfer control of the contract to a newOwner.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | newOwner | The address to transfer ownership to. |


## *event* Transfer

Production.Transfer(from, to, value) `ddf252ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | indexed |
| *address* | to | indexed |
| *uint256* | value | not indexed |

## *event* OwnershipTransferred

Production.OwnershipTransferred(previousOwner, newOwner) `8be0079c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | previousOwner | indexed |
| *address* | newOwner | indexed |

## *event* NewStatus

Production.NewStatus(status) `af0a4d7c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint8* | status | not indexed |

## *event* NewTransaction

Production.NewTransaction(sender, data, time) `ac19b069`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | sender | not indexed |
| *bytes* | data | not indexed |
| *uint256* | time | not indexed |


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