
## Functions

<dl>
<dt><a href="#updateName">updateName(address, newName)</a> ⇒ <code>openField(address)</code></dt>
<dd><p>Updates the name of a vineyard</p>
</dd>
<dt><a href="#changeStatus">changeStatus(address)</a> ⇒</dt>
<dd><p>Changes the status of the vineyard</p>
</dd>
<dt><a href="#loadSingleField">loadSingleField(address, [bottle])</a> ⇒ <code>loadSingleFieldCard(json)</code></dt>
<dd><p>Loads a single field card</p>
</dd>
<dt><a href="#getFieldCards">getFieldCards()</a></dt>
<dd><p>Adds a single Fieldcard to the page</p>
</dd>
<dt><a href="#getAllFields">getAllFields()</a> ⇒ <code>fields</code></dt>
<dd><p>Creates an array of the field JSON files</p>
</dd>
<dt><a href="#getHarvestableFields">getHarvestableFields()</a> ⇒ <code>dropdown</code></dt>
<dd><p>Fetches all fields that are harvestable as dropdown options for the harvest</p>
</dd>
<dt><a href="#loadSingleFieldCard">loadSingleFieldCard(json)</a> ⇒ <code>fieldcard</code></dt>
<dd><p>Loads a single Field as card object</p>
</dd>
<dt><a href="#checkHarvestable">checkHarvestable(address)</a> ⇒</dt>
<dd><p>Checks if a vineyard is harvestable</p>
</dd>
<dt><a href="#fieldAsJson">fieldAsJson(address)</a> ⇒ <code>json</code></dt>
<dd><p>Builds a JSON file with data from the vineyard</p>
</dd>
<dt><a href="#getGrapeType">getGrapeType(field_instance)</a> ⇒ <code>type</code></dt>
<dd><p>Fetches the Grape type from the contract</p>
</dd>
<dt><a href="#getTransactionsSinceHarvest">getTransactionsSinceHarvest(address)</a> ⇒ <code>json</code></dt>
<dd><p>Gets all transactions since the previous harvest</p>
</dd>
<dt><a href="#newField">newField()</a></dt>
<dd><p>Creates a new Field contract</p>
</dd>
<dt><a href="#openField">openField(address)</a> ⇒ <code>field</code></dt>
<dd><p>Opends the Details Modal and loads a single field</p>
</dd>
<dt><a href="#addFieldTransaction">addFieldTransaction(address)</a></dt>
<dd><p>Adds a transaction to the contract</p>
</dd>
<dt><a href="#getTotalTransactionCount">getTotalTransactionCount(address)</a> ⇒</dt>
<dd><p>Gets the total amount of transactions to this contract</p>
</dd>
<dt><a href="#getTransactionSenderAtIndex">getTransactionSenderAtIndex(address, index)</a> ⇒ <code>sender</code></dt>
<dd><p>Gets a specific transaction sender with an index</p>
</dd>
<dt><a href="#getTransactionDataAtIndex">getTransactionDataAtIndex(address, index)</a> ⇒ <code>data</code></dt>
<dd><p>Gets the data of a transaction with an index</p>
</dd>
<dt><a href="#getTransactionTimeAtIndex">getTransactionTimeAtIndex(address, index)</a> ⇒ <code>time</code></dt>
<dd><p>Gets the timestamp of a transaction</p>
</dd>
<dt><a href="#getAllTransactions">getAllTransactions(address)</a> ⇒ <code>json</code></dt>
<dd><p>Gets all transactions made to this contract</p>
</dd>
</dl>

<a name="updateName"></a>

## updateName(address, newName) ⇒ <code>openField(address)</code>
Updates the name of a vineyard

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the field contract |
| newName | <code>\*</code> | The new name |

<a name="changeStatus"></a>

## changeStatus(address) ⇒
Changes the status of the vineyard

**Kind**: global function
**Returns**: boolean

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Contract address of the field |

