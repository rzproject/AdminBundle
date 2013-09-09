jQuery(document).ready(function(){
    console.log('admin-list.js');
    // theme specific actions
    rz_collapsible_filter.init();
    rz_popover.init();
    rz_tabdrop.init();

    //sonata specific actions
    sonata_rz_list.initBatchAction();
    sonata_rz_pager_alt.initAltPager();
});

//*filter
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

//* popover
var rz_popover = {
    init: function() {
        jQuery("a[data-toggle=popover]")
            .popover()
            .click(function(e) {
                e.preventDefault()
            });
    }
}

//* batch action
var sonata_rz_list = {
    initBatchAction: function() {
        $('#list_batch_checkbox').on('click', function() {
            var is_checked = $(this).is(':checked');
            jQuery.each(jQuery('.admin-field-batch'), jQuery.proxy(function(key, el) {
                if(is_checked) {
                    $(el).iCheck('check');
                } else {
                    $(el).iCheck('uncheck');
                }
            }, this));
        });
    }
}


var sonata_rz_pager_alt = {
    initAltPager: function() {
        jQuery('input[type=submit]').hide();
        jQuery('.rz-alt-pager').on('change', function() {
            console.log('here'+ this.options[this.selectedIndex].value);
            window.top.location.href=this.options[this.selectedIndex].value;
        });
    }
}
