define([
    "js/functions/core/layoutReady"
], function () {
    $AEE.layoutReady(function(){
        $AEE.elements.$document.on('click', '.aee-block', function(event){
            event.stopPropagation();
            var $block = $(this);
            $AEE.elements.$document.find('.aee-block').not($block).removeClass('aee-active');
            $block.addClass('aee-active');
            $AEE.setBlockSettings($block);
        }).on('mouseenter', '.aee-block', function(event){
            if($AEE.dragging){
                return false;
            }
            event.stopPropagation();
            if(!$AEE.touchable()){
                var $block = $(this);
                var leftOffset = -2;
                var widthOffset = 4;
                if ($block.hasClass('aee-active')) {
                    leftOffset = -4;
                    widthOffset = 8;
                }
                if(typeof $block.data('$topCell') === 'undefined'){
                    $block = $AEE.getBlock($block);
                }
                $AEE.elements.$blockHandle.appendTo($block.data('$topCell')).show().css({
                    left: leftOffset + 'px',
                    width: $block.width() + widthOffset + 'px'
                });
            }
        }).on('mouseleave', '.aee-block', function(event){
            if($AEE.dragging){
                return false;
            }
            event.stopPropagation();
            var $block = $(this);
            $block.find('.aee-block-handle').hide();
        });
    })
});