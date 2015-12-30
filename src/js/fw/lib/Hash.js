/**
 *  Generate hash code from string
 *
 *  @author  Howard.Zuo
 *  @date    Dec 30, 2015
 *
 */
'use strict';

var isString = require('angular').isString;

module.exports = function(src) {
    var hash = 0, i, chr, len;
    if (!isString(src)) {
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
