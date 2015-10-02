define([
    "core"
], function () {
    $AEE.getExtension = function (fname) {
        return fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2);
    };
});