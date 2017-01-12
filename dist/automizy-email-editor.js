(function(){
    window.AutomizyGlobalZIndex = window.AutomizyGlobalZIndex || 2000;
    window.AutomizyEmailEditor = window.$AEE = new function () {
        var t = this;
        t.dialogs = {};
        t.buttons = {};
        t.inputs = {};
        t.forms = {};
        t.blocks = [];
        t.settings = {};
        t.optione = {};
        t.elements = {};
        t.d = {
            version: '1.0.0',
            defines: {},
            values:{},
            functions:{},
            segments:[],
            links:[],
            config:{
                dir:'.',
                url:'http://developers.automizy.com/automizyemaileditor',
                imageUploadApiUrl:'https://api.automizy.com/images',
                imageGalleryApiUrl:'https://api.automizy.com/images',
                emailPreviewApiUrl:'https://api.automizy.com/email-preview'
            },
            status:{
                scriptsLength:0,
                loadedScripts:0,
                percent:0
            }
        };
        t.m = {};
        t.default = {};
        t.inited = false;
        t.settingsShowed = false;
        t.scriptLoaded = function(){};
    }();

    return $AEE;
})();

(function(){

    $AEE.runTheFunctions = function(functions, thisParameter, parameters){
        var functions = functions || [];
        var thisParameter = thisParameter || $AEE;
        var parameters = parameters || [];
        for(var i = 0; i < functions.length; i++) {
            functions[i].apply(thisParameter, parameters);
        }
    };

})();

(function(){

    $AEE.d.functions.readyFunctions = [];
    $AEE.ready = function(func){
        if(typeof func === 'function') {
            $AEE.d.functions.readyFunctions.push(func);
            if($AEE.automizyReady){
                func.apply($AEE, []);
            }
            return $AEE;
        }
        $AEE.runTheFunctions($AEE.d.functions.readyFunctions);
        $AEE.automizyReady = true;
    };

})();

(function(){
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
            cursorwidth: "9px",
            touchbehavior:false,
            gesturezoom:false,
            grabcursorenabled:false
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
            schema: "html5",
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
            valid_children: "+body[title|meta|style|link],+a[div|span|table|tr|td|th|ul|li|ol|br|a|h1|h2|h3|h4|h5|h6|h7|b|u|i|sup|sub|strong|small],+meta[charset]",
            valid_child_elements: "table[tr|td|th]",
            protect: [/\<!--\[.*\]\>/g, /\<!\[.*\]--\>/g, /\<v:.*>/g, /\<\/v:.*>/g],


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
                                .style(dom.getAttrib(imgElm, 'style') || '')
                                .width(dom.getAttrib(imgElm, 'width') || '')
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
})();

(function(){
    $AEE.ready(function(){
        $AEE.settings.draggable = {
            connectToSortable: "#aee-document, .aee-block-drop-zone",
            cursor: "url(" + $AEE.d.config.dir + "/images/cursors/closedhand.cur), move",
            cursorAt: {top: -10},
            helper: "clone",
            opacity: "0.5",
            revert: "invalid",
            start: function (event, ui) {
                $AEE.dragging = true;
                $AEE.elements.$blockListModal.show();
                $AEE.elements.$document.css({outline: "2px dashed #98be6d"}).sortable("option", "axis", false);
                $("<style class='automizy-draggable-stylesheet'>*{ cursor: url(" + $AEE.d.config.dir + "/images/cursors/closedhand.cur), move !important; }</style>").appendTo('body:first');
                if($AEE.screenSize()['x'] < 800) {
                    $AEE.settingsShowed = false;
                    $AEE.blocksShowed = false;
                    $AEE.setLayoutByDisplay();
                }
                $A.runEvent('AutomizyEmailEditorBlockDragStart', $AEE, [event, ui]);
            },
            stop: function (event, ui) {
                $A.runEvent('AutomizyEmailEditorBlockDragStop', $AEE, [event, ui]);
                $AEE.dragging = false;
                if(tinymce.activeEditor !== null){
                    $(tinymce.activeEditor.targetElm).blur();
                }
                $('.automizy-draggable-stylesheet').remove();
                $AEE.elements.$document.css({outline: "none"}).sortable("option", "axis", "y");
                $AEE.elements.$widget.css("cursor", "auto");
                $AEE.elements.$blockListModal.hide();
                var $target = $(ui.helper[0]);
                if ($target.closest('#aee-document').length < 1) {
                    return true;
                }

                var $block = $AEE.newBlock();
                $AEE.elements.$activeBlock = $block;
                var blockSettings = $(ui.helper.context).data('block');
                $target.replaceWith($block);

                $AEE.buildBlockListSetDisplay();
                $AEE.buildBlockListDoBlock($block, blockSettings);
                $A.runEvent('AutomizyEmailEditorBlockDragComplete', $AEE, [$block, blockSettings]);
            },
            create: function (event, ui) {
                $A.runEvent('AutomizyEmailEditorBlockDragCreate', $AEE, [event, ui]);
            }
        };
    })
})();

(function(){
    $AEE.ready(function(){
        $AEE.settings.sortable = {
            handle: '.aee-block-handle',
            distance: 5,
            axis: false,
            cursor: "url(" + $AEE.d.config.dir + "/images/cursors/closedhand.cur), move",
            cursorAt: {top: -10},
            forceHelperSize: true,
            forcePlaceholderSize: true,
            opacity: "0.5",
            placeholder: "aee-ui-state-highlight",
            tolerance: "pointer",
            connectWith: "#aee-document, .aee-block-drop-zone",
            start: function (event, ui) {
                $AEE.dragging = true;
                $AEE.elements.$document.sortable("refreshPositions");
                $AEE.elements.$blockListModal.show();
                console.log('start');
            },
            stop: function (event, ui) {
                $AEE.dragging = false;
                $AEE.elements.$widget.css("cursor", "auto");
                $AEE.elements.$blockListModal.hide();

                if(ui.item.data('automizy-dropped')) {
                    setTimeout(function () {
                        $AEE.setBlockSettings(ui.item);
                    }, 10);
                }

                console.log('stop');
            },
            deactivate: function (event, ui) {
                $AEE.elements.$blockListModal.hide();
                console.log('deactivate');
            },
            over: function (event, ui) {
                console.log('over');
            },
            receive: function (event, ui) {
                console.log('receive');
            },
            activate: function (event, ui) {
                console.log('activate');
            },
            beforeStop: function (event, ui) {
                console.log('beforeStop');
            },
            change: function (event, ui) {
                console.log('change');
            },
            create: function (event, ui) {
                console.log('create');
            },
            out: function (event, ui) {
                console.log('out');
            },
            remove: function (event, ui) {
                console.log('remove');
            },
            sort: function (event, ui) {
                console.log('sort');
            }
        };
    })
})();

(function(){

    $AEE.d.functions.layoutReadyFunctions = [];
    $AEE.layoutReady = function(func){
        if(typeof func === 'function') {
            $AEE.d.functions.layoutReadyFunctions.push(func);
            if($AEE.automizyLayoutReady){
                func.apply($AEE, []);
            }
            return $AEE;
        }
        $AEE.runTheFunctions($AEE.d.functions.layoutReadyFunctions);
        $AEE.automizyLayoutReady = true;
    };

})();

(function(){
    $AEE.layoutReady(function(){
        var ImagePicker = function (obj) {
            var t = this;
            t.d = {
                $content:$('<div id="automizy-image-picker-content"></div>'),
                $previewBox:$('<div id="automizy-image-picker-preview-box"></div>'),
                $previewImageHelper:$('<span id="automizy-image-picker-preview-image-helper"></span>'),
                $previewImage:$('<img id="automizy-image-picker-preview-image" />'),
                $controlImageBox:$('<div id="automizy-image-picker-control-box"></div>'),

                image:false,

                inputs:{},
                buttons:{},
                dialogs:{},
                forms:{},

                img:{
                    src:'',
                    link:'',
                    alt:'',
                    title:'',
                    align:'center',
                    style:'',
                    width:'',
                    $elem:false,
                    $img:false
                },
                save:function(){},
                delete:function(){}
            };

            t.d.$previewBox.appendTo(t.d.$content);
            t.d.$previewImageHelper.appendTo(t.d.$previewBox);
            t.d.$previewImage.appendTo(t.d.$previewBox);
            t.d.$controlImageBox.appendTo(t.d.$content);

            t.d.buttons.cancel = $A.newButton({
                text: $A.translate('Cancel'),
                click: function () {
                    t.d.dialogs.widget.close();
                }
            });
            t.d.buttons.save = $A.newButton({
                skin: 'simple-orange',
                text: $A.translate('Save'),
                click: function () {
                    t.save();
                    t.d.dialogs.widget.close();
                }
            });
            t.d.buttons.delete = $A.newButton({
                text: $A.translate('Delete image'),
                click: function () {
                    t.delete();
                }
            });
            t.d.buttons.cancelGallery = $A.newButton({
                text: $A.translate('Cancel'),
                click: function () {
                    t.d.dialogs.gallery.close();
                }
            });

            t.d.dialogs.widget = $A.newDialog({
                id:'automizy-image-picker',
                positionY:'30px',
                content:t.d.$content,
                buttons:[
                    t.d.buttons.cancel,
                    t.d.buttons.save,
                    t.d.buttons.delete
                ]
            });
            t.d.dialogs.gallery = $A.newDialog({
                id:'automizy-image-picker-gallery',
                title:$A.translate('Image gallery'),
                buttons:[
                    t.d.buttons.cancelGallery
                ],
                open:function(){
                    $A.ajaxDocumentCover(true);
                    $.ajax({
                        url: $AEE.imageGalleryApiUrl(),
                        type:'GET',
                        dataType: 'json',
                        headers: {Authorization: 'Bearer ' + $AA.token().get()},
                        beforeSend: function (xhr, data) {
                            data.url = $AEE.imageGalleryApiUrl();
                        }
                    }).complete(function(){
                        $A.ajaxDocumentCover(false);
                    }).done(function(data){
                        t.d.dialogs.gallery.content().empty();
                        var $content = $('<div id="automizy-image-picker-gallery-content"></div>');
                        for(var i = 0; i < data.length; i++){
                            if(data[i].type !== 'file' || $.inArray(data[i].extension, ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'ico']) <= -1){
                                continue;
                            }
                            var $box = $('<span class="automizy-image-picker-gallery-element"></span>').data({
                                src:data[i].url,
                                alt:data[i].alt,
                                title:data[i].title
                            }).click(function(){
                                var $this = $(this);
                                t.d.img.src = $this.data('src');
                                t.d.img.alt = $this.data('alt');
                                t.d.img.title = $this.data('title');
                                t.d.$previewImage.attr({
                                    src:t.d.img.src
                                }).show();
                                t.d.inputs.url.val(t.d.img.src);
                                t.d.inputs.alt.val(t.d.img.alt);
                                t.d.inputs.title.val(t.d.img.title);
                                t.d.dialogs.gallery.close();
                            });
                            var $helper = $('<span class="automizy-image-picker-gallery-image-helper"></span>');
                            var $img = $('<img/>').attr({
                                src:data[i].thumbnailUrl,
                                alt:data[i].alt,
                                title:data[i].title
                            }).data('url', data[i].url).error(function() {
                                var $t = $(this);
                                $t.attr('src', $t.data('url'));
                            });
                            $box.appendTo($content);
                            $helper.appendTo($box);
                            $img.appendTo($box);
                        }
                        t.d.dialogs.gallery.content($content);
                    })
                }
            });

            t.d.inputs.upload = $A.newInput({
                type:'file',
                name:'upload_file',
                target: t.d.$controlImageBox,
                accept: ['.jpg', '.jpeg', '.bmp', '.gif', '.png', '.ico'],
                create:function(){
                    t.d.inputs.upload.data('$automizyTd1').hide();
                    t.d.inputs.upload.data('automizyButton').width('300px');
                }
            });
            t.d.inputs.upload.input().change(function(){
                /*if (this.files && this.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        t.d.$previewImage.attr('src', e.target.result).show();
                    };
                    reader.readAsDataURL(this.files[0]);
                }*/
            }).fileupload({
                url: $AEE.imageUploadApiUrl(),
                dataType: 'json',
                singleFileUploads: true,
                formData: {directory: 'emaileditor'},
                dropZone: t.d.dialogs.gallery.widget(),
                beforeSend: function (xhr, data) {
                    data.url = $AEE.imageUploadApiUrl();
                    var file = data.files[0];
                    xhr.setRequestHeader('Authorization', 'Bearer ' + $AA.token().get());
                    t.d.inputs.upload.data('automizyButton').disable();
                    t.d.inputs.upload.widget().find('input[type="file"]').prop('disabled', true);
                    t.d.inputs.url.disable();
                    t.d.buttons.gallery.disable();
                    t.d.buttons.cancel.disable();
                    t.d.buttons.save.disable();
                    t.closable(false);
                },
                progressall: function (e, data) {
                    t.d.inputs.upload.data('automizyButton').text(parseInt(data.loaded / data.total * 100, 10) + '%');
                },
                complete: function () {
                    t.d.inputs.upload.data('automizyButton').enable().text($A.translate('Select an other image from local computer'));
                    t.d.inputs.upload.widget().find('input[type="file"]').prop('disabled', false);
                    t.d.inputs.url.enable();
                    t.d.buttons.gallery.enable();
                    t.d.buttons.cancel.enable();
                    t.d.buttons.save.enable();
                    t.closable(true);
                },
                error: function () {
                    alert('Something wrong');
                },
                done: function (e, data) {
                    t.d.img.src = data.result[Object.keys(data.result)[0]].url;
                    t.d.$previewImage.attr({
                        src:t.d.img.src
                    }).show();
                    t.d.inputs.url.val(t.d.img.src);
                }
            });

            t.d.buttons.gallery = $A.newButton({
                id:'automizy-image-picker-gallery-button',
                text:$A.translate('Select image from gallery'),
                target: t.d.$controlImageBox,
                width:'300px',
                click:function(){
                    t.d.dialogs.gallery.open();
                }
            });

            t.d.inputs.url = $A.newInput({
                placeholder:$A.translate('Enter the image url here'),
                target:t.d.$controlImageBox,
                type:'text',
                labelWidth: 'auto',
                breakInput: false,
                create:function(){
                    this.input().focus(function(){
                        var $this = $(this);
                        $this.select();
                        $this.mouseup(function() {
                            $this.unbind("mouseup");
                            return false;
                        });
                    });
                },
                change:function(){
                    t.d.img.src = this.val();
                    t.d.$previewImage.attr('src', t.d.img.src).show();
                }
            });

            t.d.inputs.link = $A.newInput({
                label:$A.translate('Link to'),
                help:$A.translate('Defines a hyperlink, which is used to link to another page.'),
                value:'http://',
                change:function(){
                    t.d.img.link = this.val();
                }
            });
            t.d.inputs.alt = $A.newInput({
                label:$A.translate('ALT text'),
                help:$A.translate('The required alt attribute specifies an alternate text for an image, if the image cannot be displayed.'),
                change:function(){
                    t.d.img.alt = this.val();
                }
            });
            t.d.inputs.title = $A.newInput({
                label:$A.translate('Image title'),
                help:$A.translate('Provides additional information related to the element when a user places their mouse over the element.'),
                change:function(){
                    t.d.img.title = this.val();
                }
            });
            t.d.inputs.align = $A.newInput({
                label:$A.translate('Alignment'),
                help:$A.translate('Specifies the horizontal alignment'),
                type:'select',
                options:[
                    ['left', $A.translate('Left')],
                    ['center', $A.translate('Center'), true],
                    ['right', $A.translate('Right')]
                ],
                change:function(){
                    t.d.img.align = this.val();
                }
            });
            t.d.forms.moreSettigns = $A.newForm().draw().addGroup({
                text: 'Advanced settings',
                inputs: [
                    t.d.inputs.link,
                    t.d.inputs.alt,
                    t.d.inputs.title,
                    t.d.inputs.align
                ]
            }).drawTo(t.d.$content);

            t.d.$widget = t.d.dialogs.widget.widget();

            t.init();

            if (typeof obj !== 'undefined') {
                t.initParameter(obj);
            }

        };

        var p = ImagePicker.prototype;

        p.open = function(){
            return this.d.dialogs.widget.open.apply(this.d.dialogs.widget, arguments);
        };
        p.close = function(){
            return this.d.dialogs.widget.close.apply(this.d.dialogs.widget, arguments);
        };
        p.closable = function(){
            return this.d.dialogs.widget.closable.apply(this.d.dialogs.widget, arguments);
        };
        p.dialogTitle = function(){
            this.d.dialogs.widget.title.apply(this.d.dialogs.widget, arguments);
            return this;
        };

        p.url = p.src = function (value) {
            var t = this;
            if (typeof value !== 'undefined') {
                if(value === '' || typeof value !== 'string') {
                    t.d.img.src = '';
                    t.d.inputs.url.val('');
                    t.d.$previewImage.attr('src', '').hide();
                    t.d.inputs.upload.data('automizyButton').text($A.translate('Select image from local computer'));
                }else{
                    t.d.img.src = value;
                    t.d.inputs.url.val(value);
                    t.d.$previewImage.attr('src', value).show();
                    t.d.inputs.upload.data('automizyButton').text($A.translate('Select an other image from local computer'));
                }
                return t;
            }
            return t.d.inputs.url.val();
        };
        p.link = function (value) {
            console.log(value, typeof value);
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.img.link = value;
                t.d.inputs.link.val(value);
                return t;
            }
            return t.d.inputs.link.val();
        };
        p.alt = function (value) {
            console.log(value, typeof value);
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.img.alt = value;
                t.d.inputs.alt.val(value);
                return t;
            }
            return t.d.inputs.alt.val();
        };
        p.title = function (value) {
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.img.title = value;
                t.d.inputs.title.val(value);
                return t;
            }
            return t.d.inputs.title.val();
        };
        p.align = function (value) {
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.img.align = value;
                t.d.inputs.align.val(value);
                return t;
            }
            return t.d.inputs.align.val();
        };
        p.enableAlign = function(){
            this.d.inputs.align.show();
            return this;
        };
        p.disableAlign = function(){
            this.d.inputs.align.hide();
            return this;
        };
        p.style = function (value) {
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.img.style = value;
                return t;
            }
            return t.d.img.style;
        };
        p.width = function (value) {
            var t = this;
            if (typeof value !== 'undefined') {
                t.d.img.width = value;
                return t;
            }
            return t.d.img.width;
        };
        p.delete = function(func){
            var t = this;
            if (typeof func === 'function') {
                t.d.delete = func;
            } else {
                t.d.delete.apply(this, []);
            }
            return t;
        };
        p.enableDelete = function(){
            this.d.buttons.delete.show();
            return this;
        };
        p.disableDelete = function(){
            this.d.buttons.delete.hide();
            return this;
        };
        p.save = function (func) {
            var t = this;
            if (typeof func === 'function') {
                t.d.save = func;
            } else {
                if(typeof t.d.img.src === 'string' && t.d.img.src.length > 0) {
                    var $elem;
                    var $img = $('<img/>').attr({
                        src: t.d.img.src,
                        alt: t.d.img.alt,
                        title: t.d.img.title,
                        width: t.d.img.width
                    })
                        .addClass('aee-imagepicker-image')
                        .attr('style', 'max-width:100%; border:none; text-decoration:none; ' + t.d.img.style);
                    if($.inArray(t.d.inputs.link.val(), ['', 'http://', 'https://']) <= -1){
                        $elem = $('<a href="'+t.d.inputs.link.val()+'" class="aee-imagepicker-image-link"></a>');
                        $img.appendTo($elem);
                    }else{
                        $elem = $img;
                    }

                    t.d.img.$elem = $elem;
                    t.d.img.$img = $img;


                    /*
                     $AEE.elements.$activeBlock.data('$contentCell').css({
                     textAlign: t.d.inputs.align.val()
                     }).html($img);
                     $AEE.elements.$activeBlock.removeClass('aee-empty');
                     $img.automizyResizabe();
                     */
                }else{
                    t.d.img.$elem = false;
                }
                t.d.save.apply(t, [t.d.img]);
            }
            return t;
        };
        p.reset = function(){
            return this.dialogTitle($A.translate('Upload image'))
                .enableAlign()
                .disableDelete()
                .src('')
                .link('http://')
                .alt('')
                .title('')
                .align('center');
        };

        $A.initBasicFunctions(ImagePicker, "ImagePicker");

    });
})();

