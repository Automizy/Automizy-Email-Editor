define([
    "js/functions/core/ready"
], function () {
    $AEE.ready(function(){
        $AEE.settings.draggable = {
            connectToSortable: "#aee-document, .aee-block-drop-zone",
            cursor: "url(" + $AEE.d.config.dir + "/images/cursors/closedhand.cur), move",
            cursorAt: {top: -10},
            helper: "clone",
            opacity: "0.5",
            revert: "invalid",
            scroll:false,
            containment:'document',
            start: function (event, ui) {
                $AEE.dragging = true;
                $AEE.elements.$blockListModal.show();
                $AEE.elements.$document.css({outline: "2px dashed #98be6d"}).sortable("option", "axis", false);
                $("<style class='automizy-draggable-stylesheet'>*{ cursor: url(" + $AEE.d.config.dir + "/images/cursors/closedhand.cur), move !important; }</style>").appendTo('body:first');
                if($AEE.screenSize()['x'] < 800) {
                    $AEE.settingsShowed = false;
                    $AEE.blocksShowed = false;
                    $AEE.setLayoutByDisplay();
                }
                $A.runEvent('AutomizyEmailEditorBlockDragStart', $AEE, [event, ui]);
            },
            stop: function (event, ui) {
                $A.runEvent('AutomizyEmailEditorBlockDragStop', $AEE, [event, ui]);
                $AEE.dragging = false;
                if(tinymce.activeEditor !== null){
                    $(tinymce.activeEditor.targetElm).blur();
                }
                $('.automizy-draggable-stylesheet').remove();
                $AEE.elements.$document.css({outline: "none"}).sortable("option", "axis", "y");
                $AEE.elements.$widget.css("cursor", "auto");
                $AEE.elements.$blockListModal.hide();
                var $target = $(ui.helper[0]);
                if ($target.closest('#aee-document').length < 1) {
                    return true;
                }

                var $block = $AEE.newBlock();
                $AEE.elements.$activeBlock = $block;
                var blockSettings = $(ui.helper.context).data('block');
                $target.replaceWith($block);

                $AEE.buildBlockListSetDisplay();
                $AEE.buildBlockListDoBlock($block, blockSettings);
                $A.runEvent('AutomizyEmailEditorBlockDragComplete', $AEE, [$block, blockSettings]);
            },
            create: function (event, ui) {
                $A.runEvent('AutomizyEmailEditorBlockDragCreate', $AEE, [event, ui]);
            }
        };
    })
});