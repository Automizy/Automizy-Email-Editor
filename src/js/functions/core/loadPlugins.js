define([
    "js/functions/core/ready",
    "js/functions/core/scriptLoaded",
    "js/functions/touchable"
], function () {
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
});