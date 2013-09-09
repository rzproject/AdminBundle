/* [ ---- rzadmin theme - common ---- ] */

//* detect touch devices
function is_touch_device() {
    return !!('ontouchstart' in window);
}
jQuery(document).ready(function() {

    //* breadcrumbs
    rz_breadcrumbs.init();
    //* main menu mouseover
    rz_nav_mouseover.init();
    //* top submenu
    //rz_submenu.init();
    rz_scroll.init();
    //* pre block prettify
    if(typeof prettyPrint == 'function') {
        console.log('here');
        prettyPrint();
    }

    //* fix for dropdown menu (touch devices)
    //jQuery('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
});



//* breadcrumbs
var rz_breadcrumbs = {
    init: function() {
        if(jQuery('#rz-admin-jcrumbs').length) {
            jQuery('#rz-admin-jcrumbs').jBreadCrumb({
                endElementsToLeaveOpen: 0,
                beginingElementsToLeaveOpen: 0,
                timeExpansionAnimation: 500,
                timeCompressionAnimation: 500,
                timeInitialCollapse: 500,
                previewWidth: 30
            });
        }
    }
};

//* main menu mouseover
var rz_nav_mouseover = {
    init: function() {
        jQuery('header li.dropdown').mouseenter(function() {
            if(jQuery('body').hasClass('menu_hover')) {
                jQuery(this).addClass('navHover')
            }
        }).mouseleave(function() {
                if(jQuery('body').hasClass('menu_hover')) {
                    jQuery(this).removeClass('navHover open')
                }
            });
    }
};

//* submenu
var rz_submenu = {
    init: function() {
        jQuery('.dropdown-menu li').each(function(){
            var $this = jQuery(this);
            if($this.children('ul').length) {
                $this.addClass('sub-dropdown');
                $this.children('ul').addClass('sub-menu');
            }
        });

        jQuery('.sub-dropdown').on('mouseenter',function(){
            jQuery(this).addClass('active').children('ul').addClass('sub-open');
        }).on('mouseleave', function() {
                jQuery(this).removeClass('active').children('ul').removeClass('sub-open');
            })

    }
};


//* scroll
var rz_scroll = {
    init: function() {
        jQuery(window).scroll(function(){
            // add navbar opacity on scroll
            if (jQuery(this).scrollTop() > 100) {
                jQuery(".navbar.navbar-fixed-top").addClass("scroll");
            } else {
                jQuery(".navbar.navbar-fixed-top").removeClass("scroll");
            }

            // global scroll to top button
            if (jQuery(this).scrollTop() > 300) {
                jQuery('.scrolltop').fadeIn();
            } else {
                jQuery('.scrolltop').fadeOut();
            }
        });

        // scroll back to top btn
        jQuery('.scrolltop').click(function(){
            jQuery("html, body").animate({ scrollTop: 0 }, 700);
            return false;
        });
    }
};

var rz_gritter = {
    addPrimary: function(title, text) {
        return this.add(title, text, 'gritter-primary', false, '');
    },
    addLoading: function(title, text, theme) {
        return this.add(title, text, theme, true, '');
    },
    addInfo: function(title, text) {
        return this.add(title, text, 'gritter-info',false, '');
    },
    addSuccess: function(title, text) {
        return this.add(title, text, 'gritter-success',false, '');
    },
    addWarning: function(title, text) {
        return this.add(title, text, 'gritter-warning',false, '');
    },
    addDanger: function(title, text) {
        return this.add(title, text, 'gritter-danger',false, '');
    },
    addDefault: function(title, text) {
        return this.add(title, text, '');
    },
    add: function(title, text, type, isSticky, duration) {
        return $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: title,
            // (string | mandatory) the text inside the notification
            text: text,
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: isSticky,
            // (int | optional) the time you want it to be alive for before fading out
            time: duration,
            // (string | optional) the class name you want to apply to that specific message
            class_name: type
        });
    },
    remove: function (unique_id) {
        $.gritter.remove(unique_id, {
            fade: true, // optional
            speed: 'fast' // optional
        });
    },
    removeAll: function () {
        $.gritter.removeAll({
            fade: true, // optional
            speed: 'fast' // optional
        });
    }
};
