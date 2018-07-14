* [ERC20](#erc20)
  * [approve](#function-approve)
  * [totalSupply](#function-totalsupply)
  * [transferFrom](#function-transferfrom)
  * [balanceOf](#function-balanceof)
  * [transfer](#function-transfer)
  * [allowance](#function-allowance)
  * [Approval](#event-approval)
  * [Transfer](#event-transfer)
* [ERC20Basic](#erc20basic)
  * [totalSupply](#function-totalsupply)
  * [balanceOf](#function-balanceof)
  * [transfer](#function-transfer)
  * [Transfer](#event-transfer)

# ERC20


## *function* approve

ERC20.approve(spender, value) `nonpayable` `095ea7b3`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | spender | undefined |
| *uint256* | value | undefined |


## *function* totalSupply

ERC20.totalSupply() `view` `18160ddd`





## *function* transferFrom

ERC20.transferFrom(from, to, value) `nonpayable` `23b872dd`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | undefined |
| *address* | to | undefined |
| *uint256* | value | undefined |


## *function* balanceOf

ERC20.balanceOf(who) `view` `70a08231`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | who | undefined |


## *function* transfer

ERC20.transfer(to, value) `nonpayable` `a9059cbb`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | to | undefined |
| *uint256* | value | undefined |


## *function* allowance

ERC20.allowance(owner, spender) `view` `dd62ed3e`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | undefined |
| *address* | spender | undefined |

## *event* Approval

ERC20.Approval(owner, spender, value) `8c5be1e5`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | indexed |
| *address* | spender | indexed |
| *uint256* | value | not indexed |

## *event* Transfer

ERC20.Transfer(from, to, value) `ddf252ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | indexed |
| *address* | to | indexed |
| *uint256* | value | not indexed |


---
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