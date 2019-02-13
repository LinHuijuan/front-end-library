var session = {};
var cache = {};

session.set = function(userId, obj) {
    var sessionId = Math.random();
    if (!cache[sessionId]) {
        cache[sessionId] = {};
    }

    cache[sessionId].content = obj;
};

session.get = function(sessionId) {
    return cache[sessionId] && cache[sessionId].content;
};