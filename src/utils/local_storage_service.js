function setItem(field, item){
    localStorage.setItem(field, JSON.stringify(item));
}

function getItem(field){
    const result = localStorage.getItem(field);
    if (result) {
        return JSON.parse(result);
    }
    return result;
}

function removeItem(field){
    localStorage.removeItem(field);
}

function clearAll(){
    localStorage.clear();
}

module.exports = {
    setItem,
    getItem,
    removeItem,
    clearAll,
}