(function(){
    $AEE.setImageSize = function($content){
        var $img = $content.find("img");

        $img.one("load", function() {

            var $imgLocal = $(this);
            var imgLocal = this;
            var $wrapper = $imgLocal.closest('.ui-wrapper');
            if(typeof $wrapper[0] !== 'undefined') {
                var $content = $imgLocal.closest('.aee-block-content-cell');
                var contentWidth = $content.width();
                var imgLocalWidth = $imgLocal.width();
                var percentEditor = Math.min(Math.round(imgLocalWidth / contentWidth * 100), 100);
                var percent = Math.min(Math.round(imgLocalWidth / contentWidth * 100), 100);
                var imgWidth = Math.round(contentWidth * percent / 100);
                var calculatedWidth = imgWidth;
                $wrapper[0].style.width = percentEditor + '%';
                $wrapper[0].style.height = 'auto';

                if(typeof imgLocal.naturalWidth !== 'undefined') {
                    if ((Math.abs(imgWidth - imgLocal.naturalWidth) < imgLocal.naturalWidth / 100)) {
                        imgWidth = imgLocal.naturalWidth;
                    }
                }

                $imgLocal.attr('style', 'max-width: 100%; margin: 0px; resize: none; position: static; zoom: 1; display: block; width: 100%; opacity:1;').attr('data-percent-width', percent).attr('data-natural-width', imgLocal.naturalWidth).attr('data-width', imgWidth).attr('data-calculated-width', calculatedWidth);
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
})();

(function(){
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'text.gif',
            name:'text',
            category:'content',
            title:$A.translate('Text'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell){
                $block.addClass('aee-text-block-item');
                var html = '';
                var text = $A.translate('Enter text here. ');
                for(var i = 0; i < 30; i++){
                    html += text;
                }
                html = '<div style="text-align: left;"><span style="font-family: arial, helvetica, sans-serif; font-size: 11pt;">' + html + '</span></div>';
                var $content = $('<div contenteditable></div>').addClass('aee-text-block-content').html(html).appendTo($contentCell);

                $AEE.settings.tinymceBlock.oninit = function(editor){editor.focus()};
                $content.tinymce($AEE.settings.tinymceBlock);
            }
        });

    });
})();

(function(){
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'title.gif',
            name:'title',
            category:'content',
            title:$A.translate('Title'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell){
                $block.addClass('aee-title-block-item');
                var html = '<div style="text-align: left;"><b><span style="font-family: arial, helvetica, sans-serif; font-size: 16pt;">' + $A.translate('Enter title here.') + '</span></b></div>';
                var $content = $('<div contenteditable></div>').addClass('aee-text-block-content').html(html).appendTo($contentCell);

                $AEE.settings.tinymceBlock.oninit = function(editor){editor.focus()};
                $content.tinymce($AEE.settings.tinymceBlock);
            }
        });

    });
})();

