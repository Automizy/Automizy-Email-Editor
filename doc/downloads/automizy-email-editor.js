(function(){
    window.AutomizyEmailEditor = window.$AEE = new function () {
        var t = this;
        t.d = {
            version: '1.0.0',
            defines: {},
            dialogs: {},
            buttons: {},
            inputs: {},
            forms:{},
            config:{
                dir:'.'
            },
            status:{
                scriptsLength:0,
                loadedScripts:0,
                percent:0
            },
            readyFunctions:[]
        };
        t.m = {};
        t.default = {};
        t.automizyInited = false;
        t.scriptLoaded = function(){};
    }();

    return $AEE;
})();

(function(){
    $AEE.init = function () {
        if(!$AEE.automizyInited){
            AutomizyEmailEditor.loadPlugins();
        }
    };
})();

(function(){
    $AEE.loadPlugins = function () {
        $AEE.loader = {};
        (function() {
            if(typeof window.jQuery === 'undefined') {
                var script = document.createElement("SCRIPT");
                script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
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
                var loadStyles = [];

                if (typeof prettyPrint === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/prettify/sunburst.css");
                    xhrArr.push($.getScript($AEE.d.config.dir + "/vendor/prettify/prettify.js"));
                }

                if (typeof $.ui === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/jquery-ui/theme.css");
                    xhrArr.push($.getScript($AEE.d.config.dir + "/vendor/jquery-ui/jquery-ui.min.js"));
                }
                if (typeof $().mousewheel === 'undefined') {
                    xhrArr.push($.getScript($AEE.d.config.dir + "/vendor/jquery-ui-timepicker-addon/jquery-ui-timepicker-addon.js"));
                }
                if (typeof $().iphoneStyle === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/iphone-style-checkboxes/style.css");
                    xhrArr.push($.getScript($AEE.d.config.dir + "/vendor/iphone-style-checkboxes/iphone-style-checkboxes.js"));
                }
                if (typeof $().colpick === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/colpick/colpick.css");
                    xhrArr.push($.getScript($AEE.d.config.dir + "/vendor/colpick/colpick.js"));
                }
                if (typeof $().multiselect === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/jquery-ui-multiselect/jquery.multiselect.css");
                    loadStyles.push($AEE.d.config.dir + "/vendor/jquery-ui-multiselect/jquery.multiselect.filter.css");
                    xhrArr.push($.getScript($AEE.d.config.dir + "/vendor/jquery-ui-multiselect/jquery.multiselect.min.js"));
                    xhrArr.push($.getScript($AEE.d.config.dir + "/vendor/jquery-ui-multiselect/jquery.multiselect.filter.min.js"));
                }
                if (typeof $().timepicker === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/jquery-ui-timepicker-addon/jquery-ui-timepicker-addon.css");
                    xhrArr.push($.getScript($AEE.d.config.dir + "/vendor/jquery-ui-timepicker-addon/jquery-ui-timepicker-addon.js"));
                }
                /*
                 if (typeof $().niceScroll === 'undefined') {
                 loadScripts.push("jquery.nicescroll");
                 }
                 if (typeof $().sliderAccess === 'undefined') {
                 loadScripts.push("jquery-ui-sliderAccess");
                 }
                 */
                 if (typeof $().fileupload === 'undefined') {
                     xhrArr.push($.getScript($AEE.d.config.dir + "/vendor/jquery-file-upload/jquery.fileupload.js"));
                     xhrArr.push($.getScript($AEE.d.config.dir + "/vendor/jquery-file-upload/jquery.iframe-transport.js"));
                 }
                if (typeof AutomizyJs === 'undefined') {
                    loadStyles.push($AEE.d.config.dir + "/vendor/automizyjs/automizy.min.css");
                    xhrArr.push($.getScript($AEE.d.config.dir + "/vendor/automizyjs/automizy.min.js"));
                }
                if (typeof AutomizyJsApi === 'undefined') {
                    xhrArr.push($.getScript($AEE.d.config.dir + "/vendor/automizyjsapi/automizy.api.min.js"));
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
                for(var i = 0; i < xhrArr.length; i++){
                    xhrArr[i].complete(function(){
                        $AEE.d.status.loadedScripts++;
                        $AEE.d.status.percent = $AEE.d.status.loadedScripts/$AEE.d.status.scriptsLength*100;
                        $AEE.d.status.lastLoadedScript = this.url;
                        $AEE.scriptLoaded.apply($AEE, [$AEE.d.status]);
                        if($AEE.d.status.loadedScripts === $AEE.d.status.scriptsLength){
                            $AEE.automizyInited = true;
                            $A.ajaxDocumentCover(false);
                            $AEE.ready();
                        }
                    })
                }

            });
        })();
    };
})();

