define([
    "core"
], function () {
    $AEE.getTinyMceUserDefinedMenu = function (editor) {
        var arr = [];
        for(var i in $AEE.d.customFields){
            arr.push({
                text: $AEE.d.customFields[i], onclick: (function(i){return function () {
                    editor.insertContent(i);
                }})(i)
            });
        }
        return arr;
    };
});