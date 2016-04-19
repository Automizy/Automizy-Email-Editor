define([
    "js/functions/core/ready",
    "js/functions/core/layoutReady",
    "js/modules/imagePicker"
], function () {
    $AEE.setImageSize = function($content){
        var $img = $content.find("img");

        $img.one("load", function() {

            var $imgLocal = $(this);
            var imgLocal = this;
            var $wrapper = $imgLocal.closest('.ui-wrapper');
            if(typeof $wrapper[0] !== 'undefined') {
                var $content = $imgLocal.closest('.aee-block-content-cell');
                var contentWidth = $content.width();
                var imgWidth = Math.round(imgLocal.naturalWidth || $imgLocal.width());
                var percentEditor = Math.min(Math.round($imgLocal.width() / contentWidth * 100), 100);
                var percent = Math.min(Math.round(imgWidth / contentWidth * 100), 100);
                $wrapper[0].style.width = percentEditor + '%';
                $wrapper[0].style.height = 'auto';
                $imgLocal.attr('style', 'max-width: 100%; margin: 0px; resize: none; position: static; zoom: 1; display: block; width: 100%; opacity:1;').attr('data-percent-width', percent).attr('data-width', imgWidth);
            }
        }).each(function() {
            if(this.complete) $(this).load();
        });

        /*
        (function(){$img.load(function(){

            alert('im');
            var $img = $content.find("img");
            var $wrapper = $content.find('.ui-wrapper:first');
            var contentWidth = $content.width();
            var imgWidth = Math.round($img.width());
            var percent = Math.round(imgWidth / contentWidth * 100);
            $wrapper[0].style.width = percent + '%';
            $wrapper[0].style.height = 'auto';
            $img.attr('style', 'max-width: 100%; margin: 0px; resize: none; position: static; zoom: 1; display: block; width: 100%; opacity:1;').attr('data-percent-width', percent).attr('data-width', imgWidth);

        })})($content);
        */

    };

    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'image.gif',
            name:'image',
            category:'content',
            title:$A.translate('Image'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell){
                $block.addClass('aee-image-block-item aee-empty');
                var $imageBox = $('<div class="aee-image-block-content" style="position: relative; padding: 24px; border: 1px solid #c1c1c1; font-size: 7px; text-align: center; background-color: #efefef;"></div>').appendTo($contentCell);
                var $emptyImage = $('<img src="'+$AEE.d.config.url + '/images/noimage.gif" class="aee-image-block-image" />').appendTo($imageBox).after('<br/><br/>');
                var $selectImageButton = $('<a href="javascript:;" class="aee-image-block-button"></a>').text($A.translate('Select image')).appendTo($imageBox);
                $AEE.imagePicker
                    .reset()
                    .save(function(img){
                        if(img.$elem !== false){
                            img.$elem.appendTo($contentCell.empty());
                            img.$img.automizyResizabe();
                            $contentCell.css({
                                textAlign: img.align
                            });
                            //$AEE.setImageSize($contentCell);
                        }
                    })
                    .open();
            }
        });

    });

    $AEE.layoutReady(function(){
        $AEE.imagePicker = $A.newImagePicker();
        $AEE.elements.$document.on('click', '.aee-image-block-item .aee-image-block-button, .aee-image-block-item .aee-image-block-image', function(){
            var $t = $(this);
            var $block = $t.closest('.aee-image-block-item');
            var $contentCell = $block.find('.aee-block-content-cell');
            $AEE.imagePicker
                .reset()
                .save(function(img){
                    if(img.$elem !== false){
                        img.$elem.appendTo($contentCell.empty());
                        img.$img.automizyResizabe();
                        $contentCell.css({
                            textAlign: img.align
                        });
                        $AEE.setImageSize($contentCell);
                    }
                })
                .open();
        }).on('click', '.aee-image-block-item .aee-imagepicker-image', function(){
            var $t = $(this);
            var $contentCell = $(this).closest('.aee-block-content-cell');
            $AEE.imagePicker
                .reset()
                .dialogTitle($A.translate('Modify image'))
                .src(this.src)
                .link($t.closest('a').attr('href') || '')
                .alt(this.alt || '')
                .title(this.title || '')
                .align($t.parent().css('text-align') || 'center')
                .save(function(img){
                    if(img.$elem !== false){
                        img.$elem.appendTo($contentCell.empty());
                        img.$img.automizyResizabe();
                        $contentCell.css({
                            textAlign: img.align
                        });
                    }
                })
                .open();
        }).on('click', '.aee-gallery-block-item a', function(event){
            event.preventDefault();
        });
    });
});