(function(){
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'button.gif',
            name:'button',
            category:'content',
            title:$A.translate('Button'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell){
                $block.addClass('aee-button-block-item');
                var $content = $('<div class="aee-button-block-content"></div>').appendTo($contentCell).attr('style', 'text-align:center');
                var $button = $('<a href="#" class="aee-button-block-button"></a>').text($A.translate('My button')).appendTo($content).attr('style', 'border-top-width: 9px; border-right-width:36px; border-bottom-width:9px; border-left-width:36px; border-style:solid; border-color:#b8b8b8; font-size: 14px; display: inline-block; text-decoration: none; background-color: #b8b8b8; color: #ffffff; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; font-weight:normal; text-decoration:none; font-style:normal;');
            }
        });

    });


    $AEE.layoutReady(function(){
        $AEE.elements.$document.on('click', '.aee-button-block-item .aee-button-block-button', function(){
            setTimeout(function(){
                $AEE.dialogs.buttonSettings.open();
            }, 10);
        }).on('click', '.aee-button-block-item a', function(event){
            event.preventDefault();
        });
    });


    /* Editor */
    $AEE.ready(function() {

        $AEE.inputs.buttonSettings = {};
        $AEE.buttons.buttonSettings = {};

        var $buttonContent,
            $button,
            $box,
            $buttonContentClone = $(),
            $buttonClone;

        $AEE.inputs.buttonSettings.text = $A.newInput({
            label:$A.translate('Button text'),
            value:$A.translate('My button'),
            validator:'notEmpty',
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.link = $A.newInput({
            label:$A.translate('Link'),
            value:$A.translate('http://'),
            validator:'domainOrUrl',
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.radius = $A.newInput({
            label:$A.translate('Border radius'),
            value:5,
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            },
            change:function(){
                styleClone();
            }
        });

        $AEE.inputs.buttonSettings.paddingTop = $A.newInput({
            label:$A.translate('Padding top'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            },
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.paddingRight = $A.newInput({
            label:$A.translate('Padding right'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            },
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.paddingBottom = $A.newInput({
            label:$A.translate('Padding bottom'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            },
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.paddingLeft = $A.newInput({
            label:$A.translate('Padding left'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            },
            change:function(){
                styleClone();
            }
        });

        $AEE.inputs.buttonSettings.fontSize = $A.newInput({
            label:$A.translate('Font size'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            },
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.position = $A.newInput({
            label:$A.translate('Button position'),
            type:'select',
            options:[
                ['left', $A.translate('Left')],
                ['center', $A.translate('Center'), true],
                ['right', $A.translate('Right')]
            ],
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.textPosition = $A.newInput({
            label:$A.translate('Text position'),
            type:'select',
            options:[
                ['left', $A.translate('Left')],
                ['center', $A.translate('Center'), true],
                ['right', $A.translate('Right')]
            ],
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.fontFamily = $A.newInput({
            label:$A.translate('Font family'),
            type:'select',
            options:$AEE.settings.fontFamilies,
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.bold = $A.newInput({
            label:$A.translate('Bold'),
            type:'checkbox',
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.underline = $A.newInput({
            label:$A.translate('Underline'),
            type:'checkbox',
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.italic = $A.newInput({
            label:$A.translate('Italic'),
            type:'checkbox',
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.backgroundColor = $A.newInput({
            label:$A.translate('Background color'),
            width:'32px',
            create:function(){
                this.input().css({
                    fontSize:0,
                    backgroundColor:'#b8b8b8',
                    cursor:'pointer',
                    '-webkit-box-shadow':'none',
                    'box-shadow': 'none'
                }).colpick({
                    colorScheme:'dark',
                    layout:'rgbhex',
                    color:'b8b8b8',
                    onSubmit:function(hsb,hex,rgb,el) {
                        $(el).css({
                            backgroundColor:'#'+hex,
                            color:'#'+hex
                        }).val('#'+hex).trigger('change').colpickHide();
                    }
                })
            },
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.textColor = $A.newInput({
            label:$A.translate('Text color'),
            width:'32px',
            create:function(){
                this.input().css({
                    fontSize:0,
                    backgroundColor:'#ffffff',
                    cursor:'pointer',
                    '-webkit-box-shadow':'none',
                    'box-shadow': 'none'
                }).colpick({
                    colorScheme:'dark',
                    layout:'rgbhex',
                    color:'ffffff',
                    onSubmit:function(hsb,hex,rgb,el) {
                        $(el).css({
                            backgroundColor:'#'+hex,
                            color:'#'+hex
                        }).val('#'+hex).trigger('change').colpickHide();
                    }
                })
            },
            change:function(){
                styleClone();
            }
        });

        $AEE.buttons.buttonSettings.cancel = $A.newButton({
            text: $A.translate('Cancel'),
            click: function () {
                $AEE.dialogs.buttonSettings.close();
            }
        });

        function getData(){
            var data = {
                text: $AEE.inputs.buttonSettings.text.val(),
                link: $AEE.inputs.buttonSettings.link.val(),
                radius: $AEE.inputs.buttonSettings.radius.val(),
                paddingTop: $AEE.inputs.buttonSettings.paddingTop.val(),
                paddingRight: $AEE.inputs.buttonSettings.paddingRight.val(),
                paddingBottom: $AEE.inputs.buttonSettings.paddingBottom.val(),
                paddingLeft: $AEE.inputs.buttonSettings.paddingLeft.val(),
                fontSize: $AEE.inputs.buttonSettings.fontSize.val(),
                position: $AEE.inputs.buttonSettings.position.val(),
                //textPosition: $AEE.inputs.buttonSettings.textPosition.val(),
                fontFamily: $AEE.inputs.buttonSettings.fontFamily.val(),
                bold: $AEE.inputs.buttonSettings.bold.checked(),
                underline: $AEE.inputs.buttonSettings.underline.checked(),
                italic: $AEE.inputs.buttonSettings.italic.checked(),
                backgroundColor: $AEE.inputs.buttonSettings.backgroundColor.val(),
                textColor: $AEE.inputs.buttonSettings.textColor.val()
            };
            var style = [
                'border-top-width:'+data.paddingTop + 'px',
                'border-right-width:'+data.paddingRight + 'px',
                'border-bottom-width:'+data.paddingBottom + 'px',
                'border-left-width:'+data.paddingLeft + 'px',
                'border-style:solid',
                'border-color:'+$AEE.rgbStyleToHex(data.backgroundColor),
                'background-color:'+$AEE.rgbStyleToHex(data.backgroundColor),
                'color:'+$AEE.rgbStyleToHex(data.textColor),
                'font-size:'+data.fontSize + 'px',
                //'text-align:'+data.textPosition,
                'text-align:center',
                'font-family:'+data.fontFamily,
                'font-weight:'+(data.bold?'bold':'normal'),
                'text-decoration:'+(data.underline?'underline':'none'),
                'font-style:'+(data.italic?'italic':'normal'),
                '-webkit-border-radius:'+data.radius + 'px',
                '-moz-border-radius:'+data.radius + 'px',
                'border-radius:'+data.radius + 'px',
                'white-space: nowrap'
            ];
            return {
                data:data,
                style:style
            }
        }

        function styleClone(){
            var data = getData();
            $buttonClone
                .text(data.data.text)
                .attr('href', 'javascript:;')
                .attr('style', data.style.join(';'))
                .css('display', 'inline-block');
            $buttonContentClone.css('text-align', data.data.position);
        }

        $AEE.buttons.buttonSettings.save = $A.newButton({
            skin: 'simple-orange',
            text: $A.translate('Save'),
            click: function () {
                var data = getData();

                $button
                    .text(data.data.text)
                    .attr('href', data.data.link)
                    .attr('style', data.style.join(';'));
                $buttonContent.css('text-align', data.data.position);

                $AEE.dialogs.buttonSettings.close();
            }
        });

        var $table = $('<table border="0" cellpadding="0" cellspacing="0" style="width:100%"></table>');
        var $tr = $('<tr></tr>').appendTo($table);
        var $td1 = $('<td align="left" valign="top" style="max-width:630px; width:630px;"></td>').appendTo($tr);
        var $td2 = $('<td align="left" valign="top"></td>').appendTo($tr);

        $AEE.forms.buttonSettings = $A.newForm({
            inputs:[
                $AEE.inputs.buttonSettings.text,
                $AEE.inputs.buttonSettings.link,
                $AEE.inputs.buttonSettings.backgroundColor,
                $AEE.inputs.buttonSettings.textColor,
                $AEE.inputs.buttonSettings.fontSize,
                $AEE.inputs.buttonSettings.fontFamily,
                $AEE.inputs.buttonSettings.bold,
                $AEE.inputs.buttonSettings.underline,
                $AEE.inputs.buttonSettings.italic,
                $AEE.inputs.buttonSettings.radius,
                //$AEE.inputs.buttonSettings.textPosition,
                $AEE.inputs.buttonSettings.position,
                $AEE.inputs.buttonSettings.paddingTop,
                $AEE.inputs.buttonSettings.paddingRight,
                $AEE.inputs.buttonSettings.paddingBottom,
                $AEE.inputs.buttonSettings.paddingLeft
            ]
        }).drawTo($td1);

        $AEE.dialogs.buttonSettings = $A.newDialog({
            title:$A.translate('Button settings'),
            content:$table,
            width:'85%',
            buttons:[
                $AEE.buttons.buttonSettings.cancel,
                $AEE.buttons.buttonSettings.save
            ],
            open:function(){
                $buttonContent = $AEE.elements.$activeBlock.find('.aee-button-block-content');
                $button = $buttonContent.find('.aee-button-block-button');
                $box = $buttonContent.parent();

                $buttonContentClone.remove();
                $buttonContentClone = $buttonContent.clone();
                $buttonContentClone.appendTo($td2).css({
                    border:'1px dashed #cccccc',
                    padding: '12px',
                    marginLeft: '12px',
                    width:'100%'
                });
                $buttonClone = $buttonContentClone.find('.aee-button-block-button');


                $AEE.inputs.buttonSettings.text.val($button.text());
                $AEE.inputs.buttonSettings.link.val($button.attr('href'));
                $AEE.inputs.buttonSettings.radius.val(parseInt($button.css('border-radius')));
                $AEE.inputs.buttonSettings.paddingTop.val(parseInt($button.css('border-top-width')));
                $AEE.inputs.buttonSettings.paddingRight.val(parseInt($button.css('border-right-width')));
                $AEE.inputs.buttonSettings.paddingBottom.val(parseInt($button.css('border-bottom-width')));
                $AEE.inputs.buttonSettings.paddingLeft.val(parseInt($button.css('border-left-width')));
                $AEE.inputs.buttonSettings.fontSize.val(parseInt($button.css('font-size')));
                $AEE.inputs.buttonSettings.position.val($buttonContent.css('text-align'));
                //$AEE.inputs.buttonSettings.textPosition.val($button.css('text-align'));
                $AEE.inputs.buttonSettings.fontFamily.val($button.css('font-family'));

                $AEE.inputs.buttonSettings.bold.checked($button.css('font-weight') === 'bold' || $button.css('font-weight') === '700');
                $AEE.inputs.buttonSettings.underline.checked($button.css('text-decoration') === 'underline');
                $AEE.inputs.buttonSettings.italic.checked($button.css('font-style') === 'italic');

                var bgColor = $AEE.rgbStyleToHex($button[0].style.backgroundColor);
                $AEE.inputs.buttonSettings.backgroundColor.input()[0].style.backgroundColor = bgColor;
                $AEE.inputs.buttonSettings.backgroundColor.input().val(bgColor).colpickSetColor(bgColor);

                var color = $AEE.rgbStyleToHex($button[0].style.color);
                $AEE.inputs.buttonSettings.textColor.input()[0].style.color = color;
                $AEE.inputs.buttonSettings.textColor.input().val(color).colpickSetColor(color);

                $AEE.inputs.buttonSettings.radius.labelAfter('px');
                $AEE.inputs.buttonSettings.paddingTop.labelAfter('px');
                $AEE.inputs.buttonSettings.paddingRight.labelAfter('px');
                $AEE.inputs.buttonSettings.paddingBottom.labelAfter('px');
                $AEE.inputs.buttonSettings.paddingLeft.labelAfter('px');
                $AEE.inputs.buttonSettings.fontSize.labelAfter('px');
                setTimeout(function(){
                    $AEE.dialogs.buttonSettings.d.$content.trigger('scroll');
                }, 10);
            }
        });


        $AEE.dialogs.buttonSettings.d.$content.scroll(function(){
            $buttonContentClone.css({
                marginTop:$AEE.dialogs.buttonSettings.d.$content.scrollTop() + 'px'
            })
        })

    });
})();

(function(){
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'html.gif',
            name:'html',
            category:'content',
            title:$A.translate('HTML'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell){
                $block.addClass('aee-html-block-item aee-empty');
                var $content = $('<div></div>').addClass('aee-html-block-content').appendTo($contentCell);
                var $button = $('<span></span>').addClass('aee-html-block-button').html($A.translate('Insert HTML code')).appendTo($content);
            }
        });

        var $textarea = $('<textarea></textarea>').addClass('aee-html-block-dialog-input');
        var hasEditor = false;
        $AEE.dialogs.htmlCode = $A.newDialog({
            data:{
                $textarea:$textarea
            },
            content:$textarea,
            open:function(){
                var $textarea = this.data('$textarea');
                setTimeout(function () {
                    if ($AEE.elements.$activeBlock.hasClass('aee-empty')) {
                        $textarea.val('');
                    } else {
                        $textarea.val($AEE.elements.$activeBlock.data('$contentCell')[0].innerHTML);
                    }
                }, 10);
                if(!hasEditor) {
                    hasEditor = true;
                    setTimeout(function () {
                        $textarea.tinymce($AEE.settings.tinymceHtmlBlock);
                    }, 10);
                }
            },
            buttons:[
                {
                    text: $A.translate('Cancel'),
                    click: function () {
                        $AEE.dialogs.htmlCode.close();
                    }
                },
                {
                    skin: 'simple-orange',
                    text: $A.translate('Save'),
                    data:{
                        $textarea:$textarea
                    },
                    click: function () {
                        $AEE.elements.$activeBlock.data('$contentCell').html(this.data('$textarea').val());
                        $AEE.elements.$activeBlock.removeClass('aee-empty');
                        $AEE.dialogs.htmlCode.close();
                    }
                }
            ]
        });

    });

    $AEE.layoutReady(function(){
        $AEE.imagePicker = $A.newImagePicker();
        $AEE.elements.$document.on('click', '.aee-html-block-item.aee-empty .aee-html-block-content', function(){
            $AEE.dialogs.htmlCode.title($A.translate('Insert HTML code')).open();
        }).on('click', '.aee-html-block-item:not(.aee-empty) .aee-block-content-cell', function(){
            $AEE.dialogs.htmlCode.title($A.translate('Modify HTML code')).open();
        }).on('click', '.aee-html-block-item .aee-block-content-cell a, .aee-html-block-item .aee-block-content-cell area', function(event){
            event.preventDefault();
        });
    });
})();

(function(){
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'share.gif',
            name:'share',
            category:'content',
            title:$A.translate('Share'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell){
                $block.addClass('aee-share-block-item').attr('data-space', 6);
                var $table = $('<table cellpadding="0" cellspacing="0" border="0" class="aee-share-block-content" style="width:100%"></table>').appendTo($contentCell);
                var $tr = $('<tr></tr>').appendTo($table);
                var $textCell = $('<td style="width:50%" class="aee-share-block-content-cell-text"></td>').appendTo($tr);
                var $iconsCell = $('<td style="width:50%; padding:0 12px 0 12px; text-align:left" class="aee-share-block-content-cell-icons"></td>').appendTo($tr);

                var html = '<div style="text-align: right;"><b><span style="font-family: arial, helvetica, sans-serif; font-size: 16pt;">' + $A.translate('Share this email!') + '</span></b></div>';
                var $content = $('<div contenteditable class="aee-text-block-content"></div>').html(html).appendTo($textCell);

                $AEE.inputs.blockSettingsShareFacebook.check();
                $AEE.inputs.blockSettingsShareTwitter.check();
                $AEE.inputs.blockSettingsShareGoogleplus.check();
                $AEE.inputs.blockSettingsShareLinkedin.check();
                $AEE.inputs.blockSettingsShareDistanceBetween.val(6);
                $AEE.rebuildIcons();

                $AEE.settings.tinymceBlock.oninit = function(editor){editor.focus()};
                $content.tinymce($AEE.settings.tinymceBlock);
            }
        });

    });

    $AEE.layoutReady(function(){

        $AEE.elements.$blockSettingsShareBox = $('<div id="aee-block-settings-share-box" class="aee-block-settings-box"></div>').appendTo($AEE.elements.$blockSettingsContent);

        $AEE.elements.$shareFacebookIcon = $('<img src="' + $AEE.d.config.dir + '/images/social-facebook.gif" />');
        $AEE.elements.$shareTwitterIcon = $('<img src="' + $AEE.d.config.dir + '/images/social-twitter.gif" />');
        $AEE.elements.$shareGoogleplusIcon = $('<img src="' + $AEE.d.config.dir + '/images/social-googleplus.gif" />');
        $AEE.elements.$shareLinkedinIcon = $('<img src="' + $AEE.d.config.dir + '/images/social-linkedin.gif" />');

        $AEE.rebuildIcons = function($block, options){
            var $block = $block || $AEE.elements.$activeBlock;
            var options = options || {};
            var $textCell = $block.find('.aee-share-block-content-cell-text:first');
            var $iconsCell = $block.find('.aee-share-block-content-cell-icons:first');
            var $icons = $('<div class="aee-share-block-icons"></div>');
            var icons = [];
            var distance = $AEE.inputs.blockSettingsShareDistanceBetween.val();

            if(options.facebook || $AEE.inputs.blockSettingsShareFacebook.checked()){
                icons.push('<a href="[{share_facebook}]" onclick="return false;" style="text-decoration:none"><img src="' + $AEE.d.config.url + '/images/social-facebook.gif" class="aee-share-block-icons-facebook" /></a>');
            }
            if(options.twitter || $AEE.inputs.blockSettingsShareTwitter.checked()){
                icons.push('<a href="[{share_twitter}]" onclick="return false;" style="text-decoration:none"><img src="' + $AEE.d.config.url + '/images/social-twitter.gif" class="aee-share-block-icons-twitter" /></a>');
            }
            if(options.googleplus || $AEE.inputs.blockSettingsShareGoogleplus.checked()){
                icons.push('<a href="[{share_gplus}]" onclick="return false;" style="text-decoration:none"><img src="' + $AEE.d.config.url + '/images/social-googleplus.gif" class="aee-share-block-icons-googleplus" /></a>');
            }
            if(options.linkedin || $AEE.inputs.blockSettingsShareLinkedin.checked()){
                icons.push('<a href="[{share_linkedin}]" onclick="return false;" style="text-decoration:none"><img src="' + $AEE.d.config.url + '/images/social-linkedin.gif" class="aee-share-block-icons-linkedin" /></a>');
            }

            $block.attr('data-space', distance);

            var html = icons.join('<img src="' + $AEE.d.config.url + '/images/spacer.gif" height="1" width="'+distance+'" style="height:1px; width:'+distance+'px" />');
            $iconsCell.html(html);
        };

        $AEE.inputs.blockSettingsShareFacebook = $A.newInput2({
            type:'checkbox',
            labelBefore:$AEE.elements.$shareFacebookIcon,
            change:function(){
                $AEE.rebuildIcons();
            },
            create:function(){
                this.widget().css('padding', 0);
            }
        });
        $AEE.inputs.blockSettingsShareTwitter = $A.newInput2({
            type:'checkbox',
            labelBefore:$AEE.elements.$shareTwitterIcon,
            change:function(){
                $AEE.rebuildIcons();
            },
            create:function(){
                this.widget().css('padding', 0);
            }
        });
        $AEE.inputs.blockSettingsShareGoogleplus = $A.newInput2({
            type:'checkbox',
            labelBefore:$AEE.elements.$shareGoogleplusIcon,
            change:function(){
                $AEE.rebuildIcons();
            },
            create:function(){
                this.widget().css('padding', 0);
            }
        });
        $AEE.inputs.blockSettingsShareLinkedin = $A.newInput2({
            type:'checkbox',
            labelBefore:$AEE.elements.$shareLinkedinIcon,
            change:function(){
                $AEE.rebuildIcons();
            },
            create:function(){
                this.widget().css('padding', 0);
            }
        });
        $AEE.inputs.blockSettingsShareDistanceBetween = $A.newInput2({
            type:'number',
            labelBefore:$A.translate('Space between icons'),
            labelAfter:'px',
            value:6,
            enter:function(){
                $AEE.rebuildIcons();
                return false;
            },
            change:function(){
                $AEE.rebuildIcons();
            },
            create:function(){
                this.widget().css('padding-top', '12px');
                this.input().attr('min', 0);
                this.input().pbmInput();
            }
        });

        $AEE.forms.blockSettingsShare = $A.newForm().addInputs([
            $AEE.inputs.blockSettingsShareFacebook,
            $AEE.inputs.blockSettingsShareTwitter,
            $AEE.inputs.blockSettingsShareGoogleplus,
            $AEE.inputs.blockSettingsShareLinkedin,
            $AEE.inputs.blockSettingsShareDistanceBetween
        ]).drawTo($AEE.elements.$blockSettingsShareBox);
    })

})();

(function(){
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
})();

(function(){
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'columns.gif',
            name:'columns',
            category:'content',
            title:$A.translate('Columns'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell) {

                var $column1 = $('<div class="aee-columns-block-column aee-columns-block-column-1 aee-block-drop-zone aee-active" style="width:50%; display:block; float:left; margin:0; padding:0; border:none"></div>').appendTo($contentCell);
                var $column2 = $('<div class="aee-columns-block-column aee-columns-block-column-2 aee-block-drop-zone aee-active" style="width:50%; display:block; float:left; margin:0; padding:0; border:none"></div>').appendTo($contentCell);
                var $column3 = $('<div class="aee-columns-block-column aee-columns-block-column-3 aee-block-drop-zone" style="display:none; float:left; margin:0; padding:0; border:none"></div>').appendTo($contentCell);
                var $column4 = $('<div class="aee-columns-block-column aee-columns-block-column-4 aee-block-drop-zone" style="display:none; float:left; margin:0; padding:0; border:none"></div>').appendTo($contentCell);

                $block.addClass('aee-columns-block-item').attr({
                    'data-column-1':true,
                    'data-column-2':true,
                    'data-column-3':false,
                    'data-column-4':false,
                    'data-floatable':false
                });
                $AEE.inputs.blockSettingsColumns1.check();
                $AEE.inputs.blockSettingsColumns2.check();
                $AEE.inputs.blockSettingsColumns3.uncheck();
                $AEE.inputs.blockSettingsColumns4.uncheck();
                $AEE.inputs.blockSettingsColumnsFloatable.uncheck();

                $AEE.elements.$document.add('.aee-block-drop-zone').sortable($AEE.settings.sortable);
            }
        });

    });

    $AEE.layoutReady(function(){

        var width1 = 0;
        var width2 = 0;
        var width3 = 0;
        var width4 = 0;

        $AEE.rebuildColumns = function($block){
            var $block = $block || $AEE.elements.$activeBlock;
            var $contentCell = $block.find('.aee-block-content-cell:first');
            var $columns = $block.find('.aee-columns-block-column:first').siblings().andSelf();

            var checked = $AEE.inputs.blockSettingsColumns1.checked();
            $AEE.elements.$activeBlock.attr('data-column-1', checked);
            $columns.filter('.aee-columns-block-column-1').toggleClass('aee-active', checked)[0].style.display = checked?'block':'none';
            if(checked){
                $AEE.inputs.blockSettingsColumns1Width.show();
                $AEE.inputs.blockSettingsColumns1MinWidth.show();
            }else{
                $AEE.inputs.blockSettingsColumns1Width.hide();
                $AEE.inputs.blockSettingsColumns1MinWidth.hide();
            }

            var checked = $AEE.inputs.blockSettingsColumns2.checked();
            $AEE.elements.$activeBlock.attr('data-column-2', checked);
            $columns.filter('.aee-columns-block-column-2').toggleClass('aee-active', checked)[0].style.display = checked?'block':'none';
            if(checked){
                $AEE.inputs.blockSettingsColumns2Width.show();
                $AEE.inputs.blockSettingsColumns2MinWidth.show();
            }else{
                $AEE.inputs.blockSettingsColumns2Width.hide();
                $AEE.inputs.blockSettingsColumns2MinWidth.hide();
            }

            var checked = $AEE.inputs.blockSettingsColumns3.checked();
            $AEE.elements.$activeBlock.attr('data-column-3', checked);
            $columns.filter('.aee-columns-block-column-3').toggleClass('aee-active', checked)[0].style.display = checked?'block':'none';
            if(checked){
                $AEE.inputs.blockSettingsColumns3Width.show();
                $AEE.inputs.blockSettingsColumns3MinWidth.show();
            }else{
                $AEE.inputs.blockSettingsColumns3Width.hide();
                $AEE.inputs.blockSettingsColumns3MinWidth.hide();
            }

            var checked = $AEE.inputs.blockSettingsColumns4.checked();
            $AEE.elements.$activeBlock.attr('data-column-4', checked);
            $columns.filter('.aee-columns-block-column-4').toggleClass('aee-active', checked)[0].style.display = checked?'block':'none';
            if(checked){
                $AEE.inputs.blockSettingsColumns4Width.show();
                $AEE.inputs.blockSettingsColumns4MinWidth.show();
            }else{
                $AEE.inputs.blockSettingsColumns4Width.hide();
                $AEE.inputs.blockSettingsColumns4MinWidth.hide();
            }

            var $activeColumns = $columns.filter('.aee-active');
            var activeColumnsCount = $activeColumns.length;
            var minWidth = 250;
            if(activeColumnsCount === 2){
                minWidth = 250;
            }else if(activeColumnsCount === 3){
                minWidth = 200;
            }else if(activeColumnsCount === 4){
                minWidth = 150;
            }
            var $inactiveColumns = $columns.filter(':not(.aee-active)');
            var percent = 100 / activeColumnsCount;
            $activeColumns.each(function(){
                var $t = $(this);
                $t[0].style.width = percent+'%';
                $t.attr('data-width-in-percent', percent);
                $t.attr('data-min-width', minWidth);
            });

            $block.removeClass('automizy-column-1 automizy-column-2 automizy-column-3 automizy-column-4').addClass('automizy-column-'+activeColumnsCount);

            $AEE.inputs.blockSettingsColumns1Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns2Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns3Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns4Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns1MinWidth.val(Math.round(minWidth));
            $AEE.inputs.blockSettingsColumns2MinWidth.val(Math.round(minWidth));
            $AEE.inputs.blockSettingsColumns3MinWidth.val(Math.round(minWidth));
            $AEE.inputs.blockSettingsColumns4MinWidth.val(Math.round(minWidth));

        };


        $AEE.elements.$document.on('click', '.aee-gallery-block-item .aee-gallery-block-button, .aee-gallery-block-item .aee-gallery-block-image', function(){

        }).on('click', '.aee-gallery-block-item .aee-imagepicker-image', function(){

        });


        $AEE.recalculateColumnsWidth = function(columnId){
            var $currentColumn = $AEE.elements.$activeBlock.find('.aee-columns-block-column-'+columnId+':first');
            var currentInput = $AEE.inputs['blockSettingsColumns'+columnId+'Width'];
            var currentInputMinWidth = $AEE.inputs['blockSettingsColumns'+columnId+'MinWidth'];
            var newWidth = parseInt(currentInput.val());
            var oldWidth = parseFloat($currentColumn.attr('data-width-in-percent') || $currentColumn[0].style.width);
            var newMinWidth = parseInt(currentInputMinWidth.val());
            var oldMinWidth = parseFloat($currentColumn.attr('data-min-width') || 0);
            var $columns = $AEE.elements.$activeBlock.find('.aee-columns-block-column:first').siblings().andSelf();

            if(newWidth === 0 || isNaN(newWidth)) {
                $currentColumn.removeAttr('data-min-width');
            }else{
                $currentColumn.attr('data-min-width', newMinWidth);
            }

            var $column1 = $columns.filter('.aee-columns-block-column-1:first');
            var $column2 = $columns.filter('.aee-columns-block-column-2:first');
            var $column3 = $columns.filter('.aee-columns-block-column-3:first');
            var $column4 = $columns.filter('.aee-columns-block-column-4:first');

            var columns = [
                {
                    $elem:$column1,
                    active:$column1.hasClass('aee-active'),
                    width:parseFloat($column1.attr('data-width-in-percent') || $column1[0].style.width),
                    minWidth:parseFloat($column1.attr('data-min-width') || 0),
                    input:$AEE.inputs['blockSettingsColumns1Width'],
                    current:(columnId === 1)
                },
                {
                    $elem:$column2,
                    active:$column2.hasClass('aee-active'),
                    width:parseFloat($column2.attr('data-width-in-percent') || $column2[0].style.width),
                    minWidth:parseFloat($column2.attr('data-min-width') || 0),
                    input:$AEE.inputs['blockSettingsColumns2Width'],
                    current:(columnId === 2)
                },
                {
                    $elem:$column3,
                    active:$column3.hasClass('aee-active'),
                    width:parseFloat($column3.attr('data-width-in-percent') || $column3[0].style.width),
                    minWidth:parseFloat($column3.attr('data-min-width') || 0),
                    input:$AEE.inputs['blockSettingsColumns3Width'],
                    current:(columnId === 3)
                },
                {
                    $elem:$column4,
                    active:$column4.hasClass('aee-active'),
                    width:parseFloat($column4.attr('data-width-in-percent') || $column4[0].style.width),
                    minWidth:parseFloat($column4.attr('data-min-width') || 0),
                    input:$AEE.inputs['blockSettingsColumns4Width'],
                    current:(columnId === 4)
                }
            ];

            var activeColumnsCount = 0;
            var fullWidth = 0;
            for(var i = 0; i < columns.length; i++){
                if(columns[i].active){
                    activeColumnsCount++;
                    if(columns[i].current){
                        fullWidth += newWidth
                    }else{
                        fullWidth += columns[i].width
                    }
                }
            }
            var maxWidth = 101 - (activeColumnsCount * 1);

            if(newWidth < 1){
                newWidth = 1;
            }
            if(newWidth > maxWidth){
                newWidth = maxWidth;
            }

            var different = fullWidth - 100;
            var newFullWidth = 0;
            var elementWidth = 0;
            var currentElementRealWidth = newWidth;
            var activeElementFullWidth = 0;

            for(var i = 0; i < columns.length; i++){
                if(columns[i].active){
                    if(columns[i].current){
                        currentInput.val(parseInt(newWidth));
                        newFullWidth += newWidth;
                    }else{
                        var difUnit = different / (activeColumnsCount - 1);
                        elementWidth = columns[i].width - difUnit;
                        if(elementWidth < 1){
                            elementWidth = 1;
                        }
                        if(elementWidth > maxWidth){
                            elementWidth = maxWidth;
                        }
                        newFullWidth += elementWidth;
                        activeElementFullWidth += elementWidth;
                        columns[i].$elem.attr('data-width-in-percent', elementWidth);
                        columns[i].$elem[0].style.width = columns[i].width+'%';
                        $AEE.inputs['blockSettingsColumns'+(i+1)+'Width'].val(parseInt(columns[i].width));
                    }
                }
            }
            for(var i = 0; i < columns.length; i++){
                if(columns[i].current){
                    currentElementRealWidth = 100 - activeElementFullWidth;
                    columns[i].$elem.attr('data-width-in-percent', currentElementRealWidth);
                    columns[i].$elem[0].style.width = currentElementRealWidth+'%';
                }
            }
            if(parseFloat(newFullWidth.toFixed(5)) > 100){
                $AEE.recalculateColumnsWidth(columnId);
            }else{
                (function(columns, columnId, newFullWidth){setTimeout(function(){
                    var count = 0;
                    for(var i = 0; i < columns.length; i++){
                        if(columns[i].active){
                            count += parseInt(columns[i].input.val());
                        }
                    }
                    if(count > 100){
                        return $AEE.recalculateColumnsWidth(columnId);
                    }
                }, 10)})(columns, columnId);
            }
        };


        $AEE.elements.$blockSettingsColumnBox = $('<div id="aee-block-settings-columns-box" class="aee-block-settings-box"></div>').appendTo($AEE.elements.$blockSettingsContent);
        $AEE.inputs.blockSettingsColumns1 = $A.newInput({
            type:'checkbox',
            labelWidth:'150px',
            label:$A.translate('First column'),
            newRow:false,
            checked:true,
            change:function(){
                $AEE.rebuildColumns();
            }
        });
        $AEE.inputs.blockSettingsColumns1.input().attr('tabindex', -1);
        $AEE.inputs.blockSettingsColumns1Width = $A.newInput({
            type:'number',
            width:'50px',
            label:$A.translate('width:'),
            labelWidth:'100px',
            labelAfter:'%',
            value:'50',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(1);
            }
        });
        $AEE.inputs.blockSettingsColumns1MinWidth = $A.newInput({
            type:'number',
            width:'50px',
            label:$A.translate('min width:'),
            labelWidth:'100px',
            labelAfter:'px',
            value:'200',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(1);
            }
        });
        $AEE.inputs.blockSettingsColumns2 = $A.newInput({
            type:'checkbox',
            labelWidth:'150px',
            label:$A.translate('Second column'),
            checked:true,
            change:function(){
                $AEE.rebuildColumns();
            }
        });
        $AEE.inputs.blockSettingsColumns2.input().attr('tabindex', -1);
        $AEE.inputs.blockSettingsColumns2Width = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'%',
            label:$A.translate('width:'),
            labelWidth:'100px',
            value:'50',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(2);
            }
        });
        $AEE.inputs.blockSettingsColumns2MinWidth = $A.newInput({
            type:'number',
            width:'50px',
            label:$A.translate('min width:'),
            labelWidth:'100px',
            labelAfter:'px',
            value:'200',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(2);
            }
        });
        $AEE.inputs.blockSettingsColumns3 = $A.newInput({
            type:'checkbox',
            labelWidth:'150px',
            label:$A.translate('Third column'),
            checked:false,
            change:function(){
                $AEE.rebuildColumns();
            }
        });
        $AEE.inputs.blockSettingsColumns3.input().attr('tabindex', -1);
        $AEE.inputs.blockSettingsColumns3Width = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'%',
            label:$A.translate('width:'),
            labelWidth:'100px',
            value:'50',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(3);
            }
        });
        $AEE.inputs.blockSettingsColumns3MinWidth = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'px',
            label:$A.translate('min width:'),
            labelWidth:'100px',
            value:'200',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(3);
            }
        });
        $AEE.inputs.blockSettingsColumns4 = $A.newInput({
            type:'checkbox',
            labelWidth:'150px',
            label:$A.translate('Fourth column'),
            checked:false,
            change:function(){
                $AEE.rebuildColumns();
            }
        });
        $AEE.inputs.blockSettingsColumns4.input().attr('tabindex', -1);
        $AEE.inputs.blockSettingsColumns4Width = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'%',
            label:$A.translate('width:'),
            labelWidth:'100px',
            value:'50',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(4);
            }
        });
        $AEE.inputs.blockSettingsColumns4MinWidth = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'px',
            label:$A.translate('min width:'),
            labelWidth:'100px',
            value:'200',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(4);
            }
        });

        $AEE.inputs.blockSettingsColumnsFloatable = $A.newInput({
            type:'checkbox',
            labelWidth:'150px',
            label:$A.translate('Floatable'),
            checked:false,
            change:function(){
                var $block = $block || $AEE.elements.$activeBlock;
                $block.attr('data-floatable', this.checked());
            }
        });

        $AEE.forms.blockSettingsColumns = $A.newForm().addInputs([
            $AEE.inputs.blockSettingsColumns1,
            $AEE.inputs.blockSettingsColumns1Width,
            $AEE.inputs.blockSettingsColumns1MinWidth
        ]).addHtml('<br/>').addInputs([
            $AEE.inputs.blockSettingsColumns2,
            $AEE.inputs.blockSettingsColumns2Width,
            $AEE.inputs.blockSettingsColumns2MinWidth
        ]).addHtml('<br/>').addInputs([
            $AEE.inputs.blockSettingsColumns3,
            $AEE.inputs.blockSettingsColumns3Width,
            $AEE.inputs.blockSettingsColumns3MinWidth
        ]).addHtml('<br/>').addInputs([
            $AEE.inputs.blockSettingsColumns4,
            $AEE.inputs.blockSettingsColumns4Width,
            $AEE.inputs.blockSettingsColumns4MinWidth
        ]).addHtml('<br/>').addInputs([
            $AEE.inputs.blockSettingsColumnsFloatable
        ]).drawTo($AEE.elements.$blockSettingsColumnBox);

    });
})();

