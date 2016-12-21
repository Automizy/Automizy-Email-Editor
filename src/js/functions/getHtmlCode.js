define([
    "core"
], function () {
    $AEE.getHtmlCodeInProgress = false;
    var htmlCode = '';
    $AEE.getHtmlCode = function (options) {
        if(typeof options === 'undefined'){
            var options = {};
        }
        if($AEE.getHtmlCodeInProgress){
            return htmlCode;
        }
        $AEE.delay(function(){
            $AEE.getHtmlCodeInProgress = false;
        }, 50);


        var previewText = $AEE.inputs.blockSettingsPreviewText.val();

        previewTextElement = '';
        var shareText = $AEE.getDescription().substring(0, 150);
        if(previewText.length > 0){
            previewTextElement = '<div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">'+previewText+'</div>';
            shareText = previewText;
        }

        var metaTags = [
            '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">',
            '<meta property="og:title" content="[{subject}]" />',
            '<meta property="og:description" content="' + shareText + '..." />',
            '<meta property="og:type" content="website" />',
            '<meta property="og:url" content="[{webversion}]" />',
            '<meta property="og:image" content="' + $AEE.d.config.url + '/images/automizy-logo-100x100.jpg" />'
        ];

        var maxWidth = $AEE.maxWidth();

        var responsiveEmail = $AEE.inputs.blockSettingsResponsiveEmail.checked();

        htmlCode = '';
        $AEE.getHtmlCodeInProgress = true;
        $AEE.elements.$document.css('max-width', 'none').find('.aee-block-content-cell').each(function(){
            var $t = $(this);
            $t.attr('data-width', $t.width());
        });
        $AEE.elements.$document.css('max-width', '80%');
        var $document = $AEE.elements.$document.clone('.aee-block-content-cell');
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

        $html.find('.automizy-remove-tr').parent().remove();

        $html.find('.aee-block-handle, .aee-image-block-content .aee-image-block-button, aee-image-block-content br, .aee-gallery-block-element.aee-empty, .aee-gallery-block-element-separator, .aee-columns-block-column:not(.aee-active)').remove();


        $html.find('.aee-block').each(function(){
            var $block = $(this);
            if(!$block.hasClass('aee-html-block-item')){
                $block.attr('data-not-html-block', 'true');
            }
            var segments = $block.attr('data-dynamic-segments');
            if(typeof segments !== 'undefined'){
                $block.before('<!--[[CONDITION:{"blockshows":"segments","segments":['+segments+']}]]-->');
            }else{
                $block.before('<!--[[CONDITION:{"blockshows":"all","segments":null}]]-->');
            }
            $block.after('<!--[[CONDITION:{"blockshows":"all","segments":null}]]-->');
        });


        /* RebuildColumns */
        function rebuildColumnBlock(){
            var $block = $html.find('.aee-block.aee-columns-block-item:not(.aee-column-converted):first');
            if($block.length <= 0){
                return false;
            }
            var floatable = $A.parseBoolean($block.attr('data-floatable'));
            if(floatable && responsiveEmail){
                var $contentCell = $block.find('.aee-block-content-cell:first');
                var $childrens = $contentCell.children('.aee-active');
                var contentCellWidth = $contentCell.attr('data-width');
                var childrensLength = $childrens.length;
                //var minWidth = 480/childrensLength;
                //var minWidth = 360/childrensLength;
                var minWidth = 250;
                if(childrensLength === 2){
                    minWidth = 250;
                }else if(childrensLength === 3){
                    minWidth = 200;
                }else if(childrensLength === 4){
                    minWidth = 150;
                }

                $contentCell.attr('align', 'center');
                var contentCellStyle = $contentCell.attr('style').replace('text-align:left', 'text-align:center');
                $contentCell.attr('style', contentCellStyle);

                $childrens.each(function(index){
                    var $t = $(this);
                    var percentWidth = parseInt($t.attr('data-width-in-percent'));
                    var elementMinWidth = parseInt($t.attr('data-min-width') || minWidth);
                    var pxWidth = contentCellWidth / 100 * percentWidth;
                    var pxFloat = pxWidth - 75;

                    $t.attr('style', 'display:inline-block; max-width:'+percentWidth+'%; min-width:'+elementMinWidth+'px; vertical-align:top; width:100%;');

                    $t.add($t.children().first()).addClass('aee-wrapper').attr('data-mobile', 'android');
                    if(index === 0) {
                        $t.before('<!--[[COMMENT:[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="' + maxWidth + '"><tr><td align="left" valign="top" width="'+pxWidth+'"><![endif]]]-->');
                    }else{
                        $t.before('<!--[[COMMENT:[if (gte mso 9)|(IE)]></td><td align="left" valign="top" width="'+pxWidth+'"><![endif]]]-->');
                    }
                    if(index > 0 && index === childrensLength-1){
                        $t.after('<!--[[COMMENT:[if (gte mso 9)|(IE)]></td></tr></table><![endif]]]-->');
                    }
                });
            }else{
                var $table = $('<table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%; border:none; padding:0; margin:0"></table>');
                var $tr = $('<tr></tr>').appendTo($table);
                $block.find('.aee-block-content-cell:first').children('.aee-active').each(function(){
                    var $t = $(this);
                    var width = $t.attr('data-width-in-percent');
                    $('<td width="'+width+'%" valign="top" align="left" style="margin:0; padding:0; border:none; width:'+width+'%; vertical-align:top; text-align:left"></td>').html($t.html()).appendTo($tr);
                });
                $block.find('.aee-block-content-cell:first').html($table);
            }


            $block.addClass('aee-column-converted');
            rebuildColumnBlock();
        }
        rebuildColumnBlock();

        $html.find('.aee-block').each(function(){
            var $block = $(this);
            var $contentCell = $block.find('.aee-block-content-cell:first');
            var contentCellWidth = parseInt($contentCell.attr('data-width'));

            if($contentCell.find('.aee-block-content-cell').length <= 0) {
                $contentCell.find('.aee-imagepicker-image').each(function () {
                    var $img = $(this);
                    var $parent = $img.parent();
                    if ($parent.hasClass('ui-wrapper')) {
                        $img.insertAfter($parent);
                        $parent.remove();
                        $parent = $img.parent();
                    }
                    $img.closest('.aee-gallery-block-element').contents().unwrap();
                    $img.removeStyles('resize', 'position', 'zoom', 'display', 'opacity');
                    if ($img.is('[data-percent-width]')) {
                        $img[0].style.maxWidth = $img.attr('data-percent-width') + '%';
                        //$img[0].style.minWidth = $img.attr('data-percent-width') + '%';
                    }
                    if ($img.is('[data-width]')) {
                        $img[0].style.width = $img.attr('data-width') + 'px';
                    }
                    $img.attr('width', $img.width());

                    $img[0].style.margin = 0;
                    $img[0].style.border = 'none';

                    if (!responsiveEmail) {
                        var dataWidth = parseInt($img.attr('data-width'));
                        var minWidth = dataWidth + 'px';
                        //var imgMaxWidth = dataWidth + 'px';
                        var imgMaxWidth = $img.attr('data-percent-width') + '%';
                        //imgMaxWidth = '100%';

                        width = dataWidth + 'px';
                        if(contentCellWidth > dataWidth){
                            contentCellWidth = dataWidth;
                        }

                        $img.attr('style', 'margin:0; border:none; max-width:' + imgMaxWidth + '; width:' + contentCellWidth + 'px');
                        $img.attr('width', contentCellWidth);
                    }
                });
            }

            if($block.hasClass('aee-gallery-block-item')){
                var distance = $block.attr('data-space');
                $AEE.elements.$gallerySeparatorHtml.attr('width', distance).css({width:distance+'px'});
                $contentCell.find('.aee-imagepicker-image').each(function(index){
                    if(index > 0){
                        $(this).before($AEE.elements.$gallerySeparatorHtml[0].outerHTML);
                    }
                });
            }

            //contentCellBackgroundColor = $AEE.rgbStyleToHex($contentCell[0].style.backgroundColor);
            //$block.attr('style', 'width:100%; margin:0; padding:0; border:none; outline:none; background-color:' + contentCellBackgroundColor + '; border-color:' + contentCellBackgroundColor);
            $block.attr('style', 'width:100%; margin:0; padding:0; border:none; outline:none');

        });


        $html.find('[data-not-html-block]').addClass('aee-not-html-block').removeAttr('data-not-html-block');

        $html.find('.aee-not-html-block *').andSelf().removeAttr('id contenteditable data-mce-style spellcheck data-space data-percent-width data-width data-width-in-percent data-column-1 data-column-2 data-column-3 data-column-4 data-floatable data-responsive-email data-mobile');
        $html.find('.aee-not-html-block *').andSelf().not('.aee-noremoveclass').not('.aee-columns-block-column').not('.aee-wrapper').removeAttr('class');


        var $aElements = $html.find('a');
        var $areaElements = $html.find('area');
        $aElements.attr('rel', 'noopener noreferrer').attr('target', '_blank');





        var links = [];
        $aElements.add($areaElements).each(function(){
            links.push($(this).attr('href'));
        });
        links = links.filter(function(item, pos) {
            return links.indexOf(item) == pos;
        });


        var originalLinks = $AEE.links();
        var goals = {};
        for(var i = 0; i < originalLinks.length; i++){
            goals[originalLinks[i].url] = originalLinks[i].goal;
        }


        var goalLinks = [];
        for(var i = 0; i < links.length; i++){
            if(typeof links[i] === 'undefined' || links[i] === null || links[i] === ''){
                continue;
            }
            goalLinks.push({
                url:links[i],
                goal:goals[links[i]] || false
            });
        }


        $AEE.links(goalLinks);





        var html = $html[0].outerHTML;

        html = html.replace(/(\[%7B|%7B%7B)(.*?)(%7D]|%7D%7D)/g, function(match,$1,$2,$3){
            var start = '{{';
            var end = '}}';
            if($1 === '[%7B'){
                start = '[{';
            }
            if($3 === '%7D]'){
                end = '}]';
            }
            return start + $2 + end;
        }).replace(/https:\/\/app\.(automizy|protopmail)\.com\/?(\[{|{{)(.*?)(}]|}})/g, function(match,$1,$2,$3,$4){
            return $2 + $3 + $4;
        }).replace(/\[\{(.*?)\}\]/g, function(match,$1){
            var value = '[{'+$1+'}]';
            if($1 === 'share_facebook'){
                value = "https://www.facebook.com/sharer/sharer.php?u=[{webversion}]";
            }else if($1 === 'share_twitter'){
                value = "http://twitter.com/share?via=protopmail&text=" + encodeURI($AEE.subject()) + "&url=[{webversion}]";
            }else if($1 === 'share_gplus'){
                value = "https://plus.google.com/share?url=[{webversion}]";
            }else if($1 === 'share_linkedin'){
                value = "http://www.linkedin.com/shareArticle?mini=true&title=" + encodeURI($AEE.subject()) + "&summary=" + shareText + "...&source=Automizy&url=[{webversion}]";
            }
            return value;
        }).replace(/&amp;/g, '&');

        var outerColor = $AEE.inputs.blockSettingsDocumentOuterColor.val();
        if(outerColor.length <= 0){
            outerColor = '#ffffff';
        }


        if(responsiveEmail) {
            metaTags.push('<meta name="viewport" content="width=device-width, initial-scale=1.0"/>');

            var content = previewTextElement +
                '<div align="center" bgcolor="' + outerColor + '" style="font-family: arial, helvetica, sans-serif; text-align:center; max-width:' + maxWidth + 'px; background-color:' + outerColor + '; margin:0 auto 0 auto">' +
                '<!--[if mso]>' +
                '<div align="center" class="outlook" style="text-align:center">' +
                '<table cellpadding="0" cellspacing="0" border="0" width="' + Math.min(maxWidth, 800) + '" style="width:' + Math.min(maxWidth, 800) + 'px">' +
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
                '</div>';
        }else{
            var content = previewTextElement +
                '<div align="center" width="' + maxWidth + 'px" bgcolor="' + outerColor + '" style="font-family: arial, helvetica, sans-serif; text-align:center; width:' + maxWidth + 'px; background-color:' + outerColor + '; margin:0 auto 0 auto">' +
                '<div align="center" class="outlook" style="text-align:center">' +
                '<table cellpadding="0" cellspacing="0" border="0" width="' + maxWidth + '" style="width:' + maxWidth + 'px; min-width:' + maxWidth + 'px">' +
                '<tr>' +
                '<td>' +

                html +

                '</td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '</div>';
        }


        var regex = /<!--\[\[COMMENT:(.*?)\]\]-->/g;
        content = content.replace(regex, "<!--$1-->");


        htmlCode = '' +
            '<!DOCTYPE>' +
            '<html>' +
                '<head>' +
                    //'<title>[{subject}]</title>' +
                    '<title></title>' +

                    metaTags.join('') +

                    '<style>\r\n' +

                    '.aee-not-html-block, .aee-not-html-block table, .aee-not-html-block td, .aee-not-html-block a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}\r\n' +
                    '.aee-not-html-block, .aee-not-html-block table, .aee-not-html-block td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;}\r\n' +
                    '.aee-not-html-block img{-ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}\r\n' +
                    '.aee-not-html-block, .aee-not-html-block table{border-collapse: collapse !important;}\r\n' +

                    '@media screen and (max-width: 525px) {\r\n' +
                        '.aee-wrapper{\r\n' +
                            'width:100% !important;\r\n' +
                            'min-width:100% !important;\r\n' +
                            'max-width:100% !important;\r\n' +
                        '}\r\n' +
                    '}\r\n' +

                    '</style>' +
                '</head>' +
                '<body align="center" width="100%" bgcolor="'+outerColor+'" style="font-family: arial, helvetica, sans-serif; text-align:center; width:100%; background-color:'+outerColor+'">' +

                    content +

                '</body>' +
            '</html>';

        if(options.conditions !== true) {
            if (options.conditions === false || !$AEE.dynamicBlocks()) {
                htmlCode = htmlCode.replace(/<\!\-\-\[\[.*?\]\]\-\->/g, "");
            }
        }
        return htmlCode;
    };
});