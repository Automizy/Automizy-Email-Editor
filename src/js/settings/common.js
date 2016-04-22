define([
    "js/functions/core/ready"
], function () {
    $AEE.ready(function(){
        $AEE.settings.systemFieldStart = '[{';
        $AEE.settings.systemFieldEnd = '}]';
        $AEE.settings.customFieldStart = '{{';
        $AEE.settings.customFieldEnd = '}}';


        $AEE.settings.fontFamilies = [
            ['Arial, Helvetica, sans-serif', 'Arial'],
            ['Arial Black, Gadget, sans-serif', 'Arial Black'],
            ['Comic Sans MS, cursive, sans-serif', 'Comic Sans MS'],
            ['Courier New, Courier, monospace', 'Courier New'],
            ['Georgia, serif', 'Georgia'],
            ['Impact, Charcoal, sans-serif', 'Impact'],
            ['Lucida Console, Monaco, monospace', 'Lucida Console'],
            ['Lucida Sans Unicode, Lucida Grande, sans-serif', 'Lucida Sans Unicode'],
            ['Palatino Linotype, Book Antiqua, Palatino, serif', 'Palatino Linotype'],
            ['Tahoma, Geneva, sans-serif', 'Tahoma'],
            ['Times New Roman, Times, serif', 'Times New Roman'],
            ['Trebuchet MS, Helvetica, sans-serif', 'Trebuchet MS'],
            ['Verdana, Geneva, sans-serif', 'Verdana']
        ];


        $AEE.settings.niceScroll = {
            autohidemode: false,
            cursorcolor: "rgba(0, 0, 0, 0.2)",
            cursorborder: "none",
            cursorwidth: "9px"
        };


        $AEE.settings.imgResizable = {
            ghost: false,
            aspectRatio: true,
            start: function (event, ui) {
                $(this).find("img").css({
                    opacity: 0.3
                });
                var $content = ui.element.closest(".aee-block-content-cell");
                var maxImgWidth = $content.width();

                $(this).resizable("option", "maxWidth", maxImgWidth)
            },
            stop: function (event, ui) {
                var $content = ui.element.closest(".aee-block-content-cell");
                $AEE.setImageSize($content);
            },
            create:function(event, ui){
                var $content = $(this).closest(".aee-block-content-cell");
                (function($content){setTimeout(function(){
                    $AEE.setImageSize($content);
                }, 100);})($content);


                (function($content){setTimeout(function(){
                    $AEE.setImageSize($content);
                }, 1000);})($content);
            }
        };
        $AEE.settings.imgGalleryResizable = {
            ghost: false,
            aspectRatio: true,
            start: function (event, ui) {
                $(this).find("img").css({
                    opacity: 0.3
                });
                var $content = ui.element.closest(".aee-block-content-cell");
                var maxImgWidth = $content.width();

                $(this).resizable("option", "maxWidth", maxImgWidth)
            },
            stop: function (event, ui) {
                $(this).find("img").css({
                    opacity: 1
                });
            }
        };


        tinyMCE.baseURL = $AEE.baseDir() + '/vendor/tinymce';// trailing slash important
        $AEE.settings.tinymceBlock = {
            oninit: function (editor) {
                editor.focus();
            },
            inline: true,
            theme: "modern",
            width: "100%",
            forced_root_block : "",
            height: "400px",
            /*schema: "html5",*/
            convert_fonts_to_spans: true,
            entity_encoding:"raw",
            valid_elements: ""
            + "a[accesskey|charset|class|coords|dir<ltr?rtl|href|hreflang|id|lang|name|rel|rev|shape<circle?default?poly?rect|style|tabindex|title|target|type],"
            + "abbr[class|dir<ltr?rtl|id|lang|style|title],"
            + "acronym[class|dir<ltr?rtl|id|id|lang|style|title],"
            + "address[class|align|dir<ltr?rtl|id|lang|style|title],"
            + "applet[align<bottom?left?middle?right?top|alt|archive|class|code|codebase|height|hspace|id|name|object|style|title|vspace|width],"
            + "area[accesskey|alt|class|coords|dir<ltr?rtl|href|id|lang|nohref<nohref|shape<circle?default?poly?rect|style|tabindex|title|target],"
            + "b/strong[class|dir<ltr?rtl|id|lang|style|title],"
            + "base[href|target],"
            + "basefont[color|face|id|size],"
            + "bdo[class|dir<ltr?rtl|id|lang|style|title],"
            + "big[class|dir<ltr?rtl|id|lang|style|title],"
            + "blockquote[cite|class|dir<ltr?rtl|id|lang|style|title],"
            + "body[alink|background|bgcolor|class|dir<ltr?rtl|id|lang|link|style|title|text|vlink],"
            + "br[class|clear<all?left?none?right|id|style|title],"
            + "button[accesskey|class|dir<ltr?rtl|disabled<disabled|id|lang|name|style|tabindex|title|type|value],"
            + "caption[align<bottom?left?right?top|class|dir<ltr?rtl|id|lang|style|title],"
            + "center[class|dir<ltr?rtl|id|lang|style|title],"
            + "cite[class|dir<ltr?rtl|id|lang|style|title],"
            + "code[class|dir<ltr?rtl|id|lang|style|title],"
            + "col[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id|lang|span|style|title|valign<baseline?bottom?middle?top|width],"
            + "colgroup[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id|lang|span|style|title|valign<baseline?bottom?middle?top|width],"
            + "dd[class|dir<ltr?rtl|id|lang|style|title],"
            + "del[cite|class|datetime|dir<ltr?rtl|id|lang|style|title],"
            + "dfn[class|dir<ltr?rtl|id|lang|style|title],"
            + "dir[class|compact<compact|dir<ltr?rtl|id|lang|style|title],"
            + "div[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "dl[class|compact<compact|dir<ltr?rtl|id|lang|style|title],"
            + "dt[class|dir<ltr?rtl|id|lang|style|title],"
            //+ "em/i[class|dir<ltr?rtl|id|lang|style|title],"
            + "fieldset[class|dir<ltr?rtl|id|lang|style|title],"
            + "font[class|color|dir<ltr?rtl|face|id|lang|size|style|title],"
            + "form[accept|accept-charset|action|class|dir<ltr?rtl|enctype|id|lang|method<get?post|name|style|title|target],"
            + "frame[class|frameborder|id|longdesc|marginheight|marginwidth|name|noresize<noresize|scrolling<auto?no?yes|src|style|title],"
            //+ "frameset[class|cols|id|onload|onunload|rows|style|title],"
            + "h1[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "h2[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "h3[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "h4[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "h5[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "h6[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "head[dir<ltr?rtl|lang|profile],"
            + "hr[align<center?left?right|class|dir<ltr?rtl|id|lang|noshade<noshade|size|style|title|width],"
            + "html[dir<ltr?rtl|lang|version],"
            + "i/em[class|dir<ltr?rtl|id|lang|style|title],"
            //+ "iframe[align<bottom?left?middle?right?top|class|frameborder|height|id|longdesc|marginheight|marginwidth|name|scrolling<auto?no?yes|src|style|title|width],"
            + "img[align<bottom?left?middle?right?top|alt|border|class|dir<ltr?rtl|height|hspace|id|ismap<ismap|lang|longdesc|name|src|style|title|usemap|vspace|width],"
            + "input[accept|accesskey|align<bottom?left?middle?right?top|alt|checked<checked|class|dir<ltr?rtl|disabled<disabled|id|ismap<ismap|lang|maxlength|name|readonly<readonly|size|src|style|tabindex|title|type<button?checkbox?file?hidden?image?password?radio?reset?submit?text|usemap|value],"
            + "ins[cite|class|datetime|dir<ltr?rtl|id|lang|style|title],"
            + "isindex[class|dir<ltr?rtl|id|lang|prompt|style|title],"
            + "kbd[class|dir<ltr?rtl|id|lang|style|title],"
            + "label[accesskey|class|dir<ltr?rtl|for|id|lang|style|title],"
            + "legend[align<bottom?left?right?top|accesskey|class|dir<ltr?rtl|id|lang|style|title],"
            + "li[class|dir<ltr?rtl|id|lang|style|title|type|value],"
            + "link[charset|class|dir<ltr?rtl|href|hreflang|id|lang|media|rel|rev|style|title|target|type],"
            + "map[class|dir<ltr?rtl|id|lang|name|style|title],"
            + "menu[class|compact<compact|dir<ltr?rtl|id|lang|style|title],"
            + "meta[content|dir<ltr?rtl|http-equiv|lang|name|scheme],"
            + "noframes[class|dir<ltr?rtl|id|lang|style|title],"
            + "noscript[class|dir<ltr?rtl|id|lang|style|title],"
            + "object[align<bottom?left?middle?right?top|archive|border|class|classid|codebase|codetype|data|declare|dir<ltr?rtl|height|hspace|id|lang|name|standby|style|tabindex|title|type|usemap|vspace|width],"
            + "ol[class|compact<compact|dir<ltr?rtl|id|lang|start|style|title|type],"
            + "optgroup[class|dir<ltr?rtl|disabled<disabled|id|label|lang|style|title],"
            + "option[class|dir<ltr?rtl|disabled<disabled|id|label|lang|selected<selected|style|title|value],"
            + "p[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "param[id|name|type|value|valuetype<DATA?OBJECT?REF],"
            + "pre/listing/plaintext/xmp[align|class|dir<ltr?rtl|id|lang|style|title|width],"
            + "q[cite|class|dir<ltr?rtl|id|lang|style|title],"
            + "s[class|dir<ltr?rtl|id|lang|onclick|style|title],"
            + "samp[class|dir<ltr?rtl|id|lang|onclick|style|title],"
            //+ "script[charset|defer|language|src|type],"
            + "select[class|dir<ltr?rtl|disabled<disabled|id|lang|multiple<multiple|name|size|style|tabindex|title],"
            + "small[class|dir<ltr?rtl|id|lang|style|title],"
            + "span[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "strike[class|class|dir<ltr?rtl|id|lang|style|title],"
            //+ "strong/b[class|dir<ltr?rtl|id|lang|style|title],"
            + "style[dir<ltr?rtl|lang|media|title|type],"
            + "sub[class|dir<ltr?rtl|id|lang|style|title],"
            + "sup[class|dir<ltr?rtl|id|lang|style|title],"
            + "table[align<center?left?right|bgcolor|border|cellpadding|cellspacing|class|dir<ltr?rtl|frame|height|id|lang|rules|style|summary|title|width|background],"
            + "tbody[align<center?char?justify?left?right|char|class|charoff|dir<ltr?rtl|id|lang|style|title|background|valign<baseline?bottom?middle?top],"
            + "td[abbr|align<center?char?justify?left?right|axis|background|bgcolor|char|charoff|class|background|colspan|dir<ltr?rtl|headers|height|id|lang|nowrap<nowrap|rowspan|scope<col?colgroup?row?rowgroup|style|title|valign<baseline?bottom?middle?top|width],"
            + "textarea[accesskey|class|cols|dir<ltr?rtl|disabled<disabled|id|lang|name|readonly<readonly|rows|style|tabindex|title],"
            + "tfoot[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],"
            + "th[abbr|align<center?char?justify?left?right|axis|bgcolor|char|charoff|class|colspan|background|dir<ltr?rtl|headers|height|id|lang|nowrap<nowrap|rowspan|scope<col?colgroup?row?rowgroup|style|title|valign<baseline?bottom?middle?top|width],"
            + "thead[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],"
            + "title[dir<ltr?rtl|lang],"
            + "tr[abbr|align<center?char?justify?left?right|bgcolor|char|charoff|class|rowspan|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],"
            + "tt[class|dir<ltr?rtl|id|lang|style|title],"
            + "u[class|dir<ltr?rtl|id|lang|style|title],"
            + "ul[class|compact<compact|dir<ltr?rtl|id|lang|style|title|type],"
            + "var[class|dir<ltr?rtl|id|lang|style|title]",
            valid_children: "+body[title|meta],+a[div|span|table|tr|td|th|ul|li|ol|br|a|h1|h2|h3|h4|h5|h6|h7|b|u|i|sup|sub|strong|small]",
            //skin_url: 'css/tinymce/custom',
            menubar: false,
            formats: {
                bold : {inline : 'b'},
                italic : {inline : 'i'},
                underline : {inline : 'u'}
            },
            fontsize_formats: "6pt 8pt 10pt 11pt 12pt 13pt 14pt 16pt 18pt 20pt 24pt 28pt 34pt 36pt",
            plugins: "colorpicker textcolor table link code contextmenu",
            tools: "inserttable",
            theme_advanced_text_colors : "FF00FF,FFFF00,00FF00,FF0000,0000FF,000000",
            link_list: [
                {
                    title: $A.translate('Email address'),
                    value: 'mailto:' + $AEE.settings.systemFieldStart + 'emailaddress' + $AEE.settings.systemFieldEnd
                },
                {
                    title: $A.translate('Web version'),
                    value: $AEE.settings.systemFieldStart + 'webversion' + $AEE.settings.systemFieldEnd
                },
                {
                    title: $A.translate('Unsubscribe link'),
                    value: $AEE.settings.systemFieldStart + 'unsubscribelink' + $AEE.settings.systemFieldEnd
                }
            ],
            toolbar: [
                "styleselect | undo redo | alignleft aligncenter alignright alignjustify | image | link | bullist numlist | customfields systemfields",
                "bold italic underline | fontselect fontsizeselect | forecolor backcolor | table | code"
            ],
            contextmenu: "link inserttable | cell row column deletetable",
            setup: function (editor) {
                var hasNodeClass = function(target, className){
                    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
                };
                var getColor = function(e){
                    var color = '#000000';
                    for(var i = 0; i < e.parents.length; i++){
                        if(typeof e.parents[i].style === 'object' && typeof e.parents[i].style.color === 'string' && e.parents[i].style.color.length > 0){
                            color = e.parents[i].style.color;
                            break;
                        }
                    }
                    return color;
                };
                editor.addButton('jqueryTextColorpicker', {
                    text: 'Text color',
                    icon: 'forecolor',
                    onclick: function() {
                        var color = getColor(editor.selection.getNode());
                        editor.formatter.apply('jqueryTextColor', {value : 'red'});
                    }
                });
                editor.addButton('customfields', {
                    type: 'menubutton',
                    text: $A.translate('Custom fields'),
                    icon: false,
                    menu: [
                        {
                            text: $A.translate('User defined'),
                            menu: $AEE.getTinyMceUserDefinedMenu(editor)
                        },
                        {
                            text: $A.translate('Built-in'),
                            menu: $AEE.getTinyMceBuiltInMenu(editor)
                        }
                    ]
                });
                editor.on('BeforeSetContent', function(e) {
                    /*fix: link underline*/
                    if(e.content.substring(0, 3) === '<a '){
                        if(e.content.indexOf('data-mce-href') < 0){
                            e.content = $(e.content).attr('style', 'text-decoration:none').wrapInner('<u></u>')[0].outerHTML;
                        }
                    }
                    console.log('BeforeSetContent event', e);
                });
                editor.on('NodeChange', function(e) {
                    console.log('NodeChange event', e);
                    console.log($AEE.rgbStyleToHex(getColor(e)));
                });
                /*
                editor.on('AddUndo', function(e) {
                    console.log('AddUndo event', e);
                });
                editor.on('BeforeAddUndo', function(e) {
                    console.log('BeforeAddUndo event', e);
                });
                editor.on('BeforeRenderUI', function(e) {
                    console.log('BeforeRenderUI event', e);
                });
                editor.on('GetContent', function(e) {
                    console.log('GetContent event', e);
                });
                editor.on('LoadContent', function(e) {
                    console.log('LoadContent event', e);
                });
                editor.on('NodeChange', function(e) {
                    console.log('NodeChange event', e);
                });
                editor.on('ObjectResizeStart', function(e) {
                    console.log('ObjectResizeStart event', e);
                });
                editor.on('ObjectResized', function(e) {
                    console.log('ObjectResized event', e);
                });
                editor.on('ObjectSelected', function(e) {
                    console.log('ObjectSelected event', e);
                });
                editor.on('PostProcess', function(e) {
                    console.log('PostProcess event', e);
                });
                editor.on('PreInit', function(e) {
                    console.log('PreInit event', e);
                });
                editor.on('PreProcess', function(e) {
                    console.log('PreProcess event', e);
                });
                editor.on('ProgressState', function(e) {
                    console.log('ProgressState event', e);
                });
                editor.on('SaveContent', function(e) {
                    console.log('SaveContent event', e);
                });
                editor.on('SetAttrib', function(e) {
                    console.log('SetAttrib event', e);
                });
                editor.on('activate', function(e) {
                    console.log('activate event', e);
                });
                editor.on('blur', function(e) {
                    console.log('blur event', e);
                });
                editor.on('change', function(e) {
                    console.log('change event', e);
                });
                editor.on('deactivate', function(e) {
                    console.log('deactivate event', e);
                });
                editor.on('focus', function(e) {
                    console.log('focus event', e);
                });
                editor.on('hide', function(e) {
                    console.log('hide event', e);
                });
                editor.on('init', function(e) {
                    console.log('init event', e);
                });
                editor.on('redo', function(e) {
                    console.log('redo event', e);
                });
                editor.on('remove', function(e) {
                    console.log('remove event', e);
                });
                editor.on('hide', function(e) {
                    console.log('hide event', e);
                });
                editor.on('reset', function(e) {
                    console.log('reset event', e);
                });
                editor.on('show', function(e) {
                    console.log('show event', e);
                });
                editor.on('submit', function(e) {
                    console.log('submit event', e);
                });
                editor.on('undo', function(e) {
                    console.log('undo event', e);
                });
                editor.on('ExecCommand', function(e) {
                    console.log('ExecCommand event', e);
                });
                editor.on('BeforeExecCommand', function(e) {
                    console.log('BeforeExecCommand event', e);
                });
                */
            }
        };









        $AEE.settings.tinymceHtmlBlock = {
            oninit: function (editor) {
                editor.focus();
            },
            theme: "modern",
            width: "100%",
            forced_root_block : "",
            height: "400px",
            /*schema: "html5",*/
            convert_fonts_to_spans: false,
            entity_encoding:"raw",
            valid_elements: ""
            + "a[accesskey|charset|class|coords|dir<ltr?rtl|href|hreflang|id|lang|name|rel|rev|shape<circle?default?poly?rect|style|tabindex|title|target|type],"
            + "abbr[class|dir<ltr?rtl|id|lang|style|title],"
            + "acronym[class|dir<ltr?rtl|id|id|lang|style|title],"
            + "address[class|align|dir<ltr?rtl|id|lang|style|title],"
            + "applet[align<bottom?left?middle?right?top|alt|archive|class|code|codebase|height|hspace|id|name|object|style|title|vspace|width],"
            + "area[accesskey|alt|class|coords|dir<ltr?rtl|href|id|lang|nohref<nohref|shape<circle?default?poly?rect|style|tabindex|title|target],"
            + "b/strong[class|dir<ltr?rtl|id|lang|style|title],"
            + "base[href|target],"
            + "basefont[color|face|id|size],"
            + "bdo[class|dir<ltr?rtl|id|lang|style|title],"
            + "big[class|dir<ltr?rtl|id|lang|style|title],"
            + "blockquote[cite|class|dir<ltr?rtl|id|lang|style|title],"
            + "body[alink|background|bgcolor|class|dir<ltr?rtl|id|lang|link|style|title|text|vlink],"
            + "br[class|clear<all?left?none?right|id|style|title],"
            + "button[accesskey|class|dir<ltr?rtl|disabled<disabled|id|lang|name|style|tabindex|title|type|value],"
            + "caption[align<bottom?left?right?top|class|dir<ltr?rtl|id|lang|style|title],"
            + "center[class|dir<ltr?rtl|id|lang|style|title],"
            + "cite[class|dir<ltr?rtl|id|lang|style|title],"
            + "code[class|dir<ltr?rtl|id|lang|style|title],"
            + "col[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id|lang|span|style|title|valign<baseline?bottom?middle?top|width],"
            + "colgroup[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id|lang|span|style|title|valign<baseline?bottom?middle?top|width],"
            + "dd[class|dir<ltr?rtl|id|lang|style|title],"
            + "del[cite|class|datetime|dir<ltr?rtl|id|lang|style|title],"
            + "dfn[class|dir<ltr?rtl|id|lang|style|title],"
            + "dir[class|compact<compact|dir<ltr?rtl|id|lang|style|title],"
            + "div[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "dl[class|compact<compact|dir<ltr?rtl|id|lang|style|title],"
            + "dt[class|dir<ltr?rtl|id|lang|style|title],"
                //+ "em/i[class|dir<ltr?rtl|id|lang|style|title],"
            + "fieldset[class|dir<ltr?rtl|id|lang|style|title],"
            + "font[class|color|dir<ltr?rtl|face|id|lang|size|style|title],"
            + "form[accept|accept-charset|action|class|dir<ltr?rtl|enctype|id|lang|method<get?post|name|style|title|target],"
            + "frame[class|frameborder|id|longdesc|marginheight|marginwidth|name|noresize<noresize|scrolling<auto?no?yes|src|style|title],"
                //+ "frameset[class|cols|id|onload|onunload|rows|style|title],"
            + "h1[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "h2[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "h3[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "h4[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "h5[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "h6[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "head[dir<ltr?rtl|lang|profile],"
            + "hr[align<center?left?right|class|dir<ltr?rtl|id|lang|noshade<noshade|size|style|title|width],"
            + "html[dir<ltr?rtl|lang|version],"
            + "i/em[class|dir<ltr?rtl|id|lang|style|title],"
                //+ "iframe[align<bottom?left?middle?right?top|class|frameborder|height|id|longdesc|marginheight|marginwidth|name|scrolling<auto?no?yes|src|style|title|width],"
            + "img[align<bottom?left?middle?right?top|alt|border|class|dir<ltr?rtl|height|hspace|id|ismap<ismap|lang|longdesc|name|src|style|title|usemap|vspace|width],"
            + "input[accept|accesskey|align<bottom?left?middle?right?top|alt|checked<checked|class|dir<ltr?rtl|disabled<disabled|id|ismap<ismap|lang|maxlength|name|readonly<readonly|size|src|style|tabindex|title|type<button?checkbox?file?hidden?image?password?radio?reset?submit?text|usemap|value],"
            + "ins[cite|class|datetime|dir<ltr?rtl|id|lang|style|title],"
            + "isindex[class|dir<ltr?rtl|id|lang|prompt|style|title],"
            + "kbd[class|dir<ltr?rtl|id|lang|style|title],"
            + "label[accesskey|class|dir<ltr?rtl|for|id|lang|style|title],"
            + "legend[align<bottom?left?right?top|accesskey|class|dir<ltr?rtl|id|lang|style|title],"
            + "li[class|dir<ltr?rtl|id|lang|style|title|type|value],"
            + "link[charset|class|dir<ltr?rtl|href|hreflang|id|lang|media|rel|rev|style|title|target|type],"
            + "map[class|dir<ltr?rtl|id|lang|name|style|title],"
            + "menu[class|compact<compact|dir<ltr?rtl|id|lang|style|title],"
            + "meta[content|dir<ltr?rtl|http-equiv|lang|name|scheme],"
            + "noframes[class|dir<ltr?rtl|id|lang|style|title],"
            + "noscript[class|dir<ltr?rtl|id|lang|style|title],"
            + "object[align<bottom?left?middle?right?top|archive|border|class|classid|codebase|codetype|data|declare|dir<ltr?rtl|height|hspace|id|lang|name|standby|style|tabindex|title|type|usemap|vspace|width],"
            + "ol[class|compact<compact|dir<ltr?rtl|id|lang|start|style|title|type],"
            + "optgroup[class|dir<ltr?rtl|disabled<disabled|id|label|lang|style|title],"
            + "option[class|dir<ltr?rtl|disabled<disabled|id|label|lang|selected<selected|style|title|value],"
            + "p[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "param[id|name|type|value|valuetype<DATA?OBJECT?REF],"
            + "pre/listing/plaintext/xmp[align|class|dir<ltr?rtl|id|lang|style|title|width],"
            + "q[cite|class|dir<ltr?rtl|id|lang|style|title],"
            + "s[class|dir<ltr?rtl|id|lang|onclick|style|title],"
            + "samp[class|dir<ltr?rtl|id|lang|onclick|style|title],"
                //+ "script[charset|defer|language|src|type],"
            + "select[class|dir<ltr?rtl|disabled<disabled|id|lang|multiple<multiple|name|size|style|tabindex|title],"
            + "small[class|dir<ltr?rtl|id|lang|style|title],"
            + "span[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|style|title],"
            + "strike[class|class|dir<ltr?rtl|id|lang|style|title],"
                //+ "strong/b[class|dir<ltr?rtl|id|lang|style|title],"
            + "style[dir<ltr?rtl|lang|media|title|type],"
            + "sub[class|dir<ltr?rtl|id|lang|style|title],"
            + "sup[class|dir<ltr?rtl|id|lang|style|title],"
            + "table[align<center?left?right|bgcolor|border|cellpadding|cellspacing|background|class|dir<ltr?rtl|frame|height|id|lang|rules|style|summary|title|width],"
            + "tbody[align<center?char?justify?left?right|char|class|charoff|background|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],"
            + "td[abbr|align<center?char?justify?left?right|axis|background|background|bgcolor|char|charoff|class|colspan|dir<ltr?rtl|headers|height|id|lang|nowrap<nowrap|rowspan|scope<col?colgroup?row?rowgroup|style|title|valign<baseline?bottom?middle?top|width],"
            + "textarea[accesskey|class|cols|dir<ltr?rtl|disabled<disabled|id|lang|name|readonly<readonly|rows|style|tabindex|title],"
            + "tfoot[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],"
            + "th[abbr|align<center?char?justify?left?right|axis|background|bgcolor|char|charoff|class|colspan|dir<ltr?rtl|headers|height|id|lang|nowrap<nowrap|rowspan|scope<col?colgroup?row?rowgroup|style|title|valign<baseline?bottom?middle?top|width],"
            + "thead[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],"
            + "title[dir<ltr?rtl|lang],"
            + "tr[abbr|align<center?char?justify?left?right|bgcolor|char|charoff|class|rowspan|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],"
            + "tt[class|dir<ltr?rtl|id|lang|style|title],"
            + "u[class|dir<ltr?rtl|id|lang|style|title],"
            + "ul[class|compact<compact|dir<ltr?rtl|id|lang|style|title|type],"
            + "var[class|dir<ltr?rtl|id|lang|style|title]",
            valid_children: "+body[title|meta],+a[div|span|table|tr|td|th|ul|li|ol|br|a|h1|h2|h3|h4|h5|h6|h7|b|u|i|sup|sub|strong|small]",
            //skin_url: 'css/tinymce/custom',
            menubar: false,
            formats: {
                bold : {inline : 'b'},
                italic : {inline : 'i'},
                underline : {inline : 'u'}
            },
            fontsize_formats: "6pt 8pt 10pt 11pt 12pt 13pt 14pt 16pt 18pt 20pt 24pt 28pt 34pt 36pt",
            plugins: "colorpicker textcolor table link code contextmenu",
            tools: "inserttable",
            table_toolbar:false,
            theme_advanced_text_colors : "FF00FF,FFFF00,00FF00,FF0000,0000FF,000000",
            link_list: [
                {
                    title: $A.translate('Email address'),
                    value: 'mailto:' + $AEE.settings.systemFieldStart + 'emailaddress' + $AEE.settings.systemFieldEnd
                },
                {
                    title: $A.translate('Web version'),
                    value: $AEE.settings.systemFieldStart + 'webversion' + $AEE.settings.systemFieldEnd
                },
                {
                    title: $A.translate('Unsubscribe link'),
                    value: $AEE.settings.systemFieldStart + 'unsubscribelink' + $AEE.settings.systemFieldEnd
                }
            ],
            toolbar: [
                "styleselect | undo redo | alignleft aligncenter alignright alignjustify | link | bullist numlist | customfields systemfields",
                "bold italic underline | fontselect fontsizeselect | automizyImage | forecolor backcolor | table | code"
            ],
            contextmenu: "link inserttable | cell row column deletetable",
            setup: function (editor) {
                var hasNodeClass = function(target, className){
                    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
                };
                var getColor = function(e){
                    var color = '#000000';
                    for(var i = 0; i < e.parents.length; i++){
                        if(e.parents[i].style !== 'undefined' && typeof e.parents[i].style.color === 'string' && e.parents[i].style.color.length > 0){
                            color = e.parents[i].style.color;
                            break;
                        }
                    }
                    return color;
                };
                editor.addButton('automizyImage', {
                    icon: 'image',
                    tooltip: $A.translate('Select Image'),
                    onclick: function() {
                        var dom = editor.dom;
                        var imgElm = editor.selection.getNode();

                        if (imgElm.nodeName == 'IMG' && !imgElm.getAttribute('data-mce-object') && !imgElm.getAttribute('data-mce-placeholder')) {
                            var width = $(imgElm).width();
                            var height = dom.getAttrib(imgElm, 'height');
                            $AEE.imagePicker
                                .reset()
                                .dialogTitle($A.translate('Modify image'))
                                .src(dom.getAttrib(imgElm, 'src') || '')
                                .alt(dom.getAttrib(imgElm, 'alt') || '')
                                .title(dom.getAttrib(imgElm, 'title') || '')
                                .align(dom.getAttrib(imgElm, 'align') || 'center')
                                .save(function(img){
                                    if(img.$elem !== false){
                                        //var naturalWidth = img.$img[0].naturalWidth;
                                        //var newWidth = Math.min(naturalWidth, width);
                                        img.$img.removeClass();
                                        //img.$img.width(newWidth).attr('width', newWidth);
                                        editor.focus();
                                        editor.selection.setContent(img.$img[0].outerHTML);
                                    }
                                })
                                .open();
                        } else {
                            $AEE.imagePicker
                                .reset()
                                .save(function(img){
                                    if(img.$elem !== false){
                                        img.$img.removeClass();
                                        editor.focus();
                                        editor.selection.setContent(img.$img[0].outerHTML);
                                    }
                                })
                                .open();
                        }
                    }
                });
                editor.addButton('jqueryTextColorpicker', {
                    text: 'Text color',
                    icon: 'forecolor',
                    onclick: function() {
                        var color = getColor(editor.selection.getNode());
                        editor.formatter.apply('jqueryTextColor', {value : 'red'});
                    }
                });
                editor.addButton('customfields', {
                    type: 'menubutton',
                    text: $A.translate('Custom fields'),
                    icon: false,
                    menu: [
                        {
                            text: $A.translate('User defined'),
                            menu: $AEE.getTinyMceUserDefinedMenu(editor)
                        },
                        {
                            text: $A.translate('Built-in'),
                            menu: $AEE.getTinyMceBuiltInMenu(editor)
                        }
                    ]
                });
                editor.on('BeforeSetContent', function(e) {
                    if(e.content.substring(0, 3) === '<a '){
                        if(e.content.indexOf('data-mce-href') < 0){
                            e.content = $(e.content).attr('style', 'text-decoration:none').wrapInner('<u></u>')[0].outerHTML;
                        }
                    }
                    console.log('BeforeSetContent event', e);
                });
                editor.on('NodeChange', function(e) {
                    console.log('NodeChange event', e);
                    console.log($AEE.rgbStyleToHex(getColor(e)));
                });
            }
        }
    })
});