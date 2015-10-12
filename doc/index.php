<html>
    <head>
        <title>AutomizyJs Email Editor Docs</title>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link rel="stylesheet" href="css/automizyee.css"/>
        <link rel="stylesheet" href="http://developers.automizy.com/emaileditor/dist/vendor/automizyjs/automizy.min.css"/>
        <link rel="stylesheet" href="css/tomorrow.css"/>
        <link rel="shortcut icon" type="image/png" href="images/Automizy_favicon.png"/>
        <script src="js/jquery-2.1.3.min.js"></script>
        <script src="js/jquery-ui.min.js"></script>
        <script src="js/prettify.js"></script>
        <script src="http://developers.automizy.com/emaileditor/dist/vendor/automizyjs/automizy.min.js"></script>
        <script src="http://developers.automizy.com/emaileditor/dist/automizy-email-editor.min.js"></script>
        <link rel="stylesheet" type="text/css" href="http://developers.automizy.com/emaileditor/dist/automizy-email-editor.min.css">
        <script src="js/gfranko-jquery.tocify.js-c179865/src/javascripts/jquery.tocify.min.js"></script>
        <script>
            var setContentWidth = function(){
                /*
                if ($(window).width()>800){
                    $('#content').css({'margin-left':$('#menu-container').width()+30});
                    $('#menu-container').css({'width':$('#content').css('margin-left')});
                }
                */
            };
            $(function() {
                //Calls the tocify method on your HTML div.
                $("#menu").tocify({highlightOnScroll:true, extendPage:true, selectors:"h2,h3", context:'#content', scrollTo:120, highlightOffset: 100});

                //Setting menu and content width
                $("body").on('scroll',setContentWidth());

                //code formatting
                $('.prettyprint').each(function () {
                    var $t = $(this);
                    var tt = $t.text();
                    $t.data('content', tt);
                    if (tt.lastIndexOf("\n") > 0) {
                        $t.text(tt.substring(0, tt.lastIndexOf("\n")));
                    }
                });
                prettyPrint();

                //--Click listeners--\\
                
                //Menu icon click listener
                
                $('#menu-icon').click(function(){
                    $('#menu-container').animate({width: 'toggle'});
                    $('#menu-cover').toggle();
                    $('body').toggleClass('overflow-hidden');
                });
                
                $('#menu-cover').click(function(){
                    $('#menu-icon').click();
                    $('body').removeClass('overflow-hidden');
                });      
                
                /*Opening examples*/
                $AEE.baseDir('http://developers.automizy.com/emaileditor/dist').init(console.log('INIT STARTED!')).scriptLoaded(function(editorStatus){
                console.log('PLUGIN LOAD: ', editorStatus)}).ready(function(){
                console.log('ALL PLUGIN LOADED')}).layoutReady(function(){
                console.log('LAYOUT READY')});
                $AEE.clickToPreview(function(){
                    alert('Preview not available.');
                });
                $AEE.clickToSave(function(){
                    alert('Saved!');
                });
                $AEE.clickToSaveAndExit(function(){
                    alert('Saved!');
                    $AEE.close();
                });
                $AEE.clickToSendTest(function(){
                    alert('Send test!');
                });
                
                /*Creating download dialog*/
                var downloadDialog = $A.newDialog({
                    title:"Download Automizy Email Editor",
                    content:$('<a href="http://developers.automizy.com/emaileditor/dist/automizy-email-editor.css" target="_blank">Download the uncompressed, development CSS file for Automizy Email Editor.</a></br>\n\
                        <a href="http://developers.automizy.com/emaileditor/dist/automizy-email-editor.min.css" target="_blank">Download the compressed, production CSS file for Automizy Email Editor.</a></br>\n\
                        <a href="http://developers.automizy.com/emaileditor/dist/automizy-email-editor.js" target="_blank">Download the uncompressed, development JavaScript file for Automizy Email Editor.</a></br>\n\
                        <a href="http://developers.automizy.com/emaileditor/dist/automizy-email-editor.min.js" target="_blank">Download the compressed, production JavaScript file for Automizy Email Editor.</a></br>\n\
                        <a href="http://developers.automizy.com/emaileditor/dist/automizy-email-editor.min.map" target="_blank">Download the map file for Automizy Email Editor.</a></br>\n\
                        <a href="http://developers.automizy.com/emaileditor/dist/automizy-email-editor.zip" target="_blank">Download the all in one ZIP file for Automizy Email Editor.</a></br>\n\
                        ')
                });
                $('.downloads').click(function(){
                    downloadDialog.open();
                });
                
              });
        </script>
    </head>
    <body>
        <header>
            <img id='menu-icon' src="images/menu-icon.png" />
            <h1>Automizy Email Editor Docs</h1>
            <div class="header-buttons">
                <a title="Automizy Developers" alt="Automizy Developers"  href="http://developers.automizy.com" class="header-button">Developers Page</a>
                <a title="Automizy Email Editor on GitHub" alt="Automizy Email Editor on GitHub"  href="https://github.com/Automizy/Automizy-Email-Editor" target="_blank" class="header-button">GitHub</a>
                <a title="Automizy Email Editor Downloads" alt="Automizy Email Editor Downloads" class="downloads header-button">Downloads</a>
            </div>
        </header>
        <div id='container'>
            <div id="menu-container">
                <div id='menu'></div>
            </div>
            <div id='menu-cover'></div>
            <div id='content'>
                <?php                                           
                    require ('pages/main-functions.html');
                    require ('pages/common-functions.html');
                    require ('pages/other-functions.html');
                    require ('pages/special-functions.html');
                    require ('pages/additional-functions.html');
                ?>
            </div>
        </div>
        <footer>
            <div id="docs-footer">
                <div class='footer-cell'>
                    <h2>Follow us</h2>
                    <div>Don't miss our news, debates, and inspiring stories. Find us on social networks!</div>
                    <div class='socials'>
                        <a title="Automizy Facebook Page" alt="Automizy Facebook Page"  href="https://www.facebook.com/automizy" target="_blank"><img src="images/socials/facebook.png" /></a>
                        <a title="Automizy Twitter Page" alt="Automizy Twitter Page"  href="https://twitter.com/automizy" target="_blank"><img src="images/socials/twitter.png" /></a>
                        <a title="Automizy Google Plus Page" alt="Automizy Google Plus Page"  href="https://plus.google.com/+Automizyinc/about" target="_blank"><img src="images/socials/gplus.png" /></a>
                        <a title="Automizy LinkedIn Profile" alt="Automizy LinkedIn Profile"  href="https://www.linkedin.com/company/automizy-inc-" target="_blank"><img src="images/socials/linkedin.png" /></a>
                    </div>
                </div>
                <div class='footer-cell'>
                    <h2>Contact us</h2>
                    <div>Email: <a href="mailto:help@automizy.com">help@automizy.com</a></div>
                </div>
                <div class='footer-cell'>
                    <h2>Locations</h2>
                    <div class='hq-info'>
                        USA HQ
                        <div class='location'>
                            Automizy Inc.<br>
                            19 W 34th St., Ste. 1018<br>
                            New York, NY 10001
                        </div>
                    </div>
                    <div class='hq-info'>
                        Europe HQ
                        <div class='location'>
                            Protopmail Zrt.<br>
                            Könyves K. krt 12-14.<br>
                            H-1097 Budapest, Hungary
                        </div>
                    </div>
                </div>
                <div class="copyright">© 2014 Automizy Inc.</div>
            </div>            
        </footer>
    </body>
</html>