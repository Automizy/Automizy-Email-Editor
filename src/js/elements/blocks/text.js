define([
    "js/functions/core/ready",
    "js/settings/common"
], function () {
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'text.gif',
            name:'text',
            category:'content',
            title:$A.translate('Text'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell){
                $block.addClass('aee-text-block-item');
                var html = '';
                var text = $A.translate('Enter text here. ');
                for(var i = 0; i < 30; i++){
                    html += text;
                }
                html = '<div style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif; font-size: 11pt;">' + html + '</span></div>';
                var $content = $('<div contenteditable></div>').addClass('aee-text-block-content').html(html).appendTo($contentCell);

                $AEE.settings.tinymceBlock.oninit = function(editor){editor.focus()};
                $content.tinymce($AEE.settings.tinymceBlock);
            }
        });

    });
});