# Transports.js Documentation

## Functions

<dl>
<dt><a href="#newTransport">newTransport()</a></dt>
<dd><p>Creates a new Transport</p>
</dd>
<dt><a href="#getCurrentTransport">getCurrentTransport()</a> ⇒ <code>transport</code></dt>
<dd><p>Returns the current Transport (the last created -&gt; showcase function)</p>
</dd>
<dt><a href="#currentHarvest">currentHarvest()</a> ⇒ <code>harvest</code></dt>
<dd><p>Returns the current Harvest (the latest created -&gt; showcase function)</p>
</dd>
<dt><a href="#getHarvest">getHarvest(transport)</a> ⇒ <code>harvest</code></dt>
<dd><p>Gets the added Harvest from the transport</p>
</dd>
<dt><a href="#getID">getID(transport)</a> ⇒ <code>ID</code></dt>
<dd><p>Returns the ID of a transport</p>
</dd>
<dt><a href="#transportAsJson">transportAsJson(transport)</a> ⇒ <code>json</code></dt>
<dd><p>Builds a JSON file with data from the transport</p>
</dd>
<dt><a href="#loadSingleTransportCard">loadSingleTransportCard(transport)</a> ⇒ <code>output</code></dt>
<dd><p>Loads a single transport card template and data</p>
</dd>
<dt><a href="#addTransportCard">addTransportCard(transport)</a></dt>
<dd><p>Adds a transport card to the DOM</p>
</dd>
<dt><a href="#getTransportCards">getTransportCards()</a></dt>
<dd><p>Adds all transports as cards to the DOM</p>
</dd>
<dt><a href="#openTransport">openTransport(address)</a></dt>
<dd><p>Opends the Details Modal and loads a single transport</p>
</dd>
<dt><a href="#addData">addData(transport)</a> ⇒ <code>openTransport(transport)</code></dt>
<dd><p>Adds a Data transaction to a transport</p>
</dd>
<dt><a href="#addHarvest">addHarvest(transport)</a></dt>
<dd><p>Adds Grapes from a Harvest to a transport</p>
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

<a name="newTransport"></a>

## newTransport()
Creates a new Transport

**Kind**: global function
<a name="getCurrentTransport"></a>

## getCurrentTransport() ⇒ <code>transport</code>
Returns the current Transport (the last created -> showcase function)

**Kind**: global function
**Returns**: <code>transport</code> - The address of the transport contract
<a name="currentHarvest"></a>

## currentHarvest() ⇒ <code>harvest</code>
Returns the current Harvest (the latest created -> showcase function)

**Kind**: global function
**Returns**: <code>harvest</code> - The address of the harvest contract
<a name="getHarvest"></a>

## getHarvest(transport) ⇒ <code>harvest</code>
Gets the added Harvest from the transport

**Kind**: global function
**Returns**: <code>harvest</code> - Address of the harvest

| Param | Type | Description |
| --- | --- | --- |
| transport | <code>\*</code> | Address of the transport |

<a name="getID"></a>

## getID(transport) ⇒ <code>ID</code>
Returns the ID of a transport

**Kind**: global function
**Returns**: <code>ID</code> - The ID

| Param | Type | Description |
| --- | --- | --- |
| transport | <code>\*</code> | Address of the transport contract |

<a name="transportAsJson"></a>

## transportAsJson(transport) ⇒ <code>json</code>
Builds a JSON file with data from the transport

**Kind**: global function
**Returns**: <code>json</code> - JSON data

| Param | Type | Description |
| --- | --- | --- |
| transport | <code>\*</code> | Address of the contract |

<a name="loadSingleTransportCard"></a>

## loadSingleTransportCard(transport) ⇒ <code>output</code>
Loads a single transport card template and data

**Kind**: global function
**Returns**: <code>output</code> - The transport as card element

| Param | Type | Description |
| --- | --- | --- |
| transport | <code>\*</code> | Address of the transport contract |

<a name="addTransportCard"></a>

## addTransportCard(transport)
Adds a transport card to the DOM

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| transport | <code>\*</code> | Address of the transport contract |

<a name="getTransportCards"></a>

## getTransportCards()
Adds all transports as cards to the DOM

**Kind**: global function
<a name="openTransport"></a>

## openTransport(address)
Opends the Details Modal and loads a single transport

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the transport to load |

<a name="addData"></a>

## addData(transport) ⇒ <code>openTransport(transport)</code>
Adds a Data transaction to a transport

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| transport | <code>\*</code> | The address of the transport |

<a name="addHarvest"></a>

## addHarvest(transport)
Adds Grapes from a Harvest to a transport

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| transport | <code>\*</code> | The address of the transport contract |

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