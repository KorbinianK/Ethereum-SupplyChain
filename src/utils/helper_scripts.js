


export async function getAccount() {
    let accounts = await web3.eth.getAccounts();
    console.log("account:",accounts[0]);
    
    return web3.utils.toChecksumAddress(accounts[0]);
}

export async function fetchTemplate(url){
    var template =
        $.get(url, function (r) {
            template = r;
        });
    return await template;
}

export async function doDummyTransaction(account, instance){
    var dummyData = web3.utils.stringToHex("foo");
    const res = await instance.addTransaction(
        account,
        dummyData,
        { from: account }
    ).then(result => {
       return result;
     });
}