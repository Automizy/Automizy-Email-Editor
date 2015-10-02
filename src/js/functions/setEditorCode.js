define([
    "js/addons/jquery/automizyResizable"
], function () {
    $AEE.setEditorCode = function (code) {
        var $code = $(code);
        $AEE.elements.$blockHandle.appendTo($AEE.elements.$tmp);
        $AEE.elements.$documentBox[0].style.backgroundColor = 'transparent';
        if(typeof $code[0] === 'undefined'){
            $AEE.elements.$document.html(code);
            return $AEE;
        }
        var html = $code[0].innerHTML;
        $AEE.elements.$document.html(html);
        $AEE.elements.$document.attr('style', $code.attr('style'));
        $AEE.elements.$document.find('.aee-block').automizySetUp();

        var color = $code.attr('data-outer-color');
        if(typeof color !== 'undefined') {
            $AEE.inputs.blockSettingsDocumentOuterColor.input().css({
                backgroundColor: color,
                color: color
            }).val(color).change().colpickSetColor(color);
        }else{
            $AEE.inputs.blockSettingsDocumentOuterColor.input().css({
                backgroundColor: '#ffffff',
                color: '#ffffff'
            }).val('#ffffff').colpickSetColor('#ffffff');
        }

        $AEE.elements.$document.add('.aee-block-drop-zone').sortable($AEE.settings.sortable);

        return $AEE;
    };
});