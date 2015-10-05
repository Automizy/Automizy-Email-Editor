define([
    "core"
], function () {
    $AEE.moveBlockUp = function($block){
        var $block = $block || $AEE.elements.$activeBlock;
        if($block.prev().hasClass('aee-block')){
            $block.insertBefore($block.prev());
            setTimeout(function(){
                $AEE.setBlockSettings($block);
            }, 10)
        }
    };
    $AEE.moveBlockDown = function($block){
        var $block = $block || $AEE.elements.$activeBlock;
        if($block.next().hasClass('aee-block')){
            $block.insertAfter($block.next());
            setTimeout(function(){
                $AEE.setBlockSettings($block);
            }, 10)
        }
    };
});