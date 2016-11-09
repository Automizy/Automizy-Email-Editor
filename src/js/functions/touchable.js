define([
    "core"
], function () {
    window.automizyHasMouse = true;

    var mouseMoveListener = function () {
        window.automizyHasMouse = true;
        document.removeEventListener('mousemove', mouseMoveListener, false);
    };
    document.addEventListener('mousemove', mouseMoveListener, false);

    $AEE.touchable = function () {
        if (window.automizyHasMouse) {
            return false;
        }
        return !!('ontouchstart' in window);
    };

});