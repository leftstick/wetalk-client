'use strict';

module.exports = [
    {
        label: 'Application',
        submenu: [
            {
                label: 'About Application',
                visible: process.platform === 'darwin',
                selector: 'orderFrontStandardAboutPanel:'
            },
            {
                type: 'separator',
                visible: process.platform === 'darwin'
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: function(){
                    if (window.quitApp){
                        window.quitApp();
                    }
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                selector: 'undo:'
            },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                selector: 'redo:'
            },
            {
                type: 'separator'
            },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                selector: 'cut:'
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                selector: 'copy:'
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                selector: 'paste:'
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                selector: 'selectAll:'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                visible: process.env.NODE_ENV === 'dev',
                click: function(item, focusedWindow){
                    if (focusedWindow){
                        focusedWindow.reload();
                    }
                }
            },
            {
                label: 'Toggle Developer Tools',
                visible: process.env.NODE_ENV === 'dev',
                accelerator: (function(){
                    if (process.platform === 'darwin'){
                        return 'Alt+Command+I';
                    }
                    return 'Ctrl+Shift+I';
                }()),
                click: function(item, focusedWindow){
                    if (focusedWindow){
                        focusedWindow.toggleDevTools();
                    }
                }
            },
            {
                label: 'Quit Group',
                accelerator: 'CmdOrCtrl+W',
                click: function(item, focusedWindow){
                    if (window.quitGroup){
                        window.quitGroup();
                    }
                }
            }
        ]
    }
];
