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
            checked?$AEE.inputs.blockSettingsColumns1Width.show():$AEE.inputs.blockSettingsColumns1Width.hide();

            var checked = $AEE.inputs.blockSettingsColumns2.checked();
            $AEE.elements.$activeBlock.attr('data-column-2', checked);
            $columns.filter('.aee-columns-block-column-2').toggleClass('aee-active', checked)[0].style.display = checked?'block':'none';
            checked?$AEE.inputs.blockSettingsColumns2Width.show():$AEE.inputs.blockSettingsColumns2Width.hide();

            var checked = $AEE.inputs.blockSettingsColumns3.checked();
            $AEE.elements.$activeBlock.attr('data-column-3', checked);
            $columns.filter('.aee-columns-block-column-3').toggleClass('aee-active', checked)[0].style.display = checked?'block':'none';
            checked?$AEE.inputs.blockSettingsColumns3Width.show():$AEE.inputs.blockSettingsColumns3Width.hide();

            var checked = $AEE.inputs.blockSettingsColumns4.checked();
            $AEE.elements.$activeBlock.attr('data-column-4', checked);
            $columns.filter('.aee-columns-block-column-4').toggleClass('aee-active', checked)[0].style.display = checked?'block':'none';
            checked?$AEE.inputs.blockSettingsColumns4Width.show():$AEE.inputs.blockSettingsColumns4Width.hide();

            var $activeColumns = $columns.filter('.aee-active');
            var activeColumnsCount = $activeColumns.length;
            var $inactiveColumns = $columns.filter(':not(.aee-active)');
            var percent = 100 / activeColumnsCount;
            $activeColumns.each(function(){
                var $t = $(this);
                $t[0].style.width = percent+'%';
                $t.attr('data-width-in-percent', percent);
            });

            $block.removeClass('automizy-column-1 automizy-column-2 automizy-column-3 automizy-column-4').addClass('automizy-column-'+activeColumnsCount);

            $AEE.inputs.blockSettingsColumns1Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns2Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns3Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns4Width.val(Math.round(percent));

        };


        $AEE.elements.$document.on('click', '.aee-gallery-block-item .aee-gallery-block-button, .aee-gallery-block-item .aee-gallery-block-image', function(){

        }).on('click', '.aee-gallery-block-item .aee-imagepicker-image', function(){

        });


        $AEE.recalculateColumnsWidth = function(columnId){
            console.log('recalculate column');
            var $currentColumn = $AEE.elements.$activeBlock.find('.aee-columns-block-column-'+columnId+':first');
            var currentInput = $AEE.inputs['blockSettingsColumns'+columnId+'Width'];
            var newWidth = parseInt(currentInput.val());
            var oldWidth = parseFloat($currentColumn.attr('data-width-in-percent') || $currentColumn[0].style.width);

            var $column1 = $AEE.elements.$activeBlock.find('.aee-columns-block-column-1:first');
            var $column2 = $AEE.elements.$activeBlock.find('.aee-columns-block-column-2:first');
            var $column3 = $AEE.elements.$activeBlock.find('.aee-columns-block-column-3:first');
            var $column4 = $AEE.elements.$activeBlock.find('.aee-columns-block-column-4:first');

            var columns = [
                {
                    $elem:$column1,
                    active:$column1.hasClass('aee-active'),
                    width:parseFloat($column1.attr('data-width-in-percent') || $column1[0].style.width),
                    input:$AEE.inputs['blockSettingsColumns1Width'],
                    current:(columnId === 1)
                },
                {
                    $elem:$column2,
                    active:$column2.hasClass('aee-active'),
                    width:parseFloat($column2.attr('data-width-in-percent') || $column2[0].style.width),
                    input:$AEE.inputs['blockSettingsColumns2Width'],
                    current:(columnId === 2)
                },
                {
                    $elem:$column3,
                    active:$column3.hasClass('aee-active'),
                    width:parseFloat($column3.attr('data-width-in-percent') || $column3[0].style.width),
                    input:$AEE.inputs['blockSettingsColumns3Width'],
                    current:(columnId === 3)
                },
                {
                    $elem:$column4,
                    active:$column4.hasClass('aee-active'),
                    width:parseFloat($column4.attr('data-width-in-percent') || $column4[0].style.width),
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
            var maxWidth = 110 - (activeColumnsCount * 10);

            if(newWidth < 10){
                newWidth = 10;
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
                        if(elementWidth < 10){
                            elementWidth = 10;
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
            labelAfter:'%',
            newRow:false,
            value:'50',
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
            newRow:false,
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
            newRow:false,
            value:'50',
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
            newRow:false,
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
            newRow:false,
            value:'50',
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
            newRow:false,
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
            newRow:false,
            value:'50',
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
            newRow:false,
            checked:false,
            change:function(){
                var $block = $block || $AEE.elements.$activeBlock;
                $block.attr('data-floatable', this.checked());
            }
        });

        $AEE.forms.blockSettingsColumns = $A.newForm().addInputs([
            $AEE.inputs.blockSettingsColumns1,
            $AEE.inputs.blockSettingsColumns1Width
        ]).addHtml('<br/>').addInputs([
            $AEE.inputs.blockSettingsColumns2,
            $AEE.inputs.blockSettingsColumns2Width
        ]).addHtml('<br/>').addInputs([
            $AEE.inputs.blockSettingsColumns3,
            $AEE.inputs.blockSettingsColumns3Width
        ]).addHtml('<br/>').addInputs([
            $AEE.inputs.blockSettingsColumns4,
            $AEE.inputs.blockSettingsColumns4Width
        ]).addHtml('<br/>').addInputs([
            $AEE.inputs.blockSettingsColumnsFloatable
        ]).drawTo($AEE.elements.$blockSettingsColumnBox);

    });
});