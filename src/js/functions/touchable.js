define([
    "core"
], function () {
    $AEE.touchable = function(){
        return !!('ontouchstart' in window);
    };
});