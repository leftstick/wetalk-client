/**
 *  Defines the Info Dialog
 *
 *  @author  Howard.Zuo
 *  @date    Feb 15, 2016
 *
 */
'use strict';

var FeatureBase = require('lib/FeatureBase');
var extend = require('angular').extend;

class Feature extends FeatureBase{
    constructor(){
        super('InfoModule');
    }

    beforeStart(){
    }

    infoListener(events, $mdDialog){
        var defaults = {
            title: 'Info',
            content: '',
            event: null,
            okTxt: 'OK',
            onComplete: function(){}
        };

        events.on('info', function(data){
            var opts = extend({ }, defaults, data);

            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(false)
                    .title(opts.title)
                    .content(opts.content)
                    .ok(opts.okTxt)
                    .targetEvent(opts.event)
            )
                .then(opts.onComplete);
        });
    }

    execute(){
        this.infoListener.$inject = ['events', '$mdDialog'];
        this.run(this.infoListener);
    }
}

module.exports = Feature;
