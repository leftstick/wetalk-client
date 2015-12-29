'use strict';

var LoginService = function(http, utils) {

    this.login = function(nickname) {
        return http.post(utils.getApi('/login'), {
            nickname: nickname
        });
    };

};

LoginService.$inject = ['http', 'utils'];

module.exports = LoginService;
