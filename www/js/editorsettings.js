$(function(){
    $AEE.baseDir('vendor/automizy-email-editor').clickToSaveAndExit(function(){
        $AEE.dialogs.downloadDialog.open();
        return false;
    }).clickToSendTest(function(){
        if(typeof $AA.token().get() === 'undefined'){
            $AEE.afterLogin = function(){
                $AEE.dialogs.sendTest.open();
            };
            $AEE.dialogs.loginDialog.open();
        }else{
            $AEE.dialogs.sendTest.open();
        }
    }).clickToSave(function(){
        if(typeof $AA.token().get() === 'undefined'){
            $AEE.afterLogin = function(){
                $AEE.save();
            };
            $AEE.dialogs.loginDialog.open();
        }else{
            $AEE.save();
        }
    }).layoutReady(function(){
        $AEE.afterLogin = function(){};
        $AEE.dialogs.loginDialog = $A.newDialog({
            title:$A.translate('First you have to login with your Automizy account')
        });
        $.getScript('https://app.automizy.com/login.js').done(function(){
            AutomizyLogin.complete = function(){
                $AEE.dialogs.loginDialog.content(AutomizyLogin.$widget);
                AutomizyLogin.$widget.show();
                AutomizyLogin.functions.login = function(){
                    if(AutomizyLogin.forms.logInForm.validate()){
                        $A.ajaxDocumentCover(1);
                        var obj = {};
                        obj.username = AutomizyLogin.inputs.loginEmail.val() || '-';
                        obj.password = AutomizyLogin.inputs.loginPassword.val() || '-';
                        return $AA.token().passwordLogin(obj).done(function(){
                            $AEE.afterLogin.apply($AEE, []);
                            $AEE.dialogs.loginDialog.close();
                        }).error(function(){
                            alert($A.translate('Wrong email or password'));
                        }).complete(function(){
                            $A.ajaxDocumentCover(0);
                        });
                    }
                };
            };
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