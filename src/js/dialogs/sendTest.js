define([
    "core"
], function () {
    $AEE.ready(function() {

        $AEE.inputs.sendTestRecipient = $A.newInput({
            label:$A.translate('Recipient'),
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
                    skin: 'nobox-green',
                    text: $A.translate('Cancel'),
                    float: 'left',
                    click: function () {
                        $AEE.dialogs.sendTest.close();
                    }
                },
                {
                    skin: 'simple-orange',
                    text: $A.translate('Send'),
                    float: 'right',
                    click: function () {
                        $A.ajaxDocumentCover(true, [$A.translate('Test email sending')]);
                        $.ajax({
                            url: $AA.u.emailPreview,
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                recipient:$AEE.inputs.sendTestRecipient.val(),
                                subject:'Test email',
                                htmlCode:$AEE.getHtmlCode({conditions:false})
                            },
                            headers: {Authorization: 'Bearer ' + $AA.token().get()}
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