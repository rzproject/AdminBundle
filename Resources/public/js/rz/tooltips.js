jQuery(document).ready(function(){
    rz_tooltip.init();
    rz_popover.init();
    rz_qtips.init();
    rz_qtips_modal.init();
    rz_opentips.init();
});

var rz_tooltip = {
    init: function() {
        jQuery('.tooltip-demo').tooltip({
            selector: "a[data-toggle=tooltip]"
        });

        jQuery('.tooltip-demo2').tooltip({
            selector: "input[data-toggle=tooltip]"
        });
    }
}

var rz_popover = {
    init: function() {
        jQuery("a[data-toggle=popover]")
            .popover()
            .click(function(e) {
                e.preventDefault()
            });
    }
}

var rz_qtips = {
    init: function() {
        if(!is_touch_device()){
            var shared = {
                style		: {
                    classes: 'qtip-youtube'
                },
                show		: {
                    delay: 100
                },
                hide		: {
                    delay: 0
                }
            };
            if(jQuery('.ttip_b').length) {
                jQuery('.ttip_b').qtip( jQuery.extend({}, shared, {
                    position	: {
                        my		: 'top center',
                        at		: 'bottom center',
                        viewport: jQuery(window)
                    }
                }));
            }
            if(jQuery('.ttip_t').length) {
                jQuery('.ttip_t').qtip( jQuery.extend({}, shared, {
                    position: {
                        my		: 'bottom center',
                        at		: 'top center',
                        viewport: jQuery(window)
                    }
                }));
            }
            if(jQuery('.ttip_l').length) {
                jQuery('.ttip_l').qtip( jQuery.extend({}, shared, {
                    position: {
                        my		: 'right center',
                        at		: 'left center',
                        viewport: jQuery(window)
                    }
                }));
            }
            if(jQuery('.ttip_r').length) {
                jQuery('.ttip_r').qtip( jQuery.extend({}, shared, {
                    position: {
                        my		: 'left center',
                        at		: 'right center',
                        viewport: jQuery(window)
                    }
                }));
            };
        }
    }
};

var rz_qtips_modal = {
    init: function() {
        jQuery('.qtip-modal-trigger').qtip(
            {
                id: 'rz-form-modal', // Since we're only creating one modal, give it an ID so we can style it
                content: {
                    text: jQuery('#rz-qtip-modal-content'),
                    title: {
                        text: 'Modal qTip',
                        button: true
                    }
                },
                position: {
                    my: 'top left', // ...at the center of the viewport
                    at: 'bottom right',
                    target: jQuery('.qtip-modal-trigger'),
                    viewport: jQuery(window),
                    adjust: {
                        method: 'shift shift'
                    }
                },
                show: {
                    event: 'click', // Show it on click...
                    solo: true, // ...and hide all other tooltips...
                    modal: {
                        on: true

                        // Don't let users exit the modal in any way
//                        blur: false,
//                        escape: false
                    }
                },
                hide: {
                    fixed: true // Helps to prevent the tooltip from hiding ocassionally when tracking!
                },
                style: 'qtip-bootstrap'


            });
    }
}

var rz_opentips = {
    init: function() {

        jQuery("#ot_l_trigger").opentip("Opentip Left", { target: true,  targetJoint: null , tipJoint: 'right', showOn: 'mouseover', containInViewport: false });
        jQuery("#ot_r_trigger").opentip("Opentip Right", { target: true,  targetJoint: null, tipJoint: 'left', showOn: 'mouseover', containInViewport: false, style: 'alert' });
        jQuery("#ot_t_trigger").opentip("Opentip Top", { target: true,  targetJoint: null, tipJoint: 'bottom', showOn: 'mouseover', containInViewport: false, style: 'glass' });
        jQuery("#ot_b_trigger").opentip("Opentip Bottom", { target: true,  targetJoint: null, tipJoint: 'top', showOn: 'mouseover', containInViewport: false, style: 'dark' });
    }
}
