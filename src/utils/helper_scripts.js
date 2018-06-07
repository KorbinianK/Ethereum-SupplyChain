


export async function getAccount() {
    console.log("getAccounts()");
    let accounts = await web3.eth.getAccounts();
    return accounts[0];
}

export async function fetchTemplate(url){
    var template =
        $.get(url, function (r) {
            template = r;
        });
    return await template;
}