(function(){
    $AEE.scriptLoaded = function(scriptLoadedFunction){
        if(typeof scriptLoadedFunction === 'function'){
            $AEE.d.scriptLoaded = scriptLoadedFunction;
            return $AEE;
        }
        $AEE.d.scriptLoaded.apply($AEE, [$AEE.d.status]);
    };
})();

(function(){
    $AEE.ready = function(readyFunction){
        if(typeof readyFunction === 'function') {
            readyFunction.automizyInited = false;
            $AEE.d.readyFunctions.push(readyFunction);
            if($AEE.automizyInited){
                readyFunction.apply($AEE, []);
                readyFunction.automizyInited = true;
            }
            return $AEE;
        }
        for(var i = 0; i < $AEE.d.readyFunctions.length; i++) {
            if(!$AEE.d.readyFunctions[i].automizyInited) {
                $AEE.d.readyFunctions[i].apply($AEE, []);
                $AEE.d.readyFunctions[i].automizyInited = true;
            }
        }
    };
})();

(function(){
    $AEE.ready(function(){
        $AEE.styleHtml = function (e, t) {
            function u(){this.pos=0;this.token="";this.current_mode="CONTENT";this.tags={parent:"parent1",parentcount:1,parent1:""};this.tag_type="";this.token_text=this.last_token=this.last_text=this.token_type="";this.Utils={whitespace:"\n\r	 ".split(""),single_token:"br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed".split(","),extra_liners:"head,body,/html".split(","),in_array:function(e,t){for(var n=0;n<t.length;n++)if(e===t[n])return true;return false}};this.get_content=function(){var e="";var t=[];var n=false;while(this.input.charAt(this.pos)!=="<"){if(this.pos>=this.input.length)return t.length?t.join(""):["","TK_EOF"];e=this.input.charAt(this.pos);this.pos++;this.line_char_count++;if(this.Utils.in_array(e,this.Utils.whitespace)){if(t.length)n=true;this.line_char_count--;continue}else if(n){if(this.line_char_count>=this.max_char){t.push("\n");for(var r=0;r<this.indent_level;r++)t.push(this.indent_string);this.line_char_count=0}else{t.push(" ");this.line_char_count++}n=false}t.push(e)}return t.length?t.join(""):""};this.get_script=function(){var e="";var t=[];var n=new RegExp("</script"+">","igm");n.lastIndex=this.pos;var r=n.exec(this.input);var i=r?r.index:this.input.length;while(this.pos<i){if(this.pos>=this.input.length)return t.length?t.join(""):["","TK_EOF"];e=this.input.charAt(this.pos);this.pos++;t.push(e)}return t.length?t.join(""):""};this.record_tag=function(e){if(this.tags[e+"count"]){this.tags[e+"count"]++;this.tags[e+this.tags[e+"count"]]=this.indent_level}else{this.tags[e+"count"]=1;this.tags[e+this.tags[e+"count"]]=this.indent_level}this.tags[e+this.tags[e+"count"]+"parent"]=this.tags.parent;this.tags.parent=e+this.tags[e+"count"]};this.retrieve_tag=function(e){if(this.tags[e+"count"]){var t=this.tags.parent;while(t){if(e+this.tags[e+"count"]===t)break;t=this.tags[t+"parent"]}if(t){this.indent_level=this.tags[e+this.tags[e+"count"]];this.tags.parent=this.tags[t+"parent"]}delete this.tags[e+this.tags[e+"count"]+"parent"];delete this.tags[e+this.tags[e+"count"]];if(this.tags[e+"count"]==1)delete this.tags[e+"count"];else this.tags[e+"count"]--}};this.get_tag=function(){var e="";var t=[];var n=false;do{if(this.pos>=this.input.length)return t.length?t.join(""):["","TK_EOF"];e=this.input.charAt(this.pos);this.pos++;this.line_char_count++;if(this.Utils.in_array(e,this.Utils.whitespace)){n=true;this.line_char_count--;continue}if(e==="'"||e==='"')if(!t[1]||t[1]!=="!"){e+=this.get_unformatted(e);n=true}if(e==="=")n=false;if(t.length&&t[t.length-1]!=="="&&e!==">"&&n){if(this.line_char_count>=this.max_char){this.print_newline(false,t);this.line_char_count=0}else{t.push(" ");this.line_char_count++}n=false}t.push(e)}while(e!==">");var r=t.join("");var i;if(r.indexOf(" ")!=-1)i=r.indexOf(" ");else i=r.indexOf(">");var s=r.substring(1,i).toLowerCase();if(r.charAt(r.length-2)==="/"||this.Utils.in_array(s,this.Utils.single_token))this.tag_type="SINGLE";else if(s==="script"){this.record_tag(s);this.tag_type="SCRIPT"}else if(s==="style"){this.record_tag(s);this.tag_type="STYLE"}else if(this.Utils.in_array(s,unformatted)){var o=this.get_unformatted("</"+s+">",r);t.push(o);this.tag_type="SINGLE"}else if(s.charAt(0)==="!")if(s.indexOf("[if")!=-1){if(r.indexOf("!IE")!=-1){var o=this.get_unformatted("-->",r);t.push(o)}this.tag_type="START"}else if(s.indexOf("[endif")!=-1){this.tag_type="END";this.unindent()}else if(s.indexOf("[cdata[")!=-1){var o=this.get_unformatted("]]>",r);t.push(o);this.tag_type="SINGLE"}else{var o=this.get_unformatted("-->",r);t.push(o);this.tag_type="SINGLE"}else{if(s.charAt(0)==="/"){this.retrieve_tag(s.substring(1));this.tag_type="END"}else{this.record_tag(s);this.tag_type="START"}if(this.Utils.in_array(s,this.Utils.extra_liners))this.print_newline(true,this.output)}return t.join("")};this.get_unformatted=function(e,t){if(t&&t.indexOf(e)!=-1)return"";var n="";var r="";var i=true;do{if(this.pos>=this.input.length)return r;n=this.input.charAt(this.pos);this.pos++;if(this.Utils.in_array(n,this.Utils.whitespace)){if(!i){this.line_char_count--;continue}if(n==="\n"||n==="\r"){r+="\n";this.line_char_count=0;continue}}r+=n;this.line_char_count++;i=true}while(r.indexOf(e)==-1);return r};this.get_token=function(){var e;if(this.last_token==="TK_TAG_SCRIPT"){var t=this.get_script();if(typeof t!=="string")return t;e=js_beautify(t.replace(/^[\r\n]+/,""),{indent_size:this.indent_size,indent_char:this.indent_character,brace_style:this.brace_style});return[e,"TK_CONTENT"]}if(this.current_mode==="CONTENT"){e=this.get_content();if(typeof e!=="string")return e;else return[e,"TK_CONTENT"]}if(this.current_mode==="TAG"){e=this.get_tag();if(typeof e!=="string")return e;else{var n="TK_TAG_"+this.tag_type;return[e,n]}}};this.printer=function(e,t,n,r,i){this.input=e||"";this.output=[];this.indent_character=t;this.indent_string="";this.indent_size=n;this.brace_style=i;this.indent_level=0;this.max_char=r;this.line_char_count=0;for(var s=0;s<this.indent_size;s++)this.indent_string+=this.indent_character;this.print_newline=function(e,t){this.line_char_count=0;if(!t||!t.length)return;if(!e)while(this.Utils.in_array(t[t.length-1],this.Utils.whitespace))t.pop();t.push("\n");for(var n=0;n<this.indent_level;n++)t.push(this.indent_string)};this.print_token=function(e){this.output.push(e)};this.indent=function(){this.indent_level++};this.unindent=function(){if(this.indent_level>0)this.indent_level--}};return this}var n,r,i,s,o;t=t||{};r=t.indent_size||4;i=t.indent_char||" ";o=t.brace_style||"collapse";s=t.max_char||"70";unformatted=t.unformatted||["a"];n=new u;n.printer(e,i,r,s,o);while(true){var a=n.get_token();n.token_text=a[0];n.token_type=a[1];if(n.token_type==="TK_EOF")break;switch(n.token_type){case"TK_TAG_START":case"TK_TAG_STYLE":n.print_newline(false,n.output);n.print_token(n.token_text);n.indent();n.current_mode="CONTENT";break;case"TK_TAG_SCRIPT":n.print_newline(false,n.output);n.print_token(n.token_text);n.current_mode="CONTENT";break;case"TK_TAG_END":n.print_newline(true,n.output);n.print_token(n.token_text);n.current_mode="CONTENT";break;case"TK_TAG_SINGLE":n.print_newline(false,n.output);n.print_token(n.token_text);n.current_mode="CONTENT";break;case"TK_CONTENT":if(n.token_text!==""){n.print_newline(false,n.output);n.print_token(n.token_text)}n.current_mode="TAG";break}n.last_token=n.token_type;n.last_text=n.token_text}return n.output.join("");
        };
    });
})();

(function(){
    console.log('%c AutomizyEmailEditor loaded! ', 'background: #000000; color: #bada55; font-size:14px');
    return $AEE;
})();