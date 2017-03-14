define([
    "js/functions/core/ready",
    "js/functions/core/layoutReady"
], function () {
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'button.gif',
            name:'button',
            category:'content',
            title:$A.translate('Button'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell){
                $block.addClass('aee-button-block-item');
                var $content = $('<div class="aee-button-block-content"></div>').appendTo($contentCell).attr('style', 'text-align:center');
                var $button = $('<a href="#" class="aee-button-block-button"></a>').text($A.translate('My button')).appendTo($content).attr('style', 'border-top-width: 9px; border-right-width:36px; border-bottom-width:9px; border-left-width:36px; border-style:solid; border-color:#b8b8b8; font-size: 14px; display: inline-block; text-decoration: none; background-color: #b8b8b8; color: #ffffff; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; font-weight:normal; text-decoration:none; font-style:normal;');
            }
        });

    });


    $AEE.layoutReady(function(){
        $AEE.elements.$document.on('click', '.aee-button-block-item .aee-button-block-button', function(){
            setTimeout(function(){
                $AEE.dialogs.buttonSettings.open();
            }, 10);
        }).on('click', '.aee-button-block-item a', function(event){
            event.preventDefault();
        });
    });


    /* Editor */
    $AEE.ready(function() {

        $AEE.inputs.buttonSettings = {};
        $AEE.buttons.buttonSettings = {};

        var $buttonContent,
            $button,
            $box,
            $buttonContentClone = $(),
            $buttonClone;

        $AEE.inputs.buttonSettings.text = $A.newInput({
            label:$A.translate('Button text'),
            value:$A.translate('My button'),
            validator:'notEmpty',
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.link = $A.newInput({
            label:$A.translate('Link'),
            value:$A.translate('http://'),
            validator:'domainOrUrl',
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.radius = $A.newInput({
            label:$A.translate('Border radius'),
            value:5,
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            },
            change:function(){
                styleClone();
            }
        });

        $AEE.inputs.buttonSettings.paddingTop = $A.newInput({
            label:$A.translate('Padding top'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            },
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.paddingRight = $A.newInput({
            label:$A.translate('Padding right'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            },
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.paddingBottom = $A.newInput({
            label:$A.translate('Padding bottom'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            },
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.paddingLeft = $A.newInput({
            label:$A.translate('Padding left'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            },
            change:function(){
                styleClone();
            }
        });

        $AEE.inputs.buttonSettings.fontSize = $A.newInput({
            label:$A.translate('Font size'),
            type:'number',
            labelAfter:' px',
            create:function(){
                this.input().attr('min', 0).pbmInput();
            },
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.position = $A.newInput({
            label:$A.translate('Button position'),
            type:'select',
            options:[
                ['left', $A.translate('Left')],
                ['center', $A.translate('Center'), true],
                ['right', $A.translate('Right')]
            ],
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.textPosition = $A.newInput({
            label:$A.translate('Text position'),
            type:'select',
            options:[
                ['left', $A.translate('Left')],
                ['center', $A.translate('Center'), true],
                ['right', $A.translate('Right')]
            ],
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.fontFamily = $A.newInput({
            label:$A.translate('Font family'),
            type:'select',
            options:$AEE.settings.fontFamilies,
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.bold = $A.newInput({
            label:$A.translate('Bold'),
            type:'checkbox',
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.underline = $A.newInput({
            label:$A.translate('Underline'),
            type:'checkbox',
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.italic = $A.newInput({
            label:$A.translate('Italic'),
            type:'checkbox',
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.backgroundColor = $A.newInput({
            label:$A.translate('Background color'),
            width:'32px',
            create:function(){
                this.input().css({
                    fontSize:0,
                    backgroundColor:'#b8b8b8',
                    cursor:'pointer',
                    '-webkit-box-shadow':'none',
                    'box-shadow': 'none'
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
            },
            change:function(){
                styleClone();
            }
        });
        $AEE.inputs.buttonSettings.textColor = $A.newInput({
            label:$A.translate('Text color'),
            width:'32px',
            create:function(){
                this.input().css({
                    fontSize:0,
                    backgroundColor:'#ffffff',
                    cursor:'pointer',
                    '-webkit-box-shadow':'none',
                    'box-shadow': 'none'
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
            },
            change:function(){
                styleClone();
            }
        });

        $AEE.buttons.buttonSettings.cancel = $A.newButton({
            text: $A.translate('Cancel'),
            click: function () {
                $AEE.dialogs.buttonSettings.close();
            }
        });

        function getData(){
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
                bold: $AEE.inputs.buttonSettings.bold.checked(),
                underline: $AEE.inputs.buttonSettings.underline.checked(),
                italic: $AEE.inputs.buttonSettings.italic.checked(),
                backgroundColor: $AEE.inputs.buttonSettings.backgroundColor.val(),
                textColor: $AEE.inputs.buttonSettings.textColor.val()
            };
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
                'font-family:'+data.fontFamily,
                'font-weight:'+(data.bold?'bold':'normal'),
                'text-decoration:'+(data.underline?'underline':'none'),
                'font-style:'+(data.italic?'italic':'normal'),
                '-webkit-border-radius:'+data.radius + 'px',
                '-moz-border-radius:'+data.radius + 'px',
                'border-radius:'+data.radius + 'px',
                'white-space: nowrap'
            ];
            return {
                data:data,
                style:style
            }
        }

        function styleClone(){
            var data = getData();
            $buttonClone
                .text(data.data.text)
                .attr('href', 'javascript:;')
                .attr('style', data.style.join(';'))
                .attr('data-font-family', data.fontFamily)
                .css('display', 'inline-block');
            $buttonContentClone.css('text-align', data.data.position);
        }

        $AEE.buttons.buttonSettings.save = $A.newButton({
            skin: 'simple-orange',
            text: $A.translate('Save'),
            click: function () {
                var data = getData();

                $button
                    .text(data.data.text)
                    .attr('href', data.data.link)
                    .attr('style', data.style.join(';'));
                $buttonContent.css('text-align', data.data.position);

                $AEE.dialogs.buttonSettings.close();
            }
        });

        var $table = $('<table border="0" cellpadding="0" cellspacing="0" style="width:100%"></table>');
        var $tr = $('<tr></tr>').appendTo($table);
        var $td1 = $('<td align="left" valign="top" style="max-width:630px; width:630px;"></td>').appendTo($tr);
        var $td2 = $('<td align="left" valign="top"></td>').appendTo($tr);

        $AEE.forms.buttonSettings = $A.newForm({
            inputs:[
                $AEE.inputs.buttonSettings.text,
                $AEE.inputs.buttonSettings.link,
                $AEE.inputs.buttonSettings.backgroundColor,
                $AEE.inputs.buttonSettings.textColor,
                $AEE.inputs.buttonSettings.fontSize,
                $AEE.inputs.buttonSettings.fontFamily,
                $AEE.inputs.buttonSettings.bold,
                $AEE.inputs.buttonSettings.underline,
                $AEE.inputs.buttonSettings.italic,
                $AEE.inputs.buttonSettings.radius,
                //$AEE.inputs.buttonSettings.textPosition,
                $AEE.inputs.buttonSettings.position,
                $AEE.inputs.buttonSettings.paddingTop,
                $AEE.inputs.buttonSettings.paddingRight,
                $AEE.inputs.buttonSettings.paddingBottom,
                $AEE.inputs.buttonSettings.paddingLeft
            ]
        }).drawTo($td1);

        $AEE.dialogs.buttonSettings = $A.newDialog({
            title:$A.translate('Button settings'),
            content:$table,
            width:'85%',
            buttons:[
                $AEE.buttons.buttonSettings.cancel,
                $AEE.buttons.buttonSettings.save
            ],
            open:function(){
                $buttonContent = $AEE.elements.$activeBlock.find('.aee-button-block-content');
                $button = $buttonContent.find('.aee-button-block-button');
                $box = $buttonContent.parent();

                $buttonContentClone.remove();
                $buttonContentClone = $buttonContent.clone();
                $buttonContentClone.appendTo($td2).css({
                    border:'1px dashed #cccccc',
                    padding: '12px',
                    marginLeft: '12px',
                    width:'100%'
                });
                $buttonClone = $buttonContentClone.find('.aee-button-block-button');


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
                $AEE.inputs.buttonSettings.fontFamily.val($button.attr('data-font-family') || $button.css('font-family'));

                $AEE.inputs.buttonSettings.bold.checked($button.css('font-weight') === 'bold' || $button.css('font-weight') === '700');
                $AEE.inputs.buttonSettings.underline.checked($button.css('text-decoration') === 'underline');
                $AEE.inputs.buttonSettings.italic.checked($button.css('font-style') === 'italic');

                var bgColor = $AEE.rgbStyleToHex($button[0].style.backgroundColor);
                $AEE.inputs.buttonSettings.backgroundColor.input()[0].style.backgroundColor = bgColor;
                $AEE.inputs.buttonSettings.backgroundColor.input().val(bgColor).colpickSetColor(bgColor);

                var color = $AEE.rgbStyleToHex($button[0].style.color);
                $AEE.inputs.buttonSettings.textColor.input()[0].style.color = color;
                $AEE.inputs.buttonSettings.textColor.input().val(color).colpickSetColor(color);

                $AEE.inputs.buttonSettings.radius.labelAfter('px');
                $AEE.inputs.buttonSettings.paddingTop.labelAfter('px');
                $AEE.inputs.buttonSettings.paddingRight.labelAfter('px');
                $AEE.inputs.buttonSettings.paddingBottom.labelAfter('px');
                $AEE.inputs.buttonSettings.paddingLeft.labelAfter('px');
                $AEE.inputs.buttonSettings.fontSize.labelAfter('px');
                setTimeout(function(){
                    $AEE.dialogs.buttonSettings.d.$content.trigger('scroll');
                }, 10);
            }
        });


        $AEE.dialogs.buttonSettings.d.$content.scroll(function(){
            $buttonContentClone.css({
                marginTop:$AEE.dialogs.buttonSettings.d.$content.scrollTop() + 'px'
            })
        })

    });
});