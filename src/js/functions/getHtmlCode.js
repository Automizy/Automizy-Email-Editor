define([
    "core"
], function () {
    $AEE.getHtmlCodeInProgress = false;
    var htmlCode = '';
    $AEE.getHtmlCode = function () {
        if($AEE.getHtmlCodeInProgress){
            return htmlCode;
        }
        $AEE.delay(function(){
            $AEE.getHtmlCodeInProgress = false;
        }, 50);

        htmlCode = '';
        $AEE.getHtmlCodeInProgress = true;
        var $document = $AEE.elements.$document.clone();
        var $html = $AEE.newBlock({onlyContent:true});
        var $content = $html.data('$contentCell');
        var s = $AEE.elements.$document[0].style;
        $document.removeAttr('style').appendTo($content);

        $content.attr('style',[
            'padding-top:'+(s.paddingTop || 0),
            'padding-right:'+(s.paddingRight || 0),
            'padding-bottom:'+(s.paddingBottom || 0),
            'padding-left:'+(s.paddingLeft || 0),
            'border-top-width:'+(s.borderTopWidth || 0),
            'border-right-width:'+(s.borderRightWidth || 0),
            'border-bottom-width:'+(s.borderBottomWidth || 0),
            'border-left-width:'+(s.borderLeftWidth || 0),
            'border-top-style:'+(s.borderTopStyle || 'none'),
            'border-right-style:'+(s.borderRightStyle || 'none'),
            'border-bottom-style:'+(s.borderBottomStyle || 'none'),
            'border-left-style:'+(s.borderLeftStyle || 'none'),
            'border-top-color:'+(s.borderTopColor || 'transparent'),
            'border-right-color:'+(s.borderRightColor || 'transparent'),
            'border-bottom-color:'+(s.borderBottomColor || 'transparent'),
            'border-left-color:'+(s.borderLeftColor || 'transparent'),
            'background-color:'+(s.backgroundColor || 'transparent')
        ].join('; '));

        $html.find('.aee-block-handle, .aee-image-block-content .aee-image-block-button, aee-image-block-content br, .aee-gallery-block-element.aee-empty, .aee-gallery-block-element-separator, .aee-columns-block-column:not(.aee-active)').remove();


        $html.find('.aee-block').each(function(){
            var $block = $(this);
            var $contentCell = $block.find('.aee-block-content-cell:first');

            $contentCell.find('.aee-imagepicker-image').each(function(){
                var $img = $(this);
                var $parent = $img.parent();
                if($parent.hasClass('ui-wrapper')){
                    $img.insertAfter($parent);
                    $parent.remove();
                    $parent = $img.parent();
                }
                $img.closest('.aee-gallery-block-element').contents().unwrap();
                $img.removeStyles('resize', 'position', 'zoom', 'display', 'opacity');
                if($img.is('[data-percent-width]')){
                    $img[0].style.maxWidth = $img[0].style.minWidth = $img.attr('data-percent-width') + '%';
                }
                if($img.is('[data-width]')){
                    $img[0].style.width = $img.attr('data-width') + 'px';
                }
                $img.attr('width', $img.width());
            });

            if($block.hasClass('aee-gallery-block-item')){
                var distance = $block.attr('data-space');
                $AEE.elements.$gallerySeparatorHtml.attr('width', distance).css({width:distance+'px'});
                $contentCell.find('.aee-imagepicker-image').each(function(index){
                    if(index > 0){
                        $(this).before($AEE.elements.$gallerySeparatorHtml[0].outerHTML);
                    }
                });
            }

            var segments = $block.attr('data-dynamic-segments');
            if(typeof segments !== 'undefined'){
                $block.before('<!--[[CONDITION:{"blockshows":"segments","segments":['+segments+']}]]-->');
            }else{
                $block.before('<!--[[CONDITION:{"blockshows":"all","segments":null}]]-->');
            }
            $block.after('<!--[[CONDITION:{"blockshows":"all","segments":null}]]-->');

        });


        $html.find('*').andSelf().removeAttr('id class contenteditable data-mce-style spellcheck data-space');
        var html = $html[0].outerHTML;

        html = html.replace(/\[\{share_facebook\}\]/g, "https://www.facebook.com/sharer/sharer.php?u=[{webversion}]");
        html = html.replace(/\[\{share_twitter\}\]/g, "http://twitter.com/share?via=protopmail&text=" + encodeURI($AEE.title()) + "&url=[{webversion}]");
        html = html.replace(/\[\{share_gplus\}\]/g, "https://plus.google.com/share?url=[{webversion}]");
        html = html.replace(/\[\{share_linkedin\}\]/g, "http://www.linkedin.com/shareArticle?mini=true&title=" + encodeURI($AEE.title()) + "&summary=" + $AEE.getDescription().substring(150) + "...&source=Automizy&url=[{webversion}]");

        var outerColor = $AEE.inputs.blockSettingsDocumentOuterColor.val();
        if(outerColor.length <= 0){
            outerColor = '#ffffff';
        }

        html = html.replace(/&amp;/g, '&');

        htmlCode = '' +
            '<!DOCTYPE>' +
            '<html>' +
                '<head>' +
                    '<title>' + $AEE.title() + '</title>' +
                    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
                    '<meta property="og:title" content="' + $AEE.title() + '" />' +
                    '<meta property="og:description" content="' + $AEE.getDescription().substring(150) + '..." />' +
                    '<meta property="og:type" content="website" />' +
                    '<meta property="og:url" content="[{webversion}]" />' +
                    '<meta property="og:image" content="' + $AEE.d.config.url + '/images/automizy-logo-100x100.jpg" />' +
                    '<style>' +
                    '@media only screen and (max-width: 480px) {' +
                        '.column2{' +
                            'width: 100% !important;' +
                        '}' +
                    '}' +
                    '</style>' +
                '</head>' +
                '<body align="center" width="100%" bgcolor="'+outerColor+'" style="text-align:center; width:100%; background-color:'+outerColor+'">' +
                    '<div align="center" width="100%" bgcolor="'+outerColor+'" style="display:inline-block; text-align:center; width:100%; max-width:' + $AEE.maxWidth() + 'px; background-color:'+outerColor+'; margin:0 auto 0 auto">' +
                        '<!--[if mso]>' +
                            '<div align="center" class="outlook" style="text-align:center">' +
                                '<table cellpadding="0" cellspacing="0" border="0" width="' + Math.min($AEE.maxWidth(), 800) + '" style="width:' + Math.min($AEE.maxWidth(), 800) + 'px">' +
                                    '<tr>' +
                                        '<td>' +
                        '<![endif]-->' +

                        html +

                        '<!--[if mso]>' +
                                        '</td>' +
                                    '</tr>' +
                                '</table>' +
                            '</div>' +
                        '<![endif]-->' +
                    '</div>' +
                '</body>' +
            '</html>';

        return htmlCode;
    };
});