<a name="loadSingleField"></a>

## loadSingleField(address, [bottle]) ⇒ <code>loadSingleFieldCard(json)</code>
Loads a single field card

**Kind**: global function

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>\*</code> |  | Address of the field contract |
| [bottle] | <code>boolean</code> | <code>false</code> |  |

<a name="getFieldCards"></a>

## getFieldCards()
Adds a single Fieldcard to the page

**Kind**: global function
<a name="getAllFields"></a>

## getAllFields() ⇒ <code>fields</code>
Creates an array of the field JSON files

**Kind**: global function
**Returns**: <code>fields</code> - Array of JSON
<a name="getHarvestableFields"></a>

## getHarvestableFields() ⇒ <code>dropdown</code>
Fetches all fields that are harvestable as dropdown options for the harvest

**Kind**: global function
**Returns**: <code>dropdown</code> - Dropdown of the fields
<a name="loadSingleFieldCard"></a>

## loadSingleFieldCard(json) ⇒ <code>fieldcard</code>
Loads a single Field as card object

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| json | <code>\*</code> | JSON data to add to the template |

<a name="checkHarvestable"></a>

## checkHarvestable(address) ⇒
Checks if a vineyard is harvestable

**Kind**: global function
**Returns**: boolean

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the field contract |

<a name="fieldAsJson"></a>

## fieldAsJson(address) ⇒ <code>json</code>
Builds a JSON file with data from the vineyard

**Kind**: global function
**Returns**: <code>json</code> - JSON data

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the contract |

<a name="getGrapeType"></a>

## getGrapeType(field_instance) ⇒ <code>type</code>
Fetches the Grape type from the contract

**Kind**: global function
**Returns**: <code>type</code> - Grape Type as String

| Param | Type | Description |
| --- | --- | --- |
| field_instance | <code>\*</code> | Contract instance |

<a name="getTransactionsSinceHarvest"></a>

## getTransactionsSinceHarvest(address) ⇒ <code>json</code>
Gets all transactions since the previous harvest

**Kind**: global function
**Returns**: <code>json</code> - JSON of the transactions

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the field contract |

<a name="newField"></a>

## newField()
Creates a new Field contract

**Kind**: global function
<a name="openField"></a>

## openField(address) ⇒ <code>field</code>
Opends the Details Modal and loads a single field

**Kind**: global function
**Returns**: <code>field</code> - JSON of the field data

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the field to load |

<a name="addFieldTransaction"></a>

## addFieldTransaction(address)
Adds a transaction to the contract

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the contract |

<a name="getTotalTransactionCount"></a>

## getTotalTransactionCount(address) ⇒
Gets the total amount of transactions to this contract

**Kind**: global function
**Returns**: Integer value of the total transactions

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the contract |

<a name="getTransactionSenderAtIndex"></a>

## getTransactionSenderAtIndex(address, index) ⇒ <code>sender</code>
Gets a specific transaction sender with an index

**Kind**: global function
**Returns**: <code>sender</code> - Address of the sender

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the contract |
| index | <code>\*</code> | Integer value as index |

<a name="getTransactionDataAtIndex"></a>

## getTransactionDataAtIndex(address, index) ⇒ <code>data</code>
Gets the data of a transaction with an index

**Kind**: global function
**Returns**: <code>data</code> - String of the data

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the contract |
| index | <code>\*</code> | Integer value as index |

<a name="getTransactionTimeAtIndex"></a>

## getTransactionTimeAtIndex(address, index) ⇒ <code>time</code>
Gets the timestamp of a transaction

**Kind**: global function
**Returns**: <code>time</code> - Readable timestamp

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the contract |
| index | <code>\*</code> | Integer value as index |

<a name="getAllTransactions"></a>

## getAllTransactions(address) ⇒ <code>json</code>
Gets all transactions made to this contract

**Kind**: global function
**Returns**: <code>json</code> - Json file with all transactions

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the contract |