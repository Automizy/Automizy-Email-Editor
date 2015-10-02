define([
    "js/functions/core/ready"
], function () {
    $AEE.ready(function(){
        $.fn.automizySetUp = function () {
            return this.each(function(){
                var $block = $(this);
                if(!$block.hasClass('aee-columns-block-item')){
                    $block.find('*').andSelf().removeAttr('id data-mce-style spellcheck mce-content-body data-mce-href');
                    $AEE.settings.tinymceBlock.oninit = function(){};
                    $block.find('.aee-text-block-content:first').tinymce($AEE.settings.tinymceBlock);
                    $block.find('.aee-imagepicker-image').automizyResizabe();
                }
            });
        };
    })
});