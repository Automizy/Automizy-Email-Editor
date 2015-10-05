define([
    "js/functions/core/runTheFunctions"
], function () {

    $AEE.d.functions.readyFunctions = [];
    $AEE.ready = function(func){
        if(typeof func === 'function') {
            $AEE.d.functions.readyFunctions.push(func);
            if($AEE.automizyReady){
                func.apply($AEE, []);
            }
            return $AEE;
        }
        $AEE.runTheFunctions($AEE.d.functions.readyFunctions);
        $AEE.automizyReady = true;
    };

});