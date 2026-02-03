const { v4: uuidv4 } = require('uuid');
const sessionIdToUserMap = new Map();

function setUser(user){
    const sessionId = uuidv4();
    sessionIdToUserMap.set(sessionId, user);
    return sessionId;
}

function getUser(sessionId){
    return sessionIdToUserMap.get(sessionId);
}

function deleteUser(sessionId){
    return sessionIdToUserMap.delete(sessionId);
}

module.exports={ setUser, getUser, deleteUser };