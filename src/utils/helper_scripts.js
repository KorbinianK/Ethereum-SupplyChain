


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