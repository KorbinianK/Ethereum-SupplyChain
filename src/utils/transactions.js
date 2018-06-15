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

export async function getTransactionSenderAtIndex(instance, index) {
    const sender = await instance.getTransactionSenderAtIndex(index)
    .then( async(res) =>{
        return res;
    });
    return await sender;
}

export async function getTransactionDataAtIndex(instance, index) {
    const data = await instance.getTransactionDataAtIndex(index)
        .then(async (res) => {
            return res;
        });
    return await data;
}

export async function doDummyTransaction(account, instance) {
    var dummyData = web3.utils.stringToHex("foo");
    const res = await instance.addTransaction(
        account,
        dummyData, {
            from: account
        }
    ).then(result => {
        return result;
    });
    return res;
}