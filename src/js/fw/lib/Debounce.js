/**
 *  Returns a function, that, as long as it continues to be invoked, will not
 *  be triggered. The function will be called after it stops being called for
 *  N milliseconds. If `immediate` is passed, trigger the function on the
 *  leading edge, instead of the trailing
 *
 *  @author  Howard.Zuo
 *  @date    Oct 23, 2015
 *
**/
'use strict';
var debounce = function(func, wait, immediate){
    var timeout;
    return function(){
        var ctx = this,
            args = arguments;
        var later = function(){
            timeout = null;
            if (!immediate){
                func.apply(ctx, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow){
            func.apply(ctx, args);
        }
    };
};

module.exports = debounce;
