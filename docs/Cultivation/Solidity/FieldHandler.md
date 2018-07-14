* [FieldHandler](#fieldhandler)
  * [activate](#function-activate)
  * [deactivate](#function-deactivate)
  * [getFieldCount](#function-getfieldcount)
  * [currentField](#function-currentfield)
  * [getActiveFields](#function-getactivefields)
  * [getAllFields](#function-getallfields)
  * [newField](#function-newfield)
  * [getFieldAddressAtIndex](#function-getfieldaddressatindex)
  * [NewField](#event-newfield)
  * [StatusChanged](#event-statuschanged)


---
# FieldHandler


## *function* activate

FieldHandler.activate(_fieldAddress) `nonpayable` `1c5a9d9c`

> Adds a field to the active fields array

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _fieldAddress | address of the field
 |


## *function* deactivate

FieldHandler.deactivate(_fieldAddress) `nonpayable` `3ea053eb`

> Removes a field from the active fields array

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _fieldAddress | address of the field
 |


## *function* getFieldCount

FieldHandler.getFieldCount() `view` `5cb07ffe`

> Gets the number of total fields created



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* currentField

FieldHandler.currentField() `view` `601e9e2e`

> Gets the latest field from the active fields array



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *function* getActiveFields

FieldHandler.getActiveFields() `view` `84d25e91`

> Gets all active fields



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address[]* |  | undefined |

## *function* getAllFields

FieldHandler.getAllFields() `view` `92208228`

**re
**

> Gets all fields



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address[]* |  | undefined |

## *function* newField

FieldHandler.newField(_name, _longitude, _latitude, _grapeType) `nonpayable` `d0f950fb`

> Creates a new field contract

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *string* | _name | the name of the vineyard
 |
| *string* | _longitude | longitude of the location
 |
| *string* | _latitude | latitude of the location
 |
| *string* | _grapeType | undefined |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |

## *function* getFieldAddressAtIndex

FieldHandler.getFieldAddressAtIndex(_index) `view` `f685d491`

> Gets a field from the fields array with an index

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _index | the index
 |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |
## *event* NewField

FieldHandler.NewField(field, creator) `6de75c8c`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | field | not indexed |
| *address* | creator | not indexed |

## *event* StatusChanged

FieldHandler.StatusChanged(field, sender) `dde62538`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | field | not indexed |
| *address* | sender | not indexed |


---