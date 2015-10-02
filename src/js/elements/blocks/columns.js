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
                    'data-column-4':false
                });
                $AEE.inputs.blockSettingsColumns1.check();
                $AEE.inputs.blockSettingsColumns2.check();
                $AEE.inputs.blockSettingsColumns3.uncheck();
                $AEE.inputs.blockSettingsColumns4.uncheck();

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
            var $inactiveColumns = $columns.filter(':not(.aee-active)');
            var percent = 100 / $activeColumns.length;
            $activeColumns.each(function(){
                var $t = $(this);
                $t[0].style.width = percent+'%';
                $t.attr('data-width-in-percent', percent);
            });

            $AEE.inputs.blockSettingsColumns1Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns2Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns3Width.val(Math.round(percent));
            $AEE.inputs.blockSettingsColumns4Width.val(Math.round(percent));

        };


        $AEE.elements.$document.on('click', '.aee-gallery-block-item .aee-gallery-block-button, .aee-gallery-block-item .aee-gallery-block-image', function(){

        }).on('click', '.aee-gallery-block-item .aee-imagepicker-image', function(){

        });


        $AEE.recalculateColumnsWidth = function(activeColumn){

            var $column1 = $AEE.elements.$activeBlock.find('.aee-columns-block-column-1:first');
            var $column2 = $AEE.elements.$activeBlock.find('.aee-columns-block-column-2:first');
            var $column3 = $AEE.elements.$activeBlock.find('.aee-columns-block-column-3:first');
            var $column4 = $AEE.elements.$activeBlock.find('.aee-columns-block-column-4:first');

            var hasColumn1 = $column1.hasClass('aee-active');
            var hasColumn2 = $column2.hasClass('aee-active');
            var hasColumn3 = $column3.hasClass('aee-active');
            var hasColumn4 = $column4.hasClass('aee-active');

            var activeColumns = 0;
            if(hasColumn1){
                activeColumns++;
            }
            if(hasColumn2){
                activeColumns++;
            }
            if(hasColumn3){
                activeColumns++;
            }
            if(hasColumn4){
                activeColumns++;
            }

            var value = 0;
            var oldValue = 0;

            if(activeColumn === 1){
                value = parseInt($AEE.inputs.blockSettingsColumns1Width.val());
                oldValue = parseFloat($column1.attr('data-width-in-percent') || $column1[0].style.width);
            }else if(activeColumn === 2){
                value = parseInt($AEE.inputs.blockSettingsColumns2Width.val());
                oldValue = parseFloat($column2.attr('data-width-in-percent') || $column2[0].style.width);
            }else if(activeColumn === 3){
                value = parseInt($AEE.inputs.blockSettingsColumns3Width.val());
                oldValue = parseFloat($column3.attr('data-width-in-percent') || $column3[0].style.width);
            }else if(activeColumn === 4){
                value = parseInt($AEE.inputs.blockSettingsColumns4Width.val());
                oldValue = parseFloat($column4.attr('data-width-in-percent') || $column4[0].style.width);
            }

            var valueModPercent = oldValue/value;
            var multiplier = valueModPercent + ((1 - valueModPercent) / activeColumns);

            width1 = parseFloat($column1.attr('data-width-in-percent') || $column1[0].style.width) * multiplier;
            width2 = parseFloat($column2.attr('data-width-in-percent') || $column2[0].style.width) * multiplier;
            width3 = parseFloat($column3.attr('data-width-in-percent') || $column3[0].style.width) * multiplier;
            width4 = parseFloat($column4.attr('data-width-in-percent') || $column4[0].style.width) * multiplier;

            var sum = 0;
            if(hasColumn1){
                sum += width1;
            }
            if(hasColumn2){
                sum += width2;
            }
            if(hasColumn3){
                sum += width3;
            }
            if(hasColumn4){
                sum += width4;
            }

            var percentPlus = (sum - 100) / (activeColumns - 1);

            width1 -= percentPlus;
            width2 -= percentPlus;
            width3 -= percentPlus;
            width4 -= percentPlus;

            if(activeColumn === 1){
                width1 = value;
            }else if(activeColumn === 2){
                width2 = value;
            }else if(activeColumn === 3){
                width3 = value;
            }else if(activeColumn === 4){
                width4 = value;
            }

            if(width1 < 10 || width1 > 90){
                return false;
            }
            if(width2 < 10 || width2 > 90){
                return false;
            }
            if(width3 < 10 || width3 > 90){
                return false;
            }
            if(width4 < 10 || width4 > 90){
                return false;
            }



            if(activeColumn === 1){
                $column1.attr('data-width-in-percent', value);
                $column1[0].style.width = value+'%';
            }else if(activeColumn === 2){
                $column2.attr('data-width-in-percent', value);
                $column2[0].style.width = value+'%';
            }else if(activeColumn === 3){
                $column3.attr('data-width-in-percent', value);
                $column3[0].style.width = value+'%';
            }else if(activeColumn === 4){
                $column4.attr('data-width-in-percent', value);
                $column4[0].style.width = value+'%';
            }

            if(hasColumn1){
                $column1.attr('data-width-in-percent', width1);
                $column1[0].style.width = width1+'%';
            }
            if(hasColumn2){
                $column2.attr('data-width-in-percent', width2);
                $column2[0].style.width = width2+'%';
            }
            if(hasColumn3){
                $column3.attr('data-width-in-percent', width3);
                $column3[0].style.width = width3+'%';
            }
            if(hasColumn4){
                $column4.attr('data-width-in-percent', width4);
                $column4[0].style.width = width4+'%';
            }

            $AEE.inputs.blockSettingsColumns1Width.val(parseInt(width1));
            $AEE.inputs.blockSettingsColumns2Width.val(parseInt(width2));
            $AEE.inputs.blockSettingsColumns3Width.val(parseInt(width3));
            $AEE.inputs.blockSettingsColumns4Width.val(parseInt(width4));

/*
            var val1 = parseInt($AEE.inputs.blockSettingsColumns1Width.val());
            var val2 = parseInt($AEE.inputs.blockSettingsColumns2Width.val());
            var val3 = parseInt($AEE.inputs.blockSettingsColumns3Width.val());
            var val4 = parseInt($AEE.inputs.blockSettingsColumns4Width.val());

            if(!hasColumn1){
                val1 = 0;
            }
            if(!hasColumn2){
                val2 = 0;
            }
            if(!hasColumn3){
                val3 = 0;
            }
            if(!hasColumn4){
                val4 = 0;
            }

            var sumVal = val1 + val2 + val3 + val4;

            console.log(val1, val2, val3, val4);

            if(sumVal > 100){
                if(activeColumn === 1){
                    $AEE.inputs.blockSettingsColumns1Width.val(100 - (val2 + val3 + val4)).change();
                }else if(activeColumn === 2){
                    $AEE.inputs.blockSettingsColumns2Width.val(100 - (val1 + val3 + val4)).change();
                }else if(activeColumn === 3){
                    $AEE.inputs.blockSettingsColumns3Width.val(100 - (val1 + val2 + val4)).change();
                }else if(activeColumn === 4){
                    $AEE.inputs.blockSettingsColumns4Width.val(100 - (val1 + val2 + val3)).change();
                }
            }
*/
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
        $AEE.inputs.blockSettingsColumns1Width = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'%',
            newRow:false,
            value:'50',
            create:function(){
                this.input().attr('min', 10).attr('max', 90).pbmInput();
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
        $AEE.inputs.blockSettingsColumns2Width = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'%',
            newRow:false,
            value:'50',
            create:function(){
                this.input().attr('min', 10).attr('max', 90).pbmInput();
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
        $AEE.inputs.blockSettingsColumns3Width = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'%',
            newRow:false,
            value:'50',
            create:function(){
                this.input().attr('min', 10).attr('max', 90).pbmInput();
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
        $AEE.inputs.blockSettingsColumns4Width = $A.newInput({
            type:'number',
            width:'50px',
            labelAfter:'%',
            newRow:false,
            value:'50',
            create:function(){
                this.input().attr('min', 10).attr('max', 90).pbmInput();
            },
            change:function(){
                $AEE.recalculateColumnsWidth(4);
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
        ]).drawTo($AEE.elements.$blockSettingsColumnBox);

    });
});