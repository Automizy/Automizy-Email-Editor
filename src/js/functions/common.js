define([
    "core"
], function () {



    $AEE.title = function(value){
        if (typeof value !== 'undefined') {
            $AEE.layoutReady(function(){
                $AEE.d.values.title = value;
                $AEE.elements.$headerTitle.html(value);
            });
            return $AEE;
        }
        return $AEE.d.values.title;
    };
    $AEE.dynamicBlocks = function(value){
        if (typeof value !== 'undefined') {
            $AEE.d.values.dynamicBlocks = $A.parseBoolean(value);
            $AEE.layoutReady(function(){
                if($AEE.d.values.dynamicBlocks){
                    $AEE.elements.$blockSettingsDynamicBox.show();
                }else{
                    $AEE.elements.$blockSettingsDynamicBox.hide();
                }
            });
            return $AEE;
        }
        return $AEE.d.values.dynamicBlocks;
    };
    $AEE.logoSrc = function(value){
        if (typeof value !== 'undefined') {
            $AEE.layoutReady(function() {
                $AEE.d.values.logoSrc = value;
                $AEE.elements.$logoImage.attr('src', value);
            });
            return $AEE;
        }
        return $AEE.d.values.logoSrc;
    };
    $AEE.logoLink = function(value){
        if (typeof value !== 'undefined') {
            $AEE.layoutReady(function() {
                $AEE.d.values.logoLink = value;
                $AEE.elements.$logoLink.attr('href', value);
            });
            return $AEE;
        }
        return $AEE.d.values.logoLink;
    };
    $AEE.recipient = function(value){
        if (typeof value !== 'undefined') {
            $AEE.layoutReady(function() {
                $AEE.inputs.sendTestRecipient.val(value);
            });
            return $AEE;
        }
        return $AEE.inputs.sendTestRecipient.val();
    };
    $AEE.customFields = function(value){
        if (typeof value !== 'undefined') {
            $AEE.d.customFields = value;
            return $AEE;
        }
        return $AEE.d.customFields;
    };
    $AEE.systemFields = function(value){
        if (typeof value !== 'undefined') {
            $AEE.d.systemFields = value;
            return $AEE;
        }
        return $AEE.d.systemFields;
    };
    $AEE.segments = function(value){
        if (typeof value !== 'undefined') {
            $AEE.d.segments = value;
            $AEE.layoutReady(function() {
                $AEE.inputs.blockSettingsDynamicSegments.options(value);
                $AEE.inputs.previewSegments.options(value);
            });
            return $AEE;
        }
        return $AEE.d.segments;
    };


    $AEE.baseDir = function(value){
        if (typeof value !== 'undefined') {
            $AEE.d.config.dir = value;
            return $AEE;
        }
        return $AEE.d.config.dir;
    };
    $AEE.baseUrl = function(value){
        if (typeof value !== 'undefined') {
            $AEE.d.config.url = value;
            return $AEE;
        }
        return $AEE.d.config.url;
    };


    $AEE.maxWidth = function(value){
        if (typeof value !== 'undefined') {
            $AEE.layoutReady(function() {
                $AEE.elements.$document[0].style.width = parseInt(value) + 'px';
            });
            return $AEE;
        }
        return parseInt($AEE.elements.$document[0].style.width);
    };
    $AEE.minWidth = function(value){
        if (typeof value !== 'undefined') {
            $AEE.layoutReady(function() {
                $AEE.elements.$document[0].style.minWidth = parseInt(value) + 'px';
            });
            return $AEE;
        }
        return parseInt($AEE.elements.$document.css('min-width'));
    };

    $AEE.widget = function(){
        return $AEE.elements.$widget;
    };
    $AEE.getDescription = function(){
        return $AEE.elements.$document.text().replace(/\n\s*\n/g, '\n').replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '').substr(0, 255).trim();
    };
    $AEE.showSaveMessage = function(){
        $AEE.saved = true;
        $AEE.elements.$lastSave.html($A.translate('Last saved: %s', (new Date()).toTimeString().substr(0,5)));
    };



    $AEE.clickToSendTest = function(func){
        if (typeof func === 'function') {
            $AEE.d.functions.clickToSendTest = func;
        } else {
            $AEE.layoutReady(function() {
                $AEE.d.functions.clickToSendTest.apply($AEE, [$AEE]);
            });
        }
        return $AEE;
    };
    $AEE.clickToPreview = function(func){
        if (typeof func === 'function') {
            $AEE.d.functions.clickToPreview = func;
        } else {
            $AEE.layoutReady(function() {
                $AEE.d.functions.clickToPreview.apply($AEE, [$AEE]);
            });
        }
        return $AEE;
    };
    $AEE.clickToSave = function(func){
        if (typeof func === 'function') {
            $AEE.d.functions.clickToSave = func;
        } else {
            $AEE.layoutReady(function() {
                $AEE.d.functions.clickToSave.apply($AEE, [$AEE]);
            });
        }
        return $AEE;
    };
    $AEE.clickToSaveAndExit = function(func){
        if (typeof func === 'function') {
            $AEE.d.functions.clickToSaveAndExit = func;
        } else {
            $AEE.layoutReady(function() {
                $AEE.d.functions.clickToSaveAndExit.apply($AEE, [$AEE]);
            });
        }
        return $AEE;
    };
    $AEE.clickToBack = function(func){
        if (typeof func === 'function') {
            $AEE.d.functions.clickToBack = func;
        } else {
            $AEE.layoutReady(function() {
                $AEE.d.functions.clickToBack.apply($AEE, [$AEE]);
            });
        }
        return $AEE;
    };
    $AEE.open = function(func){
        if (typeof func === 'function') {
            $AEE.d.functions.open = func;
        } else {
            var fadeTime = 0;
            if(typeof func === 'number'){
                fadeTime = func;
            }
            $AEE.ready(function() {
                $AEE.d.bodyOverflow = $('body').css('overflow');
            });
            $AEE.layoutReady(function() {
                if ($AEE.d.functions.open.apply($AEE, [$AEE]) !== false) {
                    $('body').css('overflow', 'hidden');
                    $AEE.widget().css({
                        width:'100%',
                        display:'block',
                        opacity:0
                    }).animate({
                        opacity:1
                    }, fadeTime);
                }
            });
        }
        return $AEE;
    };
    $AEE.close = function(func){
        if (typeof func === 'function') {
            $AEE.d.functions.close = func;
        } else {
            var fadeTime = 0;
            if(typeof func === 'number'){
                fadeTime = func;
            }
            $AEE.layoutReady(function() {
                if ($AEE.d.functions.close.apply($AEE, [$AEE]) !== false) {
                    $('body').css('overflow', $AEE.d.bodyOverflow || 'auto');
                    $AEE.widget().css({
                        width:'100%',
                        display:'block',
                        opacity:1
                    }).animate({
                        opacity:0
                    }, fadeTime, function(){
                        $(this).css('display', 'none');
                    });
                }
            });
        }
        return $AEE;
    };



    $AEE.save = function(func){
        if (typeof func === 'function') {
            $AEE.d.functions.save = func;
        } else {
            $AEE.showSaveMessage();
            return $AEE.d.functions.save.apply($AEE, [{
                editorCode:$AEE.getEditorCode(),
                htmlCode:$AEE.getHtmlCode(),
                title:$AEE.title(),
                maxWidth:$AEE.maxWidth()
            }]);
        }
        return $AEE;
    };
    $AEE.saveAndExit = function(func){
        if (typeof func === 'function') {
            $AEE.d.functions.saveAndExit = func;
        } else {
            $AEE.showSaveMessage();
            return $AEE.d.functions.saveAndExit.apply($AEE, [{
                editorCode:$AEE.getEditorCode(),
                htmlCode:$AEE.getHtmlCode(),
                title:$AEE.title(),
                maxWidth:$AEE.maxWidth()
            }]);
        }
        return $AEE;
    };

});