(function(){
    $AEE.newBlock = function (o) {

        var onlyContent = false;

        if(typeof o !== 'undefined'){
            onlyContent = o.onlyContent || false;
        }

        var $table = $('<table cellpadding="0" cellspacing="0" border="0" class="aee-block"></table>');
        $table.css({
            width:'100%'
        }).data({
            aeeBlock:true
        });

        if(!onlyContent) {
            var $topRow = $('<tr></tr>').appendTo($table);
            var $topCell = $('<td colspan="3">&nbsp;</td>').appendTo($topRow);
            $topCell.css({
                height: 0 + 'px',
                fontSize: 0 + 'px',
                lineHeight: 0 + 'px',
                padding: 0,
                border: 'none'
            });
            $table.data({
                $topRow: $topRow,
                $topCell: $topCell
            })
        }

        var $middleRow = $('<tr></tr>').appendTo($table);
        var $leftCell = $('<td>&nbsp;</td>').appendTo($middleRow);
        var $contentCell = $('<td class="aee-block-content-cell"></td>').appendTo($middleRow);
        var $rightCell = $('<td>&nbsp;</td>').appendTo($middleRow);
        $rightCell.css({
            width:0 + '%',
            fontSize:0 + 'px',
            lineHeight:0 + 'px',
            padding:0,
            border:'none'
        });
        $contentCell.css({
            padding:'12px 12px 12px 12px',
            border:'0px solid #000000'
        });
        $leftCell.css({
            width:0 + '%',
            fontSize:0 + 'px',
            lineHeight:0 + 'px',
            padding:0,
            border:'none'
        });
        $table.data({
            $middleRow:$middleRow,
            $leftCell:$leftCell,
            $contentCell:$contentCell,
            $rightCell:$rightCell
        });


        if(!onlyContent) {
            var $bottomRow = $('<tr></tr>').appendTo($table);
            var $bottomCell = $('<td colspan="3">&nbsp;</td>').appendTo($bottomRow);
            $bottomCell.css({
                height: 0 + 'px',
                fontSize: 0 + 'px',
                lineHeight: 0 + 'px',
                padding: 0,
                border: 'none'
            });
            $table.data({
                $bottomRow:$bottomRow,
                $bottomCell:$bottomCell
            });
        }

        return $table;
    };
})();

(function(){

    $AEE.dragging = false;

    $AEE.buildBlockListSetDisplay = function(){
        $AEE.settingsShowed = true;
        if($AEE.screenSize()['x'] < 800) {
            $AEE.settingsShowed = false;
            $AEE.blocksShowed = false;
        }
        $AEE.setLayoutByDisplay();
    };
    $AEE.buildBlockListDoBlock = function($block, blockSettings){
        blockSettings.drop.apply($AEE, [$block, $block.data('$contentCell'), $block.data('$topCell'), $block.data('$rightCell'), $block.data('$leftCell'), $block.data('$bottomCell')]);

        setTimeout(function () {
            $block.data('automizy-dropped', true);
            $AEE.setBlockSettings($block);
            $AEE.inputs.bpbm.change();
        }, 20)
    };

    $AEE.buildBlockList = function(){
        var blocksInSort = [
            'image',
            'text',
            'title',
            'columns',
            'share',
            'button',
            'gallery',
            'html'
        ];
        $AEE.blocksInSort = [];

        for(var i = 0; i < blocksInSort.length; i++){
            for(var j = 0; j < $AEE.blocks.length; j++){
                if(blocksInSort[i] === $AEE.blocks[j].name){
                    $AEE.blocksInSort.push($AEE.blocks[j]);
                    break;
                }
            }
        }

        $AEE.block = {};
        for(var i = 0; i < $AEE.blocksInSort.length; i++){
            var block = $AEE.blocksInSort[i];
            block.$widget = $('<div class="aee-block-item"></div>').attr('data-title', block.title).attr('data-name', block.name).appendTo($AEE.elements.$blockList).css({
                backgroundImage:'url(' + $AEE.d.config.dir + '/images/blocks/frame.gif)',
                cursor:'url(' + $AEE.d.config.dir + '/images/cursors/openhand.cur), move'
            }).data('block', block);
            block.$content = $('<div class="aee-block-item-content"></div>').appendTo(block.$widget).css({
                backgroundImage:'url(' + $AEE.d.config.dir + '/images/blocks/' + block.icon + ')'
            });
            $AEE.block[block.name] = block;
        }

        $AEE.blocksShowed = true;


        $AEE.elements.$blockList.find('.aee-block-item').click(function(){
            if(!$AEE.touchable() || $AEE.dragging){
                return false;
            }
            var $block = $AEE.newBlock();
            $block.appendTo($AEE.elements.$document);
            var blockSettings = $(this).data('block');
            $AEE.buildBlockListSetDisplay();
            $AEE.buildBlockListDoBlock($block, blockSettings);
        }).draggable($AEE.settings.draggable);

    };

})();

(function(){
    var moveBlockTouchControllerTimeout;
    function moveBlockTouchController($block){
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
                    var topHeight = $AEE.inputs.bpbm.marginTop();
                    var bottomHeight = $AEE.inputs.bpbm.marginBottom();
                    d.$topCell.add(d.$bottomCell).removeClass('automizy-remove-tr');
                    if(topHeight <= 0){
                        d.$topCell.addClass('automizy-remove-tr');
                    }
                    if(bottomHeight <= 0){
                        d.$bottomCell.addClass('automizy-remove-tr');
                    }

                    var marginRight = $AEE.inputs.bpbm.marginRight();
                    var marginLeft = $AEE.inputs.bpbm.marginLeft();

                    if(marginRight <= 0){

                    }
                    if(marginLeft <= 0){

                    }

                    d.$topCell.attr('style', 'font-size: 0px; line-height: 0px; padding: 0px; border: none; mso-line-height-alt: 0; mso-margin-top-alt: 0px; height:'+topHeight+'px');
                    d.$rightCell[0].style.width = marginRight + '%';
                    d.$rightCell[0].style.minWidth = marginRight + '%';
                    d.$rightCell[0].style.maxWidth = marginRight + '%';
                    d.$rightCell[0].style.padding = 0;
                    d.$rightCell[0].style.margin = 0;
                    d.$rightCell[0].style.border = 'none';
                    d.$rightCell[0].style.lineHeight = 0;
                    d.$rightCell[0].style.fontSize = 0;
                    if(marginRight <= 0){
                        d.$rightCell[0].style.width = '0.01%';
                        d.$rightCell[0].style.minWidth = '0.01%';
                        d.$rightCell[0].style.maxWidth = '0.01%';
                    }
                    d.$bottomCell.attr('style', 'font-size: 0px; line-height: 0px; padding: 0px; border: none; mso-line-height-alt: 0; mso-margin-top-alt: 0px; height:'+bottomHeight+'px');
                    d.$leftCell[0].style.width = marginLeft + '%';
                    d.$leftCell[0].style.minWidth = marginLeft + '%';
                    d.$leftCell[0].style.maxWidth = marginLeft + '%';
                    d.$leftCell[0].style.padding = 0;
                    d.$leftCell[0].style.margin = 0;
                    d.$leftCell[0].style.border = 'none';
                    d.$leftCell[0].style.lineHeight = 0;
                    d.$leftCell[0].style.fontSize = 0;
                    if(marginLeft <= 0){
                        d.$leftCell[0].style.width = '0.01%';
                        d.$leftCell[0].style.minWidth = '0.01%';
                        d.$leftCell[0].style.maxWidth = '0.01%';
                    }

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
                $AEE.inputs.blockSettingsDynamicCheckbox.check();
                $AEE.inputs.blockSettingsDynamicSegments.automizySelect().val(segments.split(',')).change();
            }else{
                $AEE.inputs.blockSettingsDynamicCheckbox.uncheck();
                $AEE.inputs.blockSettingsDynamicSegments.automizySelect().val([]);
            }
        }

        return $AEE;
    };
})();

(function(){
    window.automizyHasMouse = false;
        var mouseMoveListener = function () {
            window.automizyHasMouse = true;
            document.removeEventListener('mousemove', mouseMoveListener, false);
        };
        document.addEventListener('mousemove', mouseMoveListener, false);

        $AEE.touchable = function () {
            if (window.automizyHasMouse) {
                return false;
            }
            return !!('ontouchstart' in window);
        };
})();

(function(){
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
})();

