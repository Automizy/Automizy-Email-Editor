define([
    "js/functions/core/ready"
], function () {
    $AEE.ready(function(){
        $.fn.removeStyle = function (style) {
            var search = new RegExp(style + '[^;]+;?', 'g');
            return this.each(function () {
                $(this).attr('style', function (i, style) {
                    return style.replace(search, '');
                });
            });
        };
        $.fn.removeStyles = function () {
            for(var i = 0; i < arguments.length; i++){
                $(this).removeStyle(arguments[i]);
            }
            return this;
        };
    })
});