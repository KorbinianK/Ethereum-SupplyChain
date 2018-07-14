# Harvests.js Documentation

## Functions

<dl>
<dt><a href="#weightInput">weightInput(harvest, field, amount)</a></dt>
<dd><p>Function to mint the Grape Token when the grapes are weighed</p>
</dd>
<dt><a href="#loadDropdown">loadDropdown()</a></dt>
<dd><p>Fills the dropdown with the harvests</p>
</dd>
<dt><a href="#newHarvest">newHarvest()</a></dt>
<dd><p>Creates a new Harvest</p>
</dd>
<dt><a href="#openHarvest">openHarvest(address)</a></dt>
<dd><p>Opens the details modal and adds the data of a single harvest</p>
</dd>
<dt><a href="#harvestAsJson">harvestAsJson(address)</a> ⇒ <code>json</code></dt>
<dd><p>Loads the Harvest details and creates a JSON file with it</p>
</dd>
<dt><a href="#getFieldName">getFieldName(address)</a> ⇒ <code>name</code></dt>
<dd><p>Loads the name of a field</p>
</dd>
</dl>

<a name="weightInput"></a>

## weightInput(harvest, field, amount)
Function to mint the Grape Token when the grapes are weighed

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| harvest | <code>\*</code> | Address of the harvest the grapes should be added to |
| field | <code>\*</code> | Address of the vineyard, the grapes origin from |
| amount | <code>\*</code> | The weight of the grapes |

<a name="loadDropdown"></a>

## loadDropdown()
Fills the dropdown with the harvests

**Kind**: global function
<a name="newHarvest"></a>

## newHarvest()
Creates a new Harvest

**Kind**: global function
<a name="openHarvest"></a>

## openHarvest(address)
Opens the details modal and adds the data of a single harvest

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the harvest |

<a name="harvestAsJson"></a>

## harvestAsJson(address) ⇒ <code>json</code>
Loads the Harvest details and creates a JSON file with it

**Kind**: global function
**Returns**: <code>json</code> - JSON file

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | The address of the harvest contract |

<a name="getFieldName"></a>

## getFieldName(address) ⇒ <code>name</code>
Loads the name of a field

**Kind**: global function
**Returns**: <code>name</code> - String of the name

| Param | Type | Description |
| --- | --- | --- |
| address | <code>\*</code> | Address of the field contract |