define([
    "js/functions/core/ready",
    "js/functions/delay",
    "js/functions/setLayoutByDisplay"
], function () {
    $AEE.ready(function(){
        $(window).resize(function(){
            $AEE.delay(function(){
                $AEE.setLayoutByDisplay();
            }, 150);
        })
    })
});