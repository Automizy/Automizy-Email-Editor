define([
    "core",

    "js/elements/blocks/image",
    "js/elements/blocks/text",
    "js/elements/blocks/title",
    "js/elements/blocks/button",
    "js/elements/blocks/html",
    "js/elements/blocks/share",
    "js/elements/blocks/gallery",
    "js/elements/blocks/columns",

    "js/functions/newBlock",
    "js/settings/draggable"
], function () {

    $AEE.dragging = false;

    $AEE.buildBlockListSetDisplay = function(){
        $AEE.settingsShowed = true;
        if($AEE.screenSize()['x'] < 800) {
            $AEE.settingsShowed = false;
            $AEE.blocksShowed = false;
        }
        $AEE.setLayoutByDisplay();
    };
    $AEE.buildBlockListDoBlock = function($block, blockSettings){
        blockSettings.drop.apply($AEE, [$block, $block.data('$contentCell'), $block.data('$topCell'), $block.data('$rightCell'), $block.data('$leftCell'), $block.data('$bottomCell')]);

        setTimeout(function () {
            $block.data('automizy-dropped', true);
            $AEE.setBlockSettings($block);
            $AEE.inputs.bpbm.change();
        }, 20)
    };

    $AEE.buildBlockList = function(){
        var blocksInSort = [
            'image',
            'text',
            'title',
            'columns',
            'share',
            'button',
            'gallery',
            'html'
        ];
        $AEE.blocksInSort = [];

        for(var i = 0; i < blocksInSort.length; i++){
            for(var j = 0; j < $AEE.blocks.length; j++){
                if(blocksInSort[i] === $AEE.blocks[j].name){
                    $AEE.blocksInSort.push($AEE.blocks[j]);
                    break;
                }
            }
        }

        $AEE.block = {};
        for(var i = 0; i < $AEE.blocksInSort.length; i++){
            var block = $AEE.blocksInSort[i];
            block.$widget = $('<div class="aee-block-item"></div>').attr('data-title', block.title).attr('data-name', block.name).appendTo($AEE.elements.$blockList).css({
                backgroundImage:'url(' + $AEE.d.config.dir + '/images/blocks/frame.gif)',
                cursor:'url(' + $AEE.d.config.dir + '/images/cursors/openhand.cur), move'
            }).data('block', block);
            block.$content = $('<div class="aee-block-item-content"></div>').appendTo(block.$widget).css({
                backgroundImage:'url(' + $AEE.d.config.dir + '/images/blocks/' + block.icon + ')'
            });
            $AEE.block[block.name] = block;
        }

        $AEE.blocksShowed = true;


        $AEE.elements.$blockList.find('.aee-block-item').click(function(){
            if(!$AEE.touchable() || $AEE.dragging){
                return false;
            }
            var $block = $AEE.newBlock();
            $block.appendTo($AEE.elements.$document);
            var blockSettings = $(this).data('block');
            $AEE.buildBlockListSetDisplay();
            $AEE.buildBlockListDoBlock($block, blockSettings);
        }).draggable($AEE.settings.draggable);

    };

});