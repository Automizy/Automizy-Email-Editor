define([
    "core"
], function () {
    var moveBlockTouchControllerTimeout;
    function moveBlockTouchController($block){
        console.log('moveBlockTouchController');
        clearTimeout(moveBlockTouchControllerTimeout);
        $AEE.elements.$blockTouchController.stop().animate({
            top:$block.position().top - $AEE.elements.$documentBox.scrollTop() + 60 + 'px',
            left:$block.position().left + $block.width() + 'px'
        }, 250, function(){
            if(parseInt($AEE.elements.$blockTouchController.css('top')) !== parseInt($block.position().top - $AEE.elements.$documentBox.scrollTop() + 60)){
                moveBlockTouchController($block);
            }else if(parseInt($AEE.elements.$blockTouchController.css('left')) !== parseInt($block.position().left + $block.width())){
                moveBlockTouchController($block);
            }else{
                moveBlockTouchControllerTimeout = setTimeout(function(){
                    moveBlockTouchController($block);
                }, 500);
            }
        });
    }
    $AEE.setBlockSettings = function ($block) {
        $AEE.elements.$activeBlock = $block;
        if($block.attr('id') === 'aee-document'){
            $block.addClass('aee-active');

            if($AEE.touchable()){
                $AEE.elements.$blockTouchController.hide();
            }
            
            $AEE.elements.$document.find('.aee-block').removeClass('aee-active');
            $AEE.inputs.bpbm.disableMargin();

            var bgColor = $AEE.elements.$document[0].style.backgroundColor || false;
            if(bgColor !== false){
                $AEE.inputs.bpbm.backgroundColor($AEE.rgbStyleToHex(bgColor));
            }else{
                $AEE.inputs.bpbm.backgroundColor(false);
            }

            $AEE.inputs.bpbm
                .marginTop(0)
                .marginRight(0)
                .marginBottom(0)
                .marginLeft(0)
                .paddingTop(parseInt($AEE.elements.$document[0].style.paddingTop) || 0)
                .paddingRight(parseInt($AEE.elements.$document[0].style.paddingRight) || 0)
                .paddingBottom(parseInt($AEE.elements.$document[0].style.paddingBottom) || 0)
                .paddingLeft(parseInt($AEE.elements.$document[0].style.paddingLeft) || 0)
                .borderTopWidth(parseInt($AEE.elements.$document[0].style.borderTopWidth) || 0)
                .borderTopColor($AEE.rgbStyleToHex($AEE.elements.$document[0].style.borderTopColor))
                .borderRightWidth(parseInt($AEE.elements.$document[0].style.borderRightWidth) || 0)
                .borderRightColor($AEE.rgbStyleToHex($AEE.elements.$document[0].style.borderRightColor))
                .borderBottomWidth(parseInt($AEE.elements.$document[0].style.borderBottomWidth) || 0)
                .borderBottomColor($AEE.rgbStyleToHex($AEE.elements.$document[0].style.borderBottomColor))
                .borderLeftWidth(parseInt($AEE.elements.$document[0].style.borderLeftWidth) || 0)
                .borderLeftColor($AEE.rgbStyleToHex($AEE.elements.$document[0].style.borderLeftColor))
                .change(function () {
                    var style = [
                        'padding-top:'+$AEE.inputs.bpbm.paddingTop() + 'px',
                        'padding-right:'+$AEE.inputs.bpbm.paddingRight() + 'px',
                        'padding-bottom:'+$AEE.inputs.bpbm.paddingBottom() + 'px',
                        'padding-left:'+$AEE.inputs.bpbm.paddingLeft() + 'px',
                        'border-top-width:'+$AEE.inputs.bpbm.borderTopWidth() + 'px',
                        'border-right-width:'+$AEE.inputs.bpbm.borderRightWidth() + 'px',
                        'border-bottom-width:'+$AEE.inputs.bpbm.borderBottomWidth() + 'px',
                        'border-left-width:'+$AEE.inputs.bpbm.borderLeftWidth() + 'px',
                        'border-top-style:'+$AEE.inputs.bpbm.borderTopStyle(),
                        'border-right-style:'+$AEE.inputs.bpbm.borderRightStyle(),
                        'border-bottom-style:'+$AEE.inputs.bpbm.borderBottomStyle(),
                        'border-left-style:'+$AEE.inputs.bpbm.borderLeftStyle(),
                        'border-top-color:'+$AEE.inputs.bpbm.borderTopColor(),
                        'border-right-color:'+$AEE.inputs.bpbm.borderRightColor(),
                        'border-bottom-color:'+$AEE.inputs.bpbm.borderBottomColor(),
                        'border-left-color:'+$AEE.inputs.bpbm.borderLeftColor(),
                        'width:'+$AEE.maxWidth() + 'px'
                    ];
                    var bgNewColor = $AEE.inputs.bpbm.backgroundColor() || false;
                    if(bgNewColor !== false && bgNewColor !== ''){
                        style.push('background-color:'+bgNewColor);
                    }
                    $AEE.elements.$document.attr('style',style.join('; '));


                    $AEE.elements.$document.find('.aee-image-block-item .aee-block-content-cell').each(function(){
                        $AEE.setImageSize($(this));
                    });
                });
            $AEE.elements.$blockSettingsContentTitle.html($A.translate('Document settings'));
        }else {
            $block.addClass('aee-active');

            if($AEE.touchable()){
                $AEE.elements.$blockTouchController.show();
                moveBlockTouchController($block);
            }

            $AEE.elements.$document.find('.aee-block').add($AEE.elements.$document).not($block).removeClass('aee-active');
            $AEE.inputs.bpbm.enableMargin();
            var d = $block.data();
            if(typeof d.aeeBlock === 'undefined'){
                $block = $AEE.getBlock($block);
                d = $block.data();
            }
            var bgColor = d.$contentCell[0].style.backgroundColor || false;
            if(bgColor !== false){
                $AEE.inputs.bpbm.backgroundColor($AEE.rgbStyleToHex(bgColor));
            }else{
                $AEE.inputs.bpbm.backgroundColor(false);
            }
            $AEE.inputs.bpbm
                .marginTop(parseInt(d.$topCell[0].style.height))
                .marginRight(parseInt(d.$rightCell[0].style.width))
                .marginBottom(parseInt(d.$bottomCell[0].style.height))
                .marginLeft(parseInt(d.$leftCell[0].style.width))
                .paddingTop(parseInt(d.$contentCell[0].style.paddingTop))
                .paddingRight(parseInt(d.$contentCell[0].style.paddingRight))
                .paddingBottom(parseInt(d.$contentCell[0].style.paddingBottom))
                .paddingLeft(parseInt(d.$contentCell[0].style.paddingLeft))
                .borderTopWidth(parseInt(d.$contentCell[0].style.borderTopWidth))
                .borderTopColor($AEE.rgbStyleToHex(d.$contentCell[0].style.borderTopColor))
                .borderRightWidth(parseInt(d.$contentCell[0].style.borderRightWidth))
                .borderRightColor($AEE.rgbStyleToHex(d.$contentCell[0].style.borderRightColor))
                .borderBottomWidth(parseInt(d.$contentCell[0].style.borderBottomWidth))
                .borderBottomColor($AEE.rgbStyleToHex(d.$contentCell[0].style.borderBottomColor))
                .borderLeftWidth(parseInt(d.$contentCell[0].style.borderLeftWidth))
                .borderLeftColor($AEE.rgbStyleToHex(d.$contentCell[0].style.borderLeftColor))
                .change(function () {
                    d.$topCell.attr('style', 'height: 0px; font-size: 0px; line-height: 0px; padding: 0px; border: none; mso-line-height-alt: 0; mso-margin-top-alt: 0px; height:'+$AEE.inputs.bpbm.marginTop()+'px');
                    d.$rightCell[0].style.width = $AEE.inputs.bpbm.marginRight() + '%';
                    d.$bottomCell.attr('style', 'height: 0px; font-size: 0px; line-height: 0px; padding: 0px; border: none; mso-line-height-alt: 0; mso-margin-top-alt: 0px; height:'+$AEE.inputs.bpbm.marginBottom()+'px');
                    d.$leftCell[0].style.width = $AEE.inputs.bpbm.marginLeft() + '%';

                    var textAlign = d.$contentCell[0].style.textAlign;
                    if($.inArray(textAlign, ['left', 'center', 'right']) < 0){
                        textAlign = 'left';
                    }

                    var style = [
                        'padding-top:'+$AEE.inputs.bpbm.paddingTop() + 'px',
                        'padding-right:'+$AEE.inputs.bpbm.paddingRight() + 'px',
                        'padding-bottom:'+$AEE.inputs.bpbm.paddingBottom() + 'px',
                        'padding-left:'+$AEE.inputs.bpbm.paddingLeft() + 'px',
                        'border-top-width:'+$AEE.inputs.bpbm.borderTopWidth() + 'px',
                        'border-right-width:'+$AEE.inputs.bpbm.borderRightWidth() + 'px',
                        'border-bottom-width:'+$AEE.inputs.bpbm.borderBottomWidth() + 'px',
                        'border-left-width:'+$AEE.inputs.bpbm.borderLeftWidth() + 'px',
                        'border-top-style:'+$AEE.inputs.bpbm.borderTopStyle(),
                        'border-right-style:'+$AEE.inputs.bpbm.borderRightStyle(),
                        'border-bottom-style:'+$AEE.inputs.bpbm.borderBottomStyle(),
                        'border-left-style:'+$AEE.inputs.bpbm.borderLeftStyle(),
                        'border-top-color:'+$AEE.inputs.bpbm.borderTopColor(),
                        'border-right-color:'+$AEE.inputs.bpbm.borderRightColor(),
                        'border-bottom-color:'+$AEE.inputs.bpbm.borderBottomColor(),
                        'border-left-color:'+$AEE.inputs.bpbm.borderLeftColor(),
                        'text-align:'+textAlign
                    ];

                    var bgNewColor = $AEE.inputs.bpbm.backgroundColor() || false;
                    if(bgNewColor !== false && bgNewColor !== ''){
                        style.push('background-color:'+bgNewColor);
                    }
                    if($block.hasClass('aee-image-block-item')){
                        style.push('font-size:0; line-height:0');
                        (function($contentCell){$AEE.delay(function(){
                            $AEE.setImageSize($contentCell)
                        }, 500);})(d.$contentCell)
                    }

                    d.$contentCell.attr('style',style.join('; '));

                });
            $AEE.elements.$blockSettingsContentTitle.html($A.translate('Selected block settings'));
        }

        $AEE.elements.$blockSettingsContent.find('.aee-block-settings-box').hide();
        if($block.attr('id') === 'aee-document'){
            $AEE.elements.$blockSettingsDocumentBox.show();
            $AEE.inputs.blockSettingsDocumentMaxWidth.val(parseInt($AEE.elements.$document[0].style.width));
        }else if($block.hasClass('aee-share-block-item')){
            $AEE.elements.$blockSettingsShareBox.show();
            var $textCell = $block.find('.aee-share-block-content-cell-text:first');
            var $iconsCell = $block.find('.aee-share-block-content-cell-icons:first');
            $AEE.inputs.blockSettingsShareFacebook.checked(($iconsCell.find('.aee-share-block-icons-facebook').length > 0));
            $AEE.inputs.blockSettingsShareTwitter.checked(($iconsCell.find('.aee-share-block-icons-twitter').length > 0));
            $AEE.inputs.blockSettingsShareGoogleplus.checked(($iconsCell.find('.aee-share-block-icons-googleplus').length > 0));
            $AEE.inputs.blockSettingsShareLinkedin.checked(($iconsCell.find('.aee-share-block-icons-linkedin').length > 0));
            $AEE.inputs.blockSettingsShareDistanceBetween.val($block.attr('data-space') || 6);
        }else if($block.hasClass('aee-gallery-block-item')){
            $AEE.elements.$blockSettingsGalleryBox.show();
            $AEE.inputs.blockSettingsGalleryDistanceBetween.val($block.attr('data-space') || 6);
            $AEE.inputs.blockSettingsGalleryAlign.val($block.data('$contentCell').css('text-align') || 'center');
        }else if($block.hasClass('aee-columns-block-item')){
            $AEE.elements.$blockSettingsColumnBox.show();
            var hasColumn1 = $A.parseBoolean($block.attr('data-column-1'));
            var hasColumn2 = $A.parseBoolean($block.attr('data-column-2'));
            var hasColumn3 = $A.parseBoolean($block.attr('data-column-3'));
            var hasColumn4 = $A.parseBoolean($block.attr('data-column-4'));
            var floatable = $A.parseBoolean($block.attr('data-floatable'));
            var $columns = $block.find('.aee-columns-block-column:first').siblings().andSelf();
            var $column1 = $columns.filter('.aee-columns-block-column-1:first');
            var $column2 = $columns.filter('.aee-columns-block-column-2:first');
            var $column3 = $columns.filter('.aee-columns-block-column-3:first');
            var $column4 = $columns.filter('.aee-columns-block-column-4:first');
            $AEE.inputs.blockSettingsColumns1.checked(hasColumn1);
            $AEE.inputs.blockSettingsColumns2.checked(hasColumn2);
            $AEE.inputs.blockSettingsColumns3.checked(hasColumn3);
            $AEE.inputs.blockSettingsColumns4.checked(hasColumn4);
            $AEE.inputs.blockSettingsColumnsFloatable.checked(floatable);
            $AEE.inputs.blockSettingsColumns1Width.val(parseInt($column1[0].style.width));
            $AEE.inputs.blockSettingsColumns2Width.val(parseInt($column2[0].style.width));
            $AEE.inputs.blockSettingsColumns3Width.val(parseInt($column3[0].style.width));
            $AEE.inputs.blockSettingsColumns4Width.val(parseInt($column4[0].style.width));
        }
        if($block.hasClass('aee-block') && $AEE.dynamicBlocks()){
            $AEE.elements.$blockSettingsDynamicBox.show();
            if($block.is("[data-dynamic-segments]") && $block.attr('data-dynamic-segments').length > 0){
                var segments = $block.attr('data-dynamic-segments');
                console.log(segments);
                $AEE.inputs.blockSettingsDynamicCheckbox.check();
                $AEE.inputs.blockSettingsDynamicSegments.val(segments.split(',')).change();
            }else{
                $AEE.inputs.blockSettingsDynamicCheckbox.uncheck();
                $AEE.inputs.blockSettingsDynamicSegments.val([]);
            }
        }

        return $AEE;
    };
});