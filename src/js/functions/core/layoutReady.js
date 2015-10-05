define([
    "js/functions/core/runTheFunctions"
], function () {

    $AEE.d.functions.layoutReadyFunctions = [];
    $AEE.layoutReady = function(func){
        if(typeof func === 'function') {
            $AEE.d.functions.layoutReadyFunctions.push(func);
            if($AEE.automizyLayoutReady){
                func.apply($AEE, []);
            }
            return $AEE;
        }
        $AEE.runTheFunctions($AEE.d.functions.layoutReadyFunctions);
        $AEE.automizyLayoutReady = true;
    };

});