(function(){
    $AEE.ready(function() {
        var BackgroundPaddingBorderMargin = function (obj) {
            var t = this;
            t.d = {
                $widget: $('<div class="automizy-bpbm"></div>'),


                $widgetHelp: $('<img src="'+$A.images.helpIcon+'" class="automizy-input-help" />'),
                $widgetHelpContent: $('<div class="automizy-input-help-content"><img src="'+$A.images.helpArrow+'" class="automizy-input-help-content-arrow" /></div>'),
                $widgetHelpContentInner: $('<span></span>'),

                $marginTable: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-bpbm-margin-table"></table>'),
                $marginTopRow: $('<tr class="automizy-bpbm-margin-top-row"></tr>'),
                $marginMiddleRow: $('<tr class="automizy-bpbm-margin-middle-row"></tr>'),
                $marginBottomRow: $('<tr class="automizy-bpbm-margin-bottom-row"></tr>'),
                $marginTopCell: $('<td colspan="3" class="automizy-bpbm-margin-top-cell"></td>'),
                $marginLeftCell: $('<td class="automizy-bpbm-margin-left-cell"></td>'),
                $marginMiddleCell: $('<td class="automizy-bpbm-margin-middle-cell automizy-bpbm-middle-cell"></td>'),
                $marginRightCell: $('<td class="automizy-bpbm-margin-right-cell"></td>'),
                $marginBottomCell: $('<td colspan="3" class="automizy-bpbm-margin-bottom-cell"></td>'),
                $marginTopCover: $('<div class="automizy-bpbm-cover"></div>'),
                $marginLeftCover: $('<div class="automizy-bpbm-cover"></div>'),
                $marginRightCover: $('<div class="automizy-bpbm-cover"></div>'),
                $marginBottomCover: $('<div class="automizy-bpbm-cover"></div>'),
                $marginText: $('<span class="automizy-bpbm-margin-text"></span>'),
                $marginTopInput: $('<input type="number" min="0" class="automizy-bpbm-margin-top-input automizy-bpbm-number-input"/>'),
                $marginRightInput: $('<input type="number" min="0" max="100" class="automizy-bpbm-margin-right-input automizy-bpbm-number-input"/>'),
                $marginBottomInput: $('<input type="number" min="0" class="automizy-bpbm-margin-bottom-input automizy-bpbm-number-input"/>'),
                $marginLeftInput: $('<input type="number" min="0" max="100" class="automizy-bpbm-margin-left-input automizy-bpbm-number-input"/>'),

                $borderTable: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-bpbm-border-table"></table>'),
                $borderTopRow: $('<tr class="automizy-bpbm-border-top-row"></tr>'),
                $borderMiddleRow: $('<tr class="automizy-bpbm-border-middle-row"></tr>'),
                $borderBottomRow: $('<tr class="automizy-bpbm-border-bottom-row"></tr>'),
                $borderTopCell: $('<td colspan="3" class="automizy-bpbm-border-top-cell"></td>'),
                $borderLeftCell: $('<td class="automizy-bpbm-border-left-cell"></td>'),
                $borderMiddleCell: $('<td class="automizy-bpbm-border-middle-cell automizy-bpbm-middle-cell"></td>'),
                $borderRightCell: $('<td class="automizy-bpbm-border-right-cell"></td>'),
                $borderBottomCell: $('<td colspan="3" class="automizy-bpbm-border-bottom-cell"></td>'),
                $borderText: $('<span class="automizy-bpbm-border-text"></span>'),
                $borderTopWidthInput: $('<input type="number" min="0" class="automizy-bpbm-border-top-input automizy-bpbm-number-input"/>'),
                $borderRightWidthInput: $('<input type="number" min="0" class="automizy-bpbm-border-right-input automizy-bpbm-number-input"/>'),
                $borderBottomWidthInput: $('<input type="number" min="0" class="automizy-bpbm-border-bottom-input automizy-bpbm-number-input"/>'),
                $borderLeftWidthInput: $('<input type="number" min="0" class="automizy-bpbm-border-left-input automizy-bpbm-number-input"/>'),
                $borderTopColorInput: $('<input type="text" class="automizy-bpbm-border-top-color-input automizy-bpbm-color-input"/>'),
                $borderRightColorInput: $('<input type="text" class="automizy-bpbm-border-right-color-input automizy-bpbm-color-input"/>'),
                $borderBottomColorInput: $('<input type="text" class="automizy-bpbm-border-bottom-color-input automizy-bpbm-color-input"/>'),
                $borderLeftColorInput: $('<input type="text" class="automizy-bpbm-border-left-color-input automizy-bpbm-color-input"/>'),

                $paddingTable: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-bpbm-padding-table"></table>'),
                $paddingTopRow: $('<tr class="automizy-bpbm-padding-top-row"></tr>'),
                $paddingMiddleRow: $('<tr class="automizy-bpbm-padding-middle-row"></tr>'),
                $paddingBottomRow: $('<tr class="automizy-bpbm-padding-bottom-row"></tr>'),
                $paddingTopCell: $('<td colspan="3" class="automizy-bpbm-padding-top-cell"></td>'),
                $paddingLeftCell: $('<td class="automizy-bpbm-padding-left-cell"></td>'),
                $paddingMiddleCell: $('<td class="automizy-bpbm-padding-middle-cell automizy-bpbm-middle-cell"></td>'),
                $paddingRightCell: $('<td class="automizy-bpbm-padding-right-cell"></td>'),
                $paddingBottomCell: $('<td colspan="3" class="automizy-bpbm-padding-bottom-cell"></td>'),
                $paddingText: $('<span class="automizy-bpbm-padding-text"></span>'),
                $paddingTopInput: $('<input type="number" min="0" class="automizy-bpbm-padding-top-input automizy-bpbm-number-input"/>'),
                $paddingRightInput: $('<input type="number" min="0" class="automizy-bpbm-padding-right-input automizy-bpbm-number-input"/>'),
                $paddingBottomInput: $('<input type="number" min="0" class="automizy-bpbm-padding-bottom-input automizy-bpbm-number-input"/>'),
                $paddingLeftInput: $('<input type="number" min="0" class="automizy-bpbm-padding-left-input automizy-bpbm-number-input"/>'),

                $backgroundText: $('<span class="automizy-bpbm-background-text"></span>'),
                $backgroundColorInput:$('<input type="text" class="automizy-bpbm-background-color-input automizy-bpbm-color-input"/>'),

                id: 'automizy-bpbm-' + $A.getUniqueString(),
                change: function () {
                },
                create: function () {
                },
                open: function () {
                },
                close: function () {
                }
            };
            t.init();

            t.d.$widgetHelpContent.appendTo('body:first');
            t.d.$widgetHelpContentInner.appendTo(t.d.$widgetHelpContent).html($A.translate('The padding clears an area around the content (inside the border) of an element. The padding is affected by the background color of the element. The top, right, bottom, and left padding can be changed independently using separate properties. The margin clears an area around an element (outside the border). The margin does not have a background color, and is completely transparent. The top, right, bottom, and left margin can be changed independently using separate properties. The border attribute specifies if a border should be displayed around the table cells or not.'))
            t.d.$widgetHelp.appendTo(t.d.$marginTopCell).on('mouseenter click', function () {
                var posX = t.d.$widgetHelp.offset().left + 40;
                var posY = t.d.$widgetHelp.offset().top - 16;
                t.d.$widgetHelpContent.css({
                    left: posX + 'px',
                    top: posY + 'px'
                }).stop().fadeIn();
            }).mouseout(function () {
                t.d.$widgetHelpContent.stop().fadeOut();
            }).css({
                position:'absolute',
                top:'10px',
                right:'10px'
            });

            t.d.$marginTable.appendTo(t.d.$widget);
            t.d.$marginTopRow.appendTo(t.d.$marginTable);
            t.d.$marginMiddleRow.appendTo(t.d.$marginTable);
            t.d.$marginBottomRow.appendTo(t.d.$marginTable);
            t.d.$marginTopCell.appendTo(t.d.$marginTopRow);
            t.d.$marginText.appendTo(t.d.$marginTopCell).html($A.translate('margin'));
            t.d.$marginLeftCell.appendTo(t.d.$marginMiddleRow);
            t.d.$marginMiddleCell.appendTo(t.d.$marginMiddleRow);
            t.d.$marginRightCell.appendTo(t.d.$marginMiddleRow);
            t.d.$marginBottomCell.appendTo(t.d.$marginBottomRow);
            t.d.$marginTopCover.appendTo(t.d.$marginTopCell);
            t.d.$marginLeftCover.appendTo(t.d.$marginLeftCell);
            t.d.$marginRightCover.appendTo(t.d.$marginRightCell);
            t.d.$marginBottomCover.appendTo(t.d.$marginBottomCell);
            t.d.$marginTopInput.appendTo(t.d.$marginTopCell).pbmInput().after('px');
            t.d.$marginLeftInput.appendTo(t.d.$marginLeftCell).pbmInput().after('%');
            t.d.$marginBottomInput.appendTo(t.d.$marginBottomCell).pbmInput().after('px');
            t.d.$marginRightInput.appendTo(t.d.$marginRightCell).pbmInput().after('%');

            t.d.$borderTable.appendTo(t.d.$marginMiddleCell);
            t.d.$borderTopRow.appendTo(t.d.$borderTable);
            t.d.$borderMiddleRow.appendTo(t.d.$borderTable);
            t.d.$borderBottomRow.appendTo(t.d.$borderTable);
            t.d.$borderTopCell.appendTo(t.d.$borderTopRow);
            t.d.$borderText.appendTo(t.d.$borderTopCell).html($A.translate('border'));
            t.d.$borderLeftCell.appendTo(t.d.$borderMiddleRow);
            t.d.$borderMiddleCell.appendTo(t.d.$borderMiddleRow);
            t.d.$borderRightCell.appendTo(t.d.$borderMiddleRow);
            t.d.$borderBottomCell.appendTo(t.d.$borderBottomRow);
            t.d.$borderTopWidthInput.appendTo(t.d.$borderTopCell).pbmInput().after('px<br/>');
            t.d.$borderLeftWidthInput.appendTo(t.d.$borderLeftCell).pbmInput().after('px<br/>');
            t.d.$borderBottomWidthInput.appendTo(t.d.$borderBottomCell).pbmInput().after('px<br/>');
            t.d.$borderRightWidthInput.appendTo(t.d.$borderRightCell).pbmInput().after('px<br/>');
            t.d.$borderTopColorInput.appendTo(t.d.$borderTopCell);
            t.d.$borderLeftColorInput.appendTo(t.d.$borderLeftCell);
            t.d.$borderBottomColorInput.appendTo(t.d.$borderBottomCell);
            t.d.$borderRightColorInput.appendTo(t.d.$borderRightCell);

            t.d.$paddingTable.appendTo(t.d.$borderMiddleCell);
            t.d.$paddingTopRow.appendTo(t.d.$paddingTable);
            t.d.$paddingMiddleRow.appendTo(t.d.$paddingTable);
            t.d.$paddingBottomRow.appendTo(t.d.$paddingTable);
            t.d.$paddingTopCell.appendTo(t.d.$paddingTopRow);
            t.d.$paddingText.appendTo(t.d.$paddingTopCell).html($A.translate('padding'));
            t.d.$paddingLeftCell.appendTo(t.d.$paddingMiddleRow);
            t.d.$paddingMiddleCell.appendTo(t.d.$paddingMiddleRow);
            t.d.$paddingRightCell.appendTo(t.d.$paddingMiddleRow);
            t.d.$paddingBottomCell.appendTo(t.d.$paddingBottomRow);
            t.d.$paddingTopInput.appendTo(t.d.$paddingTopCell).val(12).pbmInput().after('px');
            t.d.$paddingLeftInput.appendTo(t.d.$paddingLeftCell).val(2).pbmInput().after('px');
            t.d.$paddingBottomInput.appendTo(t.d.$paddingBottomCell).val(12).pbmInput().after('px');
            t.d.$paddingRightInput.appendTo(t.d.$paddingRightCell).val(2).pbmInput().after('px');

            t.d.$backgroundText.appendTo(t.d.$paddingMiddleCell).html($A.translate('back-<br/>color'));
            t.d.$backgroundColorInput.appendTo(t.d.$paddingMiddleCell);

            t.d.$marginTopInput
                .add(t.d.$marginLeftInput)
                .add(t.d.$marginBottomInput)
                .add(t.d.$marginRightInput)
                .add(t.d.$borderTopWidthInput)
                .add(t.d.$borderLeftWidthInput)
                .add(t.d.$borderBottomWidthInput)
                .add(t.d.$borderRightWidthInput)
                .val(0);

            t.d.$marginTopInput
                .add(t.d.$marginLeftInput)
                .add(t.d.$marginBottomInput)
                .add(t.d.$marginRightInput)
                .add(t.d.$paddingTopInput)
                .add(t.d.$paddingLeftInput)
                .add(t.d.$paddingBottomInput)
                .add(t.d.$paddingRightInput)
                .add(t.d.$borderTopWidthInput)
                .add(t.d.$borderLeftWidthInput)
                .add(t.d.$borderBottomWidthInput)
                .add(t.d.$borderRightWidthInput)
                .add(t.d.$borderTopColorInput)
                .add(t.d.$borderLeftColorInput)
                .add(t.d.$borderBottomColorInput)
                .add(t.d.$borderRightColorInput)
                .add(t.d.$backgroundColorInput)
                .change(function(){
                    t.change.apply(t, [])
                });

            t.d.$borderTopColorInput
                .add(t.d.$borderLeftColorInput)
                .add(t.d.$borderBottomColorInput)
                .add(t.d.$borderRightColorInput)
                .add(t.d.$backgroundColorInput)
                .colpick({
                    colorScheme:'dark',
                    layout:'rgbhex',
                    color:'b8b8b8',
                    onSubmit:function(hsb,hex,rgb,el) {
                        $(el).css({
                            backgroundColor:'#'+hex,
                            color:'#'+hex
                        }).val('#'+hex).trigger('change').colpickHide();
                    }
                });


            if (typeof obj !== 'undefined') {
                if (typeof obj.margin !== 'undefined')
                    t.margin(obj.margin);
                if (typeof obj.marginTop !== 'undefined')
                    t.marginTop(obj.marginTop);
                if (typeof obj.marginRight !== 'undefined')
                    t.marginRight(obj.marginRight);
                if (typeof obj.marginBottom !== 'undefined')
                    t.marginBottom(obj.marginBottom);
                if (typeof obj.marginLeft !== 'undefined')
                    t.marginLeft(obj.marginLeft);
                if (typeof obj.border !== 'undefined')
                    t.border(obj.border);
                if (typeof obj.borderTopWidth !== 'undefined')
                    t.borderTopWidth(obj.borderTopWidth);
                if (typeof obj.borderTopColor !== 'undefined')
                    t.borderTopColor(obj.borderTopColor);
                if (typeof obj.borderRightWidth !== 'undefined')
                    t.borderRightWidth(obj.borderRightWidth);
                if (typeof obj.borderRightColor !== 'undefined')
                    t.borderRightColor(obj.borderRightColor);
                if (typeof obj.borderBottomWidth !== 'undefined')
                    t.borderBottomWidth(obj.borderBottomWidth);
                if (typeof obj.borderBottomColor !== 'undefined')
                    t.borderBottomColor(obj.borderBottomColor);
                if (typeof obj.borderLeftWidth !== 'undefined')
                    t.borderLeftWidth(obj.borderLeftWidth);
                if (typeof obj.borderLeftColor !== 'undefined')
                    t.borderLeftColor(obj.borderLeftColor);
                if (typeof obj.padding !== 'undefined')
                    t.padding(obj.padding);
                if (typeof obj.paddingTop !== 'undefined')
                    t.paddingTop(obj.paddingTop);
                if (typeof obj.paddingRight !== 'undefined')
                    t.paddingRight(obj.paddingRight);
                if (typeof obj.paddingBottom !== 'undefined')
                    t.paddingBottom(obj.paddingBottom);
                if (typeof obj.paddingLeft !== 'undefined')
                    t.paddingLeft(obj.paddingLeft);
                t.initParameter(obj);
            }
        };

        var p = BackgroundPaddingBorderMargin.prototype;

        p.margin = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return {
                    top: t.marginTop(),
                    right: t.marginRight(),
                    bottom: t.marginBottom(),
                    left: t.marginLeft()
                }
            }else{
                if($.isArray(value)){
                    t.marginTop(value[0]);
                    t.marginRight(value[1]);
                    t.marginBottom(value[2]);
                    t.marginLeft(value[3]);
                }else{
                    t.marginTop(value.top);
                    t.marginRight(value.right);
                    t.marginBottom(value.bottom);
                    t.marginLeft(value.left);
                }
            }
            return t;
        };
        p.marginTop = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$marginTopInput.val());
            }
            t.d.$marginTopInput.val(parseInt(value));
            return t;
        };
        p.marginRight = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$marginRightInput.val());
            }
            t.d.$marginRightInput.val(parseInt(value));
            return t;
        };
        p.marginBottom = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$marginBottomInput.val());
            }
            t.d.$marginBottomInput.val(parseInt(value));
            return t;
        };
        p.marginLeft = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$marginLeftInput.val());
            }
            t.d.$marginLeftInput.val(parseInt(value));
            return t;
        };

        p.padding = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return {
                    top: t.paddingTop(),
                    right: t.paddingRight(),
                    bottom: t.paddingBottom(),
                    left: t.paddingLeft()
                }
            }else{
                if($.isArray(value)){
                    t.paddingTop(value[0]);
                    t.paddingRight(value[1]);
                    t.paddingBottom(value[2]);
                    t.paddingLeft(value[3]);
                }else{
                    t.paddingTop(value.top);
                    t.paddingRight(value.right);
                    t.paddingBottom(value.bottom);
                    t.paddingLeft(value.left);
                }
            }
            return t;
        };
        p.paddingTop = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$paddingTopInput.val());
            }
            t.d.$paddingTopInput.val(parseInt(value));
            return t;
        };
        p.paddingRight = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$paddingRightInput.val());
            }
            t.d.$paddingRightInput.val(parseInt(value));
            return t;
        };
        p.paddingBottom = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$paddingBottomInput.val());
            }
            t.d.$paddingBottomInput.val(parseInt(value));
            return t;
        };
        p.paddingLeft = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$paddingLeftInput.val());
            }
            t.d.$paddingLeftInput.val(parseInt(value));
            return t;
        };

        p.border = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return {
                    top: t.borderTopWidth(),
                    right: t.borderRightWidth(),
                    bottom: t.borderBottomWidth(),
                    left: t.borderLeftWidth()
                }
            }else{
                if($.isArray(value)){
                    if(value.length === 4) {
                        t.borderTopWidth(value[0]);
                        t.borderRightWidth(value[1]);
                        t.borderBottomWidth(value[2]);
                        t.borderLeftWidth(value[3]);
                    }else{
                        t.borderTopWidth(value[0]);
                        t.borderTopColor(value[1]);
                        t.borderRightWidth(value[2]);
                        t.borderRightColor(value[3]);
                        t.borderBottomWidth(value[4]);
                        t.borderBottomColor(value[5]);
                        t.borderLeftWidth(value[6]);
                        t.borderLeftColor(value[7]);
                    }
                }else{
                    t.borderTopWidth(value.topWidth);
                    t.borderRightWidth(value.rightWidth);
                    t.borderBottomWidth(value.bottomWidth);
                    t.borderLeftWidth(value.leftWidth);
                    t.borderTopColor(value.topColor);
                    t.borderRightColor(value.rightColor);
                    t.borderBottomColor(value.bottomColor);
                    t.borderLeftColor(value.leftColor);
                }
            }
            return t;
        };
        p.borderTopWidth = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$borderTopWidthInput.val());
            }
            t.d.$borderTopWidthInput.val(parseInt(value));
            return t;
        };
        p.borderRightWidth = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$borderRightWidthInput.val());
            }
            t.d.$borderRightWidthInput.val(parseInt(value));
            return t;
        };
        p.borderBottomWidth = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$borderBottomWidthInput.val());
            }
            t.d.$borderBottomWidthInput.val(parseInt(value));
            return t;
        };
        p.borderLeftWidth = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$borderLeftWidthInput.val());
            }
            t.d.$borderLeftWidthInput.val(parseInt(value));
            return t;
        };
        p.borderTopColor = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                if(t.borderTopWidth() <= 0){
                    return 'transparent';
                }
                return $AEE.rgbStyleToHex(t.d.$borderTopColorInput.val());
            }
            t.d.$borderTopColorInput.css({
                backgroundColor:value,
                color:value
            }).val(value).colpickSetColor(value);
            return t;
        };
        p.borderRightColor = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                if(t.borderRightWidth() <= 0){
                    return 'transparent';
                }
                return $AEE.rgbStyleToHex(t.d.$borderRightColorInput.val());
            }
            t.d.$borderRightColorInput.css({
                backgroundColor:value,
                color:value
            }).val(value).colpickSetColor(value);
            return t;
        };
        p.borderBottomColor = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                if(t.borderBottomWidth() <= 0){
                    return 'transparent';
                }
                return $AEE.rgbStyleToHex(t.d.$borderBottomColorInput.val());
            }
            t.d.$borderBottomColorInput.css({
                backgroundColor:value,
                color:value
            }).val(value).colpickSetColor(value);
            return t;
        };
        p.borderLeftColor = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                if(t.borderLeftWidth() <= 0){
                    return 'transparent';
                }
                return $AEE.rgbStyleToHex(t.d.$borderLeftColorInput.val());
            }
            t.d.$borderLeftColorInput.css({
                backgroundColor:value,
                color:value
            }).val(value).colpickSetColor(value);
            return t;
        };
        p.borderTopStyle = function(){
            var t = this;
            if(t.borderTopWidth() <= 0){
                return 'none';
            }
            return 'solid';
        };
        p.borderRightStyle = function(){
            var t = this;
            if(t.borderRightWidth() <= 0){
                return 'none';
            }
            return 'solid';
        };
        p.borderBottomStyle = function(){
            var t = this;
            if(t.borderBottomWidth() <= 0){
                return 'none';
            }
            return 'solid';
        };
        p.borderLeftStyle = function(){
            var t = this;
            if(t.borderLeftWidth() <= 0){
                return 'none';
            }
            return 'solid';
        };
        p.backgroundColor = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return t.d.$backgroundColorInput.val();
            }
            if(value === false || value === ''){
                t.d.$backgroundColorInput.css({
                    backgroundColor:'#ffffff',
                    color:'#ffffff'
                }).val('').colpickSetColor('#ffffff');
                return t;
            }
            t.d.$backgroundColorInput.css({
                backgroundColor:value,
                color:value
            }).val(value).colpickSetColor(value);
            return t;
        };

        p.change = function(func){
            var t = this;
            if(typeof func === 'function'){
                t.d.change = func;
                return t;
            }
            t.d.change.apply(t, []);
            return t;
        };
        p.disableMargin = function(){
            var t = this;
            t.d.$marginTopCover.show();
            t.d.$marginRightCover.show();
            t.d.$marginBottomCover.show();
            t.d.$marginLeftCover.show();
            return t;
        };
        p.enableMargin = function(){
            var t = this;
            t.d.$marginTopCover.hide();
            t.d.$marginRightCover.hide();
            t.d.$marginBottomCover.hide();
            t.d.$marginLeftCover.hide();
            return t;
        };

        $A.initBasicFunctions(BackgroundPaddingBorderMargin, "bpbm");
    });
})();

