define([
    "js/functions/core/layoutReady",
    "js/functions/touchable"
], function () {
    $AEE.layoutReady(function(){
        if(!$AEE.touchable()){
            return false;
        }
        $AEE.elements.$blockTouchController = $('<div id="aee-block-touch-controller"></div>').appendTo($AEE.elements.$documentBox);
        $AEE.elements.$blockTouchDelete = $('<div id="aee-block-touch-controller-delete"></div>').appendTo($AEE.elements.$blockTouchController).css({
            backgroundImage:'url(' + $AEE.d.config.dir + '/images/block-move.png)'
        }).click(function(event){
            event.preventDefault();
            event.stopPropagation();
            setTimeout(function(){
                if(confirm("Are you sure you want to delete this block?")){
                    $AEE.elements.$blockHandle.appendTo($AEE.elements.$tmp);
                    $AEE.elements.$activeBlock.remove();
                    $AEE.elements.$blockTouchController.hide();
                }
            }, 20);
            return false;
        });
        $AEE.elements.$blockTouchUp = $('<div id="aee-block-touch-controller-up"></div>').appendTo($AEE.elements.$blockTouchController).css({
            backgroundImage:'url(' + $AEE.d.config.dir + '/images/block-move.png)'
        }).click(function(event){
            event.preventDefault();
            event.stopPropagation();
            $AEE.moveBlockUp($AEE.elements.$activeBlock);
            return false;
        });
        $AEE.elements.$blockTouchDown = $('<div id="aee-block-touch-controller-down"></div>').appendTo($AEE.elements.$blockTouchController).css({
            backgroundImage:'url(' + $AEE.d.config.dir + '/images/block-move.png)'
        }).click(function(){
            event.preventDefault();
            event.stopPropagation();
            $AEE.moveBlockDown($AEE.elements.$activeBlock);
            return false;
        });
    });
});