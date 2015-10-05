define([
    "js/functions/core/runTheFunctions"
], function () {

    $AEE.d.functions.scriptLoadedFunctions = [];
    $AEE.scriptLoaded = function(scriptLoadedFunction){
        if(typeof scriptLoadedFunction === 'function'){
            $AEE.d.functions.scriptLoadedFunctions.push(scriptLoadedFunction);
            return $AEE;
        }
        $AEE.runTheFunctions($AEE.d.functions.scriptLoadedFunctions, $AEE, [$AEE.d.status]);
    };

});