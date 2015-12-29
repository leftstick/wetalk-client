/**
 *  Generate hash code from string
 *
 *  @author  Howard.Zuo
 *  @date    Dec 29, 2015
 *
 */
'use strict';

var angular = require('angular');

module.exports = function(src) {
    var hash = 0, i, chr, len;
    if (!angular.isString(src)) {
        return hash;
    }
    if (src.length === 0) {
        return hash;
    }
    for (i = 0, len = src.length; i < len; i++) {
        chr = src.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
