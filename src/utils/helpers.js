

export const  capitalize = (string, a) => {
    let stringValue = limitStr(string, 20);
    let tempstr = stringValue.toLowerCase();
    if (a == false || a == undefined)
        return tempstr.replace(tempstr[0], tempstr[0].toUpperCase());
    else {
        return tempstr.split(" ").map(function (i) { return i[0].toUpperCase() + i.substring(1) }).join(" ");
    }
}

export const limitStr = (text, count) => {
    return text.slice(0, count) + (text.length > count ? "..." : "");
}

export const getUserLocalStorage = () => {
    const user = localStorage.getItem('chatapp');
    if(user) return JSON.parse(user);
    else return null
}

export const setUserLocalStorage = (data) => {
    localStorage.setItem('chatapp', JSON.stringify(data))
}

export const removeUserLocalStorage = () => {
    localStorage.removeItem('chatapp');
}

export const updateSocketID = (socket_id) => {
    const user = localStorage.getItem('chatapp');
    const update = JSON.parse(user);
    update['socket_id'] = socket_id;
    localStorage.setItem('chatapp', JSON.stringify(update));
}


