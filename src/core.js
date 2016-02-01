define([], function () {
    window.AutomizyEmailEditor = window.$AEE = new function () {
        var t = this;
        t.dialogs = {};
        t.buttons = {};
        t.inputs = {};
        t.forms = {};
        t.blocks = [];
        t.settings = {};
        t.optione = {};
        t.elements = {};
        t.d = {
            version: '1.0.0',
            defines: {},
            values:{},
            functions:{},
            segments:[],
            config:{
                dir:'.',
                url:'http://developers.automizy.com/automizyemaileditor'
            },
            status:{
                scriptsLength:0,
                loadedScripts:0,
                percent:0
            }
        };
        t.m = {};
        t.default = {};
        t.inited = false;
        t.settingsShowed = false;
        t.scriptLoaded = function(){};
    }();

    $A.registerEvent('AutomizyEmailEditorBlockDragStart');
    $A.registerEvent('AutomizyEmailEditorBlockDragStop');
    $A.registerEvent('AutomizyEmailEditorBlockDragComplete');
    //$A.registerEvent('AutomizyEmailEditorBlockDragDrag');
    $A.registerEvent('AutomizyEmailEditorBlockDragCreate');

    return $AEE;
});