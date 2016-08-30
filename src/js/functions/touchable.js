define([
    "core"
], function () {
    window.automizyHasMouse = false;
    $(document).one('mousemove', function(){window.automizyHasMouse = true});

    $AEE.touchable = function(){
        if(window.automizyHasMouse){
            return false;
        }
        return !!('ontouchstart' in window);
    };
});