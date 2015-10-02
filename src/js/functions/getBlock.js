define([
    "core"
], function () {
    $AEE.getBlock = function ($block) {
        if(typeof $block !== 'undefined'){
            var data = {
                aeeBlock:true,
                $topRow:$block.find('tr:eq(0)')
            };
            data.$middleRow = data.$topRow.siblings().eq(0);
            data.$bottomRow = data.$topRow.siblings().eq(1);
            data.$topCell = data.$topRow.find('td:eq(0)');
            data.$leftCell = data.$middleRow.find('td:eq(0)');
            data.$contentCell = data.$leftCell.siblings().eq(0);
            data.$rightCell = data.$leftCell.siblings().eq(1);
            data.$bottomCell = data.$bottomRow.find('td:eq(0)');



            $block.data(data);
            return $block;
        }
        return $AEE.newBlock();
    };
});