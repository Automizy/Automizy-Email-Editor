$(function(){
	
	



	/* --- */
	$('#start-email-editor').click(function(){
		$AEE.baseDir('vendor/automizy-email-editor').clickToSaveAndExit(function(){
            $A.ajaxDocumentCover(1);
            $.ajax({
                url:'http://emaileditor.automizy.com/api/php/sendhtml.php',
                type:'POST',
                data:{
                    email:$AEE.recipient(),
                    html:$AEE.getHtmlCode()
                },
                complete:function(){
                    $A.ajaxDocumentCover(0);
                }
            });

            return false;
        }).layoutReady(function(){
            $AEE.buttons.saveAndExitButton.text('Download');
        }).init().open();
	})
});