# Bottle.js Documentation

## Functions

<dl>
<dt><a href="#getBottleDetails">getBottleDetails()</a></dt>
<dd><p>Function that loads the cards for the final bottle</p>
</dd>
<dt><a href="#loadProductionCard">loadProductionCard(production)</a></dt>
<dd><p>Adds the production card to the UI</p>
</dd>
<dt><a href="#loadTransportCards">loadTransportCards(transports)</a></dt>
<dd><p>Function to load all transports as cards</p>
</dd>
<dt><a href="#loadFieldCards">loadFieldCards(fields)</a></dt>
<dd><p>Loads all fields as cards</p>
</dd>
<dt><a href="#getTransportFromProduction">getTransportFromProduction(production)</a> ⇒</dt>
<dd><p>Retrieves a transport included in a production</p>
</dd>
<dt><a href="#empty">empty(id)</a></dt>
<dd><p>Empties a bottle column by an id</p>
</dd>
<dt><a href="#getTransportsFromProduction">getTransportsFromProduction(production)</a> ⇒</dt>
<dd><p>Retrieves all Transports from a production</p>
</dd>
<dt><a href="#getFieldsFromHarvest">getFieldsFromHarvest(harvest)</a> ⇒</dt>
<dd><p>Retrieves all field addresses included in a harvest</p>
</dd>
<dt><a href="#getHarvestFromTransport">getHarvestFromTransport(transport)</a> ⇒</dt>
<dd><p>Retrieves the harvest address from a transport</p>
</dd>
<dt><a href="#getHarvestsFromTransport">getHarvestsFromTransport(transport)</a> ⇒</dt>
<dd><p>Retrieves all harvest addresses included in a transport</p>
</dd>
<dt><a href="#currentProduction">currentProduction()</a> ⇒</dt>
<dd><p>Gets the Address of the current production</p>
</dd>
</dl>

<a name="getBottleDetails"></a>

## getBottleDetails()
Function that loads the cards for the final bottle

**Kind**: global function
<a name="loadProductionCard"></a>

## loadProductionCard(production)
Adds the production card to the UI

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| production | <code>\*</code> | Address of the production |

<a name="loadTransportCards"></a>

## loadTransportCards(transports)
Function to load all transports as cards

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| transports | <code>\*</code> | The tranpsort addresses |

<a name="loadFieldCards"></a>

## loadFieldCards(fields)
Loads all fields as cards

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| fields | <code>\*</code> | Addresses of the fields |

<a name="getTransportFromProduction"></a>

## getTransportFromProduction(production) ⇒
Retrieves a transport included in a production

**Kind**: global function
**Returns**: The address of the transport

| Param | Type | Description |
| --- | --- | --- |
| production | <code>\*</code> | Address of the production |

<a name="empty"></a>

## empty(id)
Empties a bottle column by an id

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| id | <code>\*</code> | The ID of the column |

<a name="getTransportsFromProduction"></a>

## getTransportsFromProduction(production) ⇒
Retrieves all Transports from a production

**Kind**: global function
**Returns**: Addresses of the transports

| Param | Type | Description |
| --- | --- | --- |
| production | <code>\*</code> | Address of a production |

<a name="getFieldsFromHarvest"></a>

## getFieldsFromHarvest(harvest) ⇒
Retrieves all field addresses included in a harvest

**Kind**: global function
**Returns**: Addresses of the fields

| Param | Type | Description |
| --- | --- | --- |
| harvest | <code>\*</code> | Address of the harvest |

<a name="getHarvestFromTransport"></a>

## getHarvestFromTransport(transport) ⇒
Retrieves the harvest address from a transport

**Kind**: global function
**Returns**: Address of the Harvest

| Param | Type | Description |
| --- | --- | --- |
| transport | <code>\*</code> | The address of the transport |

<a name="getHarvestsFromTransport"></a>

## getHarvestsFromTransport(transport) ⇒
Retrieves all harvest addresses included in a transport

**Kind**: global function
**Returns**: Addresses of the harvests

| Param | Type | Description |
| --- | --- | --- |
| transport | <code>\*</code> | Address of the transport |

<a name="currentProduction"></a>

## currentProduction() ⇒
Gets the Address of the current production

**Kind**: global function
**Returns**: Address of the production