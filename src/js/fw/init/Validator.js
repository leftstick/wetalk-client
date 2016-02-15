/**
 *  Validate the features is loaded correctly
 *
 *
 *  @author  Howard.Zuo
 *  @date    Feb 15, 2016
 *
 */
'use strict';
var InitBase = require('lib/InitBase');
var pluck = require('lib/Pluck');

class Initializer extends InitBase{
    constructor(features, app){
        super(features, app);
    }

    execute(){
        if (!this.features || this.features.length === 0){
            console.warn('No features loaded');
            return;
        }

        var modNames = pluck(this.features, 'export').sort();
        for (var i = 0; i < modNames.length - 1; i++){
            if (modNames[i] === modNames[i + 1]){
                throw new Error('Duplicated Module: [ ' + modNames[i] + ' ], you have to specify another name');
            }
        }
    }
}

module.exports = Initializer;
