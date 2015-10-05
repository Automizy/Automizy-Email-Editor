define([
    "js/functions/core/ready"
], function () {
    $AEE.ready(function(){
        var restrict = function(t){
            var v = false;
            var min = Number.NEGATIVE_INFINITY;
            var max = Number.POSITIVE_INFINITY;
            if(typeof t.value !== 'undefined'){
                v = parseFloat(t.value);
            }else{
                return false;
            }
            if(typeof t.min !== 'undefined' && t.min.toString().length > 0){
                min = parseFloat(t.min);
            }
            if(typeof t.max !== 'undefined' && t.max.toString().length > 0){
                max = parseFloat(t.max);
            }
            if (v >= min && v <= max){
                t.value = v;
            }else{
                t.value = v < min ? min : max;
            }
        };
        var restricted = false;
        $.fn.pbmInput = function () {
            return this.each(function(){
                if (this.type && 'number' === this.type.toLowerCase()) {
                    $(this).on('change', function(){
                        if(!restricted){
                            restricted = true;
                            restrict(this);
                            $(this).trigger('change');
                            return false;
                        }else{
                            restricted = false;
                        }
                    }).bind('mousewheel DOMMouseScroll', function(event){
                        event.preventDefault();
                        event.stopPropagation();
                        var t = this,
                            v = parseFloat(t.value);
                        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                            t.value = v + 1;
                        }else{
                            t.value = v - 1;
                        }
                        $(this).trigger('change');
                        return false;
                    });
                }
            });
        };
    })
});