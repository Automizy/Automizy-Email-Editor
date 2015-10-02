define([
    "core",
    "js/addons/jquery/pbmInput"
], function () {
    $AEE.ready(function() {

        $AEE.inputs.buttonSettings = {};
        $AEE.buttons.buttonSettings = {};

        $AEE.inputs.buttonSettings.text = $A.newInput({
            label:$A.translate('Button text'),
            value:$A.translate('My button'),
            validator:'notEmpty'
        });
        $AEE.inputs.buttonSettings.link = $A.newInput({
            label:$A.translate('Link'),
            value:$A.translate('http://'),
            validator:'domainOrUrl'
        });
        $AEE.inputs.buttonSettings.radius = $A.newInput({
            label:$A.translate('Border radius'),
            value:5,
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            }
        });

        $AEE.inputs.buttonSettings.paddingTop = $A.newInput({
            label:$A.translate('Padding top'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            }
        });
        $AEE.inputs.buttonSettings.paddingRight = $A.newInput({
            label:$A.translate('Padding right'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            }
        });
        $AEE.inputs.buttonSettings.paddingBottom = $A.newInput({
            label:$A.translate('Padding bottom'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            }
        });
        $AEE.inputs.buttonSettings.paddingLeft = $A.newInput({
            label:$A.translate('Padding left'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            }
        });

        $AEE.inputs.buttonSettings.fontSize = $A.newInput({
            label:$A.translate('Font size'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            }
        });
        $AEE.inputs.buttonSettings.position = $A.newInput({
            label:$A.translate('Button position'),
            type:'select',
            options:[
                ['left', $A.translate('Left')],
                ['center', $A.translate('Center'), true],
                ['right', $A.translate('Right')]
            ]
        });
        $AEE.inputs.buttonSettings.textPosition = $A.newInput({
            label:$A.translate('Text position'),
            type:'select',
            options:[
                ['left', $A.translate('Left')],
                ['center', $A.translate('Center'), true],
                ['right', $A.translate('Right')]
            ]
        });
        $AEE.inputs.buttonSettings.fontFamily = $A.newInput({
            label:$A.translate('Font family'),
            type:'select',
            options:$AEE.settings.fontFamilies
        });
        $AEE.inputs.buttonSettings.backgroundColor = $A.newInput({
            label:$A.translate('Background color'),
            width:'32px',
            create:function(){
                this.input().css({
                    fontSize:0,
                    backgroundColor:'#b8b8b8',
                    cursor:'pointer'
                }).colpick({
                    colorScheme:'dark',
                    layout:'rgbhex',
                    color:'b8b8b8',
                    onSubmit:function(hsb,hex,rgb,el) {
                        $(el).css({
                            backgroundColor:'#'+hex,
                            color:'#'+hex
                        }).val('#'+hex).trigger('change').colpickHide();
                    }
                })
            }
        });
        $AEE.inputs.buttonSettings.textColor = $A.newInput({
            label:$A.translate('Text color'),
            width:'32px',
            create:function(){
                this.input().css({
                    fontSize:0,
                    backgroundColor:'#ffffff',
                    cursor:'pointer'
                }).colpick({
                    colorScheme:'dark',
                    layout:'rgbhex',
                    color:'ffffff',
                    onSubmit:function(hsb,hex,rgb,el) {
                        $(el).css({
                            backgroundColor:'#'+hex,
                            color:'#'+hex
                        }).val('#'+hex).trigger('change').colpickHide();
                    }
                })
            }
        });

        $AEE.buttons.buttonSettings.cancel = $A.newButton({
            skin: 'nobox-green',
            text: $A.translate('Cancel'),
            float: 'left',
            click: function () {
                $AEE.dialogs.buttonSettings.close();
            }
        });
        $AEE.buttons.buttonSettings.save = $A.newButton({
            skin: 'simple-orange',
            text: $A.translate('Save'),
            float: 'right',
            click: function () {
                var data = {
                    text: $AEE.inputs.buttonSettings.text.val(),
                    link: $AEE.inputs.buttonSettings.link.val(),
                    radius: $AEE.inputs.buttonSettings.radius.val(),
                    paddingTop: $AEE.inputs.buttonSettings.paddingTop.val(),
                    paddingRight: $AEE.inputs.buttonSettings.paddingRight.val(),
                    paddingBottom: $AEE.inputs.buttonSettings.paddingBottom.val(),
                    paddingLeft: $AEE.inputs.buttonSettings.paddingLeft.val(),
                    fontSize: $AEE.inputs.buttonSettings.fontSize.val(),
                    position: $AEE.inputs.buttonSettings.position.val(),
                    //textPosition: $AEE.inputs.buttonSettings.textPosition.val(),
                    fontFamily: $AEE.inputs.buttonSettings.fontFamily.val(),
                    backgroundColor: $AEE.inputs.buttonSettings.backgroundColor.val(),
                    textColor: $AEE.inputs.buttonSettings.textColor.val()
                };

                var $buttonContent = $AEE.elements.$activeBlock.find('.aee-button-block-content');
                var $button = $buttonContent.find('.aee-button-block-button');

                $button.text(data.text);
                $button.attr('href', data.link);
                $buttonContent.css('text-align', data.position);

                var style = [
                    'border-top-width:'+data.paddingTop + 'px',
                    'border-right-width:'+data.paddingRight + 'px',
                    'border-bottom-width:'+data.paddingBottom + 'px',
                    'border-left-width:'+data.paddingLeft + 'px',
                    'border-style:solid',
                    'border-color:'+$AEE.rgbStyleToHex(data.backgroundColor),
                    'background-color:'+$AEE.rgbStyleToHex(data.backgroundColor),
                    'color:'+$AEE.rgbStyleToHex(data.textColor),
                    'font-size:'+data.fontSize + 'px',
                    //'text-align:'+data.textPosition,
                    'text-align:center',
                    'text-decoration:none',
                    'font-family:'+data.fontFamily,
                    '-webkit-border-radius:'+data.radius + 'px',
                    '-moz-border-radius:'+data.radius + 'px',
                    'border-radius:'+data.radius + 'px'
                ];
                $button.attr('style', style.join(';'));

                $AEE.dialogs.buttonSettings.close();
            }
        });
        $AEE.forms.buttonSettings = $A.newForm({
            inputs:[
                $AEE.inputs.buttonSettings.text,
                $AEE.inputs.buttonSettings.link,
                $AEE.inputs.buttonSettings.backgroundColor,
                $AEE.inputs.buttonSettings.textColor,
                $AEE.inputs.buttonSettings.fontSize,
                $AEE.inputs.buttonSettings.fontFamily,
                $AEE.inputs.buttonSettings.radius,
                //$AEE.inputs.buttonSettings.textPosition,
                $AEE.inputs.buttonSettings.position,
                $AEE.inputs.buttonSettings.paddingTop,
                $AEE.inputs.buttonSettings.paddingRight,
                $AEE.inputs.buttonSettings.paddingBottom,
                $AEE.inputs.buttonSettings.paddingLeft
            ]
        });
        $AEE.dialogs.buttonSettings = $A.newDialog({
            title:$A.translate('Button settings'),
            content:$AEE.forms.buttonSettings,
            buttons:[
                $AEE.buttons.buttonSettings.cancel,
                $AEE.buttons.buttonSettings.save
            ],
            open:function(){
                var $buttonContent = $AEE.elements.$activeBlock.find('.aee-button-block-content');
                var $button = $buttonContent.find('.aee-button-block-button');

                $AEE.inputs.buttonSettings.text.val($button.text());
                $AEE.inputs.buttonSettings.link.val($button.attr('href'));
                $AEE.inputs.buttonSettings.radius.val(parseInt($button.css('border-radius')));
                $AEE.inputs.buttonSettings.paddingTop.val(parseInt($button.css('border-top-width')));
                $AEE.inputs.buttonSettings.paddingRight.val(parseInt($button.css('border-right-width')));
                $AEE.inputs.buttonSettings.paddingBottom.val(parseInt($button.css('border-bottom-width')));
                $AEE.inputs.buttonSettings.paddingLeft.val(parseInt($button.css('border-left-width')));
                $AEE.inputs.buttonSettings.fontSize.val(parseInt($button.css('font-size')));
                $AEE.inputs.buttonSettings.position.val($buttonContent.css('text-align'));
                //$AEE.inputs.buttonSettings.textPosition.val($button.css('text-align'));
                $AEE.inputs.buttonSettings.fontFamily.val($button.css('font-family'));

                var bgColor = $AEE.rgbStyleToHex($button[0].style.backgroundColor);
                $AEE.inputs.buttonSettings.backgroundColor.input()[0].style.backgroundColor = bgColor;
                $AEE.inputs.buttonSettings.backgroundColor.input().val(bgColor).colpickSetColor(bgColor);

                var color = $AEE.rgbStyleToHex($button[0].style.color);
                $AEE.inputs.buttonSettings.textColor.input()[0].style.color = color;
                $AEE.inputs.buttonSettings.textColor.input().val(color).colpickSetColor(color);
            }
        });

    });
});