(function(){
    $AEE.ready(function () {
        $AEE.elements.$tmp = $('<div></div>');
        $AEE.elements.$spacer = $('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" />');

        $AEE.elements.$widget = $('<div id="automizy-email-editor"></div>').appendTo('body:first');
        if ($AEE.touchable()) {
            $A.convertToResponsive();
            $AEE.elements.$widget.addClass('automizy-touchable');
            $('body:first').addClass('automizy-touchable');
        }
        $AEE.elements.$widgetTable = $('<table cellpadding="0" cellspacing="0" border="0" id="aee-widget-table"></table>').appendTo($AEE.elements.$widget);
        $AEE.elements.$widgetTableFirstRow = $('<tr></tr>').appendTo($AEE.elements.$widgetTable);
        $AEE.elements.$widgetTableSecondRow = $('<tr></tr>').appendTo($AEE.elements.$widgetTable);

        $AEE.elements.$header = $('<td id="aee-header"></td>').appendTo($AEE.elements.$widgetTableFirstRow);
        $AEE.elements.$headerButtons = $('<div id="aee-header-buttons"></div>').appendTo($AEE.elements.$header);
        $AEE.elements.$logoLink = $('<a href="#" target="_blank" id="aee-logo-link" />').appendTo($AEE.elements.$header);
        $AEE.elements.$logoImage = $('<img src="" id="aee-logo-img" />').appendTo($AEE.elements.$logoLink);
        $AEE.elements.$headerTitle = $('<div id="aee-header-title" />').appendTo($AEE.elements.$header);
        $AEE.elements.$lastSave = $('<div id="aee-header-lastsave" />').html($A.translate('It has not been saved yet')).appendTo($AEE.elements.$header);
        $AEE.saved = false;

        $AEE.buttons.saveAndExitButton = $A.newButton({
            text: $A.translate('Save and next >>'),
            skin: 'simple-orange',
            float: 'right',
            thin: true,
            target: $AEE.elements.$headerButtons,
            click: function () {
                $AEE.clickToSaveAndExit();
            }
        });
        $AEE.buttons.saveButton = $A.newButton({
            text: $A.translate('Save'),
            skin: 'simple-orange',
            float: 'right',
            thin: true,
            target: $AEE.elements.$headerButtons,
            click: function () {
                $AEE.clickToSave();
            }
        });
        $AEE.buttons.previewButton = $A.newButton({
            text: $A.translate('Preview'),
            skin: 'simple-white',
            float: 'right',
            thin: true,
            target: $AEE.elements.$headerButtons,
            click: function () {
                $AEE.clickToPreview();
            }
        });
        $AEE.buttons.backButton = $A.newButton({
            text: $A.translate('<< Back'),
            skin: 'simple-white',
            float: 'right',
            thin: true,
            target: $AEE.elements.$headerButtons,
            click: function () {
                $AEE.clickToBack();
            }
        });
        $AEE.buttons.sendTestButton = $A.newButton({
            text: $A.translate('Send test email'),
            skin: 'simple-orange',
            click: function () {
                $AEE.clickToSendTest();
            }
        });
        $AEE.elements.$mobileMenu = $('<div id="aee-mobilemenu"></div>').appendTo($AEE.elements.$widget);
        $AEE.elements.$mobileSaveButton = $('<div class="aee-mobilemenu-item"></div>').html($A.translate('Save')).appendTo($AEE.elements.$mobileMenu).click(function () {
            $AEE.clickToSave();
            $AEE.elements.$mobileMenu.stop().fadeOut();
        });
        $AEE.elements.$mobilePreviewButton = $('<div class="aee-mobilemenu-item"></div>').html($A.translate('Preview')).appendTo($AEE.elements.$mobileMenu).click(function () {
            $AEE.clickToPreview();
            $AEE.elements.$mobileMenu.stop().fadeOut();
        });
        $AEE.elements.$mobileSaveAndExitButton = $('<div class="aee-mobilemenu-item"></div>').html($A.translate('Save and next >>')).appendTo($AEE.elements.$mobileMenu).click(function () {
            $AEE.clickToSaveAndExit();
            $AEE.elements.$mobileMenu.stop().fadeOut();
        });
        $AEE.elements.$mobileBackButton = $('<div class="aee-mobilemenu-item"></div>').html($A.translate('<< Back')).appendTo($AEE.elements.$mobileMenu).click(function () {
            $AEE.clickToBack();
            $AEE.elements.$mobileMenu.stop().fadeOut();
        });

        $AEE.elements.$widgetTableSecondCell = $('<td id="aee-second-cell"></td>').appendTo($AEE.elements.$widgetTableSecondRow);

        $AEE.elements.$mobileMenuIcon = $('<div id="aee-mobilemenu-icon"></div>').appendTo($AEE.elements.$widget).css({
            backgroundImage: 'url(' + $AEE.d.config.dir + '/images/icon-menu.png)'
        }).click(function (event) {
            event.stopPropagation();
            $AEE.elements.$mobileMenu.stop().fadeToggle();
        });
        $AEE.elements.$blocksIcon = $('<div id="aee-blocks-icon"></div>').appendTo($AEE.elements.$widgetTableSecondCell).css({
            backgroundImage: 'url(' + $AEE.d.config.dir + '/images/icon-blocks.png)'
        }).click(function () {
            $AEE.blocksShowed = true;
            $AEE.settingsShowed = false;
            $AEE.setLayoutByDisplay();
        });
        $AEE.elements.$settingsIcon = $('<div id="aee-settings-icon"></div>').appendTo($AEE.elements.$widgetTableSecondCell).css({
            backgroundImage: 'url(' + $AEE.d.config.dir + '/images/icon-settings.png)'
        }).click(function () {
            $AEE.blocksShowed = false;
            $AEE.settingsShowed = true;
            $AEE.setLayoutByDisplay();
        });

        $AEE.elements.$blockList = $('<div id="aee-block-list"></div>').appendTo($AEE.elements.$widgetTableSecondCell);
        $AEE.elements.$blockListModal = $('<div id="aee-block-list-modal"></div>').appendTo($AEE.elements.$blockList);

        $AEE.elements.$editor = $('<div id="aee-editor"></div>').appendTo($AEE.elements.$widgetTableSecondCell);
        $AEE.elements.$documentBox = $('<div id="aee-document-box"></div>').appendTo($AEE.elements.$editor);
        $AEE.elements.$document = $('<div id="aee-document" style="width:800px"></div>').appendTo($AEE.elements.$documentBox);
        $AEE.elements.$blockHandle = $('<div class="aee-block-handle"></div>').appendTo($AEE.elements.$widget).css({
            cursor: 'url(' + $AEE.d.config.dir + '/images/cursors/openhand.cur), move',
            backgroundImage: 'url(' + $AEE.d.config.dir + '/images/block-handle.gif)'
        });
        $AEE.elements.$blockHandleCopy = $('<div class="aee-block-handle-copy"></div>').appendTo($AEE.elements.$blockHandle).css({
            backgroundImage: 'url(' + $AEE.d.config.dir + '/images/block-copy.png)'
        }).click(function () {
            setTimeout(function () {
                $AEE.elements.$blockHandle.appendTo($AEE.elements.$tmp);
                $AEE.setBlockSettings($AEE.elements.$activeBlock.clone().insertAfter($AEE.elements.$activeBlock).automizySetUp());
            }, 20);
        });
        $AEE.elements.$blockHandleDelete = $('<div class="aee-block-handle-delete"></div>').appendTo($AEE.elements.$blockHandle).css({
            backgroundImage: 'url(' + $AEE.d.config.dir + '/images/block-delete.png)'
        }).click(function () {
            setTimeout(function () {
                if (confirm("Are you sure you want to delete this block?")) {
                    $AEE.elements.$blockHandle.appendTo($AEE.elements.$tmp);
                    $AEE.elements.$activeBlock.remove();
                }
            }, 20);
        });

        $AEE.elements.$blockSettings = $('<div id="aee-block-settings"></div>').appendTo($AEE.elements.$widgetTableSecondCell);
        $AEE.elements.$blockSettingsContent = $('<div id="aee-block-settings-content"></div>').appendTo($AEE.elements.$blockSettings);
        $AEE.elements.$blockSettingsContentTitle = $('<div id="aee-block-settings-content-title"></div>').appendTo($AEE.elements.$blockSettingsContent);
        $AEE.inputs.bpbm = $A.bpbm().drawTo($AEE.elements.$blockSettingsContent);

        $AEE.inputs.dropFiles = $A.newInput({
            id: 'aee-drop-files',
            type: 'file',
            name: 'aee-drop-files'
        }).draw().hide();
        $AEE.elements.$dropFilesCover = $('<div id="aee-drop-files-cover"></div>').text($A.translate('Drop the files here!')).appendTo($AEE.elements.$widget);
        $AEE.elements.$dropFilesProgressCover = $('<div id="aee-drop-files-progress-cover"></div>').appendTo($AEE.elements.$widget);
        $AEE.elements.$dropFilesProgressCoverText = $('<div id="aee-drop-files-progress-cover-text"></div>').text('Uploading files!').appendTo($AEE.elements.$dropFilesProgressCover);
        $AEE.elements.$dropFilesProgressBarBox = $('<div id="aee-drop-files-progress-bar-box"></div>').appendTo($AEE.elements.$dropFilesProgressCover);
        $AEE.elements.$dropFilesProgressBar = $('<div id="aee-drop-files-progress-bar"></div>').appendTo($AEE.elements.$dropFilesProgressBarBox);
        $AEE.elements.$dropFilesProgressBarText = $('<div id="aee-drop-files-progress-bar-text"></div>').appendTo($AEE.elements.$dropFilesProgressBarBox);

        $AEE.elements.$blockSettingsDynamicBox = $('<div id="aee-block-settings-dynamic-box" class="aee-block-settings-box"></div>').appendTo($AEE.elements.$blockSettingsContent);
        $AEE.elements.$zIndexStyle = $('<style></style>').appendTo($('body:first'));
        $AEE.inputs.blockSettingsDynamicCheckbox = $A.newInput2({
            type: 'checkbox',
            labelBefore: $A.translate('Dynamic block'),
            checked: false,
            change: function () {
                if (this.checked()) {
                    $AEE.inputs.blockSettingsDynamicSegments.show();
                    var segments = $AEE.inputs.blockSettingsDynamicSegments.val() || [];
                    $AEE.elements.$activeBlock.attr('data-dynamic-segments', segments.join(','));
                } else {
                    $AEE.inputs.blockSettingsDynamicSegments.hide();
                    $AEE.elements.$activeBlock.removeAttr('data-dynamic-segments');
                }
            }
        });
        $AEE.inputs.blockSettingsDynamicSegments = $A.newInput2({
            type: 'select',
            multiple: true,
            labelTop: $A.translate('Who should see this content block?'),
            options: [],
            change: function () {
                var value = this.automizySelect().val();
                if(!!value && typeof value.join === 'function') {
                    $AEE.elements.$activeBlock.attr('data-dynamic-segments', value.join(','));
                }
            }
        }).hide();
        $AEE.forms.blockSettingsDynamic = $A.newForm().addInputs([
            $AEE.inputs.blockSettingsDynamicCheckbox,
            $AEE.inputs.blockSettingsDynamicSegments
        ]).drawTo($AEE.elements.$blockSettingsDynamicBox);

        $AEE.elements.$blockSettingsDocumentBox = $('<div id="aee-block-settings-document-box" class="aee-block-settings-box"></div>').appendTo($AEE.elements.$blockSettingsContent);
        $AEE.inputs.blockSettingsResponsiveEmail = $A.newInput2({
            type: 'checkbox',
            labelBefore: $A.translate('Responsive'),
            checked: true,
            change: function () {
                if (this.checked()) {
                    $AEE.inputs.blockSettingsDocumentMaxWidth.labelBefore($A.translate('Max. width'));
                    $AEE.elements.$document.attr('data-responsive-email', '1');
                } else {
                    $AEE.inputs.blockSettingsDocumentMaxWidth.labelBefore($A.translate('Width'));
                    $AEE.elements.$document.attr('data-responsive-email', '0');
                }
            }
        });
        $AEE.inputs.blockSettingsDocumentMaxWidth = $A.newInput2({
            type: 'number',
            labelBefore: $A.translate('Max. width'),
            value: 800,
            enter: function () {
                this.change();
                return false;
            },
            change: function () {
                $AEE.elements.$document[0].style.width = this.val() + 'px';
            },
            create: function () {
                this.input().attr('min', 300).attr('max', 2500).pbmInput();
            }
        });
        $AEE.inputs.blockSettingsDocumentOuterColor = $A.newInput2({
            type: 'text',
            labelBefore: $A.translate('Outer color'),
            change: function () {
                $AEE.elements.$documentBox[0].style.backgroundColor = this.val();
                $AEE.elements.$document.attr('data-outer-color', this.val());
            },
            create: function () {
                this.input().css({
                    width: '29px',
                    height: '25px',
                    '-webkit-box-shadow': 'none',
                    'box-shadow': 'none'
                }).addClass('automizy-bpbm-color-input').colpick({
                    colorScheme: 'dark',
                    layout: 'rgbhex',
                    color: '#ffffff',
                    onSubmit: function (hsb, hex, rgb, el) {
                        $(el).css({
                            backgroundColor: '#' + hex,
                            color: '#' + hex
                        }).val('#' + hex).trigger('change').colpickHide();
                    },
                    onShow: function (el) {
                        (function (el) {
                            setTimeout(function () {
                                var $d = $(document);
                                var documentWidth = $AEE.widget().width();
                                var documentHeight = $AEE.widget().height();
                                var elementWidth = parseInt(el.offsetWidth);
                                var elementHeight = parseInt(el.offsetHeight);
                                var elementRight = parseInt(el.style.left) + elementWidth;
                                var elementBottom = parseInt(el.style.top) + elementHeight;
                                var offsetLeft = elementRight - documentWidth;
                                var offsetTop = elementBottom - documentHeight;

                                if (offsetLeft > 0) {
                                    el.style.left = documentWidth - elementWidth + 'px';
                                }
                                if (offsetTop > 0) {
                                    el.style.top = documentHeight - elementHeight + 'px';
                                }
                            }, 10)
                        })(el);
                    }
                });
            }
        });
        $AEE.inputs.blockSettingsPreviewText = $A.newInput2({
            type: 'textarea',
            labelBefore: $A.translate('Preview text'),
            change: function () {
                $AEE.elements.$document.attr('data-preview-text', this.val());
            }
        });

        $AEE.forms.blockSettingsDocument = $A.newForm().addInputs([
            $AEE.inputs.blockSettingsResponsiveEmail,
            $AEE.inputs.blockSettingsDocumentMaxWidth,
            $AEE.inputs.blockSettingsDocumentOuterColor,
            $AEE.inputs.blockSettingsPreviewText
        ]).drawTo($AEE.elements.$blockSettingsDocumentBox);


        $('<style>#aee-document .aee-ui-state-highlight:before{content: "' + $A.translate("Drop here") + '"}</style>').appendTo('body:first');
        $('<style>#aee-block-list .aee-ui-state-highlight:before{content: "' + $A.translate("Delete") + '"}</style>').appendTo('body:first');


        if (!$AEE.d.values.logoLink) {
            $AEE.logoLink('https://automizy.com');
        }
        if (!$AEE.d.values.logoSrc) {
            $AEE.logoSrc($AEE.d.config.dir + '/images/logo-automizy.png');
        }
        if (!$AEE.d.values.title) {
            $AEE.title($A.translate('Automizy Email Editor'));
        }
        if (!$AEE.d.values.subject) {
            $AEE.subject($A.translate('Test email'));
        }
        if (!$AEE.d.functions.clickToPreview) {
            $AEE.clickToPreview(function () {
                $AEE.dialogs.preview.open();
            });
        }
        if (!$AEE.d.functions.clickToSendTest) {
            $AEE.clickToSendTest(function () {
                $AEE.dialogs.sendTest.open();
            });
        }
        if (!$AEE.d.functions.clickToSave) {
            $AEE.clickToSave(function () {
                $AEE.save();
            });
        }
        if (!$AEE.d.functions.clickToSaveAndExit) {
            $AEE.clickToSaveAndExit(function () {
                $AEE.saveAndExit();
            });
        }
        if (!$AEE.d.functions.clickToBack) {
            $AEE.clickToBack(function () {
                if ($AEE.saved) {
                    $AEE.close();
                } else if (confirm($A.translate('You have unsaved edits in the campaign. Are you sure you want to exit?'))) {
                    $AEE.close();
                }
            });
        }
        if (!$AEE.d.functions.save) {
            $AEE.save(function (aeeData) {
                $AEE.newsletterId = $AEE.newsletterId || 0;
                if ($AEE.newsletterId === 0) {
                    return $AA.newsletters().insert({
                        name: aeeData.title,
                        subject: '',
                        tags: [],
                        editorCode: aeeData.editorCode,
                        htmlCode: aeeData.htmlCode,
                        maxWidth: aeeData.maxWidth
                    }).done(function (data) {
                        $AEE.newsletterId = data.id;
                    }).error(function () {
                        alert('Save error!');
                    });
                } else {
                    return $AA.newsletters().update({
                        id: $AEE.newsletterId,
                        name: aeeData.title,
                        subject: '',
                        tags: [],
                        editorCode: aeeData.editorCode,
                        htmlCode: aeeData.htmlCode,
                        maxWidth: aeeData.maxWidth
                    }).done(function (data) {

                    }).error(function () {
                        alert('Save error!');
                    });
                }
            });
        }
        if (!$AEE.d.functions.saveAndExit) {
            $AEE.saveAndExit(function (aeeData) {
                $A.ajaxDocumentCover(1);
                $AEE.save().done(function () {
                    $AEE.close();
                }).complete(function () {
                    $A.ajaxDocumentCover(0);
                });
            });
        }


        setTimeout(function () {
            setTimeout(function () {
                $AEE.elements.$blockList.niceScroll($AEE.settings.niceScroll);
                $AEE.elements.$documentBox.niceScroll($AEE.settings.niceScroll);
                $AEE.elements.$blockSettings.niceScroll($AEE.settings.niceScroll);

                $AEE.elements.$blockList[0].addEventListener('touchmove', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }, false);
                $AEE.elements.$documentBox[0].addEventListener('touchmove', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }, false);
                $AEE.elements.$blockSettings[0].addEventListener('touchmove', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }, false);

                /*var niceObj = $.extend({}, $AEE.settings.niceScroll);
                 niceObj.zindex = 2003;
                 for(var i in $AEE.dialogs){
                 $AEE.dialogs[i].widget().find('.automizy-dialog-content:first').niceScroll(niceObj)
                 }*/
            }, 600);
            $AEE.buildBlockList();
            $AEE.elements.$document.add('.aee-block-drop-zone').sortable($AEE.settings.sortable);
            $AEE.inputs.blockSettingsDocumentMaxWidth.labelAfter('px');
            $AEE.layoutReady();
            $AEE.setBlockSettings($AEE.elements.$document);
        }, 100);
    });
})();

(function(){
    $AEE.layoutReady(function(){
        if(!$AEE.touchable()){
            return false;
        }
        $AEE.elements.$blockTouchController = $('<div id="aee-block-touch-controller"></div>').appendTo($AEE.elements.$documentBox);
        $AEE.elements.$blockTouchDelete = $('<div id="aee-block-touch-controller-delete"></div>').appendTo($AEE.elements.$blockTouchController).css({
            backgroundImage:'url(' + $AEE.d.config.dir + '/images/block-move.png)'
        }).click(function(event){
            event.preventDefault();
            event.stopPropagation();
            setTimeout(function(){
                if(confirm("Are you sure you want to delete this block?")){
                    $AEE.elements.$blockHandle.appendTo($AEE.elements.$tmp);
                    $AEE.elements.$activeBlock.remove();
                    $AEE.elements.$blockTouchController.hide();
                }
            }, 20);
            return false;
        });
        $AEE.elements.$blockTouchUp = $('<div id="aee-block-touch-controller-up"></div>').appendTo($AEE.elements.$blockTouchController).css({
            backgroundImage:'url(' + $AEE.d.config.dir + '/images/block-move.png)'
        }).click(function(event){
            event.preventDefault();
            event.stopPropagation();
            $AEE.moveBlockUp($AEE.elements.$activeBlock);
            return false;
        });
        $AEE.elements.$blockTouchDown = $('<div id="aee-block-touch-controller-down"></div>').appendTo($AEE.elements.$blockTouchController).css({
            backgroundImage:'url(' + $AEE.d.config.dir + '/images/block-move.png)'
        }).click(function(){
            event.preventDefault();
            event.stopPropagation();
            $AEE.moveBlockDown($AEE.elements.$activeBlock);
            return false;
        });
    });
})();

(function(){

    $AEE.d.functions.scriptLoadedFunctions = [];
    $AEE.scriptLoaded = function(scriptLoadedFunction){
        if(typeof scriptLoadedFunction === 'function'){
            $AEE.d.functions.scriptLoadedFunctions.push(scriptLoadedFunction);
            return $AEE;
        }
        $AEE.runTheFunctions($AEE.d.functions.scriptLoadedFunctions, $AEE, [$AEE.d.status]);
    };

})();

(function(){
    $AEE.loadPlugins = function () {
        $AEE.loader = {};
        (function() {
            if(typeof window.jQuery === 'undefined') {
                var script = document.createElement("SCRIPT");
                script.src = $AEE.d.config.dir + "/vendor/jquery/jquery.min.js";
                script.type = 'text/javascript';
                document.getElementsByTagName("head")[0].appendChild(script);
            }
            var checkReady = function(callback) {
                if (typeof window.jQuery === 'function') {
                    callback(jQuery);
                }else{
                    window.setTimeout(function() {
                        checkReady(callback);
                    }, 100);
                }
            };
            checkReady(function($) {

                var xhrArr = [];
                var jsArr = [];
                var loadStyles = [];


                if (typeof $.ui === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/jquery-ui/theme.css");
                    loadStyles.push($AEE.d.config.dir + "/vendor/jquery-ui/jquery-ui.min.css");
                    xhrArr.push($AEE.d.config.dir + "/vendor/jquery-ui/jquery-ui.min.js");
                }
                //jsArr.push($AEE.d.config.dir + "/vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js");
                xhrArr.push($AEE.d.config.dir + "/vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js");
                if (typeof $().mousewheel === 'undefined') {
                    xhrArr.push($AEE.d.config.dir + "/vendor/jquery-mousewheel/jquery.mousewheel.min.js");
                }
                if($AEE.touchable()){
                    if (typeof Hammer === 'undefined') {
                        xhrArr.push($AEE.d.config.dir + "/vendor/hammer.js/hammer.min.js");
                    }
                }
                if (typeof prettyPrint === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/prettify/sunburst.css");
                    xhrArr.push($AEE.d.config.dir + "/vendor/prettify/prettify.js");
                }
                if (typeof $().iphoneStyle === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/iphone-style-checkboxes/style.css");
                    xhrArr.push($AEE.d.config.dir + "/vendor/iphone-style-checkboxes/iphone-style-checkboxes.js");
                }
                if (typeof $().colpick === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/colpick/colpick.css");
                    xhrArr.push($AEE.d.config.dir + "/vendor/colpick/colpick.js");
                }
                if (typeof $().multiselect === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/jquery-ui-multiselect/jquery.multiselect.css");
                    loadStyles.push($AEE.d.config.dir + "/vendor/jquery-ui-multiselect/jquery.multiselect.filter.css");
                    xhrArr.push($AEE.d.config.dir + "/vendor/jquery-ui-multiselect/jquery.multiselect.min.js");
                    xhrArr.push($AEE.d.config.dir + "/vendor/jquery-ui-multiselect/jquery.multiselect.filter.min.js");
                }
                if (typeof $().timepicker === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/jquery-ui-timepicker-addon/jquery-ui-timepicker-addon.css");
                    xhrArr.push($AEE.d.config.dir + "/vendor/jquery-ui-timepicker-addon/jquery-ui-timepicker-addon.js");
                }

                if (typeof $().niceScroll === 'undefined') {
                    xhrArr.push($AEE.d.config.dir + "/vendor/jquery.nicescroll/jquery.nicescroll.min.js");
                }
                /*
                 if (typeof $().sliderAccess === 'undefined') {
                 loadScripts.push("jquery-ui-sliderAccess");
                 }
                 */
                 if (typeof $().fileupload === 'undefined') {
                     xhrArr.push($AEE.d.config.dir + "/vendor/jquery-file-upload/jquery.fileupload.js");
                     xhrArr.push($AEE.d.config.dir + "/vendor/jquery-file-upload/jquery.iframe-transport.js");
                 }
                 if (typeof $().tinymce === 'undefined') {
                     xhrArr.push($AEE.d.config.dir + "/vendor/tinymce/tinymce.jquery.min.js");
                     xhrArr.push($AEE.d.config.dir + "/vendor/tinymce/jquery.tinymce.min.js");
                 }
                if (typeof AutomizyJs === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/automizy-js/automizy.min.css");
                    xhrArr.push($AEE.d.config.dir + "/vendor/automizy-js/automizy.min.js");
                }
                if (typeof AutomizyJsApi === 'undefined') {
                    xhrArr.push($AEE.d.config.dir + "/vendor/automizy-js-api/automizy.api.min.js");
                }

                for(var i = 0; i < loadStyles.length; i++){
                    var head  = document.getElementsByTagName('head')[0];
                    var link  = document.createElement('link');
                    link.rel  = 'stylesheet';
                    link.type = 'text/css';
                    link.href = loadStyles[i];
                    head.appendChild(link);
                }

                $AEE.d.status.scripts = xhrArr;
                $AEE.d.status.scriptsLength = xhrArr.length;

                var index = 0;
                function loadScript(src){
                    $.getScript(src).complete(function(){
                        $AEE.d.status.loadedScripts++;
                        $AEE.d.status.percent = $AEE.d.status.loadedScripts/$AEE.d.status.scriptsLength*100;
                        $AEE.d.status.lastLoadedScript = this.url;
                        $AEE.scriptLoaded();
                        if($AEE.d.status.loadedScripts === $AEE.d.status.scriptsLength){
                            $AEE.inited = true;
                            $A.ajaxDocumentCover(false);
                            tinyMCE.baseURL = "vendor/tinymce";
                            $AEE.ready();

                            $A.registerEvent('AutomizyEmailEditorBlockDragStart');
                            $A.registerEvent('AutomizyEmailEditorBlockDragStop');
                            $A.registerEvent('AutomizyEmailEditorBlockDragComplete');
                            //$A.registerEvent('AutomizyEmailEditorBlockDragDrag');
                            $A.registerEvent('AutomizyEmailEditorBlockDragCreate');
                        }else {
                            loadScript(xhrArr[++index]);
                        }
                    })
                }
                loadScript(xhrArr[index]);

                for(var i = 0; i < jsArr.length; i++){
                    var script = document.createElement("SCRIPT");
                    script.src = jsArr[i];
                    script.type = 'text/javascript';
                    document.getElementsByTagName("head")[0].appendChild(script);
                }

            });
        })();
    };
})();

