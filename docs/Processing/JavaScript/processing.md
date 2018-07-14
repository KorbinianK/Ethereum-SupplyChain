# Processing.js Documentation

## Functions

<dl>
<dt><a href="#newProduction">newProduction()</a></dt>
<dd><p>Creates a new prodction and adds the card to the UI</p>
</dd>
<dt><a href="#getProductionCards">getProductionCards()</a></dt>
<dd><p>Loads all production cards</p>
</dd>
<dt><a href="#loadSingleProductionCard">loadSingleProductionCard(address, [bottle])</a> ⇒</dt>
<dd><p>Loads a single production as card</p>
</dd>
<dt><a href="#addProductionCard">addProductionCard(address)</a></dt>
<dd><p>Adds a card to the UI</p>
</dd>
<dt><a href="#openProduction">openProduction(address)</a></dt>
<dd><p>Opens the details modal and loads the production details</p>
</dd>
<dt><a href="#addTransport">addTransport(production)</a></dt>
<dd><p>Function to add a delivery from a transport to a production</p>
</dd>
<dt><a href="#finish">finish(production)</a></dt>
<dd><p>Finishes the production and disables the UI for it</p>
</dd>
<dt><a href="#productionAsJson">productionAsJson(production)</a> ⇒</dt>
<dd><p>Loads the production details and creates a JSON file with it</p>
</dd>
<dt><a href="#getHarvestsFromTransport">getHarvestsFromTransport(transport)</a> ⇒</dt>
<dd><p>Retrieves all harvests from a transport</p>
</dd>
<dt><a href="#currentTransport">currentTransport()</a> ⇒</dt>
<dd><p>Fetches the current Transport</p>
</dd>
<dt><a href="#addData">addData(production)</a></dt>
<dd><p>Adds a transaction to a production</p>
</dd>
<dt><a href="#getTotalTransactionCount">getTotalTransactionCount(address)</a> ⇒</dt>
<dd><p>Gets the total amount of transactions to this contract</p>
</dd>
<dt><a href="#getTransactionSenderAtIndex">getTransactionSenderAtIndex(address, index)</a> ⇒ <code>string</code></dt>
<dd><p>Gets a specific transaction sender with an index</p>
</dd>
<dt><a href="#getTransactionDataAtIndex">getTransactionDataAtIndex(address, index)</a> ⇒ <code>string</code></dt>
<dd><p>Gets the data of a transaction with an index</p>
</dd>
<dt><a href="#getTransactionTimeAtIndex">getTransactionTimeAtIndex(address, index)</a> ⇒ <code>string</code></dt>
<dd><p>Gets the timestamp of a transaction</p>
</dd>
<dt><a href="#getAllTransactions">getAllTransactions(address)</a> ⇒ <code>string</code></dt>
<dd><p>Gets all transactions made to this contract</p>
</dd>
</dl>

<a name="newProduction"></a>

## newProduction()
Creates a new prodction and adds the card to the UI

**Kind**: global function
<a name="getProductionCards"></a>

## getProductionCards()
Loads all production cards

**Kind**: global function
<a name="loadSingleProductionCard"></a>

## loadSingleProductionCard(address, [bottle]) ⇒
Loads a single production as card

**Kind**: global function
**Returns**: The HTML object of the card

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| address | <code>string</code> |  | The address of the production |
| [bottle] | <code>boolean</code> | <code>false</code> | Check if the card is loaded for the bottle section |

<a name="addProductionCard"></a>

## addProductionCard(address)
Adds a card to the UI

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the production |

<a name="openProduction"></a>

## openProduction(address)
Opens the details modal and loads the production details

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | The address of the production |

<a name="addTransport"></a>

## addTransport(production)
Function to add a delivery from a transport to a production

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| production | <code>\*</code> | Address of the production |

<a name="finish"></a>

## finish(production)
Finishes the production and disables the UI for it

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| production | <code>\*</code> | Address of the production |

<a name="productionAsJson"></a>

## productionAsJson(production) ⇒
Loads the production details and creates a JSON file with it

**Kind**: global function
**Returns**: The JSON file

| Param | Type | Description |
| --- | --- | --- |
| production | <code>string</code> | Address of the production |

<a name="getHarvestsFromTransport"></a>

## getHarvestsFromTransport(transport) ⇒
Retrieves all harvests from a transport

**Kind**: global function
**Returns**: Addresses of the harvests

| Param | Type | Description |
| --- | --- | --- |
| transport | <code>string</code> | Address of a transport |

<a name="currentTransport"></a>

## currentTransport() ⇒
Fetches the current Transport

**Kind**: global function
**Returns**: Address of the transport
<a name="addData"></a>

## addData(production)
Adds a transaction to a production

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| production | <code>string</code> | Address of the production |

<a name="getTotalTransactionCount"></a>

## getTotalTransactionCount(address) ⇒
Gets the total amount of transactions to this contract

**Kind**: global function
**Returns**: Integer value of the total transactions

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Address of the contract |

<a name="getTransactionSenderAtIndex"></a>

## getTransactionSenderAtIndex(address, index) ⇒ <code>string</code>
Gets a specific transaction sender with an index

**Kind**: global function
**Returns**: <code>string</code> - Address of the sender

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Address of the contract |
| index | <code>string</code> | Integer value as index |

<a name="getTransactionDataAtIndex"></a>

## getTransactionDataAtIndex(address, index) ⇒ <code>string</code>
Gets the data of a transaction with an index

**Kind**: global function
**Returns**: <code>string</code> - string of the data

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Address of the contract |
| index | <code>Integer</code> | Integer value as index |

<a name="getTransactionTimeAtIndex"></a>

## getTransactionTimeAtIndex(address, index) ⇒ <code>string</code>
Gets the timestamp of a transaction

**Kind**: global function
**Returns**: <code>string</code> - Readable timestamp

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Address of the contract |
| index | <code>Integer</code> | Integer value as index |

<a name="getAllTransactions"></a>

## getAllTransactions(address) ⇒ <code>string</code>
Gets all transactions made to this contract

**Kind**: global function
**Returns**: <code>string</code> - Json file with all transactions

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Address of the contract |
