$(function(){
    $AEE.baseDir('vendor/automizy-email-editor').clickToSaveAndExit(function(){
        $AEE.dialogs.downloadDialog.open();
        return false;
    }).layoutReady(function(){
        $AEE.dialogs.loginDialog = $A.newDialog({

        });
        $.get('//app.automizy.com/login.html').done(function(data){
            $AEE.dialogs.loginDialog.content(data);
        });





        $AEE.buttons.saveAndExitButton.text($A.translate('Download'));

        $AEE.buttons.downloadDialogSend = $A.newButton({
            skin: 'simple-orange',
            text: $A.translate('Send'),
            float: 'right',
            click:function(){
                $A.ajaxDocumentCover(1);
                $.ajax({
                    url:'https://emaileditor.automizy.com/api/php/sendhtml.php',
                    type:'POST',
                    data:{
                        email:$AEE.inputs.downloadRecipient.val(),
                        html:$AEE.getHtmlCode()
                    },
                    success:function(){
                        $AEE.dialogs.downloadDialog.close();
                    },
                    complete:function(){
                        $A.ajaxDocumentCover(0);
                    },
                    error:function(){
                        alert($A.translate('Something wrong!'));
                    }
                });
            }
        });
        $AEE.buttons.downloadDialogCancel = $A.newButton({
            skin: 'nobox-green',
            text: $A.translate('Cancel'),
            float: 'left',
            click: function () {
                $AEE.dialogs.downloadDialog.close();
            }
        });
        $AEE.inputs.downloadRecipient = $A.newInput({
            label:$A.translate('Email address'),
            validator:'email'
        });

        $AEE.forms.downloadForm = $A.newForm().addInputs([
            $AEE.inputs.downloadRecipient
        ]);

        $AEE.dialogs.downloadDialog = $A.newDialog({
            title:$A.translate('Send the html code'),
            content:$AEE.forms.downloadForm,
            buttons:[
                $AEE.buttons.downloadDialogCancel,
                $AEE.buttons.downloadDialogSend
            ]
        })
    }).init();


	$('#start-email-editor').click(function(){
		$AEE.open();
	})
});