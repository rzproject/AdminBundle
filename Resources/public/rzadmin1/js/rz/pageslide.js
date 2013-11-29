jQuery(document).ready(function(){
    rz_pageslide.init();
});


var rz_pageslide = {
    init: function() {
        /* Default pageslide, moves to the right */
        jQuery(".first").pageslide();

        /* Slide to the left, and make it model (you'll have to call jQuery.pageslide.close() to close) */
        jQuery(".second").pageslide({ direction: "left", modal: true });
    }
}
