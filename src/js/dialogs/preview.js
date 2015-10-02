define([
    "core"
], function () {
    $AEE.ready(function() {

        $AEE.setPreviewScreenSize = function(x, y){
            //$AEE.elements.$previewDialogScreen.getNiceScroll().hide();
            $AEE.elements.$previewDialogScreen.stop().animate({
                width:x + 'px',
                height:y + 'px'
            }, 500, function(){
                //$AEE.elements.$previewDialogScreen.getNiceScroll().resize();
                //$AEE.elements.$previewDialogScreen.getNiceScroll().show();
            })
        };

        $AEE.elements.$previewDialogContent = $('<div id="aee-preview-dialog-content"></div>');
        $AEE.elements.$previewDialogLeftColumn = $('<div id="aee-preview-dialog-left-column"></div>').appendTo($AEE.elements.$previewDialogContent);
        $AEE.elements.$previewDialogRightColumn = $('<div id="aee-preview-dialog-right-column"></div>').appendTo($AEE.elements.$previewDialogContent);
        $AEE.elements.$previewDialogScreen = $('<div id="aee-preview-dialog-screen"></div>').appendTo($AEE.elements.$previewDialogRightColumn);
        /*var niceScrollObj = $.extend({}, $AEE.settings.niceScroll);
        niceScrollObj.zindex = 2003;
        niceScrollObj.touchbehavior = true;
        $AEE.elements.$previewDialogScreen.niceScroll(niceScrollObj);*/

        $AEE.inputs.screenSizeSelect = $A.newInput({
            label:$A.translate('Select screen'),
            type:'select',
            options:[
                ['general', $A.translate('General'), true],
                ['480x800', 'Alcatel One Touch T10'],
                ['600x1024', 'BlackBerry PlayBook'],
                ['360x640', 'HTC Desire 700'],
                ['320x533', 'Huawei Y300-0151'],
                ['768x1024', 'iPad Air'],
                ['320x480', 'iPhone 3/4'],
                ['320x568', 'iPhone 5'],
                ['375x627', 'iPhone 6'],
                ['320x427', 'LG Optimus L3'],
                ['360x598', 'Motorola Moto G'],
                ['600x960', 'Nexus 7'],
                ['800x1280', 'Nexus 10'],
                ['320x480', 'Nokia Lumia'],
                ['320x533', 'Samsung Galaxy Ace 2'],
                ['360x598', 'Sony Xperia Z'],
                ['320x534', 'ZTE T83'],
            ],
            change:function(){
                var value = this.val();
                if(value === 'general'){
                    value = $AEE.maxWidth() + 'x600';
                }
                var size = value.split('x');
                $AEE.inputs.screenSizeX.val(size[0]);
                $AEE.inputs.screenSizeY.val(size[1]);
                $AEE.setPreviewScreenSize(size[0], size[1]);
            }
        });
        $AEE.inputs.screenSizeX = $A.newInput({
            label:$A.translate('Screen size'),
            labelAfter:'&nbsp;x&nbsp;',
            type:'number',
            newRow:false,
            width:'50px',
            value:$AEE.maxWidth(),
            change:function(){
                $AEE.setPreviewScreenSize(this.val(), $AEE.inputs.screenSizeY.val());
            }
        });
        $AEE.inputs.screenSizeX.input().attr('min', 10).attr('max', 5000).pbmInput();

        $AEE.inputs.screenSizeY = $A.newInput({
            type:'number',
            newRow:false,
            width:'50px',
            value:600,
            change:function(){
                $AEE.setPreviewScreenSize($AEE.inputs.screenSizeX.val(), this.val());
            }
        });
        $AEE.inputs.screenSizeY.input().attr('min', 10).attr('max', 5000).pbmInput();

        $AEE.inputs.previewSegments = $A.newInput({
            type:'select',
            label:$A.translate('A recipient from this segment'),
            options:[],
            change:function(){
                var segment = this.val();
                $AEE.elements.$previewDialogScreen.find('[data-dynamic-segments]').each(function(){
                    var $t = $(this);
                    var segments = $t.attr('data-dynamic-segments').split(',');
                    if($.inArray(segment, segments) < 0){
                        $t.hide();
                    }else{
                        $t.show();
                    }
                })
            }
        });

        $AEE.forms.preview = $A.newForm().addInputs([
            $AEE.inputs.screenSizeSelect,
            $AEE.inputs.screenSizeX,
            $AEE.inputs.screenSizeY
        ]).addHtmls([
            '<br/>'
        ]).addInputs([
            $AEE.inputs.previewSegments
        ]).addButtons([
            $AEE.buttons.sendTestButton
        ]).drawTo($AEE.elements.$previewDialogLeftColumn);
        $AEE.forms.preview.widget().css('margin-bottom', '12px');

        $AEE.dialogs.preview = $A.dialog({
            title: $A.translate('Preview'),
            positionY:'top',
            width:'100%',
            id: 'aee-preview-dialog',
            content: $AEE.elements.$previewDialogContent,
            buttons: [
                {
                    text: $A.translate('Close'),
                    click: function () {
                        $AEE.dialogs.preview.close();
                    }
                }
            ],
            open: function () {
                $AEE.elements.$previewDialogScreen.html($AEE.getHtmlCode());
                $AEE.inputs.screenSizeSelect.val('general');
                $AEE.inputs.screenSizeX.val($AEE.maxWidth());
                $AEE.inputs.screenSizeY.val(600);
                $AEE.setPreviewScreenSize($AEE.maxWidth(), 600);
                $AEE.inputs.previewSegments.val(Object.keys($AEE.d.segments)[0] || '').change();
            }
        });
    });
});