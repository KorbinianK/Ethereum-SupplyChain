import * as helper from "./helper_scripts";

export async function getTotalTransactionCount(instance){
    const account = await helper.getAccount();
    const txCount = await instance.getTotalTransactionCount({
        from: account
    }).then((res) => {
            return res;
        }
    );
    
    if (await txCount.toString() == undefined) {
        return 0;
    }
    return await txCount.toString();
}


export async function getTransactionTimeAtIndex(instance, index) {
    const account = await helper.getAccount();
    const time = await instance.getTransactionTimeAtIndex(index, { from: account }).then(result => {return result});
    return await time.toString();
}



export async function getTransactionSenderAtIndex(instance, index) {
    const account = await helper.getAccount();
    const sender = await instance.getTransactionSenderAtIndex(index, {from:account}).then(result => {return result});
    return await sender;
}

export async function getTransactionDataAtIndex(instance, index) {
    const account = await helper.getAccount();
    const data = await instance.getTransactionDataAtIndex(index, {from:account}).then(result => {return result});
    return await data;
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
    const res = await instance.addTransaction(
        sender,
        hexData, {
            from: account,
            gas: 400000
        }
    ).then(result => {
        return result;
    });
    return res;
}


export async function getBalance(instance) {
    const account = await helper.getAccount();
    const balance = await instance.getBalance({from:account}).then(result =>{
        console.log("token balance",result.toString());
        return result.toString();
    });
    return await balance;
}


export async function getStatus(instance) {
    const account = await helper.getAccount();
    const status = await instance.getStatus({
        from: account
    }).then(result => {
        console.log("status", result.toString());
        return result.toString();
    });
    return await status;
}

