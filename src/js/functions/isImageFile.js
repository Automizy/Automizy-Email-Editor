define([
    "js/functions/getExtension"
], function () {
    $AEE.isImageFile = function (fname) {
        var ext = $AEE.getExtension(fname);
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'bmp':
            case 'png':
                //etc
                return true;
        }
        return false;
    };
});