(function(){
    $AEE.init = function () {
        if(!$AEE.automizyInited){

            if(!$AEE.d.functions.open){
                $AEE.open(function(){});
            }
            if(!$AEE.d.functions.close){
                $AEE.close(function(){});
            }

            $AEE.loadPlugins();
        }
        return $AEE;
    };
})();

(function(){
    $AEE.delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();
})();

(function(){
    $AEE.screenSize = function(){
        return {
            x: window.innerWidth || document.documentElement.clientWidth || d.getElementsByTagName('body')[0].clientWidth,
            y: window.innerHeight || document.documentElement.clientHeight || d.getElementsByTagName('body')[0].clientHeight
        };
    };
})();

(function(){
    $AEE.layoutReady(function() {
        var firstStep = true;
        $AEE.setLayoutByDisplay = function () {

            var x = $AEE.screenSize()['x'];
            var y = $AEE.screenSize()['y'];
            var leftBoxSize = 422;
            var blocksIconPosition = -61;
            var rightBoxSize = 398;
            var rightBoxPosition = 0;
            var settingsIconPosition = -61;
            var editorWidth = false;
            var editorPosition = false;
            var animationTime = 500;

            if(firstStep){
                animationTime = 0;
                firstStep = false;
            }

            $AEE.elements.$widget.removeClass('aee-width-lt-1000');
            $AEE.elements.$widget.removeClass('aee-width-lt-1250');
            $AEE.elements.$widget.removeClass('aee-width-lt-1450');




            if ($AEE.settingsShowed) {
                rightBoxSize = 398;
                rightBoxPosition = 0;
                settingsIconPosition = -61;
            } else {
                rightBoxSize = 0;
                rightBoxPosition = -398;
                settingsIconPosition = 0;
            }

            if (x < 1700) {
                leftBoxSize = 281;
            }
            if (x < 1450) {
                if ($AEE.settingsShowed) {
                    rightBoxSize = 342;
                }else{
                    rightBoxSize = 0;
                }
                $AEE.elements.$widget.addClass('aee-width-lt-1450');
            }
            if (x < 1250) {
                $AEE.elements.$widget.addClass('aee-width-lt-1250');
                if ($AEE.settingsShowed) {
                    leftBoxSize = 0;
                    blocksIconPosition = 0;
                    rightBoxSize = 342;
                    rightBoxPosition = 0;
                    settingsIconPosition = -61;
                } else {
                    leftBoxSize = 281;
                    blocksIconPosition = -61;
                    rightBoxSize = 0;
                    rightBoxPosition = -342;
                    settingsIconPosition = 0;
                }
            }
            if(x < 1000){
                $AEE.elements.$widget.addClass('aee-width-lt-1000');
            }
            if (x < 800) {
                editorWidth = x;
                editorPosition = 0;
                if ($AEE.settingsShowed) {
                    leftBoxSize = 0;
                    blocksIconPosition = 0;
                    settingsIconPosition = -61;
                    rightBoxPosition = 0;
                    rightBoxSize = 342;
                }else{
                    rightBoxPosition = -342;
                    settingsIconPosition = 0;
                    rightBoxSize = 0;
                }
                if ($AEE.blocksShowed) {
                    leftBoxSize = 281;
                    blocksIconPosition = -61;
                    settingsIconPosition = 0;
                    rightBoxPosition = -342;
                    rightBoxSize = 0;
                }else{
                    leftBoxSize = 0;
                    blocksIconPosition = 0;
                }
            }











            $AEE.elements.$blockList.stop().animate({
                width: leftBoxSize + 'px'
            }, animationTime);
            if(editorWidth === false) {
                $AEE.elements.$editor.stop().animate({
                    left: leftBoxSize + 'px',
                    width: x - leftBoxSize - rightBoxSize + 'px'
                }, animationTime);
            }else{
                $AEE.elements.$editor.stop().animate({
                    left: editorPosition + 'px',
                    width: editorWidth + 'px'
                }, animationTime);
            }
            $AEE.elements.$blockSettings.stop().animate({
                right: rightBoxPosition + 'px',
                width: rightBoxSize + 'px'
            }, animationTime);
            $AEE.elements.$blocksIcon.stop().animate({
                left: blocksIconPosition + 'px'
            }, animationTime);
            $AEE.elements.$settingsIcon.stop().animate({
                right: settingsIconPosition + 'px'
            }, animationTime);

            var h = y - 53;
            $AEE.elements.$blockList.height(h).getNiceScroll().hide();
            $AEE.elements.$documentBox.height(h).getNiceScroll().hide();
            $AEE.elements.$blockSettings.height(h).getNiceScroll().hide();
            setTimeout(function(){
                $AEE.elements.$blockList.getNiceScroll().resize();
                $AEE.elements.$blockList.getNiceScroll().show();
                $AEE.elements.$documentBox.getNiceScroll().resize();
                $AEE.elements.$documentBox.getNiceScroll().show();
                $AEE.elements.$blockSettings.getNiceScroll().resize();
                $AEE.elements.$blockSettings.getNiceScroll().show();
            }, animationTime);

        };
        $AEE.setLayoutByDisplay();
    });
})();

(function(){
    $AEE.ready(function(){
        $(window).resize(function(){
            $AEE.delay(function(){
                $AEE.setLayoutByDisplay();
            }, 150);
        })
    })
})();

(function(){
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
})();

(function(){
    $AEE.layoutReady(function(){
        $AEE.elements.$document.on('click', '.aee-block', function(event){
            event.stopPropagation();
            var $block = $(this);
            $AEE.elements.$document.find('.aee-block').not($block).removeClass('aee-active');
            $block.addClass('aee-active');
            $AEE.setBlockSettings($block);
        }).on('mouseenter', '.aee-block', function(event){
            if($AEE.dragging){
                return false;
            }
            event.stopPropagation();
            if(!$AEE.touchable()){
                var $block = $(this);
                var leftOffset = -2;
                var widthOffset = 4;
                if ($block.hasClass('aee-active')) {
                    leftOffset = -4;
                    widthOffset = 8;
                }
                if(typeof $block.data('$topCell') === 'undefined'){
                    $block = $AEE.getBlock($block);
                }
                $AEE.elements.$blockHandle.appendTo($block.data('$topCell')).show().css({
                    left: leftOffset + 'px',
                    width: $block.width() + widthOffset + 'px'
                });
            }
        }).on('mouseleave', '.aee-block', function(event){
            if($AEE.dragging){
                return false;
            }
            event.stopPropagation();
            var $block = $(this);
            $block.find('.aee-block-handle').hide();
        });
    })
})();

(function(){
    $AEE.ready(function() {
        if(!$AEE.touchable()){
            return false;
        }
        var mc = new Hammer($AEE.elements.$widget[0], {
            threshold:50
        });
        $AEE.panActive = true;
        var activeTimeout;
        mc.on("panleft panright tap press", function (ev) {
            if(!$AEE.touchable()){
                return false;
            }
            if(Math.abs(ev.deltaX) < 30 || Math.abs(ev.deltaY) > 15){
                return false;
            }
            if ($AEE.dragging || $AEE.screenSize()['x'] >= 800) {
                return false
            }
            clearTimeout(activeTimeout);
            activeTimeout = setTimeout(function(){
                $AEE.panActive = true;
            }, 100);
            if(!$AEE.panActive){
                return false;
            }
            if($($AEE.documentMouseDownElement).closest('[contenteditable]').length > 0){
                return false;
            }
            $AEE.panActive = false;
            setTimeout(function(){
                $AEE.documentMouseDown = false;
                if(ev.type === 'panleft'){
                    if(!$AEE.blocksShowed && !$AEE.settingsShowed){
                        $AEE.settingsShowed = true;
                    }else if($AEE.blocksShowed && !$AEE.settingsShowed){
                        $AEE.settingsShowed = false;
                        $AEE.blocksShowed = false;
                    }
                }else if(ev.type === 'panright'){
                    if(!$AEE.blocksShowed && !$AEE.settingsShowed){
                        $AEE.blocksShowed = true;
                    }else if(!$AEE.blocksShowed && $AEE.settingsShowed){
                        $AEE.settingsShowed = false;
                        $AEE.blocksShowed = false;
                    }
                }
                $AEE.setLayoutByDisplay();
            }, 10);
        });
    });
})();

(function(){
    $AEE.layoutReady(function(){
        var oneFile = false;
        var isMultiupload = true;
        var dragLeaveT;
        var uploads = [];
        var hasHtml = false;
        var htmlUrl;
        $AEE.inputs.dropFiles.input().fileupload({
            url: $AEE.imageUploadApiUrl(),
            dataType: 'json',
            dropZone: $AEE.elements.$widget,
            formData: {directory: 'emaileditor'},
            beforeSend: function(xhr, data) {
                data.url = $AEE.imageUploadApiUrl();
                xhr.setRequestHeader('Authorization', 'Bearer ' + $AA.token().get());
            },
            submit: function (e, data) {
                if (data.originalFiles.length == 1) {
                    oneFile = true;
                }
                if (!isMultiupload) {
                    return false;
                }
            },
            dragover: function () {
                $AEE.elements.$dropFilesCover.show();
                clearTimeout(dragLeaveT);
            },
            dragleave: function () {
                dragLeaveT = setTimeout(function () {
                    $AEE.elements.$dropFilesCover.hide();
                }, 100);
            },
            send: function (e, data) {
                console.log('UPLOAD FILE: '+data.files[0].name);
            },
            done: function (e, data) {
                var res = data.result;
                var url = res[Object.keys(res)[0]].url;
                var name = Object.keys(res)[0];
                var ext = $AEE.getExtension(name);
                uploads.push({
                    name: name,
                    url: url,
                    ext: ext
                });
                if (ext == 'html' || ext == 'htm' || ext == 'xhtml') {
                    hasHtml = true;
                    htmlUrl = url;
                }
                console.log('FILE UPLOADED: '+name);
            },
            fail: function (e, data) {
                console.log("FAIL:", data.errorThrown);
            },
            start: function (e) {
                $AEE.elements.$dropFilesCover.hide();
                $AEE.elements.$dropFilesProgressCover.show();
                $AEE.elements.$dropFilesProgressBar.width(0+'%');
                $AEE.elements.$dropFilesProgressBarText.text(0+'%');
            },
            progressall: function (e, data) {
                var progress = Math.min(100, parseInt(data.loaded / data.total * 100, 10));
                $AEE.elements.$dropFilesProgressBar.width(progress+'%');
                $AEE.elements.$dropFilesProgressBarText.text(progress+'%');
            },
            stop: function (e) {
                if (hasHtml) {
                    setTimeout(function () {
                        $AEE.elements.$dropFilesProgressCover.hide();
                        uploads = [];
                    }, 1500);
                    $.ajax({
                        url: htmlUrl,
                        timeout: 600000,
                        dataType: 'html',
                        type: 'GET',
                        cache: false,
                        ifModified: false,
                        success: function (data) {
                            var $block = $AEE.newBlock().appendTo($AEE.elements.$document).addClass('aee-html-block-item');
                            var $content = $block.data('$contentCell');
                            $content.html(data);
                            $content.css('padding', 0);
                            $content.css('border', 'none');
                            $content.find("a").each(function () {
                                $(this).removeAttr('target');
                            });
                            for (var i = 0; i < uploads.length; i++) {
                                if(typeof uploads[0] != 'undefined'){
                                    var $img = $content.find('img').filter(function(index){
                                        var src = $(this).attr('src');
                                        var index = src.lastIndexOf("/") + 1;
                                        var filename = src.substr(index);
                                        return uploads[i].name === filename;
                                    }).attr('src', uploads[i].url);
                                    /*
                                    $img.each(function() {
                                        var $im = $(this);
                                        $im.attr('src', uploads[i].url).attr('title', $im.attr('title') || uploads[0].name).attr('alt', $im.attr('alt') || uploads[0].name);
                                    });
                                    */
                                }
                            }
                            $AEE.elements.$dropFilesProgressCover.hide();
                            $AEE.buildBlockListSetDisplay();
                            uploads = [];
                        },
                        error: function () {
                        },
                        beforeSend: function () {
                        },
                        complete: function () {
                        }
                    });
                } else {
                    if (oneFile) {
                        if (typeof uploads[0] != 'undefined' && $.inArray(uploads[0].ext, ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'ico']) >= 0) {
                            var $block = $AEE.newBlock().appendTo($AEE.elements.$document).addClass('aee-image-block-item');
                            var $img = $('<img/>').attr({
                                src:uploads[0].url,
                                alt:uploads[0].name,
                                title:uploads[0].name
                            }).css({maxWidth: '100%'}).addClass('aee-image-block-image');
                            $block.data('$contentCell').html($img);
                            setTimeout(function () {
                                $block.data('automizy-dropped', true);
                                $AEE.setBlockSettings($block);
                            }, 20);
                        }
                    }
                    $AEE.elements.$dropFilesProgressCover.hide();
                    uploads = [];
                }
                hasHtml = false;
                oneFile = false;
            }
        });
    });
})();

(function(){
    $AEE.ready(function() {

        $AEE.setPreviewScreenSize = function(x, y){
            //$AEE.elements.$previewDialogScreen.getNiceScroll().hide();
            $AEE.elements.$previewDialogScreen.stop().animate({
                width:x + 'px',
                height:y + 'px'
            }, 500, function(){
                //$AEE.elements.$previewDialogScreen.getNiceScroll().resize();
                //$AEE.elements.$previewDialogScreen.getNiceScroll().show();
            })
        };

        $AEE.elements.$previewDialogContent = $('<div id="aee-preview-dialog-content"></div>');
        $AEE.elements.$previewDialogLeftColumn = $('<div id="aee-preview-dialog-left-column"></div>').appendTo($AEE.elements.$previewDialogContent);
        $AEE.elements.$previewDialogRightColumn = $('<div id="aee-preview-dialog-right-column"></div>').appendTo($AEE.elements.$previewDialogContent);
        $AEE.elements.$previewDialogScreen = $('<div id="aee-preview-dialog-screen"></div>').appendTo($AEE.elements.$previewDialogRightColumn);
        /*var niceScrollObj = $.extend({}, $AEE.settings.niceScroll);
        niceScrollObj.zindex = 2003;
        niceScrollObj.touchbehavior = true;
        $AEE.elements.$previewDialogScreen.niceScroll(niceScrollObj);*/

        $AEE.inputs.screenSizeSelect = $A.newInput2({
            labelTop:$A.translate('Select screen'),
            type:'select',
            options:[
                ['general', $A.translate('General'), true],
                ['480x800', 'Alcatel One Touch T10'],
                ['600x1024', 'BlackBerry PlayBook'],
                ['360x640', 'HTC Desire 700'],
                ['320x533', 'Huawei Y300-0151'],
                ['768x1024', 'iPad Air'],
                ['320x480', 'iPhone 3/4'],
                ['320x568', 'iPhone 5'],
                ['375x627', 'iPhone 6'],
                ['320x427', 'LG Optimus L3'],
                ['360x598', 'Motorola Moto G'],
                ['600x960', 'Nexus 7'],
                ['800x1280', 'Nexus 10'],
                ['320x480', 'Nokia Lumia'],
                ['320x533', 'Samsung Galaxy Ace 2'],
                ['360x598', 'Sony Xperia Z'],
                ['320x534', 'ZTE T83']
            ],
            change:function(){
                var value = this.val();
                if(value === 'general'){
                    value = $AEE.maxWidth() + 'x600';
                }
                var size = value.split('x');
                $AEE.inputs.screenSizeX.val(size[0]);
                $AEE.inputs.screenSizeY.val(size[1]);
                $AEE.setPreviewScreenSize(size[0], size[1]);
            }
        });
        $AEE.inputs.screenSizeX = $A.newInput2({
            labelTop:$A.translate('Screen width'),
            labelAfter: 'px',
            type:'number',
            value:$AEE.maxWidth(),
            change:function(){
                $AEE.setPreviewScreenSize(this.val(), $AEE.inputs.screenSizeY.val());
            }
        });
        $AEE.inputs.screenSizeX.input().attr('min', 10).attr('max', 5000).pbmInput();

        $AEE.inputs.screenSizeY = $A.newInput2({
            labelTop: $A.translate('Screen height'),
            labelAfter: 'px',
            type:'number',
            value:600,
            change:function(){
                $AEE.setPreviewScreenSize($AEE.inputs.screenSizeX.val(), this.val());
            }
        });
        $AEE.inputs.screenSizeY.input().attr('min', 10).attr('max', 5000).pbmInput();

        $AEE.inputs.previewSegments = $A.newInput2({
            type:'select',
            labelTop:$A.translate('A recipient from this segment'),
            options:[],
            change:function(){
                var segment = this.val();
                $AEE.elements.$previewDialogScreen.find('[data-dynamic-segments]').each(function(){
                    var $t = $(this);
                    var segments = $t.attr('data-dynamic-segments').split(',');
                    if($.inArray(segment, segments) < 0){
                        $t.hide();
                    }else{
                        $t.show();
                    }
                })
            }
        });

        $AEE.forms.preview = $A.newForm().addInputs([
            $AEE.inputs.screenSizeSelect,
            $AEE.inputs.screenSizeX,
            $AEE.inputs.screenSizeY,
            $AEE.inputs.previewSegments
        ]).addButtons([
            $AEE.buttons.sendTestButton
        ]).drawTo($AEE.elements.$previewDialogLeftColumn);
        $AEE.inputs.previewSegments.widget().css('margin-bottom', '12px');

        $AEE.dialogs.preview = $A.dialog({
            title: $A.translate('Preview'),
            positionY:'top',
            width:'85%',
            id: 'aee-preview-dialog',
            content: $AEE.elements.$previewDialogContent,
            buttons: [
                {
                    text: $A.translate('Close'),
                    click: function () {
                        $AEE.dialogs.preview.close();
                    }
                }
            ],
            open: function () {
                $AEE.elements.$previewDialogScreen.html($AEE.getHtmlCode());
                $AEE.inputs.screenSizeSelect.val('general');
                $AEE.inputs.screenSizeX.val($AEE.maxWidth());
                $AEE.inputs.screenSizeY.val(600);
                $AEE.setPreviewScreenSize($AEE.maxWidth(), 600);
                $AEE.inputs.previewSegments.val(Object.keys($AEE.d.segments)[0] || '').change();
            }
        });
    });
})();

