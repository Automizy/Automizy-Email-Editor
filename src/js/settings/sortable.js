define([
    "js/functions/core/ready"
], function () {
    $AEE.ready(function(){
        $AEE.settings.sortable = {
            handle: '.aee-block-handle',
            distance: 5,
            axis: false,
            cursor: "url(" + $AEE.d.config.dir + "/images/cursors/closedhand.cur), move",
            cursorAt: {top: -10},
            forceHelperSize: true,
            forcePlaceholderSize: true,
            opacity: "0.5",
            placeholder: "aee-ui-state-highlight",
            tolerance: "pointer",
            connectWith: "#aee-document, .aee-block-drop-zone",
            start: function (event, ui) {
                $AEE.dragging = true;
                $AEE.elements.$document.sortable("refreshPositions");
                $AEE.elements.$blockListModal.show();
                console.log('start');
            },
            stop: function (event, ui) {
                $AEE.dragging = false;
                $AEE.elements.$widget.css("cursor", "auto");
                $AEE.elements.$blockListModal.hide();

                if(ui.item.data('automizy-dropped')) {
                    setTimeout(function () {
                        $AEE.setBlockSettings(ui.item);
                    }, 10);
                }

                console.log('stop');
            },
            deactivate: function (event, ui) {
                $AEE.elements.$blockListModal.hide();
                console.log('deactivate');
            },
            over: function (event, ui) {
                console.log('over');
            },
            receive: function (event, ui) {
                console.log('receive');
            },
            activate: function (event, ui) {
                console.log('activate');
            },
            beforeStop: function (event, ui) {
                console.log('beforeStop');
            },
            change: function (event, ui) {
                console.log('change');
            },
            create: function (event, ui) {
                console.log('create');
            },
            out: function (event, ui) {
                console.log('out');
            },
            remove: function (event, ui) {
                console.log('remove');
            },
            sort: function (event, ui) {
                console.log('sort');
            }
        };
    })
});