jQuery(document).ready(function() {
    jQuery('html').removeClass('no-js');
    Admin.add_pretty_errors(document);
    Admin.add_filters(document);
    Admin.set_object_field_value(document);
    Admin.setup_collection_buttons(document);
    Admin.setup_per_page_switcher(document);
    Admin.setup_form_tabs_for_errors(document);

});

var Admin = {
    /**
     * render log message
     */
    log: function() {
        var msg = '[Sonata.Admin] ' + Array.prototype.join.call(arguments,', ');
        if (window.console && window.console.log) {
            window.console.log(msg);
        } else if (window.opera && window.opera.postError) {
            window.opera.postError(msg);
        }
    },

    //* detect touch devices
    is_touch_device: function() {
        return !!('ontouchstart' in window);
    },

    /**
     * display related errors messages
     *
     * @param subject
     */
    add_pretty_errors: function(subject) {

        if(!Admin.is_touch_device()) {

            jQuery('div.sonata-ba-field-error', subject).each(function(index, element) {

                var input = jQuery('input, textarea, select', element);

                var message = jQuery('div.sonata-ba-field-error-messages', element).html();
                jQuery('div.sonata-ba-field-error-messages', element).html('');
                if (!message) {
                    message = '';
                }

                if (message.length == 0) {
                    return;
                }

                var target;

                /* Hack to handle qTip on select */
                if(jQuery(input).is('select')) {
                    input.wrap('<span></span>');
                    target = input.parent();
                }
                else {
                    target = input;
                }

                var shared = {
                    style		: {
                        classes: 'qtip-bootstrap'
                    },
                    show		: {
                        delay: 100
                    },
                    hide		: {
                        delay: 0
                    },
                    content: {
                        text: message,
                        title: 'Error Message'
                    }
                };

                if(target.length) {
                    target.qtip( jQuery.extend({}, shared, {
                        position: {
                            my		: 'right center',
                            at		: 'left center',
                            viewport: jQuery(window)
                        }
                    }));
                }

                //target.opentip(message, { target: true,  targetJoint: null, tipJoint: 'left', showOn: 'mouseover', containInViewport: false, style: 'alert' });

//            jQuery(target).popover({
//                title: 'Error Message',
//                content: message,
//                placement: 'top',
//                html: true
//            });
            });
        }
    },

    stopEvent: function(event) {
        // https://github.com/sonata-project/SonataAdminBundle/issues/151
        //if it is a standard browser use preventDefault otherwise it is IE then return false
        if(event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }

        //if it is a standard browser get target otherwise it is IE then adapt syntax and get target
        if (typeof event.target != 'undefined') {
            targetElement = event.target;
        } else {
            targetElement = event.srcElement;
        }

        return targetElement;
    },

    add_filters: function(subject) {
//        jQuery('div.filter_container .sonata-filter-option', subject).hide();
//        jQuery('fieldset.filter_legend', subject).click(function(event) {
//            jQuery('div.filter_container .sonata-filter-option', jQuery(event.target).parent()).toggle();
//        });
        //jQuery(".admin-ajax-ignore-event").collapse();
        jQuery(".admin-ajax-ignore-event").on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            jQuery(".admin-filter-ajax").collapse('toggle');
        });
    },

    /**
     * Change object field value
     * @param subject
     */
    set_object_field_value: function(subject) {

        this.log(jQuery('a.sonata-ba-edit-inline', subject));
        jQuery('a.sonata-ba-edit-inline', subject).click(function(event) {
            Admin.stopEvent(event);

            var subject = jQuery(this);
            jQuery.ajax({
                url: subject.attr('href'),
                type: 'POST',
                success: function(json) {
                    if(json.status === "OK") {
                        var elm = jQuery(subject).parent();
                        elm.children().remove();
                        // fix issue with html comment ...
                        elm.html(jQuery(jQuery.parseHTML(json.content.replace(/<!--[\s\S]*?-->/g, "").replace(/[\r\n]+(?=[^\r\n])/g,""))).html());
                        elm.effect("highlight", {'color' : '#57A957'}, 2000);
                        Admin.set_object_field_value(elm);
                    } else {
                        jQuery(subject).parent().effect("highlight", {'color' : '#C43C35'}, 2000);
                    }
                }
            });
        });
    },

    setup_collection_buttons: function(subject) {

        jQuery(subject).on('click', '.sonata-collection-add', function(event) {
            Admin.stopEvent(event);

            var container = jQuery(this).closest('[data-prototype]');
            var proto = container.attr('data-prototype');
            // Set field id
            //var idRegexp = new RegExp(container.attr('id')+'___name__','g');
            var idRegexp = new RegExp(container.attr('id')+'_'+protoName,'g');
            proto = proto.replace(idRegexp, container.attr('id')+'_'+(container.children().length - 1));

            // Set field name
            var parts = container.attr('id').split('_');
//            var nameRegexp = new RegExp(parts[parts.length-1]+'\\]\\[__name__','g');
            var nameRegexp = new RegExp(parts[parts.length-1]+'\\]\\['+protoName,'g');
            proto = proto.replace(nameRegexp, parts[parts.length-1]+']['+(container.children().length - 1));
            jQuery(proto).insertBefore(jQuery(this).parent());

            jQuery(this).trigger('sonata-collection-item-added');
        });

        jQuery(subject).on('click', '.sonata-collection-delete', function(event) {
            Admin.stopEvent(event);

            jQuery(this).closest('.sonata-collection-row').remove();

            jQuery(this).trigger('sonata-collection-item-deleted');
        });
    },

    setup_per_page_switcher: function(subject) {
        jQuery('select.per-page').change(function(event) {
            jQuery('input[type=submit]').hide();

            window.top.location.href=this.options[this.selectedIndex].value;
        });
    },

    setup_form_tabs_for_errors: function(subject) {
        // Switch to first tab with server side validation errors on page load
        jQuery('form', subject).each(function() {
            Admin.show_form_first_tab_with_errors(jQuery(this), '.sonata-ba-field-error');
        });

        // Switch to first tab with HTML5 errors on form submit
        jQuery(subject)
            .on('click', 'form [type="submit"]', function() {
                Admin.show_form_first_tab_with_errors(jQuery(this).closest('form'), ':invalid');
            })
            .on('keypress', 'form [type="text"]', function(e) {
                if (13 === e.which) {
                    Admin.show_form_first_tab_with_errors(jQuery(this), ':invalid');
                }
            })
        ;
    },

    show_form_first_tab_with_errors: function(form, errorSelector) {
        var tabs = form.find('.nav-tabs a'),
            firstTabWithErrors;

        tabs.each(function() {
            var id = jQuery(this).attr('href'),
                tab = jQuery(this),
                icon = tab.find('.has-errors');

            if (jQuery(id).find(errorSelector).length > 0) {
                // Only show first tab with errors
                if (!firstTabWithErrors) {
                    tab.tab('show');
                    firstTabWithErrors = tab;
                }

                icon.removeClass('hide');
            } else {
                icon.addClass('hide');
            }
        });
    },

    loadingMessage: function(msg) {
        msg = msg ? msg : 'Please wait while we process your request.';
        return '<div id="gritter-notice-wrapper-blockui-loading"><div id="gritter-item-blockui-loading" class="gritter-item-wrapper gritter-primary" style=""><div class="gritter-top"></div><div class="gritter-item"><div class="gritter-close" style="display: none;"></div><div class="gritter-without-image"><span class="gritter-title"><i class="icon-spinner"></i> Processing...</span><p>'+msg+'</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div></div>';
    },

    initElements: function(modal) {
        //TODO: change to selector
        if (jQuery('[class*="selectpicker"]', modal).length > 0) {
            jQuery('[class*="selectpicker"]', modal).selectpicker();
        }

        if(jQuery('[class*="uni_style"]', modal).length > 0) {
            jQuery('[class*="uni_style"]', modal).uniform();
        }

        if (jQuery('[class="footable"]', modal).length > 0) {
            jQuery('[class="footable"]', modal).footable();
        }

        if(jQuery('.chosen-select', modal).length>0) {
            modal.find(".chosen-select").chosen({
                allow_single_deselect: true
            });
        }

        if(jQuery(".chosen-select-multiple", modal).length > 0) {
            modal.find(".chosen-select-multiple").chosen().change(function(){
                var ret = null;
                $(this).find('.chosen-choices').each(function(){
                    console.log(this);
                    console.log('child');
                })
            });
        }

        if(jQuery('.rz-datepicker', modal).length > 0) {
            modal.find('.rz-datepicker').datepicker({'autoclose': true});
        }

        if(jQuery('.rz-timepicker', modal).length > 0) {
            modal.find('.rz-timepicker').timepicker({'defaultTime': false, 'showMeridian': false});
        }

        if(jQuery('.rz-datetimepicker', modal).length > 0) {
            modal.find('.rz-datetimepicker').datetimepicker({
                autoclose: true,
                todayBtn: true,
                pickerPosition: "bottom-left",
                minuteStep: 5
            });
        }

        if(jQuery('.datepicker.dropdown-menu', modal).length > 0) {
            jQuery('.datepicker.dropdown-menu').css('z-index', 9999);
        }


        if(jQuery('.rz_grid ul', modal).length > 0) {
            jQuery('.rz_grid ul', modal).imagesLoaded(jQuery.proxy(function() {
                // Prepare layout options.
                var options = {
                    autoResize: true, // This will auto-update the layout when the browser window is resized.
                    container: $('.rz_grid'), // Optional, used for some extra CSS styling
                    offset: 5, // Optional, the distance between grid items
                    itemWidth: 220, // Optional, the width of a grid item (li)
                    flexibleItemWidth: false
                };

                // Get a reference to your grid items.
                var handler = jQuery('.rz_grid ul li', modal);

                // Call the layout function.
                handler.wookmark(options);

                jQuery('.rz_grid ul li').on('mouseenter',function(){
                    $(this).addClass('act_tools');
                }).on('mouseleave',function(){
                        $(this).removeClass('act_tools');
                    });
            }, modal));
        }
    }
}
