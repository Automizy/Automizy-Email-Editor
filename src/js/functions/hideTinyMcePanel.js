define([
    "core"
], function () {
    $AEE.hideTinyMcePanel = function () {
        $('.mce-floatpanel').hide();
        $(document.activeElement).blur();
        window.getSelection().removeAllRanges();
    };
});