define([
    "js/functions/core/loadPlugins"
], function () {
    $AEE.init = function () {
        if(!$AEE.automizyInited){

            if(!$AEE.d.functions.open){
                $AEE.open(function(){});
            }
            if(!$AEE.d.functions.close){
                $AEE.close(function(){});
            }

            $AEE.loadPlugins();
        }
        return $AEE;
    };
});