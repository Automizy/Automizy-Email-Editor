define([
    "js/functions/core/ready"
], function () {
    $AEE.ready(function(){
        $.fn.automizyResizabe = function () {
            return this.each(function(){
                var $img = $(this);
                var galleryImage = false;
                if($img.closest('.aee-gallery-block-element').length > 0){
                    galleryImage = true;
                }
                if($img.parent().hasClass('ui-wrapper')){
                    var wrap = $img.parent();
                    var w = wrap[0].style.width;
                    var mw = $img[0].style.minWidth || 0;
                    var h = wrap.height();
                    $img.insertAfter(wrap);
                    wrap.remove();
                    if(galleryImage){
                        $img.resizable($AEE.settings.imgGalleryResizable);
                        $img.closest(".ui-wrapper").css({width: w, height: h, position: 'relative'});
                        $img.css({width: w, height: 'auto', minWidth:mw});
                    }else {
                        $img.resizable($AEE.settings.imgResizable);
                        $img.closest(".ui-wrapper").css({width: w, height: h, position: 'relative'});
                        $img.css({width: '100%', height: 'auto', minWidth:mw});
                    }
                }else{
                    if(galleryImage){
                        $img.resizable($AEE.settings.imgGalleryResizable);
                    }else {
                        $img.resizable($AEE.settings.imgResizable);
                    }
                }
            });
        };
    })
});