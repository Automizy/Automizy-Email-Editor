define([
    "js/functions/core/ready",
    "js/settings/common"
], function () {
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'html.gif',
            name:'html',
            category:'content',
            title:$A.translate('HTML'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell){
                $block.addClass('aee-html-block-item aee-empty');
                var $content = $('<div></div>').addClass('aee-html-block-content').appendTo($contentCell);
                var $button = $('<span></span>').addClass('aee-html-block-button').html($A.translate('Insert HTML code')).appendTo($content);
            }
        });

        var $textarea = $('<textarea></textarea>').addClass('aee-html-block-dialog-input');
        var hasEditor = false;
        $AEE.dialogs.htmlCode = $A.newDialog({
            content:$textarea,
            open:function(){
                setTimeout(function () {
                    if ($AEE.elements.$activeBlock.hasClass('aee-empty')) {
                        $textarea.val('');
                    } else {
                        $textarea.val($AEE.elements.$activeBlock.data('$contentCell')[0].innerHTML);
                    }
                }, 10);
                if(!hasEditor) {
                    hasEditor = true;
                    setTimeout(function () {
                        $textarea.tinymce($AEE.settings.tinymceHtmlBlock);
                    }, 10);
                }
            },
            buttons:[
                {
                    skin: 'nobox-green',
                    text: $A.translate('Cancel'),
                    float: 'left',
                    click: function () {
                        $AEE.dialogs.htmlCode.close();
                    }
                },
                {
                    skin: 'simple-orange',
                    text: $A.translate('Save'),
                    float: 'right',
                    click: function () {
                        $AEE.elements.$activeBlock.data('$contentCell').html($textarea.val());
                        $AEE.elements.$activeBlock.removeClass('aee-empty');
                        $AEE.dialogs.htmlCode.close();
                    }
                }
            ]
        });

    });

    $AEE.layoutReady(function(){
        $AEE.imagePicker = $A.newImagePicker();
        $AEE.elements.$document.on('click', '.aee-html-block-item.aee-empty .aee-html-block-content', function(){
            $AEE.dialogs.htmlCode.title($A.translate('Insert HTML code')).open();
        }).on('click', '.aee-html-block-item:not(.aee-empty) .aee-block-content-cell', function(){
            $AEE.dialogs.htmlCode.title($A.translate('Modify HTML code')).open();
        }).on('click', '.aee-html-block-item .aee-block-content-cell a, .aee-html-block-item .aee-block-content-cell area', function(event){
            event.preventDefault();
        });
    });
});