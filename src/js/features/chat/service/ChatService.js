'use strict';

var ChatService = function(http, utils) {

    this.getGroups = function(group) {
        return http.get(utils.getApi('/groups'));
    };

    this.createGroup = function(group) {
        return http.post(utils.getApi('/group'), group);
    };

    this.getUser = function(id) {
        return http.get(utils.getApi('/user/' + id));
    };
};

ChatService.$inject = ['http', 'utils'];

module.exports = ChatService;
