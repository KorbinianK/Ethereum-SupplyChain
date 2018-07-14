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