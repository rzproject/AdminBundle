jQuery(document).ready(function(){
    //rz_pageslide.init();
    rz_collapsible_filter.init();
    //rz_batch_action.init();
    rz_popover.init();
    rz_tabdrop.init();
});


//var rz_pageslide = {
//    init: function() {
//        /* Slide to the left, and make it model (you'll have to call jQuery.pageslide.close() to close) */
//        jQuery(".filter").pageslide({ direction: "right", modal: true });
//    }
//}

var rz_collapsible_filter = {
    init: function() {
        jQuery(".admin-filter").collapse();
    }
}

//* tabdrop
var rz_tabdrop = {
    init: function() {
        jQuery(".tabdrop").tabdrop();
    }
};


//* batch action
//var rz_batch_action = {
//    init: function() {
//        jQuery('#list_batch_checkbox').on('click', function() {
//            console.log('heres');
//            jQuery.each(jQuery('.admin-field-batch'), jQuery.proxy(function(key, el) {
//                console.log(el);
//                jQuery(el).prop("checked", jQuery(this).is(':checked'));
//            }, this));
//
//            jQuery.uniform.update(jQuery('.admin-field-batch'));
//        });
//    }
//}

var rz_popover = {
    init: function() {
        jQuery("a[data-toggle=popover]")
            .popover()
            .click(function(e) {
                e.preventDefault()
            });
    }
}
