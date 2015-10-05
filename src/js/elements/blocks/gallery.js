define([
    "js/functions/core/ready",
    "js/functions/core/layoutReady",
    "js/modules/imagePicker"
], function () {
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'gallery.gif',
            name:'gallery',
            category:'content',
            title:$A.translate('Image gallery'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell) {
                $block.addClass('aee-gallery-block-item').attr('data-space', 6);
                $contentCell[0].style.textAlign = 'center';
                for (var i = 0; i < 3; i++) {
                    $AEE.addEmptyGalleryItem($contentCell);
                }
                $AEE.inputs.blockSettingsGalleryDistanceBetween.val(6);
                $AEE.rebuildGallery();
            }
        });

    });

    $AEE.layoutReady(function(){
        $AEE.elements.$gallerySeparatorHtml = $('<img src="' + $AEE.d.config.url + '/images/spacer.gif" class="aee-gallery-block-element-separator" height="1" style="height:1px" />');
        $AEE.rebuildGallery = function($block, options){
            var $block = $block || $AEE.elements.$activeBlock;
            var options = options || {};
            var $content = $block.find('.aee-block-content-cell:first');
            var distance = $AEE.inputs.blockSettingsGalleryDistanceBetween.val();
            $AEE.elements.$gallerySeparatorHtml.attr('width', distance).css({width:distance+'px'});

            $block.find('.aee-gallery-block-element-separator').remove();
            $block.find('.aee-gallery-block-element').each(function(index){
                if(index > 0){
                    $(this).before($AEE.elements.$gallerySeparatorHtml[0].outerHTML);
                }
            });

            $block.attr('data-space', distance);
        };
        $AEE.addEmptyGalleryItem = function($contentCell){
            var $element = $('<div class="aee-gallery-block-element aee-empty"></div>').appendTo($contentCell);
            var $imageBox = $('<div class="aee-gallery-block-content"></div>').appendTo($element);
            var $emptyImage = $('<img src="' + $AEE.d.config.url + '/images/noimage.gif" class="aee-gallery-block-image" />').appendTo($imageBox).after('<br/><br/>');
            var $selectImageButton = $('<a href="javascript:;" class="aee-gallery-block-button"></a>').text($A.translate('Select image')).appendTo($imageBox);
        };

        $AEE.elements.$document.on('click', '.aee-gallery-block-item .aee-gallery-block-button, .aee-gallery-block-item .aee-gallery-block-image', function(){
            var $t = $(this);
            var $block = $t.closest('.aee-gallery-block-item');
            var $element = $t.closest('.aee-gallery-block-element');
            var $contentCell = $block.find('.aee-block-content-cell:first');
            $AEE.imagePicker
                .reset()
                .enableDelete()
                .disableAlign()
                .delete(function(){
                    $element.remove();
                    $AEE.imagePicker.close();
                    if($block.find('.aee-gallery-block-content').length === 0){
                        $AEE.addEmptyGalleryItem($contentCell);
                    }
                    $AEE.rebuildGallery();
                })
                .save(function(img){
                    if(img.$elem !== false){
                        img.$elem.appendTo($element.removeClass('aee-empty').empty());
                        img.$img.automizyResizabe();
                        if($block.find('.aee-gallery-block-content').length === 0){
                            $AEE.addEmptyGalleryItem($contentCell);
                        }
                    }
                })
                .open();
        }).on('click', '.aee-gallery-block-item .aee-imagepicker-image', function(){
            var $img = $(this);
            var $block = $img.closest('.aee-gallery-block-item');
            var $element = $img.closest('.aee-gallery-block-element');
            var $contentCell = $block.find('.aee-block-content-cell:first');
            $AEE.imagePicker
                .reset()
                .enableDelete()
                .disableAlign()
                .delete(function(){
                    $element.remove();
                    $AEE.imagePicker.close();
                    if($block.find('.aee-gallery-block-content').length === 0){
                        $AEE.addEmptyGalleryItem($contentCell);
                    }
                    $AEE.rebuildGallery();
                })
                .dialogTitle($A.translate('Modify image'))
                .src(this.src)
                .link($img.closest('a').attr('href') || '')
                .alt(this.alt || '')
                .title(this.title || '')
                .save(function(img){
                    if(img.$elem !== false){
                        img.$elem.appendTo($element.removeClass('aee-empty').empty());
                        img.$img.automizyResizabe();
                        if($block.find('.aee-gallery-block-content').length === 0){
                            $AEE.addEmptyGalleryItem($contentCell);
                        }
                    }
                })
                .open();
        }).on('click', '.aee-gallery-block-item .aee-gallery-block-button', function(event){
            event.preventDefault();
        });


        $AEE.elements.$blockSettingsGalleryBox = $('<div id="aee-block-settings-gallery-box" class="aee-block-settings-box"></div>').appendTo($AEE.elements.$blockSettingsContent);
        $AEE.inputs.blockSettingsGalleryDistanceBetween = $A.newInput({
            type:'number',
            label:$A.translate('Space between images'),
            labelAfter:'px',
            value:6,
            enter:function(){
                $AEE.rebuildGallery();
                return false;
            },
            change:function(){
                $AEE.rebuildGallery();
            },
            create:function(){
                //this.widget().css('padding-top', '12px');
                this.input().attr('min', 0);
                this.input().pbmInput();
            }
        });
        $AEE.inputs.blockSettingsGalleryAlign = $A.newInput({
            label:$A.translate('Alignment'),
            type:'select',
            options:[
                ['left', $A.translate('Left')],
                ['center', $A.translate('Center'), true],
                ['right', $A.translate('Right')]
            ],
            change:function(){
                $AEE.elements.$activeBlock.data('$contentCell')[0].style.textAlign = this.val();
            }
        });

        $AEE.forms.blockSettingsGallery = $A.newForm().addInputs([
            $AEE.inputs.blockSettingsGalleryDistanceBetween,
            $AEE.inputs.blockSettingsGalleryAlign
        ]).drawTo($AEE.elements.$blockSettingsGalleryBox);

    });
});