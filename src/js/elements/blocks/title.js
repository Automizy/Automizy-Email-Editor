define([
    "js/functions/core/ready",
    "js/settings/common"
], function () {
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'title.gif',
            name:'title',
            category:'content',
            title:$A.translate('Title'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell){
                $block.addClass('aee-title-block-item');
                var html = '<div style="text-align: left;"><b><span style="font-family: arial, helvetica, sans-serif; font-size: 16pt;">' + $A.translate('Enter title here.') + '</span></b></div>';
                var $content = $('<div contenteditable></div>').addClass('aee-text-block-content').html(html).appendTo($contentCell);

                $AEE.settings.tinymceBlock.oninit = function(editor){editor.focus()};
                $content.tinymce($AEE.settings.tinymceBlock);
            }
        });

    });
});