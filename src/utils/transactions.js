import * as helper from "./helper_scripts";

export async function getTotalTransactionCount(instance){
    const txCount = await instance.getTotalTransactionCount.call().then((res) => {
            return res;
        }
    );
    if (await txCount.toString() == undefined) {
        return 0;
    }
    return txCount.toString();
}

export async function getTransactionTimeAtIndex(instance, index) {
    const time = await instance.getTransactionTimeAtIndex.call(index).then(result => {return result});
    return time.toString();
}

export async function getTransactionSenderAtIndex(instance, index) {
    const sender = await instance.getTransactionSenderAtIndex.call(index).then(result => {return result});
    return sender;
}

export async function getTransactionDataAtIndex(instance, index) {
    const data = await instance.getTransactionDataAtIndex.call(index).then(result => {return result});
    return data;
}

export async function doDummyTransaction(instance) {
    const account = await helper.getAccount();
    var dummyData = web3.utils.stringToHex("foo");
    const res = await instance.addTransaction(
        account,
        dummyData, {
            from: account,
            gas: 400000
        }
    ).then(result => {
        return result;
    });
    return res;
}

export async function addTransaction(instance,sender,data) {
    const account = await helper.getAccount();
    var hexData = web3.utils.stringToHex(data);
    const receipt = await instance.addTransaction(
        sender,
        hexData, {
            from: account,
            gas: 400000
        }
    ).then(receipt => {
        return receipt;
        }
    ).catch(err => console.error("Cannot add Transaction",err));
    return receipt;
}

export async function getBalance(instance) {
    const balance = await instance.getBalance.call().then(result =>{
        console.log("token balance",result.toString());
        return result.toString();
    }).catch(error =>{console.error("No Balance?",error)});
    return await balance;
}


export async function getStatus(instance) {
    const status = await instance.getStatus.call().then(result => {
        console.log("status", result.toString());
        return result.toString();
    });
    return await status;
}

