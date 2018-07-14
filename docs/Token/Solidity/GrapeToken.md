* [BasicToken](#basictoken)
  * [totalSupply](#function-totalsupply)
  * [balanceOf](#function-balanceof)
  * [transfer](#function-transfer)
  * [Transfer](#event-transfer)
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
* [GrapeToken](#grapetoken)
  * [mintingFinished](#function-mintingfinished)
  * [name](#function-name)
  * [approve](#function-approve)
  * [totalSupply](#function-totalsupply)
  * [transferFrom](#function-transferfrom)
  * [removeMinter](#function-removeminter)
  * [decimals](#function-decimals)
  * [mint](#function-mint)
  * [decreaseApproval](#function-decreaseapproval)
  * [balanceOf](#function-balanceof)
  * [finishMinting](#function-finishminting)
  * [symbol](#function-symbol)
  * [addMinter](#function-addminter)
  * [transfer](#function-transfer)
  * [increaseApproval](#function-increaseapproval)
  * [allowance](#function-allowance)
  * [Mint](#event-mint)
  * [MintFinished](#event-mintfinished)
  * [Approval](#event-approval)
  * [Transfer](#event-transfer)
* [MintableToken](#mintabletoken)
  * [mintingFinished](#function-mintingfinished)
  * [approve](#function-approve)
  * [totalSupply](#function-totalsupply)
  * [transferFrom](#function-transferfrom)
  * [removeMinter](#function-removeminter)
  * [mint](#function-mint)
  * [decreaseApproval](#function-decreaseapproval)
  * [balanceOf](#function-balanceof)
  * [finishMinting](#function-finishminting)
  * [addMinter](#function-addminter)
  * [transfer](#function-transfer)
  * [increaseApproval](#function-increaseapproval)
  * [allowance](#function-allowance)
  * [Mint](#event-mint)
  * [MintFinished](#event-mintfinished)
  * [Approval](#event-approval)
  * [Transfer](#event-transfer)
* [SafeMath](#safemath)
* [StandardToken](#standardtoken)
  * [approve](#function-approve)
  * [totalSupply](#function-totalsupply)
  * [transferFrom](#function-transferfrom)
  * [decreaseApproval](#function-decreaseapproval)
  * [balanceOf](#function-balanceof)
  * [transfer](#function-transfer)
  * [increaseApproval](#function-increaseapproval)
  * [allowance](#function-allowance)
  * [Approval](#event-approval)
  * [Transfer](#event-transfer)

# BasicToken


## *function* totalSupply

BasicToken.totalSupply() `view` `18160ddd`

> total number of tokens in existence




## *function* balanceOf

BasicToken.balanceOf(_owner) `view` `70a08231`

> Gets the balance of the specified address.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _owner | The address to query the the balance of. |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* transfer

BasicToken.transfer(_to, _value) `nonpayable` `a9059cbb`

> transfer token for a specified address

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _to | The address to transfer to. |
| *uint256* | _value | The amount to be transferred. |

## *event* Transfer

BasicToken.Transfer(from, to, value) `ddf252ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | indexed |
| *address* | to | indexed |
| *uint256* | value | not indexed |


---
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
# GrapeToken


## *function* mintingFinished

GrapeToken.mintingFinished() `view` `05d2035b`





## *function* name

GrapeToken.name() `view` `06fdde03`





## *function* approve

GrapeToken.approve(_spender, _value) `nonpayable` `095ea7b3`

> Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.   * Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _spender | The address which will spend the funds. |
| *uint256* | _value | The amount of tokens to be spent. |


## *function* totalSupply

GrapeToken.totalSupply() `view` `18160ddd`

> total number of tokens in existence




## *function* transferFrom

GrapeToken.transferFrom(_from, _to, _value) `nonpayable` `23b872dd`

> Transfer tokens from one address to another

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _from | address The address which you want to send tokens from |
| *address* | _to | address The address which you want to transfer to |
| *uint256* | _value | uint256 the amount of tokens to be transferred |


## *function* removeMinter

GrapeToken.removeMinter(_toRemove) `nonpayable` `3092afd5`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _toRemove | undefined |


## *function* decimals

GrapeToken.decimals() `view` `313ce567`





## *function* mint

GrapeToken.mint(_to, _amount) `nonpayable` `40c10f19`

> Function to mint tokens

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _to | The address that will receive the minted tokens. |
| *uint256* | _amount | The amount of tokens to mint. |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* decreaseApproval

GrapeToken.decreaseApproval(_spender, _subtractedValue) `nonpayable` `66188463`

> Decrease the amount of tokens that an owner allowed to a spender.   * approve should be called when allowed[_spender] == 0. To decrement allowed value is better to use this function to avoid 2 calls (and wait until the first transaction is mined) From MonolithDAO Token.sol

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _spender | The address which will spend the funds. |
| *uint256* | _subtractedValue | The amount of tokens to decrease the allowance by. |


## *function* balanceOf

GrapeToken.balanceOf(_owner) `view` `70a08231`

> Gets the balance of the specified address.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _owner | The address to query the the balance of. |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* finishMinting

GrapeToken.finishMinting() `nonpayable` `7d64bcb4`

> Function to stop minting new tokens.



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* symbol

GrapeToken.symbol() `view` `95d89b41`





## *function* addMinter

GrapeToken.addMinter(_toAdd) `nonpayable` `983b2d56`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _toAdd | undefined |


## *function* transfer

GrapeToken.transfer(_to, _value) `nonpayable` `a9059cbb`

> transfer token for a specified address

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _to | The address to transfer to. |
| *uint256* | _value | The amount to be transferred. |


## *function* increaseApproval

GrapeToken.increaseApproval(_spender, _addedValue) `nonpayable` `d73dd623`

> Increase the amount of tokens that an owner allowed to a spender.   * approve should be called when allowed[_spender] == 0. To increment allowed value is better to use this function to avoid 2 calls (and wait until the first transaction is mined) From MonolithDAO Token.sol

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _spender | The address which will spend the funds. |
| *uint256* | _addedValue | The amount of tokens to increase the allowance by. |


## *function* allowance

GrapeToken.allowance(_owner, _spender) `view` `dd62ed3e`

> Function to check the amount of tokens that an owner allowed to a spender.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _owner | address The address which owns the funds. |
| *address* | _spender | address The address which will spend the funds. |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |
## *event* Mint

GrapeToken.Mint(to, amount) `0f6798a5`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | to | indexed |
| *uint256* | amount | not indexed |

## *event* MintFinished

GrapeToken.MintFinished() `ae5184fb`



## *event* Approval

GrapeToken.Approval(owner, spender, value) `8c5be1e5`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | indexed |
| *address* | spender | indexed |
| *uint256* | value | not indexed |

## *event* Transfer

GrapeToken.Transfer(from, to, value) `ddf252ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | indexed |
| *address* | to | indexed |
| *uint256* | value | not indexed |


---
# MintableToken


## *function* mintingFinished

MintableToken.mintingFinished() `view` `05d2035b`





## *function* approve

MintableToken.approve(_spender, _value) `nonpayable` `095ea7b3`

> Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.   * Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _spender | The address which will spend the funds. |
| *uint256* | _value | The amount of tokens to be spent. |


## *function* totalSupply

MintableToken.totalSupply() `view` `18160ddd`

> total number of tokens in existence




## *function* transferFrom

MintableToken.transferFrom(_from, _to, _value) `nonpayable` `23b872dd`

> Transfer tokens from one address to another

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _from | address The address which you want to send tokens from |
| *address* | _to | address The address which you want to transfer to |
| *uint256* | _value | uint256 the amount of tokens to be transferred |


## *function* removeMinter

MintableToken.removeMinter(_toRemove) `nonpayable` `3092afd5`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _toRemove | undefined |


## *function* mint

MintableToken.mint(_to, _amount) `nonpayable` `40c10f19`

> Function to mint tokens

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _to | The address that will receive the minted tokens. |
| *uint256* | _amount | The amount of tokens to mint. |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* decreaseApproval

MintableToken.decreaseApproval(_spender, _subtractedValue) `nonpayable` `66188463`

> Decrease the amount of tokens that an owner allowed to a spender.   * approve should be called when allowed[_spender] == 0. To decrement allowed value is better to use this function to avoid 2 calls (and wait until the first transaction is mined) From MonolithDAO Token.sol

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _spender | The address which will spend the funds. |
| *uint256* | _subtractedValue | The amount of tokens to decrease the allowance by. |


## *function* balanceOf

MintableToken.balanceOf(_owner) `view` `70a08231`

> Gets the balance of the specified address.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _owner | The address to query the the balance of. |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* finishMinting

MintableToken.finishMinting() `nonpayable` `7d64bcb4`

> Function to stop minting new tokens.



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *bool* |  | undefined |

## *function* addMinter

MintableToken.addMinter(_toAdd) `nonpayable` `983b2d56`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _toAdd | undefined |


## *function* transfer

MintableToken.transfer(_to, _value) `nonpayable` `a9059cbb`

> transfer token for a specified address

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _to | The address to transfer to. |
| *uint256* | _value | The amount to be transferred. |


## *function* increaseApproval

MintableToken.increaseApproval(_spender, _addedValue) `nonpayable` `d73dd623`

> Increase the amount of tokens that an owner allowed to a spender.   * approve should be called when allowed[_spender] == 0. To increment allowed value is better to use this function to avoid 2 calls (and wait until the first transaction is mined) From MonolithDAO Token.sol

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _spender | The address which will spend the funds. |
| *uint256* | _addedValue | The amount of tokens to increase the allowance by. |


## *function* allowance

MintableToken.allowance(_owner, _spender) `view` `dd62ed3e`

> Function to check the amount of tokens that an owner allowed to a spender.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _owner | address The address which owns the funds. |
| *address* | _spender | address The address which will spend the funds. |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *event* Mint

MintableToken.Mint(to, amount) `0f6798a5`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | to | indexed |
| *uint256* | amount | not indexed |

## *event* MintFinished

MintableToken.MintFinished() `ae5184fb`



## *event* Approval

MintableToken.Approval(owner, spender, value) `8c5be1e5`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | indexed |
| *address* | spender | indexed |
| *uint256* | value | not indexed |

## *event* Transfer

MintableToken.Transfer(from, to, value) `ddf252ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | indexed |
| *address* | to | indexed |
| *uint256* | value | not indexed |


---
# SafeMath


---
# StandardToken


## *function* approve

StandardToken.approve(_spender, _value) `nonpayable` `095ea7b3`

> Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.   * Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _spender | The address which will spend the funds. |
| *uint256* | _value | The amount of tokens to be spent. |


## *function* totalSupply

StandardToken.totalSupply() `view` `18160ddd`

> total number of tokens in existence




## *function* transferFrom

StandardToken.transferFrom(_from, _to, _value) `nonpayable` `23b872dd`

> Transfer tokens from one address to another

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _from | address The address which you want to send tokens from |
| *address* | _to | address The address which you want to transfer to |
| *uint256* | _value | uint256 the amount of tokens to be transferred |


## *function* decreaseApproval

StandardToken.decreaseApproval(_spender, _subtractedValue) `nonpayable` `66188463`

> Decrease the amount of tokens that an owner allowed to a spender.   * approve should be called when allowed[_spender] == 0. To decrement allowed value is better to use this function to avoid 2 calls (and wait until the first transaction is mined) From MonolithDAO Token.sol

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _spender | The address which will spend the funds. |
| *uint256* | _subtractedValue | The amount of tokens to decrease the allowance by. |


## *function* balanceOf

StandardToken.balanceOf(_owner) `view` `70a08231`

> Gets the balance of the specified address.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _owner | The address to query the the balance of. |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* transfer

StandardToken.transfer(_to, _value) `nonpayable` `a9059cbb`

> transfer token for a specified address

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _to | The address to transfer to. |
| *uint256* | _value | The amount to be transferred. |


## *function* increaseApproval

StandardToken.increaseApproval(_spender, _addedValue) `nonpayable` `d73dd623`

> Increase the amount of tokens that an owner allowed to a spender.   * approve should be called when allowed[_spender] == 0. To increment allowed value is better to use this function to avoid 2 calls (and wait until the first transaction is mined) From MonolithDAO Token.sol

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _spender | The address which will spend the funds. |
| *uint256* | _addedValue | The amount of tokens to increase the allowance by. |


## *function* allowance

StandardToken.allowance(_owner, _spender) `view` `dd62ed3e`

> Function to check the amount of tokens that an owner allowed to a spender.

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _owner | address The address which owns the funds. |
| *address* | _spender | address The address which will spend the funds. |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |
## *event* Approval

StandardToken.Approval(owner, spender, value) `8c5be1e5`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | owner | indexed |
| *address* | spender | indexed |
| *uint256* | value | not indexed |

## *event* Transfer

StandardToken.Transfer(from, to, value) `ddf252ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | from | indexed |
| *address* | to | indexed |
| *uint256* | value | not indexed |


---