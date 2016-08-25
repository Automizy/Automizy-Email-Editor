define([
    "js/functions/core/ready"
], function () {
    $AEE.ready(function() {
        var BackgroundPaddingBorderMargin = function (obj) {
            var t = this;
            t.d = {
                $widget: $('<div class="automizy-bpbm"></div>'),


                $widgetHelp: $('<img src="'+$A.images.helpIcon+'" class="automizy-input-help" />'),
                $widgetHelpContent: $('<div class="automizy-input-help-content"><img src="'+$A.images.helpArrow+'" class="automizy-input-help-content-arrow" /></div>'),
                $widgetHelpContentInner: $('<span></span>'),

                $marginTable: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-bpbm-margin-table"></table>'),
                $marginTopRow: $('<tr class="automizy-bpbm-margin-top-row"></tr>'),
                $marginMiddleRow: $('<tr class="automizy-bpbm-margin-middle-row"></tr>'),
                $marginBottomRow: $('<tr class="automizy-bpbm-margin-bottom-row"></tr>'),
                $marginTopCell: $('<td colspan="3" class="automizy-bpbm-margin-top-cell"></td>'),
                $marginLeftCell: $('<td class="automizy-bpbm-margin-left-cell"></td>'),
                $marginMiddleCell: $('<td class="automizy-bpbm-margin-middle-cell automizy-bpbm-middle-cell"></td>'),
                $marginRightCell: $('<td class="automizy-bpbm-margin-right-cell"></td>'),
                $marginBottomCell: $('<td colspan="3" class="automizy-bpbm-margin-bottom-cell"></td>'),
                $marginTopCover: $('<div class="automizy-bpbm-cover"></div>'),
                $marginLeftCover: $('<div class="automizy-bpbm-cover"></div>'),
                $marginRightCover: $('<div class="automizy-bpbm-cover"></div>'),
                $marginBottomCover: $('<div class="automizy-bpbm-cover"></div>'),
                $marginText: $('<span class="automizy-bpbm-margin-text"></span>'),
                $marginTopInput: $('<input type="number" min="0" class="automizy-bpbm-margin-top-input automizy-bpbm-number-input"/>'),
                $marginRightInput: $('<input type="number" min="0" max="100" class="automizy-bpbm-margin-right-input automizy-bpbm-number-input"/>'),
                $marginBottomInput: $('<input type="number" min="0" class="automizy-bpbm-margin-bottom-input automizy-bpbm-number-input"/>'),
                $marginLeftInput: $('<input type="number" min="0" max="100" class="automizy-bpbm-margin-left-input automizy-bpbm-number-input"/>'),

                $borderTable: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-bpbm-border-table"></table>'),
                $borderTopRow: $('<tr class="automizy-bpbm-border-top-row"></tr>'),
                $borderMiddleRow: $('<tr class="automizy-bpbm-border-middle-row"></tr>'),
                $borderBottomRow: $('<tr class="automizy-bpbm-border-bottom-row"></tr>'),
                $borderTopCell: $('<td colspan="3" class="automizy-bpbm-border-top-cell"></td>'),
                $borderLeftCell: $('<td class="automizy-bpbm-border-left-cell"></td>'),
                $borderMiddleCell: $('<td class="automizy-bpbm-border-middle-cell automizy-bpbm-middle-cell"></td>'),
                $borderRightCell: $('<td class="automizy-bpbm-border-right-cell"></td>'),
                $borderBottomCell: $('<td colspan="3" class="automizy-bpbm-border-bottom-cell"></td>'),
                $borderText: $('<span class="automizy-bpbm-border-text"></span>'),
                $borderTopWidthInput: $('<input type="number" min="0" class="automizy-bpbm-border-top-input automizy-bpbm-number-input"/>'),
                $borderRightWidthInput: $('<input type="number" min="0" class="automizy-bpbm-border-right-input automizy-bpbm-number-input"/>'),
                $borderBottomWidthInput: $('<input type="number" min="0" class="automizy-bpbm-border-bottom-input automizy-bpbm-number-input"/>'),
                $borderLeftWidthInput: $('<input type="number" min="0" class="automizy-bpbm-border-left-input automizy-bpbm-number-input"/>'),
                $borderTopColorInput: $('<input type="text" class="automizy-bpbm-border-top-color-input automizy-bpbm-color-input"/>'),
                $borderRightColorInput: $('<input type="text" class="automizy-bpbm-border-right-color-input automizy-bpbm-color-input"/>'),
                $borderBottomColorInput: $('<input type="text" class="automizy-bpbm-border-bottom-color-input automizy-bpbm-color-input"/>'),
                $borderLeftColorInput: $('<input type="text" class="automizy-bpbm-border-left-color-input automizy-bpbm-color-input"/>'),

                $paddingTable: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-bpbm-padding-table"></table>'),
                $paddingTopRow: $('<tr class="automizy-bpbm-padding-top-row"></tr>'),
                $paddingMiddleRow: $('<tr class="automizy-bpbm-padding-middle-row"></tr>'),
                $paddingBottomRow: $('<tr class="automizy-bpbm-padding-bottom-row"></tr>'),
                $paddingTopCell: $('<td colspan="3" class="automizy-bpbm-padding-top-cell"></td>'),
                $paddingLeftCell: $('<td class="automizy-bpbm-padding-left-cell"></td>'),
                $paddingMiddleCell: $('<td class="automizy-bpbm-padding-middle-cell automizy-bpbm-middle-cell"></td>'),
                $paddingRightCell: $('<td class="automizy-bpbm-padding-right-cell"></td>'),
                $paddingBottomCell: $('<td colspan="3" class="automizy-bpbm-padding-bottom-cell"></td>'),
                $paddingText: $('<span class="automizy-bpbm-padding-text"></span>'),
                $paddingTopInput: $('<input type="number" min="0" class="automizy-bpbm-padding-top-input automizy-bpbm-number-input"/>'),
                $paddingRightInput: $('<input type="number" min="0" class="automizy-bpbm-padding-right-input automizy-bpbm-number-input"/>'),
                $paddingBottomInput: $('<input type="number" min="0" class="automizy-bpbm-padding-bottom-input automizy-bpbm-number-input"/>'),
                $paddingLeftInput: $('<input type="number" min="0" class="automizy-bpbm-padding-left-input automizy-bpbm-number-input"/>'),

                $backgroundText: $('<span class="automizy-bpbm-background-text"></span>'),
                $backgroundColorInput:$('<input type="text" class="automizy-bpbm-background-color-input automizy-bpbm-color-input"/>'),

                id: 'automizy-bpbm-' + $A.getUniqueString(),
                change: function () {
                },
                create: function () {
                },
                open: function () {
                },
                close: function () {
                }
            };
            t.init();

            t.d.$widgetHelpContent.appendTo('body:first');
            t.d.$widgetHelpContentInner.appendTo(t.d.$widgetHelpContent).html($A.translate('The padding clears an area around the content (inside the border) of an element. The padding is affected by the background color of the element. The top, right, bottom, and left padding can be changed independently using separate properties. The margin clears an area around an element (outside the border). The margin does not have a background color, and is completely transparent. The top, right, bottom, and left margin can be changed independently using separate properties. The border attribute specifies if a border should be displayed around the table cells or not.'))
            t.d.$widgetHelp.appendTo(t.d.$marginTopCell).on('mouseenter click', function () {
                var posX = t.d.$widgetHelp.offset().left + 40;
                var posY = t.d.$widgetHelp.offset().top - 16;
                t.d.$widgetHelpContent.css({
                    left: posX + 'px',
                    top: posY + 'px'
                }).stop().fadeIn();
            }).mouseout(function () {
                t.d.$widgetHelpContent.stop().fadeOut();
            }).css({
                position:'absolute',
                top:'10px',
                right:'10px'
            });

            t.d.$marginTable.appendTo(t.d.$widget);
            t.d.$marginTopRow.appendTo(t.d.$marginTable);
            t.d.$marginMiddleRow.appendTo(t.d.$marginTable);
            t.d.$marginBottomRow.appendTo(t.d.$marginTable);
            t.d.$marginTopCell.appendTo(t.d.$marginTopRow);
            t.d.$marginText.appendTo(t.d.$marginTopCell).html($A.translate('margin'));
            t.d.$marginLeftCell.appendTo(t.d.$marginMiddleRow);
            t.d.$marginMiddleCell.appendTo(t.d.$marginMiddleRow);
            t.d.$marginRightCell.appendTo(t.d.$marginMiddleRow);
            t.d.$marginBottomCell.appendTo(t.d.$marginBottomRow);
            t.d.$marginTopCover.appendTo(t.d.$marginTopCell);
            t.d.$marginLeftCover.appendTo(t.d.$marginLeftCell);
            t.d.$marginRightCover.appendTo(t.d.$marginRightCell);
            t.d.$marginBottomCover.appendTo(t.d.$marginBottomCell);
            t.d.$marginTopInput.appendTo(t.d.$marginTopCell).pbmInput().after('px');
            t.d.$marginLeftInput.appendTo(t.d.$marginLeftCell).pbmInput().after('%');
            t.d.$marginBottomInput.appendTo(t.d.$marginBottomCell).pbmInput().after('px');
            t.d.$marginRightInput.appendTo(t.d.$marginRightCell).pbmInput().after('%');

            t.d.$borderTable.appendTo(t.d.$marginMiddleCell);
            t.d.$borderTopRow.appendTo(t.d.$borderTable);
            t.d.$borderMiddleRow.appendTo(t.d.$borderTable);
            t.d.$borderBottomRow.appendTo(t.d.$borderTable);
            t.d.$borderTopCell.appendTo(t.d.$borderTopRow);
            t.d.$borderText.appendTo(t.d.$borderTopCell).html($A.translate('border'));
            t.d.$borderLeftCell.appendTo(t.d.$borderMiddleRow);
            t.d.$borderMiddleCell.appendTo(t.d.$borderMiddleRow);
            t.d.$borderRightCell.appendTo(t.d.$borderMiddleRow);
            t.d.$borderBottomCell.appendTo(t.d.$borderBottomRow);
            t.d.$borderTopWidthInput.appendTo(t.d.$borderTopCell).pbmInput().after('px');
            t.d.$borderLeftWidthInput.appendTo(t.d.$borderLeftCell).pbmInput().after('px');
            t.d.$borderBottomWidthInput.appendTo(t.d.$borderBottomCell).pbmInput().after('px');
            t.d.$borderRightWidthInput.appendTo(t.d.$borderRightCell).pbmInput().after('px');
            t.d.$borderTopColorInput.appendTo(t.d.$borderTopCell);
            t.d.$borderLeftColorInput.appendTo(t.d.$borderLeftCell);
            t.d.$borderBottomColorInput.appendTo(t.d.$borderBottomCell);
            t.d.$borderRightColorInput.appendTo(t.d.$borderRightCell);

            t.d.$paddingTable.appendTo(t.d.$borderMiddleCell);
            t.d.$paddingTopRow.appendTo(t.d.$paddingTable);
            t.d.$paddingMiddleRow.appendTo(t.d.$paddingTable);
            t.d.$paddingBottomRow.appendTo(t.d.$paddingTable);
            t.d.$paddingTopCell.appendTo(t.d.$paddingTopRow);
            t.d.$paddingText.appendTo(t.d.$paddingTopCell).html($A.translate('padding'));
            t.d.$paddingLeftCell.appendTo(t.d.$paddingMiddleRow);
            t.d.$paddingMiddleCell.appendTo(t.d.$paddingMiddleRow);
            t.d.$paddingRightCell.appendTo(t.d.$paddingMiddleRow);
            t.d.$paddingBottomCell.appendTo(t.d.$paddingBottomRow);
            t.d.$paddingTopInput.appendTo(t.d.$paddingTopCell).val(12).pbmInput().after('px');
            t.d.$paddingLeftInput.appendTo(t.d.$paddingLeftCell).val(2).pbmInput().after('px');
            t.d.$paddingBottomInput.appendTo(t.d.$paddingBottomCell).val(12).pbmInput().after('px');
            t.d.$paddingRightInput.appendTo(t.d.$paddingRightCell).val(2).pbmInput().after('px');

            t.d.$backgroundText.appendTo(t.d.$paddingMiddleCell).html($A.translate('back-<br/>color'));
            t.d.$backgroundColorInput.appendTo(t.d.$paddingMiddleCell);

            t.d.$marginTopInput
                .add(t.d.$marginLeftInput)
                .add(t.d.$marginBottomInput)
                .add(t.d.$marginRightInput)
                .add(t.d.$borderTopWidthInput)
                .add(t.d.$borderLeftWidthInput)
                .add(t.d.$borderBottomWidthInput)
                .add(t.d.$borderRightWidthInput)
                .val(0);

            t.d.$marginTopInput
                .add(t.d.$marginLeftInput)
                .add(t.d.$marginBottomInput)
                .add(t.d.$marginRightInput)
                .add(t.d.$paddingTopInput)
                .add(t.d.$paddingLeftInput)
                .add(t.d.$paddingBottomInput)
                .add(t.d.$paddingRightInput)
                .add(t.d.$borderTopWidthInput)
                .add(t.d.$borderLeftWidthInput)
                .add(t.d.$borderBottomWidthInput)
                .add(t.d.$borderRightWidthInput)
                .add(t.d.$borderTopColorInput)
                .add(t.d.$borderLeftColorInput)
                .add(t.d.$borderBottomColorInput)
                .add(t.d.$borderRightColorInput)
                .add(t.d.$backgroundColorInput)
                .change(function(){
                    t.change.apply(t, [])
                });

            t.d.$borderTopColorInput
                .add(t.d.$borderLeftColorInput)
                .add(t.d.$borderBottomColorInput)
                .add(t.d.$borderRightColorInput)
                .add(t.d.$backgroundColorInput)
                .colpick({
                    colorScheme:'dark',
                    layout:'rgbhex',
                    color:'b8b8b8',
                    onSubmit:function(hsb,hex,rgb,el) {
                        $(el).css({
                            backgroundColor:'#'+hex,
                            color:'#'+hex
                        }).val('#'+hex).trigger('change').colpickHide();
                    }
                });


            if (typeof obj !== 'undefined') {
                if (typeof obj.margin !== 'undefined')
                    t.margin(obj.margin);
                if (typeof obj.marginTop !== 'undefined')
                    t.marginTop(obj.marginTop);
                if (typeof obj.marginRight !== 'undefined')
                    t.marginRight(obj.marginRight);
                if (typeof obj.marginBottom !== 'undefined')
                    t.marginBottom(obj.marginBottom);
                if (typeof obj.marginLeft !== 'undefined')
                    t.marginLeft(obj.marginLeft);
                if (typeof obj.border !== 'undefined')
                    t.border(obj.border);
                if (typeof obj.borderTopWidth !== 'undefined')
                    t.borderTopWidth(obj.borderTopWidth);
                if (typeof obj.borderTopColor !== 'undefined')
                    t.borderTopColor(obj.borderTopColor);
                if (typeof obj.borderRightWidth !== 'undefined')
                    t.borderRightWidth(obj.borderRightWidth);
                if (typeof obj.borderRightColor !== 'undefined')
                    t.borderRightColor(obj.borderRightColor);
                if (typeof obj.borderBottomWidth !== 'undefined')
                    t.borderBottomWidth(obj.borderBottomWidth);
                if (typeof obj.borderBottomColor !== 'undefined')
                    t.borderBottomColor(obj.borderBottomColor);
                if (typeof obj.borderLeftWidth !== 'undefined')
                    t.borderLeftWidth(obj.borderLeftWidth);
                if (typeof obj.borderLeftColor !== 'undefined')
                    t.borderLeftColor(obj.borderLeftColor);
                if (typeof obj.padding !== 'undefined')
                    t.padding(obj.padding);
                if (typeof obj.paddingTop !== 'undefined')
                    t.paddingTop(obj.paddingTop);
                if (typeof obj.paddingRight !== 'undefined')
                    t.paddingRight(obj.paddingRight);
                if (typeof obj.paddingBottom !== 'undefined')
                    t.paddingBottom(obj.paddingBottom);
                if (typeof obj.paddingLeft !== 'undefined')
                    t.paddingLeft(obj.paddingLeft);
                t.initParameter(obj);
            }
        };

        var p = BackgroundPaddingBorderMargin.prototype;

        p.margin = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return {
                    top: t.marginTop(),
                    right: t.marginRight(),
                    bottom: t.marginBottom(),
                    left: t.marginLeft()
                }
            }else{
                if($.isArray(value)){
                    t.marginTop(value[0]);
                    t.marginRight(value[1]);
                    t.marginBottom(value[2]);
                    t.marginLeft(value[3]);
                }else{
                    t.marginTop(value.top);
                    t.marginRight(value.right);
                    t.marginBottom(value.bottom);
                    t.marginLeft(value.left);
                }
            }
            return t;
        };
        p.marginTop = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$marginTopInput.val());
            }
            t.d.$marginTopInput.val(parseInt(value));
            return t;
        };
        p.marginRight = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$marginRightInput.val());
            }
            t.d.$marginRightInput.val(parseInt(value));
            return t;
        };
        p.marginBottom = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$marginBottomInput.val());
            }
            t.d.$marginBottomInput.val(parseInt(value));
            return t;
        };
        p.marginLeft = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$marginLeftInput.val());
            }
            t.d.$marginLeftInput.val(parseInt(value));
            return t;
        };

        p.padding = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return {
                    top: t.paddingTop(),
                    right: t.paddingRight(),
                    bottom: t.paddingBottom(),
                    left: t.paddingLeft()
                }
            }else{
                if($.isArray(value)){
                    t.paddingTop(value[0]);
                    t.paddingRight(value[1]);
                    t.paddingBottom(value[2]);
                    t.paddingLeft(value[3]);
                }else{
                    t.paddingTop(value.top);
                    t.paddingRight(value.right);
                    t.paddingBottom(value.bottom);
                    t.paddingLeft(value.left);
                }
            }
            return t;
        };
        p.paddingTop = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$paddingTopInput.val());
            }
            t.d.$paddingTopInput.val(parseInt(value));
            return t;
        };
        p.paddingRight = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$paddingRightInput.val());
            }
            t.d.$paddingRightInput.val(parseInt(value));
            return t;
        };
        p.paddingBottom = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$paddingBottomInput.val());
            }
            t.d.$paddingBottomInput.val(parseInt(value));
            return t;
        };
        p.paddingLeft = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$paddingLeftInput.val());
            }
            t.d.$paddingLeftInput.val(parseInt(value));
            return t;
        };

        p.border = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return {
                    top: t.borderTopWidth(),
                    right: t.borderRightWidth(),
                    bottom: t.borderBottomWidth(),
                    left: t.borderLeftWidth()
                }
            }else{
                if($.isArray(value)){
                    if(value.length === 4) {
                        t.borderTopWidth(value[0]);
                        t.borderRightWidth(value[1]);
                        t.borderBottomWidth(value[2]);
                        t.borderLeftWidth(value[3]);
                    }else{
                        t.borderTopWidth(value[0]);
                        t.borderTopColor(value[1]);
                        t.borderRightWidth(value[2]);
                        t.borderRightColor(value[3]);
                        t.borderBottomWidth(value[4]);
                        t.borderBottomColor(value[5]);
                        t.borderLeftWidth(value[6]);
                        t.borderLeftColor(value[7]);
                    }
                }else{
                    t.borderTopWidth(value.topWidth);
                    t.borderRightWidth(value.rightWidth);
                    t.borderBottomWidth(value.bottomWidth);
                    t.borderLeftWidth(value.leftWidth);
                    t.borderTopColor(value.topColor);
                    t.borderRightColor(value.rightColor);
                    t.borderBottomColor(value.bottomColor);
                    t.borderLeftColor(value.leftColor);
                }
            }
            return t;
        };
        p.borderTopWidth = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$borderTopWidthInput.val());
            }
            t.d.$borderTopWidthInput.val(parseInt(value));
            return t;
        };
        p.borderRightWidth = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$borderRightWidthInput.val());
            }
            t.d.$borderRightWidthInput.val(parseInt(value));
            return t;
        };
        p.borderBottomWidth = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$borderBottomWidthInput.val());
            }
            t.d.$borderBottomWidthInput.val(parseInt(value));
            return t;
        };
        p.borderLeftWidth = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return parseInt(t.d.$borderLeftWidthInput.val());
            }
            t.d.$borderLeftWidthInput.val(parseInt(value));
            return t;
        };
        p.borderTopColor = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                if(t.borderTopWidth() <= 0){
                    return 'transparent';
                }
                return $AEE.rgbStyleToHex(t.d.$borderTopColorInput.val());
            }
            t.d.$borderTopColorInput.css({
                backgroundColor:value,
                color:value
            }).val(value).colpickSetColor(value);
            return t;
        };
        p.borderRightColor = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                if(t.borderRightWidth() <= 0){
                    return 'transparent';
                }
                return $AEE.rgbStyleToHex(t.d.$borderRightColorInput.val());
            }
            t.d.$borderRightColorInput.css({
                backgroundColor:value,
                color:value
            }).val(value).colpickSetColor(value);
            return t;
        };
        p.borderBottomColor = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                if(t.borderBottomWidth() <= 0){
                    return 'transparent';
                }
                return $AEE.rgbStyleToHex(t.d.$borderBottomColorInput.val());
            }
            t.d.$borderBottomColorInput.css({
                backgroundColor:value,
                color:value
            }).val(value).colpickSetColor(value);
            return t;
        };
        p.borderLeftColor = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                if(t.borderLeftWidth() <= 0){
                    return 'transparent';
                }
                return $AEE.rgbStyleToHex(t.d.$borderLeftColorInput.val());
            }
            t.d.$borderLeftColorInput.css({
                backgroundColor:value,
                color:value
            }).val(value).colpickSetColor(value);
            return t;
        };
        p.borderTopStyle = function(){
            var t = this;
            if(t.borderTopWidth() <= 0){
                return 'none';
            }
            return 'solid';
        };
        p.borderRightStyle = function(){
            var t = this;
            if(t.borderRightWidth() <= 0){
                return 'none';
            }
            return 'solid';
        };
        p.borderBottomStyle = function(){
            var t = this;
            if(t.borderBottomWidth() <= 0){
                return 'none';
            }
            return 'solid';
        };
        p.borderLeftStyle = function(){
            var t = this;
            if(t.borderLeftWidth() <= 0){
                return 'none';
            }
            return 'solid';
        };
        p.backgroundColor = function(value){
            var t = this;
            if(typeof value === 'undefined'){
                return t.d.$backgroundColorInput.val();
            }
            if(value === false || value === ''){
                t.d.$backgroundColorInput.css({
                    backgroundColor:'#ffffff',
                    color:'#ffffff'
                }).val('').colpickSetColor('#ffffff');
                return t;
            }
            t.d.$backgroundColorInput.css({
                backgroundColor:value,
                color:value
            }).val(value).colpickSetColor(value);
            return t;
        };

        p.change = function(func){
            var t = this;
            if(typeof func === 'function'){
                t.d.change = func;
                return t;
            }
            t.d.change.apply(t, []);
            return t;
        };
        p.disableMargin = function(){
            var t = this;
            t.d.$marginTopCover.show();
            t.d.$marginRightCover.show();
            t.d.$marginBottomCover.show();
            t.d.$marginLeftCover.show();
            return t;
        };
        p.enableMargin = function(){
            var t = this;
            t.d.$marginTopCover.hide();
            t.d.$marginRightCover.hide();
            t.d.$marginBottomCover.hide();
            t.d.$marginLeftCover.hide();
            return t;
        };

        $A.initBasicFunctions(BackgroundPaddingBorderMargin, "bpbm");
    });
});