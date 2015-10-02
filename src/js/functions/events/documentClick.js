define([
    "js/functions/core/ready"
], function () {
    $AEE.ready(function(){
        $AEE.documentMouseDown = false;
        $AEE.documentMouseDownElement = null;
        $(document).mousedown(function(event) {
            $AEE.documentMouseDownElement = event.target;
            $AEE.documentMouseDown = true;
        }).click(function(event) {
            if(!$AEE.documentMouseDown){
                return false;
            }
            if(!$(event.target).closest('.aee-block').length && $(event.target).closest('#aee-document-box').length > 0) {
                $AEE.setBlockSettings($AEE.elements.$document);
            }
            if($(event.target).closest('#aee-editor').length > 0) {
                $AEE.saved = false;
                if ($AEE.screenSize()['x'] < 800) {
                    $AEE.settingsShowed = false;
                    $AEE.blocksShowed = false;
                    $AEE.setLayoutByDisplay();
                }
            }
            if($(event.target).closest('#aee-mobilemenu').length <= 0) {
                $AEE.elements.$mobileMenu.stop().fadeOut();
            }
        }).mouseup(function(event) {
            setTimeout(function(){
                $AEE.documentMouseDown = false;
            }, 10);
        });

        $AEE.elements.$document.on('click', '.aee-imagepicker-image-link', function(){
            return false;
        })

    });
});