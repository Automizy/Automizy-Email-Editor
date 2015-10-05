define([
    "core"
], function () {
    $AEE.getTinyMceBuiltInMenu = function (editor) {
        var arr = [];
        for(var i in $AEE.d.systemFields){
            arr.push({
                text: $AEE.d.systemFields[i], onclick: (function(i){return function() {
                    editor.insertContent(i);
                }})(i)
            });
        }
        return arr;
    };
});