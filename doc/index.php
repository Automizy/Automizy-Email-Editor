<html>
    <head>
        <title>AutomizyJs Email Editor Docs</title>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link rel="stylesheet" href="css/automizyee.css"/>
        <link rel="stylesheet" href="dist/vendor/automizyjs/automizy.min.css"/>
        <link rel="stylesheet" href="css/tomorrow.css"/>
        <link rel="shortcut icon" type="image/png" href="images/Automizy_favicon.png"/>
        <script src="js/jquery-2.1.3.min.js"></script>
        <script src="js/jquery-ui.min.js"></script>
        <script src="js/prettify.js"></script>
        <script src="dist/vendor/automizyjs/automizy.min.js"></script>
        <script src="dist/automizy-email-editor.min.js"></script>
        <link rel="stylesheet" type="text/css" href="dist/automizy-email-editor.min.css">
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
                $("#menu").tocify({highlightOnScroll:true, extendPage:true, context:'#content', scrollTo:120, highlightOffset: 100});

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

                //Setting request on function examples active
                $('#content .function-example .example-tab[data-name="request"]').addClass('active-tab');
                $('#content .function-example .prettyprint[data-name="response"]').addClass('inactive');

                //--Click listeners--\\
                
                //Menu icon click listener
                
                $('#menu-icon').click(function(){
                    $('#menu-container').animate({width: 'toggle'});
                    $('#menu-cover').toggle();
                });
                
                $('#menu-cover').click(function(){
                    $('#menu-icon').click();
                });

                //Click on basic functions link
                $('.basicFunctionsLink').click(function () {
                    $('#menu li[data-unique="BasicFunctions"] a').trigger('click');
                });

                //Click on function example tabs
                $('#content .function-example .example-tab').click(function(){
                    //alert('asd');
                    
                    $(this).siblings().removeClass('active-tab');
                    $(this).addClass('active-tab');
                    var dataName = $(this).attr('data-name');
                    $(this).parent().find('.prettyprint[data-name="'+dataName+'"]').removeClass('inactive');
                    $(this).parent().find('.prettyprint[data-name="'+dataName+'"]').siblings().addClass('inactive');
                    
                });      
                
                /*Opening examples*/
                $AEE.baseDir('dist').init(console.log('INIT STARTED!')).scriptLoaded(function(editorStatus){
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
                    title:"Download Automizy JS Api",
                    content:$('<a href="http://developers.automizy.com/automizyjsapi/downloads/automizy.api.js" target="_blank">Download the uncompressed, development JavaScript file for AutomizyJS API.</a></br>\n\
                        <a href="http://developers.automizy.com/automizyjsapi/downloads/automizy.api.min.js" target="_blank">Download the compressed, production JavaScript file for AutomizyJS API.</a></br>\n\
                        <a href="http://developers.automizy.com/automizyjsapi/downloads/automizy.api.min.map" target="_blank">Download the map file for AutomizyJS API.</a></br>\n\
                        <a href="http://developers.automizy.com/automizyjsapi/downloads/automizyjsapi.zip" target="_blank">Download the all in one ZIP file for AutomizyJS API.</a></br>\n\
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
            Automizy Email Editor Docs
            <!--<span class="downloads">Downloads</span>-->
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
                        <a href="https://www.facebook.com/automizy" target="_blank"><img src="images/socials/facebook.png" /></a>
                        <a href="https://twitter.com/automizy" target="_blank"><img src="images/socials/twitter.png" /></a>
                        <a href="https://plus.google.com/+Automizyinc/about" target="_blank"><img src="images/socials/gplus.png" /></a>
                        <a href="https://www.linkedin.com/company/automizy-inc-" target="_blank"><img src="images/socials/linkedin.png" /></a>
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