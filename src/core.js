define([], function () {
    window.AutomizyGlobalZIndex = window.AutomizyGlobalZIndex || 2000;
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
            links:[],
            config:{
                dir:'.',
                url:'http://developers.automizy.com/automizyemaileditor',
                imageUploadApiUrl:'https://api.automizy.com/images',
                imageGalleryApiUrl:'https://api.automizy.com/images',
                emailPreviewApiUrl:'https://api.automizy.com/email-preview'
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

    return $AEE;
});