(function(){
    $AEE.ready(function() {

        $AEE.inputs.sendTestRecipient = $A.newInput({
            label:$A.translate('Recipient'),
            name:'email',
            value:''
        });
        $AEE.forms.sendTest = $A.newForm().addInput($AEE.inputs.sendTestRecipient);
        $AEE.dialogs.sendTest = $A.dialog({
            title: $A.translate('Send test'),
            positionY: '40px',
            id: 'aee-send-test-dialog',
            content: $AEE.forms.sendTest,
            buttons: [
                {
                    text: $A.translate('Cancel'),
                    click: function () {
                        $AEE.dialogs.sendTest.close();
                    }
                },
                {
                    skin: 'simple-orange',
                    text: $A.translate('Send'),
                    click: function () {
                        $A.ajaxDocumentCover(true, [$A.translate('Test email sending')]);
                        $.ajax({
                            url: $AEE.emailPreviewApiUrl(),
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                recipient:$AEE.inputs.sendTestRecipient.val(),
                                subject:$AEE.subject(),
                                htmlCode:$AEE.getHtmlCode({conditions:false})
                            },
                            headers: {Authorization: 'Bearer ' + $AA.token().get()},
                            beforeSend: function (xhr, data) {
                                data.url = $AEE.emailPreviewApiUrl();
                            }
                        }).complete(function(){
                            $A.ajaxDocumentCover(false);
                            $AEE.dialogs.sendTest.close();
                        }).fail(function(jqXHR, textStatus, errorThrown){

                        });
                    }
                }
            ],
            open: function () {

            }
        });
    });
})();

(function(){
    $AEE.ready(function(){
        $.fn.removeStyle = function (style) {
            var search = new RegExp(style + '[^;]+;?', 'g');
            return this.each(function () {
                $(this).attr('style', function (i, style) {
                    return style.replace(search, '');
                });
            });
        };
        $.fn.removeStyles = function () {
            for(var i = 0; i < arguments.length; i++){
                $(this).removeStyle(arguments[i]);
            }
            return this;
        };
    })
})();

(function(){
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
                    var h = wrap.height();
                    $img.insertAfter(wrap);
                    wrap.remove();
                    if(galleryImage){
                        $img.resizable($AEE.settings.imgGalleryResizable);
                        $img.closest(".ui-wrapper").css({width: w, height: h, position: 'relative'});
                        $img.css({width: w, height: 'auto'});
                    }else {
                        $img.resizable($AEE.settings.imgResizable);
                        $img.closest(".ui-wrapper").css({width: w, height: h, position: 'relative'});
                        $img.css({width: '100%', height: 'auto'});
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
})();

(function(){



    $AEE.title = function(value){
        if (typeof value !== 'undefined') {
            $AEE.layoutReady(function(){
                $AEE.d.values.title = value;
                $AEE.elements.$headerTitle.text(value);
                $AEE.elements.$headerTitle.attr('title', value);
            });
            return $AEE;
        }
        return $AEE.d.values.title;
    };
    $AEE.subject = function(value){
        if (typeof value !== 'undefined') {
            $AEE.layoutReady(function(){
                $AEE.d.values.subject = value;
            });
            return $AEE;
        }
        return $AEE.d.values.subject || $A.translate('Test email');
    };
    $AEE.zIndex = function(value){
        if (typeof value !== 'undefined') {
            if(value === false){
                $AEE.elements.$zIndexStyle.replaceWith('<style></style>');
                return $AEE;
            }
            value = parseInt(value);
            $AEE.layoutReady(function(){
                $AEE.elements.$zIndexStyle.replaceWith('<style>' +
                        '#automizy-email-editor{z-index:'+(value + 2000)+' !important}' +
                        '#automizy-email-editor #aee-mobilemenu-icon{z-index:'+(value + 65537)+' !important}' +
                        '#automizy-email-editor #aee-mobilemenu{z-index:'+(value + 65536)+' !important}' +
                        '#automizy-email-editor #aee-drop-files-cover, #automizy-email-editor #aee-drop-files-progress-cover{z-index:'+(value + 2001)+' !important}' +
                        '.colpick{z-index:'+(value + 2010)+' !important}' +
                        '.automizy-dialog{z-index:'+(value + 2001)+' !important}' +
                        '.mce-panel{z-index:'+(value + 65538)+' !important}' +
                        '.mce-modal-block{z-index:'+(value + 65536)+' !important}' +
                    '</style>');
            });
            return $AEE;
        }
        return $AEE.elements.$zIndexStyle;
    };
    $AEE.dynamicBlocks = function(value){
        if (typeof value !== 'undefined') {
            $AEE.layoutReady(function(){
                $AEE.d.values.dynamicBlocks = $A.parseBoolean(value);
                if($AEE.d.values.dynamicBlocks){
                    $AEE.elements.$blockSettingsDynamicBox.show();
                    $AEE.inputs.previewSegments.show();
                }else{
                    $AEE.elements.$blockSettingsDynamicBox.hide();
                    $AEE.inputs.previewSegments.hide();
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
    $AEE.links = function(links){
        if (typeof links !== 'undefined') {
            $AEE.d.links = links;
            return $AEE;
        }
        return $AEE.d.links;
    };
    $AEE.segments = function(value){
        if (typeof value !== 'undefined') {
            $AEE.d.segments = value;
            $AEE.layoutReady(function() {
                $AEE.inputs.blockSettingsDynamicSegments.automizySelect().options(value);
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
    $AEE.imageUploadApiUrl = function(value){
        if (typeof value !== 'undefined') {
            $AEE.d.config.imageUploadApiUrl = value;
            return $AEE;
        }
        return $AEE.d.config.imageUploadApiUrl;
    };
    $AEE.imageGalleryApiUrl = function(value){
        if (typeof value !== 'undefined') {
            $AEE.d.config.imageGalleryApiUrl = value;
            return $AEE;
        }
        return $AEE.d.config.imageGalleryApiUrl;
    };
    $AEE.emailPreviewApiUrl = function(value){
        if (typeof value !== 'undefined') {
            $AEE.d.config.emailPreviewApiUrl = value;
            return $AEE;
        }
        return $AEE.d.config.emailPreviewApiUrl;
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
                        opacity:0,
                        zIndex:++window.AutomizyGlobalZIndex
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
                        $AEE.zIndex(false);
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
                maxWidth:$AEE.maxWidth(),
                links:$AEE.links()
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
                maxWidth:$AEE.maxWidth(),
                links:$AEE.links()
            }]);
        }
        return $AEE;
    };

})();

(function(){
    $AEE.getExtension = function (fname) {
        return fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2).toLowerCase();
    };
})();

(function(){
    $AEE.isImageFile = function (fname) {
        var ext = $AEE.getExtension(fname);
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'bmp':
            case 'png':
                //etc
                return true;
        }
        return false;
    };
})();

(function(){
    $AEE.styleHtml = function (e, t) {
        function u(){this.pos=0;this.token="";this.current_mode="CONTENT";this.tags={parent:"parent1",parentcount:1,parent1:""};this.tag_type="";this.token_text=this.last_token=this.last_text=this.token_type="";this.Utils={whitespace:"\n\r	 ".split(""),single_token:"br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed".split(","),extra_liners:"head,body,/html".split(","),in_array:function(e,t){for(var n=0;n<t.length;n++)if(e===t[n])return true;return false}};this.get_content=function(){var e="";var t=[];var n=false;while(this.input.charAt(this.pos)!=="<"){if(this.pos>=this.input.length)return t.length?t.join(""):["","TK_EOF"];e=this.input.charAt(this.pos);this.pos++;this.line_char_count++;if(this.Utils.in_array(e,this.Utils.whitespace)){if(t.length)n=true;this.line_char_count--;continue}else if(n){if(this.line_char_count>=this.max_char){t.push("\n");for(var r=0;r<this.indent_level;r++)t.push(this.indent_string);this.line_char_count=0}else{t.push(" ");this.line_char_count++}n=false}t.push(e)}return t.length?t.join(""):""};this.get_script=function(){var e="";var t=[];var n=new RegExp("</script"+">","igm");n.lastIndex=this.pos;var r=n.exec(this.input);var i=r?r.index:this.input.length;while(this.pos<i){if(this.pos>=this.input.length)return t.length?t.join(""):["","TK_EOF"];e=this.input.charAt(this.pos);this.pos++;t.push(e)}return t.length?t.join(""):""};this.record_tag=function(e){if(this.tags[e+"count"]){this.tags[e+"count"]++;this.tags[e+this.tags[e+"count"]]=this.indent_level}else{this.tags[e+"count"]=1;this.tags[e+this.tags[e+"count"]]=this.indent_level}this.tags[e+this.tags[e+"count"]+"parent"]=this.tags.parent;this.tags.parent=e+this.tags[e+"count"]};this.retrieve_tag=function(e){if(this.tags[e+"count"]){var t=this.tags.parent;while(t){if(e+this.tags[e+"count"]===t)break;t=this.tags[t+"parent"]}if(t){this.indent_level=this.tags[e+this.tags[e+"count"]];this.tags.parent=this.tags[t+"parent"]}delete this.tags[e+this.tags[e+"count"]+"parent"];delete this.tags[e+this.tags[e+"count"]];if(this.tags[e+"count"]==1)delete this.tags[e+"count"];else this.tags[e+"count"]--}};this.get_tag=function(){var e="";var t=[];var n=false;do{if(this.pos>=this.input.length)return t.length?t.join(""):["","TK_EOF"];e=this.input.charAt(this.pos);this.pos++;this.line_char_count++;if(this.Utils.in_array(e,this.Utils.whitespace)){n=true;this.line_char_count--;continue}if(e==="'"||e==='"')if(!t[1]||t[1]!=="!"){e+=this.get_unformatted(e);n=true}if(e==="=")n=false;if(t.length&&t[t.length-1]!=="="&&e!==">"&&n){if(this.line_char_count>=this.max_char){this.print_newline(false,t);this.line_char_count=0}else{t.push(" ");this.line_char_count++}n=false}t.push(e)}while(e!==">");var r=t.join("");var i;if(r.indexOf(" ")!=-1)i=r.indexOf(" ");else i=r.indexOf(">");var s=r.substring(1,i).toLowerCase();if(r.charAt(r.length-2)==="/"||this.Utils.in_array(s,this.Utils.single_token))this.tag_type="SINGLE";else if(s==="script"){this.record_tag(s);this.tag_type="SCRIPT"}else if(s==="style"){this.record_tag(s);this.tag_type="STYLE"}else if(this.Utils.in_array(s,unformatted)){var o=this.get_unformatted("</"+s+">",r);t.push(o);this.tag_type="SINGLE"}else if(s.charAt(0)==="!")if(s.indexOf("[if")!=-1){if(r.indexOf("!IE")!=-1){var o=this.get_unformatted("-->",r);t.push(o)}this.tag_type="START"}else if(s.indexOf("[endif")!=-1){this.tag_type="END";this.unindent()}else if(s.indexOf("[cdata[")!=-1){var o=this.get_unformatted("]]>",r);t.push(o);this.tag_type="SINGLE"}else{var o=this.get_unformatted("-->",r);t.push(o);this.tag_type="SINGLE"}else{if(s.charAt(0)==="/"){this.retrieve_tag(s.substring(1));this.tag_type="END"}else{this.record_tag(s);this.tag_type="START"}if(this.Utils.in_array(s,this.Utils.extra_liners))this.print_newline(true,this.output)}return t.join("")};this.get_unformatted=function(e,t){if(t&&t.indexOf(e)!=-1)return"";var n="";var r="";var i=true;do{if(this.pos>=this.input.length)return r;n=this.input.charAt(this.pos);this.pos++;if(this.Utils.in_array(n,this.Utils.whitespace)){if(!i){this.line_char_count--;continue}if(n==="\n"||n==="\r"){r+="\n";this.line_char_count=0;continue}}r+=n;this.line_char_count++;i=true}while(r.indexOf(e)==-1);return r};this.get_token=function(){var e;if(this.last_token==="TK_TAG_SCRIPT"){var t=this.get_script();if(typeof t!=="string")return t;e=js_beautify(t.replace(/^[\r\n]+/,""),{indent_size:this.indent_size,indent_char:this.indent_character,brace_style:this.brace_style});return[e,"TK_CONTENT"]}if(this.current_mode==="CONTENT"){e=this.get_content();if(typeof e!=="string")return e;else return[e,"TK_CONTENT"]}if(this.current_mode==="TAG"){e=this.get_tag();if(typeof e!=="string")return e;else{var n="TK_TAG_"+this.tag_type;return[e,n]}}};this.printer=function(e,t,n,r,i){this.input=e||"";this.output=[];this.indent_character=t;this.indent_string="";this.indent_size=n;this.brace_style=i;this.indent_level=0;this.max_char=r;this.line_char_count=0;for(var s=0;s<this.indent_size;s++)this.indent_string+=this.indent_character;this.print_newline=function(e,t){this.line_char_count=0;if(!t||!t.length)return;if(!e)while(this.Utils.in_array(t[t.length-1],this.Utils.whitespace))t.pop();t.push("\n");for(var n=0;n<this.indent_level;n++)t.push(this.indent_string)};this.print_token=function(e){this.output.push(e)};this.indent=function(){this.indent_level++};this.unindent=function(){if(this.indent_level>0)this.indent_level--}};return this}var n,r,i,s,o;t=t||{};r=t.indent_size||4;i=t.indent_char||" ";o=t.brace_style||"collapse";s=t.max_char||"70";unformatted=t.unformatted||["a"];n=new u;n.printer(e,i,r,s,o);while(true){var a=n.get_token();n.token_text=a[0];n.token_type=a[1];if(n.token_type==="TK_EOF")break;switch(n.token_type){case"TK_TAG_START":case"TK_TAG_STYLE":n.print_newline(false,n.output);n.print_token(n.token_text);n.indent();n.current_mode="CONTENT";break;case"TK_TAG_SCRIPT":n.print_newline(false,n.output);n.print_token(n.token_text);n.current_mode="CONTENT";break;case"TK_TAG_END":n.print_newline(true,n.output);n.print_token(n.token_text);n.current_mode="CONTENT";break;case"TK_TAG_SINGLE":n.print_newline(false,n.output);n.print_token(n.token_text);n.current_mode="CONTENT";break;case"TK_CONTENT":if(n.token_text!==""){n.print_newline(false,n.output);n.print_token(n.token_text)}n.current_mode="TAG";break}n.last_token=n.token_type;n.last_text=n.token_text}return n.output.join("");
    };
})();

(function(){
    $AEE.getBlock = function ($block) {
        if(typeof $block !== 'undefined'){
            var data = {
                aeeBlock:true,
                $topRow:$block.find('tr:eq(0)')
            };
            data.$middleRow = data.$topRow.siblings().eq(0);
            data.$bottomRow = data.$topRow.siblings().eq(1);
            data.$topCell = data.$topRow.find('td:eq(0)');
            data.$leftCell = data.$middleRow.find('td:eq(0)');
            data.$contentCell = data.$leftCell.siblings().eq(0);
            data.$rightCell = data.$leftCell.siblings().eq(1);
            data.$bottomCell = data.$bottomRow.find('td:eq(0)');



            $block.data(data);
            return $block;
        }
        return $AEE.newBlock();
    };
})();

(function(){
    $AEE.rgbStyleToHex = function (rgb) {
        if(typeof rgb !== 'string'){
            return '#000000';
        }
        if (rgb[0] === '#') {
            return rgb;
        }
        if (rgb[0] !== 'r') {
            return 'transparent';
        }
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1] || '0') + hex(rgb[2] || '0') + hex(rgb[3] || '0');
    };
})();

(function(){
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
            if($block.hasClass('aee-html-block-item')){
                $block.attr('data-html-block', 'true');
            }else{
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


        $html.find('[data-html-block]').removeAttr('data-html-block').each(function(){
            this.style.textAlign = 'left'
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
})();

(function(){
    $AEE.setEditorCode = function (code) {
        $AEE.ready(function(){
            var $code = $(code);
            $AEE.elements.$blockHandle.appendTo($AEE.elements.$tmp);
            $AEE.elements.$documentBox[0].style.backgroundColor = 'transparent';
            if(typeof $code[0] === 'undefined'){
                $AEE.elements.$document.html(code)[0].style.backgroundColor = '#ffffff';
            }else {
                var html = $code[0].innerHTML;
                $AEE.elements.$document.html(html);
                $AEE.elements.$document.attr('style', $code.attr('style'));
                $AEE.elements.$document.find('.aee-block').automizySetUp();

                var color = $code.attr('data-outer-color');
                if (typeof color !== 'undefined') {
                    $AEE.inputs.blockSettingsDocumentOuterColor.input().css({
                        backgroundColor: color,
                        color: color
                    }).val(color).change().colpickSetColor(color);
                } else {
                    $AEE.inputs.blockSettingsDocumentOuterColor.input().css({
                        backgroundColor: '#ffffff',
                        color: '#ffffff'
                    }).val('#ffffff').colpickSetColor('#ffffff');
                }

                var responsiveEmail = $code.attr('data-responsive-email');
                responsiveEmail = $A.parseBoolean(typeof responsiveEmail === 'undefined' ? true : responsiveEmail);
                $AEE.inputs.blockSettingsResponsiveEmail.checked(responsiveEmail).change();

                var previewText = $code.attr('data-preview-text');
                previewText = (typeof previewText === 'undefined' ? '' : previewText);
                $AEE.inputs.blockSettingsPreviewText.val(previewText).change();

                $AEE.elements.$document.add('.aee-block-drop-zone').sortable($AEE.settings.sortable);
            }
        });
        setTimeout(function(){
            $AEE.setBlockSettings($AEE.elements.$document);
            $AEE.inputs.bpbm.change();
        }, 10);
        return $AEE;
    };
})();

(function(){
    $AEE.getEditorCode = function () {
        var $document = $AEE.elements.$document.clone();
        $document.find('.aee-block-handle').remove();
        $document.find('*').removeAttr('id data-mce-style spellcheck mce-content-body data-mce-href mce-edit-focus');
        //$document.find('.aee-block-handle').remove();
        return $document[0].outerHTML;
    };
})();

(function(){
    $AEE.moveBlockUp = function($block){
        var $block = $block || $AEE.elements.$activeBlock;
        if($block.prev().hasClass('aee-block')){
            $block.insertBefore($block.prev());
            setTimeout(function(){
                $AEE.setBlockSettings($block);
            }, 10)
        }
    };
    $AEE.moveBlockDown = function($block){
        var $block = $block || $AEE.elements.$activeBlock;
        if($block.next().hasClass('aee-block')){
            $block.insertAfter($block.next());
            setTimeout(function(){
                $AEE.setBlockSettings($block);
            }, 10)
        }
    };
})();

(function(){
    $AEE.getTinyMceBuiltInMenu = function (editor) {
        var arr = [];
        for(var i in $AEE.d.systemFields){
            arr.push({
                text: $AEE.d.systemFields[i], onclick: (function(i){return function() {
                    editor.insertContent(i);
                }})(i)
            });
        }
        return arr;
    };
})();

(function(){
    $AEE.getTinyMceUserDefinedMenu = function (editor) {
        var arr = [];
        for(var i in $AEE.d.customFields){
            arr.push({
                text: $AEE.d.customFields[i], onclick: (function(i){return function () {
                    editor.insertContent(i);
                }})(i)
            });
        }
        return arr;
    };
})();

(function(){
    console.log('%c AutomizyEmailEditor loaded! ', 'background: #000000; color: #bada55; font-size:14px');
    return $AEE;
})();