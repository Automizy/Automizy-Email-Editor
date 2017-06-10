define([
    "core",

    "js/settings/common",
    "js/settings/draggable",
    "js/settings/sortable",

    "js/elements/layout",
    "js/elements/blockTouchController",

    "js/elements/blocks/image",
    "js/elements/blocks/text",
    "js/elements/blocks/title",
    "js/elements/blocks/columns",
    "js/elements/blocks/share",
    "js/elements/blocks/button",
    "js/elements/blocks/gallery",
    "js/elements/blocks/html",

    "js/functions/core/init",
    "js/functions/core/ready",
    "js/functions/core/layoutReady",
    "js/functions/core/runTheFunctions",
    "js/functions/core/loadPlugins",
    "js/functions/core/scriptLoaded",

    "js/functions/events/windowResize",
    "js/functions/events/documentClick",
    "js/functions/events/block",
    "js/functions/events/pan",
    "js/functions/events/dropFiles",

    "js/dialogs/preview",
    "js/dialogs/sendTest",

    "js/addons/jquery/removeStyle",
    "js/addons/jquery/automizyResizable",
    "js/addons/jquery/automizySetUp",

    "js/functions/common",
    "js/functions/getExtension",
    "js/functions/isImageFile",
    "js/functions/styleHtml",
    "js/functions/newBlock",
    "js/functions/getBlock",
    "js/functions/rgbStyleToHex",
    "js/functions/setBlockSettings",
    "js/functions/delay",
    "js/functions/getHtmlCode",
    "js/functions/setEditorCode",
    "js/functions/getEditorCode",
    "js/functions/setLayoutByDisplay",
    "js/functions/screenSize",
    "js/functions/touchable",
    "js/functions/moveBlock",
    "js/functions/getTinyMceBuiltInMenu",
    "js/functions/getTinyMceUserDefinedMenu",
    "js/functions/hideTinyMcePanel",

    "js/modules/bpbm",
    "js/modules/imagePicker"
], function ($AEE) {
    console.log('%c AutomizyEmailEditor loaded! ', 'background: #000000; color: #bada55; font-size:14px');
    return $AEE;
});
