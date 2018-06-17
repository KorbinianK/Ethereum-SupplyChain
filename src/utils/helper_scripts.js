


export async function getAccount() {
    let accounts = await web3.eth.getAccounts();
    return web3.utils.toChecksumAddress(accounts[0]);
}

export async function fetchTemplate(url){
    var template =
        $.get(url, function (r) {
            template = r;
        });
    return await template;
}

//based on https://stackoverflow.com/a/30196637
export function objDiff(array1, array2) {
    var resultArray = []

    array2.forEach(function (destObj) {
        var check = array1.some(function (origObj) {
            if (origObj.address == destObj.address) return true
        })
        if (!check) {
            resultArray.push(destObj)
        }
    })

    array1.forEach(function (origObj) {
        var check = array2.some(function (destObj) {
            if (origObj.address == destObj.address) return true
        })
        if (!check) {
            resultArray.push(origObj)
        }
    })

    return resultArray
}


export function makeUnixReadable(timestamp){

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var date = new Date(timestamp * 1000);
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var time = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return time;
}