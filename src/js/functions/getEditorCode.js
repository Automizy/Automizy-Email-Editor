define([
    "core"
], function () {
    $AEE.getEditorCode = function () {
        var $document = $AEE.elements.$document.clone();
        $document.find('.aee-block-handle').remove();
        $document.find('*').removeAttr('id data-mce-style spellcheck mce-content-body data-mce-href mce-edit-focus');
        //$document.find('.aee-block-handle').remove();
        return $document[0].outerHTML;
    };
});