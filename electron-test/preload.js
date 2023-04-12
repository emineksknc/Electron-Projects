const testMgr = require('./models/testmgr');
const {contextBridge} = require('electron');

const getNames = () => {
    return testMgr.getNames();
}

const addName = (name) => {
    return testMgr.addName(name);
}

const deleteName = (id) =>{
    return testMgr.deleteName(id)
}

contextBridge.exposeInMainWorld("api", {
    getNames: getNames,
    addName: addName,
    deleteName:deleteName
})