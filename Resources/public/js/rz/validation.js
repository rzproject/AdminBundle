/* [ ---- Gebo Admin Panel - validation ---- ] */

jQuery(document).ready(function() {
    //* validation with tooltips
    rz_validation.qtip2();
    //* regular validation
    rz_validation.reg();
});

//* validation
var rz_validation = {
    qtip2: function() {
        var ttip_validator = jQuery('.form_validation_ttip').validate({
            onkeyup: false,
            errorClass: 'error',
            validClass: 'valid',
            highlight: function(element) {
                jQuery(element).closest('div').addClass("f_error");
            },
            unhighlight: function(element) {
                jQuery(element).closest('div').removeClass("f_error");
            },
            rules: {
                first_name: { required: true, minlength: 3 },
                last_name: { required: true, minlength: 3 },
                your_message: { required: true, minlength: 20 },

                days: { required: true, minlength: 2 },
                gender: { required: true },
                address2: { required: true, minlength: 5 },
                city: { required: true, minlength: 2 },
                state: { required: true, minlength: 3 }
            },
            invalidHandler: function(form, validator) {
                //jQuery.sticky("There are some errors. Please corect them and submit again.", {autoclose : 5000, position: "top-right", type: "st-error" });
            },
            errorPlacement: function(error, element) {
                // Set positioning based on the elements position in the form
                var elem = jQuery(element);

                // Check we have a valid error message
                if(!error.is(':empty')) {
                    if( (elem.is(':checkbox')) || (elem.is(':radio')) ) {
                        // Apply the tooltip only if it isn't valid
                        elem.filter(':not(.valid)').parent('label').parent('div').find('.error_placement').qtip({
                            overwrite: false,
                            content: error,
                            position: {
                                my: 'bottom center',
                                at: 'top center',
                                viewport: jQuery(window),
                                adjust: {
                                    method: 'shift shift'
                                }
                            },
                            show: {
                                event: false,
                                ready: true
                            },
                            hide: false,
                            style: {
                                classes: 'qtip-red qtip-rounded' // Make it red... the classic error colour!
                            }
                        })
                            // If we have a tooltip on this element already, just update its content
                            .qtip('option', 'content.text', error);
                    } else {
                        // Apply the tooltip only if it isn't valid
                        elem.filter(':not(.valid)').qtip({
                            overwrite: false,
                            content: error,
                            position: {
                                my: 'bottom center',
                                at: 'top center',
                                viewport: jQuery(window),
                                adjust: {
                                    method: 'shift shift'
                                }
                            },
                            show: {
                                event: false,
                                ready: true
                            },
                            hide: false,
                            style: {
                                classes: 'qtip-red qtip-rounded' // Make it red... the classic error colour!
                            }
                        })
                            // If we have a tooltip on this element already, just update its content
                            .qtip('option', 'content.text', error);
                    };

                }
                // If the error is empty, remove the qTip
                else {
                    if( (elem.is(':checkbox')) || (elem.is(':radio')) ) {
                        elem.parent('label').parent('div').find('.error_placement').qtip('destroy');
                    } else {
                        elem.qtip('destroy');
                    }
                }
            },
            success: jQuery.noop // Odd workaround for errorPlacement not firing!
        })
    },
    reg: function() {
        var reg_validator = jQuery('.form_validation_reg').validate({
            onkeyup: false,
            errorClass: 'error',
            validClass: 'valid',
            highlight: function(element) {
                jQuery(element).closest('div').addClass("f_error");
            },
            unhighlight: function(element) {
                jQuery(element).closest('div').removeClass("f_error");
            },
            errorPlacement: function(error, element) {
                jQuery(element).closest('div').append(error);
            },
            rules: {
                reg_first_name: { required: true, minlength: 3 },
                reg_last_name: { required: true, minlength: 3 },
                reg_your_message: { required: true, minlength: 20 },
                reg_days: { required: true, minlength: 2 },
                reg_gender: { required: true },
                reg_address2: { required: true, minlength: 5 },
                reg_city: { required: true, minlength: 2 },
                reg_state: { required: true, minlength: 3 }
            },
            invalidHandler: function(form, validator) {
                //jQuery.sticky("There are some errors. Please corect them and submit again.", {autoclose : 5000, position: "top-right", type: "st-error" });
            }
        })
    }
};
