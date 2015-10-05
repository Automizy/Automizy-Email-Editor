define([
    "js/functions/core/ready",
    "js/functions/core/layoutReady"
], function () {
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'button.gif',
            name:'button',
            category:'content',
            title:$A.translate('Button'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell){
                $block.addClass('aee-button-block-item');
                var $content = $('<div class="aee-button-block-content"></div>').appendTo($contentCell).attr('style', 'text-align:center');
                var $button = $('<a href="#" class="aee-button-block-button"></a>').text($A.translate('My button')).appendTo($content).attr('style', 'border-top-width: 9px; border-right-width:36px; border-bottom-width:9px; border-left-width:36px; border-style:solid; border-color:#b8b8b8; font-size: 14px; display: inline-block; text-decoration: none; background-color: #b8b8b8; color: #ffffff; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px;');
            }
        });

    });

    $AEE.layoutReady(function(){
        $AEE.elements.$document.on('click', '.aee-button-block-item .aee-button-block-button', function(){
            setTimeout(function(){
                $AEE.dialogs.buttonSettings.open();
            }, 10);
        }).on('click', '.aee-button-block-item a', function(event){
            event.preventDefault();
        });
    });
});