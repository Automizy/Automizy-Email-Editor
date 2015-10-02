define([
    "core"
], function () {
    $AEE.screenSize = function(){
        return {
            x: window.innerWidth || document.documentElement.clientWidth || d.getElementsByTagName('body')[0].clientWidth,
            y: window.innerHeight || document.documentElement.clientHeight || d.getElementsByTagName('body')[0].clientHeight
        };
    };
});