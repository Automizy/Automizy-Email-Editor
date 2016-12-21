define([
    "core"
], function () {
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
});