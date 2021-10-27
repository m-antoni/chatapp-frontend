export const  capitalize = (string, a) => {
    var tempstr = string.toLowerCase();
    if (a == false || a == undefined)
        return tempstr.replace(tempstr[0], tempstr[0].toUpperCase());
    else {
        return tempstr.split(" ").map(function (i) { return i[0].toUpperCase() + i.substring(1) }).join(" ");
    }
}


export const userLocalStorage = (type, data = null) => {
    const LS = localStorage;
    switch (type) {
        case 'get':
            // LS.getItem('chat-ls') || null;
            break;
        case 'set':
            LS.setItem('chat-ls', JSON.stringify(data))
            break;
        default:
            LS.removeItem('chat-ls')
            break;
    }
}