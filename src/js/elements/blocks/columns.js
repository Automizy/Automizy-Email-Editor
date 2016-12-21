define([
    "js/functions/core/ready",
    "js/functions/core/layoutReady",
    "js/modules/imagePicker"
], function () {
    $AEE.ready(function(){

        $AEE.blocks.push({
            icon:'columns.gif',
            name:'columns',
            category:'content',
            title:$A.translate('Columns'),
            drop:function($block, $contentCell, $topCell, $rightCell, $bottomCell, $leftCell) {

                var $column1 = $('<div class="aee-columns-block-column aee-columns-block-column-1 aee-block-drop-zone aee-active" style="width:50%; display:block; float:left; margin:0; padding:0; border:none"></div>').appendTo($contentCell);
                var $column2 = $('<div class="aee-columns-block-column aee-columns-block-column-2 aee-block-drop-zone aee-active" style="width:50%; display:block; float:left; margin:0; padding:0; border:none"></div>').appendTo($contentCell);
                var $column3 = $('<div class="aee-columns-block-column aee-columns-block-column-3 aee-block-drop-zone" style="display:none; float:left; margin:0; padding:0; border:none"></div>').appendTo($contentCell);
                var $column4 = $('<div class="aee-columns-block-column aee-columns-block-column-4 aee-block-drop-zone" style="display:none; float:left; margin:0; padding:0; border:none"></div>').appendTo($contentCell);

                $block.addClass('aee-columns-block-item').attr({
                    'data-column-1':true,
                    'data-column-2':true,
                    'data-column-3':false,
                    'data-column-4':false,
                    'data-floatable':false
                });
                $AEE.inputs.blockSettingsColumns1.check();
                $AEE.inputs.blockSettingsColumns2.check();
                $AEE.inputs.blockSettingsColumns3.uncheck();
                $AEE.inputs.blockSettingsColumns4.uncheck();
                $AEE.inputs.blockSettingsColumnsFloatable.uncheck();

                $AEE.elements.$document.add('.aee-block-drop-zone').sortable($AEE.settings.sortable);
            }
        });

    });

    $AEE.layoutReady(function(){

        var width1 = 0;
        var width2 = 0;
        var width3 = 0;
        var width4 = 0;

        $AEE.rebuildColumns = function($block){
            var $block = $block || $AEE.elements.$activeBlock;
            var $contentCell = $block.find('.aee-block-content-cell:first');
            var $columns = $block.find('.aee-columns-block-column:first').siblings().andSelf();

            var checked = $AEE.inputs.blockSettingsColumns1.checked();
            $AEE.elements.$activeBlock.attr('data-column-1', checked);
            $columns.filter('.aee-columns-block-column-1').toggleClass('aee-active', checked)[0].style.display = checked?'block':'none';
            if(checked){
                $AEE.inputs.blockSettingsColumns1Width.show();
                $AEE.inputs.blockSettingsColumns1MinWidth.show();
            }else{
                $AEE.inputs.blockSettingsColumns1Width.hide();
                $AEE.inputs.blockSettingsColumns1MinWidth.hide();
            }

            var checked = $AEE.inputs.blockSettingsColumns2.checked();
            $AEE.elements.$activeBlock.attr('data-column-2', checked);
            $columns.filter('.aee-columns-block-column-2').toggleClass('aee-active', checked)[0].style.display = checked?'block':'none';
            if(checked){
                $AEE.inputs.blockSettingsColumns2Width.show();
                $AEE.inputs.blockSettingsColumns2MinWidth.show();
            }else{
                $AEE.inputs.blockSettingsColumns2Width.hide();
                $AEE.inputs.blockSettingsColumns2MinWidth.hide();
            }

            var checked = $AEE.inputs.blockSettingsColumns3.checked();
            $AEE.elements.$activeBlock.attr('data-column-3', checked);
            $columns.filter('.aee-columns-block-column-3').toggleClass('aee-active', checked)[0].style.display = checked?'block':'none';
            if(checked){
                $AEE.inputs.blockSettingsColumns3Width.show();
                $AEE.inputs.blockSettingsColumns3MinWidth.show();
            }else{
                $AEE.inputs.blockSettingsColumns3Width.hide();
                $AEE.inputs.blockSettingsColumns3MinWidth.hide();
            }

            var checked = $AEE.inputs.blockSettingsColumns4.checked();
            $AEE.elements.$activeBlock.attr('data-column-4', checked);
            $columns.filter('.aee-columns-block-column-4').toggleClass('aee-active', checked)[0].style.display = checked?'block':'none';
            if(checked){
                $AEE.inputs.blockSettingsColumns4Width.show();
                $AEE.inputs.blockSettingsColumns4MinWidth.show();
            }else{
                $AEE.inputs.blockSettingsColumns4Width.hide();
                $AEE.inputs.blockSettingsColumns4MinWidth.hide();
            }

            var $activeColumns = $columns.filter('.aee-active');
            var activeColumnsCount = $activeColumns.length;
            var minWidth = 250;
            if(activeColumnsCount === 2){
                minWidth = 250;
            }else if(activeColumnsCount === 3){
                minWidth = 200;
            }else if(activeColumnsCount === 4){
                minWidth = 150;
            }
            var $inactiveColumns = $columns.filter(':not(.aee-active)');
            var percent = 100 / activeColumnsCount;
            $activeColumns.each(function(){
                var $t = $(this);
                $t[0].style.width = percent+'%';
                $t.attr('data-width-in-percent', percent);
                $t.attr('data-min-width', minWidth);
            });

            $block.removeClass('automizy-column-1 automizy-column-2 automizy-column-3 automizy-column-4').addClass('automizy-column-'+activeColumnsCount);

            $AEE.inputs.blockSettingsColumns1Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns2Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns3Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns4Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns1MinWidth.val(Math.round(minWidth));
            $AEE.inputs.blockSettingsColumns2MinWidth.val(Math.round(minWidth));
            $AEE.inputs.blockSettingsColumns3MinWidth.val(Math.round(minWidth));
            $AEE.inputs.blockSettingsColumns4MinWidth.val(Math.round(minWidth));

        };


        $AEE.elements.$document.on('click', '.aee-gallery-block-item .aee-gallery-block-button, .aee-gallery-block-item .aee-gallery-block-image', function(){

        }).on('click', '.aee-gallery-block-item .aee-imagepicker-image', function(){

        });


        $AEE.recalculateColumnsWidth = function(columnId){
            var $currentColumn = $AEE.elements.$activeBlock.find('.aee-columns-block-column-'+columnId+':first');
            var currentInput = $AEE.inputs['blockSettingsColumns'+columnId+'Width'];
            var currentInputMinWidth = $AEE.inputs['blockSettingsColumns'+columnId+'MinWidth'];
            var newWidth = parseInt(currentInput.val());
            var oldWidth = parseFloat($currentColumn.attr('data-width-in-percent') || $currentColumn[0].style.width);
            var newMinWidth = parseInt(currentInputMinWidth.val());
            var oldMinWidth = parseFloat($currentColumn.attr('data-min-width') || 0);
            var $columns = $AEE.elements.$activeBlock.find('.aee-columns-block-column:first').siblings().andSelf();

            if(newWidth === 0 || isNaN(newWidth)) {
                $currentColumn.removeAttr('data-min-width');
            }else{
                $currentColumn.attr('data-min-width', newMinWidth);
            }

            var $column1 = $columns.filter('.aee-columns-block-column-1:first');
            var $column2 = $columns.filter('.aee-columns-block-column-2:first');
            var $column3 = $columns.filter('.aee-columns-block-column-3:first');
            var $column4 = $columns.filter('.aee-columns-block-column-4:first');

            var columns = [
                {
                    $elem:$column1,
                    active:$column1.hasClass('aee-active'),
                    width:parseFloat($column1.attr('data-width-in-percent') || $column1[0].style.width),
                    minWidth:parseFloat($column1.attr('data-min-width') || 0),
                    input:$AEE.inputs['blockSettingsColumns1Width'],
                    current:(columnId === 1)
                },
                {
                    $elem:$column2,
                    active:$column2.hasClass('aee-active'),
                    width:parseFloat($column2.attr('data-width-in-percent') || $column2[0].style.width),
                    minWidth:parseFloat($column2.attr('data-min-width') || 0),
                    input:$AEE.inputs['blockSettingsColumns2Width'],
                    current:(columnId === 2)
                },
                {
                    $elem:$column3,
                    active:$column3.hasClass('aee-active'),
                    width:parseFloat($column3.attr('data-width-in-percent') || $column3[0].style.width),
                    minWidth:parseFloat($column3.attr('data-min-width') || 0),
                    input:$AEE.inputs['blockSettingsColumns3Width'],
                    current:(columnId === 3)
                },
                {
                    $elem:$column4,
                    active:$column4.hasClass('aee-active'),
                    width:parseFloat($column4.attr('data-width-in-percent') || $column4[0].style.width),
                    minWidth:parseFloat($column4.attr('data-min-width') || 0),
                    input:$AEE.inputs['blockSettingsColumns4Width'],
                    current:(columnId === 4)
                }
            ];

            var activeColumnsCount = 0;
            var fullWidth = 0;
            for(var i = 0; i < columns.length; i++){
                if(columns[i].active){
                    activeColumnsCount++;
                    if(columns[i].current){
                        fullWidth += newWidth
                    }else{
                        fullWidth += columns[i].width
                    }
                }
            }
            var maxWidth = 101 - (activeColumnsCount * 1);

            if(newWidth < 1){
                newWidth = 1;
            }
            if(newWidth > maxWidth){
                newWidth = maxWidth;
            }

            var different = fullWidth - 100;
            var newFullWidth = 0;
            var elementWidth = 0;
            var currentElementRealWidth = newWidth;
            var activeElementFullWidth = 0;

            for(var i = 0; i < columns.length; i++){
                if(columns[i].active){
                    if(columns[i].current){
                        currentInput.val(parseInt(newWidth));
                        newFullWidth += newWidth;
                    }else{
                        var difUnit = different / (activeColumnsCount - 1);
                        elementWidth = columns[i].width - difUnit;
                        if(elementWidth < 1){
                            elementWidth = 1;
                        }
                        if(elementWidth > maxWidth){
                            elementWidth = maxWidth;
                        }
                        newFullWidth += elementWidth;
                        activeElementFullWidth += elementWidth;
                        columns[i].$elem.attr('data-width-in-percent', elementWidth);
                        columns[i].$elem[0].style.width = columns[i].width+'%';
                        $AEE.inputs['blockSettingsColumns'+(i+1)+'Width'].val(parseInt(columns[i].width));
                    }
                }
            }
            for(var i = 0; i < columns.length; i++){
                if(columns[i].current){
                    currentElementRealWidth = 100 - activeElementFullWidth;
                    columns[i].$elem.attr('data-width-in-percent', currentElementRealWidth);
                    columns[i].$elem[0].style.width = currentElementRealWidth+'%';
                }
            }
            if(parseFloat(newFullWidth.toFixed(5)) > 100){
                $AEE.recalculateColumnsWidth(columnId);
            }else{
                (function(columns, columnId, newFullWidth){setTimeout(function(){
                    var count = 0;
                    for(var i = 0; i < columns.length; i++){
                        if(columns[i].active){
                            count += parseInt(columns[i].input.val());
                        }
                    }
                    if(count > 100){
                        return $AEE.recalculateColumnsWidth(columnId);
                    }
                }, 10)})(columns, columnId);
            }
        };


        $AEE.elements.$blockSettingsColumnBox = $('<div id="aee-block-settings-columns-box" class="aee-block-settings-box"></div>').appendTo($AEE.elements.$blockSettingsContent);
        $AEE.inputs.blockSettingsColumns1 = $A.newInput({
            type:'checkbox',
            labelWidth:'150px',
            label:$A.translate('First column'),
            newRow:false,
            checked:true,
            change:function(){
                $AEE.rebuildColumns();
            }
        });
        $AEE.inputs.blockSettingsColumns1.input().attr('tabindex', -1);
        $AEE.inputs.blockSettingsColumns1Width = $A.newInput({
            type:'number',
            width:'50px',
            label:$A.translate('width:'),
            labelWidth:'100px',
            labelAfter:'%',
            value:'50',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(1);
            }
        });
        $AEE.inputs.blockSettingsColumns1MinWidth = $A.newInput({
            type:'number',
            width:'50px',
            label:$A.translate('min width:'),
            labelWidth:'100px',
            labelAfter:'px',
            value:'200',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(1);
            }
        });
        $AEE.inputs.blockSettingsColumns2 = $A.newInput({
            type:'checkbox',
            labelWidth:'150px',
            label:$A.translate('Second column'),
            checked:true,
            change:function(){
                $AEE.rebuildColumns();
            }
        });
        $AEE.inputs.blockSettingsColumns2.input().attr('tabindex', -1);
        $AEE.inputs.blockSettingsColumns2Width = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'%',
            label:$A.translate('width:'),
            labelWidth:'100px',
            value:'50',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(2);
            }
        });
        $AEE.inputs.blockSettingsColumns2MinWidth = $A.newInput({
            type:'number',
            width:'50px',
            label:$A.translate('min width:'),
            labelWidth:'100px',
            labelAfter:'px',
            value:'200',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(2);
            }
        });
        $AEE.inputs.blockSettingsColumns3 = $A.newInput({
            type:'checkbox',
            labelWidth:'150px',
            label:$A.translate('Third column'),
            checked:false,
            change:function(){
                $AEE.rebuildColumns();
            }
        });
        $AEE.inputs.blockSettingsColumns3.input().attr('tabindex', -1);
        $AEE.inputs.blockSettingsColumns3Width = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'%',
            label:$A.translate('width:'),
            labelWidth:'100px',
            value:'50',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(3);
            }
        });
        $AEE.inputs.blockSettingsColumns3MinWidth = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'px',
            label:$A.translate('min width:'),
            labelWidth:'100px',
            value:'200',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(3);
            }
        });
        $AEE.inputs.blockSettingsColumns4 = $A.newInput({
            type:'checkbox',
            labelWidth:'150px',
            label:$A.translate('Fourth column'),
            checked:false,
            change:function(){
                $AEE.rebuildColumns();
            }
        });
        $AEE.inputs.blockSettingsColumns4.input().attr('tabindex', -1);
        $AEE.inputs.blockSettingsColumns4Width = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'%',
            label:$A.translate('width:'),
            labelWidth:'100px',
            value:'50',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(4);
            }
        });
        $AEE.inputs.blockSettingsColumns4MinWidth = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'px',
            label:$A.translate('min width:'),
            labelWidth:'100px',
            value:'200',
            create:function(){
                this.input().pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(4);
            }
        });

        $AEE.inputs.blockSettingsColumnsFloatable = $A.newInput({
            type:'checkbox',
            labelWidth:'150px',
            label:$A.translate('Floatable'),
            checked:false,
            change:function(){
                var $block = $block || $AEE.elements.$activeBlock;
                $block.attr('data-floatable', this.checked());
            }
        });

        $AEE.forms.blockSettingsColumns = $A.newForm().addInputs([
            $AEE.inputs.blockSettingsColumns1,
            $AEE.inputs.blockSettingsColumns1Width,
            $AEE.inputs.blockSettingsColumns1MinWidth
        ]).addHtml('<br/>').addInputs([
            $AEE.inputs.blockSettingsColumns2,
            $AEE.inputs.blockSettingsColumns2Width,
            $AEE.inputs.blockSettingsColumns2MinWidth
        ]).addHtml('<br/>').addInputs([
            $AEE.inputs.blockSettingsColumns3,
            $AEE.inputs.blockSettingsColumns3Width,
            $AEE.inputs.blockSettingsColumns3MinWidth
        ]).addHtml('<br/>').addInputs([
            $AEE.inputs.blockSettingsColumns4,
            $AEE.inputs.blockSettingsColumns4Width,
            $AEE.inputs.blockSettingsColumns4MinWidth
        ]).addHtml('<br/>').addInputs([
            $AEE.inputs.blockSettingsColumnsFloatable
        ]).drawTo($AEE.elements.$blockSettingsColumnBox);

    });
});