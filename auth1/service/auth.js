const sessionIdToUserMap = new Map();

function setUser(sessionId, userId) {
    sessionIdToUserMap.set(sessionId, userId);
}

function getUser(sessionId) {
    return sessionIdToUserMap.get(sessionId);
}

function deleteUser(sessionId) {
    sessionIdToUserMap.delete(sessionId);
}

module.exports = {
    setUser,
    getUser,
    deleteUser
};
