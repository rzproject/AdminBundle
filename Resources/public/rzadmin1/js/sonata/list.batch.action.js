//* batch action
var sonata_rz_list = {
    initBatchAction: function() {
        $('#list_batch_checkbox').on('click', function() {
            jQuery.each(jQuery('.admin-field-batch'), jQuery.proxy(function(key, el) {
                $(el).prop("checked", $(this).is(':checked'));
            }, this));

            jQuery.uniform.update(jQuery('.admin-field-batch'));
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
