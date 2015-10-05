define([
    "core"
], function () {
    $AEE.newBlock = function (o) {

        var onlyContent = false;

        if(typeof o !== 'undefined'){
            onlyContent = o.onlyContent || false;
        }

        var $table = $('<table cellpadding="0" cellspacing="0" border="0" class="aee-block"></table>');
        $table.css({
            width:'100%'
        }).data({
            aeeBlock:true
        });

        if(!onlyContent) {
            var $topRow = $('<tr></tr>').appendTo($table);
            var $topCell = $('<td colspan="3">&nbsp;</td>').appendTo($topRow);
            $topCell.css({
                height: 0 + 'px',
                fontSize: 0 + 'px',
                lineHeight: 0 + 'px',
                padding: 0,
                border: 'none'
            });
            $table.data({
                $topRow: $topRow,
                $topCell: $topCell
            })
        }

        var $middleRow = $('<tr></tr>').appendTo($table);
        var $leftCell = $('<td>&nbsp;</td>').appendTo($middleRow);
        var $contentCell = $('<td class="aee-block-content-cell"></td>').appendTo($middleRow);
        var $rightCell = $('<td>&nbsp;</td>').appendTo($middleRow);
        $rightCell.css({
            width:0 + '%',
            fontSize:0 + 'px',
            lineHeight:0 + 'px',
            padding:0,
            border:'none'
        });
        $contentCell.css({
            padding:'12px 12px 12px 12px',
            border:'0px solid #000000'
        });
        $leftCell.css({
            width:0 + '%',
            fontSize:0 + 'px',
            lineHeight:0 + 'px',
            padding:0,
            border:'none'
        });
        $table.data({
            $middleRow:$middleRow,
            $leftCell:$leftCell,
            $contentCell:$contentCell,
            $rightCell:$rightCell
        });


        if(!onlyContent) {
            var $bottomRow = $('<tr></tr>').appendTo($table);
            var $bottomCell = $('<td colspan="3">&nbsp;</td>').appendTo($bottomRow);
            $bottomCell.css({
                height: 0 + 'px',
                fontSize: 0 + 'px',
                lineHeight: 0 + 'px',
                padding: 0,
                border: 'none'
            });
            $table.data({
                $bottomRow:$bottomRow,
                $bottomCell:$bottomCell
            });
        }

        return $table;
    };
});