* [Field](#field)
  * [setPicture](#function-setpicture)
  * [harvest](#function-harvest)
  * [permissionedAccounts](#function-permissionedaccounts)
  * [addTransaction](#function-addtransaction)
  * [getType](#function-gettype)
  * [getName](#function-getname)
  * [status](#function-status)
  * [getHarvestPointers](#function-getharvestpointers)
  * [transactionsSinceLastHarvest](#function-transactionssincelastharvest)
  * [getPermissionedAccounts](#function-getpermissionedaccounts)
  * [getTotalTransactionCount](#function-gettotaltransactioncount)
  * [getStatus](#function-getstatus)
  * [isHarvestable](#function-isharvestable)
  * [getTransactionCountFromSender](#function-gettransactioncountfromsender)
  * [getLongitude](#function-getlongitude)
  * [isField](#function-isfield)
  * [getTransactionTimeFromSenderAtIndex](#function-gettransactiontimefromsenderatindex)
  * [getHarvestPointer](#function-getharvestpointer)
  * [harvestPointer](#function-harvestpointer)
  * [getAllUniqueTransactionSender](#function-getalluniquetransactionsender)
  * [switchStatus](#function-switchstatus)
  * [getTransactionTimeAtIndex](#function-gettransactiontimeatindex)
  * [setType](#function-settype)
  * [transactions](#function-transactions)
  * [getTransactionSenderAtIndex](#function-gettransactionsenderatindex)
  * [getLatitude](#function-getlatitude)
  * [getLastHarvest](#function-getlastharvest)
  * [transactionSender](#function-transactionsender)
  * [totalTransactions](#function-totaltransactions)
  * [isAllowed](#function-isallowed)
  * [stage](#function-stage)
  * [getPreviousHarvest](#function-getpreviousharvest)
  * [setName](#function-setname)
  * [getTransactionDataAtIndex](#function-gettransactiondataatindex)
  * [getAllDetails](#function-getalldetails)
  * [getLocation](#function-getlocation)
  * [createdAt](#function-createdat)
  * [addPermissionedAccount](#function-addpermissionedaccount)
  * [getTransactionDataFromSenderAtIndex](#function-gettransactiondatafromsenderatindex)
  * [previousHarvest](#function-previousharvest)
  * [nextStage](#function-nextstage)
  * [lastHarvest](#function-lastharvest)
  * [setLocation](#function-setlocation)
  * [NewStage](#event-newstage)
  * [NewStatus](#event-newstatus)
  * [NewTransaction](#event-newtransaction)

# Field


## *function* setPicture

Field.setPicture(_picture) `nonpayable` `00075f84`

> Updates the picture of the vineyard

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *bytes* | _picture | the new picture 
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* harvest

Field.harvest(_harvest) `nonpayable` `0e5c011e`

> Harvests the current vineyard and moves it to the harvested stage

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _harvest | Address of the harvest contract that called this function
 |


## *function* permissionedAccounts

Field.permissionedAccounts() `view` `101dfbc6`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *function* addTransaction

Field.addTransaction(_sender, _data) `nonpayable` `126e19be`

> Overloading the transaction function from TransactionOwner to check if a field can accept data

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | Address of the sender
 |
| *bytes* | _data | data attached to the transaction
 |


## *function* getType

Field.getType() `view` `15dae03e`

> Gets the type of grapes of the vineyard



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *string* |  | undefined |

## *function* getName

Field.getName() `view` `17d7de7c`

> Gets the name of the vineyard



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *string* |  | undefined |

## *function* status

Field.status() `view` `200d2ed2`





## *function* getHarvestPointers

Field.getHarvestPointers(_harvest) `view` `317b823d`

> Gets the transaction pointer for a harvest

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _harvest | Address of a harvest contract
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |
| *uint256* |  | undefined |

## *function* transactionsSinceLastHarvest

Field.transactionsSinceLastHarvest() `view` `3acf8b2a`

> Gets the number of transactions since last harvest



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getPermissionedAccounts

Field.getPermissionedAccounts(_index) `view` `43c89ed2`

> Gets a permissioned account with an index from the array

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _index | Index to retrieve from the array
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *function* getTotalTransactionCount

Field.getTotalTransactionCount() `view` `4a97b1b5`

> Gets the total transactions sent to this contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getStatus

Field.getStatus() `view` `4e69d560`

> Gets the status of the contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* isHarvestable

Field.isHarvestable() `view` `5175171e`

> Check if the current field is harvestable



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* getTransactionCountFromSender

Field.getTransactionCountFromSender(_sender) `view` `53c70c98`

> Gets the amount of transactions a sender has sent

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the sender to check
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getLongitude

Field.getLongitude() `view` `55b72f38`

> Gets the longitude of the vineyard



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *string* |  | undefined |

## *function* isField

Field.isField() `pure` `6e9f88e3`

> Check if the current contract is a field contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* getTransactionTimeFromSenderAtIndex

Field.getTransactionTimeFromSenderAtIndex(_sender, _index) `view` `7402ab45`

> Gets the timestamp of a transaction from a specific sender at a position

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the sender to check
 |
| *uint256* | _index | poiner
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* getHarvestPointer

Field.getHarvestPointer(_harvest) `view` `7c157727`

> Gets the transaction count at the time of harvest

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _harvest | Address of a harvest contract
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* harvestPointer

Field.harvestPointer() `view` `7d8f9b18`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* getAllUniqueTransactionSender

Field.getAllUniqueTransactionSender() `view` `86d79921`

> Gets all addresses that sent transactions to the contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address[]* |  | undefined |

## *function* switchStatus

Field.switchStatus() `nonpayable` `945e461d`

> Switches the status of the contract




## *function* getTransactionTimeAtIndex

Field.getTransactionTimeAtIndex(_index) `view` `94917a42`

> Gets transaction timestamp at a index

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _index | pointer to check
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* setType

Field.setType(_type) `nonpayable` `96282ba3`

> Updates the grape type of the vineyard

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | _type | the new type of grapes 
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* transactions

Field.transactions() `view` `9ace38c2`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *function* getTransactionSenderAtIndex

Field.getTransactionSenderAtIndex(_index) `view` `ad437f17`

> Gets a sender address at an index from the sender list

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _index | the pointer
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *function* getLatitude

Field.getLatitude() `view` `ae7b6bd9`

> Gets the latitude of the vineyard



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *string* |  | undefined |

## *function* getLastHarvest

Field.getLastHarvest() `view` `affd80b0`

> Gets the address of the last harvest



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *function* transactionSender

Field.transactionSender() `view` `b4df21a8`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* totalTransactions

Field.totalTransactions() `view` `b9a60038`





## *function* isAllowed

Field.isAllowed(_sender) `view` `babcc539`

> Function to check if an address is allowed to interact

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | Address of the address to check
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* stage

Field.stage() `view` `c040e6b8`





## *function* getPreviousHarvest

Field.getPreviousHarvest(_current) `view` `c1a6d05b`

> Gets the previous harvest in relation to another

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _current | Address of a current harvest contract
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *function* setName

Field.setName(_name) `nonpayable` `c47f0027`

> Updates the name of the vineyard

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | _name | the new name 
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* getTransactionDataAtIndex

Field.getTransactionDataAtIndex(_index) `view` `c5b3a70e`

> Gets transaction data at a index

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _index | pointer to check
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bytes* |  | undefined |

## *function* getAllDetails

Field.getAllDetails() `view` `ccc5d7d4`

> Gets all information from the contract



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint8* |  | undefined |
| *address* |  | undefined |
| *address[]* |  | undefined |
| *string* |  | undefined |
| *bytes* |  | undefined |
| *string* |  | undefined |
| *string* |  | undefined |
| *uint256* |  | undefined |
| *address[]* |  | undefined |

## *function* getLocation

Field.getLocation() `view` `ce2ce3fc`

> Gets the location of the vineyard



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *string* |  | undefined |
| *string* |  | undefined |

## *function* createdAt

Field.createdAt() `view` `cf09e0d0`





## *function* addPermissionedAccount

Field.addPermissionedAccount(_sender) `nonpayable` `e29e3b24`

> Adds an address to the permissioend accounts array

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the address to add
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* getTransactionDataFromSenderAtIndex

Field.getTransactionDataFromSenderAtIndex(_sender, _index) `view` `e4a0646e`

> Gets the data of a transaction from a specific sender at a position

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _sender | the sender to check
 |
| *uint256* | _index | poiner
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bytes* |  | undefined |

## *function* previousHarvest

Field.previousHarvest() `view` `ea8e0b95`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |


## *function* nextStage

Field.nextStage() `nonpayable` `ee3743ab`

> Moves the contract to the next stage




## *function* lastHarvest

Field.lastHarvest() `view` `f1a392da`





## *function* setLocation

Field.setLocation(_lat, _long) `nonpayable` `fe586c9a`

> Updates the location of the vineyard

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | _lat | the new latitude
 |
| *string* | _long | the new longitude
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *event* NewStage

Field.NewStage(stage) `2813df25`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint8* | stage | not indexed |

## *event* NewStatus

Field.NewStatus(status) `af0a4d7c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *uint8* | status | not indexed |

## *event* NewTransaction

Field.NewTransaction(sender, data, time) `ac19b069`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | sender | not indexed |
| *bytes* | data | not indexed |
| *uint256* | time | not indexed |


---