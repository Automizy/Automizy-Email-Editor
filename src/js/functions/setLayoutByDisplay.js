define([
    "js/functions/core/layoutReady",
    "js/functions/screenSize"
], function () {
    $AEE.layoutReady(function() {
        var firstStep = true;
        $AEE.setLayoutByDisplay = function () {

            var x = $AEE.screenSize()['x'];
            var y = $AEE.screenSize()['y'];
            var leftBoxSize = 422;
            var blocksIconPosition = -61;
            var rightBoxSize = 398;
            var rightBoxPosition = 0;
            var settingsIconPosition = -61;
            var editorWidth = false;
            var editorPosition = false;
            var animationTime = 500;

            if(firstStep){
                animationTime = 0;
                firstStep = false;
            }

            $AEE.elements.$widget.removeClass('aee-width-lt-1000');
            $AEE.elements.$widget.removeClass('aee-width-lt-1250');
            $AEE.elements.$widget.removeClass('aee-width-lt-1450');




            if ($AEE.settingsShowed) {
                rightBoxSize = 398;
                rightBoxPosition = 0;
                settingsIconPosition = -61;
            } else {
                rightBoxSize = 0;
                rightBoxPosition = -398;
                settingsIconPosition = 0;
            }

            if (x < 1700) {
                leftBoxSize = 281;
            }
            if (x < 1450) {
                if ($AEE.settingsShowed) {
                    rightBoxSize = 342;
                }else{
                    rightBoxSize = 0;
                }
                $AEE.elements.$widget.addClass('aee-width-lt-1450');
            }
            if (x < 1250) {
                $AEE.elements.$widget.addClass('aee-width-lt-1250');
                if ($AEE.settingsShowed) {
                    leftBoxSize = 0;
                    blocksIconPosition = 0;
                    rightBoxSize = 342;
                    rightBoxPosition = 0;
                    settingsIconPosition = -61;
                } else {
                    leftBoxSize = 281;
                    blocksIconPosition = -61;
                    rightBoxSize = 0;
                    rightBoxPosition = -342;
                    settingsIconPosition = 0;
                }
            }
            if(x < 1000){
                $AEE.elements.$widget.addClass('aee-width-lt-1000');
            }
            if (x < 800) {
                editorWidth = x;
                editorPosition = 0;
                if ($AEE.settingsShowed) {
                    leftBoxSize = 0;
                    blocksIconPosition = 0;
                    settingsIconPosition = -61;
                    rightBoxPosition = 0;
                    rightBoxSize = 342;
                }else{
                    rightBoxPosition = -342;
                    settingsIconPosition = 0;
                    rightBoxSize = 0;
                }
                if ($AEE.blocksShowed) {
                    leftBoxSize = 281;
                    blocksIconPosition = -61;
                    settingsIconPosition = 0;
                    rightBoxPosition = -342;
                    rightBoxSize = 0;
                }else{
                    leftBoxSize = 0;
                    blocksIconPosition = 0;
                }
            }











            $AEE.elements.$blockList.stop().animate({
                width: leftBoxSize + 'px',
                maxWidth: leftBoxSize + 'px'
            }, animationTime);
            if(editorWidth === false) {
                $AEE.elements.$editor.stop().animate({
                    left: leftBoxSize + 'px',
                    width: x - leftBoxSize - rightBoxSize + 'px'
                }, animationTime);
            }else{
                $AEE.elements.$editor.stop().animate({
                    left: editorPosition + 'px',
                    width: editorWidth + 'px'
                }, animationTime);
            }
            $AEE.elements.$blockSettings.stop().animate({
                right: rightBoxPosition + 'px',
                width: rightBoxSize + 'px'
            }, animationTime);
            $AEE.elements.$blocksIcon.stop().animate({
                left: blocksIconPosition + 'px'
            }, animationTime);
            $AEE.elements.$settingsIcon.stop().animate({
                right: settingsIconPosition + 'px'
            }, animationTime);

            /*
            var h = y - 53;
            $AEE.elements.$blockList.height(h).getNiceScroll().hide();
            $AEE.elements.$documentBox.height(h).getNiceScroll().hide();
            $AEE.elements.$blockSettings.height(h).getNiceScroll().hide();
            setTimeout(function(){
                $AEE.elements.$blockList.getNiceScroll().resize();
                $AEE.elements.$blockList.getNiceScroll().show();
                $AEE.elements.$documentBox.getNiceScroll().resize();
                $AEE.elements.$documentBox.getNiceScroll().show();
                $AEE.elements.$blockSettings.getNiceScroll().resize();
                $AEE.elements.$blockSettings.getNiceScroll().show();
            }, animationTime);
            */

        };
        $AEE.setLayoutByDisplay();
    });
});