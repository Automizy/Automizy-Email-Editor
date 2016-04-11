$(function(){
    $AEE.baseDir('vendor/automizy-email-editor').clickToSaveAndExit(function(){
        $AEE.dialogs.downloadDialog.open();
        return false;
    }).clickToSendTest(function(){
        if(typeof $AA.token().get() === 'undefined' || $AA.token().get() === '<test>'){
            $AEE.afterLogin = function(){
                $AEE.dialogs.sendTest.open();
            };
            $AEE.dialogs.loginDialog.open();
        }else{
            $AEE.dialogs.sendTest.open();
        }
    }).clickToSave(function(){
        if(typeof $AA.token().get() === 'undefined' || $AA.token().get() === '<test>'){
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
            title:$A.translate('First you have to login with your Automizy account'),
            zIndex:2002,
            maxWidth:'1000px',
            positionY:'25px',
            create:function(){
                this.d.$buttons.hide();
                //this.d.$head.hide();
                this.d.$content.css({
                    backgroundColor:'#eef4e6'
                });
                this.d.$head.css({
                    backgroundColor:'#78aa42',
                    color:'#ffffff'
                });
            }
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
        $AEE.imagePicker.d.buttons.gallery.click(function(){
            if(typeof $AA.token().get() === 'undefined'){
                $AEE.afterLogin = function(){
                    $AEE.imagePicker.d.dialogs.gallery.open();
                };
                $AEE.dialogs.loginDialog.open();
            }else{
                $AEE.imagePicker.d.dialogs.gallery.open();
            }
        });
        $AEE.imagePicker.d.inputs.upload.click(function(){
            if(typeof $AA.token().get() === 'undefined'){
                $AEE.imagePicker.d.inputs.upload.disable();
                setTimeout(function(){
                    $AEE.imagePicker.d.inputs.upload.enable();
                }, 100);
                $AEE.dialogs.loginDialog.open();
            }
        });

        var xhrs = [];
        $AEE.inputs.dropFiles.input().fileupload({
            beforeSend:function(xhr, data) {
                if(typeof $AA.token().get() === 'undefined'){
                    $AEE.afterLogin = function(){
                        for(var i = 0; i < xhrs.length; i++){
                            xhrs[i][0].setRequestHeader('Authorization', 'Bearer ' + $AA.token().get());
                            xhrs[i][1].submit();
                        }
                    };
                    xhrs.push([xhr, data]);
                    $AEE.dialogs.loginDialog.open();
                    return false;
                }
                xhr.setRequestHeader('Authorization', 'Bearer ' + $AA.token().get());
            }
        });

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
		$AEE.open(250);
	});

    if(typeof getParameterByName('autostart') !== 'undefined' && getParameterByName('autostart') == 1){
        $AEE.open(250);
    }

});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}