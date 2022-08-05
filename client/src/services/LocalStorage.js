
export function addItem(localName, token){
    window.localStorage.setItem(localName, token);
}

export function removeItem(token){
    window.localStorage.removeItem(token);
}

export function getItem(token){
    return window.localStorage.getItem(token);
}

export function setUserId(localName, user){
    window.localStorage.setItem(localName, user)
}

export function getUserId(localName){
    return window.localStorage.getItem(localName)
}

export function removeUser(localName){
    window.localStorage.removeItem(localName);
}

export function getVoiture(localName){
    return window.localStorage.getItem(localName);
}

export function setVoiture(localName, img){
    window.localStorage.setItem(localName, img);
}