define([
    "js/functions/core/ready"
], function () {
    $AEE.ready(function() {
        if(!$AEE.touchable()){
            return false;
        }
        var mc = new Hammer($AEE.elements.$widget[0], {
            threshold:50
        });
        $AEE.panActive = true;
        var activeTimeout;
        mc.on("panleft panright tap press", function (ev) {
            if(!$AEE.touchable()){
                return false;
            }
            if(Math.abs(ev.deltaX) < 30 || Math.abs(ev.deltaY) > 15){
                return false;
            }
            if ($AEE.dragging || $AEE.screenSize()['x'] >= 800) {
                return false
            }
            clearTimeout(activeTimeout);
            activeTimeout = setTimeout(function(){
                $AEE.panActive = true;
            }, 100);
            if(!$AEE.panActive){
                return false;
            }
            if($($AEE.documentMouseDownElement).closest('[contenteditable]').length > 0){
                return false;
            }
            $AEE.panActive = false;
            setTimeout(function(){
                $AEE.documentMouseDown = false;
                if(ev.type === 'panleft'){
                    if(!$AEE.blocksShowed && !$AEE.settingsShowed){
                        $AEE.settingsShowed = true;
                    }else if($AEE.blocksShowed && !$AEE.settingsShowed){
                        $AEE.settingsShowed = false;
                        $AEE.blocksShowed = false;
                    }
                }else if(ev.type === 'panright'){
                    if(!$AEE.blocksShowed && !$AEE.settingsShowed){
                        $AEE.blocksShowed = true;
                    }else if(!$AEE.blocksShowed && $AEE.settingsShowed){
                        $AEE.settingsShowed = false;
                        $AEE.blocksShowed = false;
                    }
                }
                $AEE.setLayoutByDisplay();
            }, 10);
        });
    });
});