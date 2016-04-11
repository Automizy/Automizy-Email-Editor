define([
    "core"
], function () {
    $AEE.rgbStyleToHex = function (rgb) {
        if(typeof rgb !== 'string'){
            return '#000000';
        }
        if (rgb[0] === '#') {
            return rgb;
        }
        if (rgb[0] !== 'r') {
            return '#000000';
        }
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1] || '0') + hex(rgb[2] || '0') + hex(rgb[3] || '0');
    };
});