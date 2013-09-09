jQuery(document).ready(function () {
    rzadmin.init();
});


// specific JS for rzAdminTheme2
var rzadmin = {

    mobile: false,
    tooltipOnlyForDesktop: true,
    nav: null,

    rz_gritter: {   addPrimary: function(title, text) {
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
    },

    init:function(){
        //functions should be called
        rzadmin.resizeContent();
        rzadmin.initGoToTopActions();
        rzadmin.initNavi();
        rzadmin.initBoxActions();
        rzadmin.initScrollable();
        rzadmin.initPopOver();
        rzadmin.resizeHandlerHeight();
        rzadmin.initTopBar();
        rzadmin.checkLeftNav();
        rzadmin.checkLayout();
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
            rzadmin.mobile = true;
        }
        rzadmin.icheck();
        rzadmin.initToolTip();
        rzadmin.initNotify();
        rzadmin.initPickers();
        rzadmin.initSpinners();
        rzadmin.initPickers();
        rzadmin.resizeChosen();
        rzadmin.initRetina();
        rzadmin.initProgressBar();
        rzadmin.initBatchAction();
        rzadmin.initAltPager();
        rzadmin.initBlockUI();
        jQuery(document).ajaxStop(jQuery.unblockUI);
        rzadmin.mediaGrid();
        rzadmin.mediaGirdMixed();
        rzadmin.initFootable();
        rzadmin.initTabDrop();

        rzadmin.dashboardCurrentDateTime();
    },

    /**
     * render log message
     */
    log: function() {
        var msg = '[Rz.Admin] ' + Array.prototype.join.call(arguments,', ');
        if (window.console && window.console.log) {
            window.console.log(msg);
        } else if (window.opera && window.opera.postError) {
            window.opera.postError(msg);
        }
    },

    /**
     * sidebar function
     */
    sidebarFluid: function(){
        if(jQuery("#left").hasClass("sidebar-fixed")){
            jQuery("#left").removeClass("sidebar-fixed").css({
                "height": "auto",
                "top": "0",
                "left": "auto"
            });
        }
        if(jQuery("#navigation").hasClass("navbar-fixed-top")){
            jQuery("#left").css("top", 40);
        }
        jQuery("#left").getNiceScroll().resize().hide();
        jQuery("#left").removeClass("hasScroll");
    },

    sidebarFixed: function(){
        jQuery("#left").addClass("sidebar-fixed");
        jQuery("#left .ui-resizable-handle").css("top", 0);
        if(jQuery(window).scrollTop() == 0 ) jQuery("#left").css("top", 40);
        if(jQuery("#content").hasClass("container")){
            jQuery("#left").css("left", jQuery("#content").offset().left);
        }
        jQuery("#left").getNiceScroll().resize().show();
        rzadmin.initSidebarScroll();
    },

    /**
     * topbar function
     */
    topbarFixed: function(){
        jQuery("#content").addClass("nav-fixed");
        jQuery("#navigation").addClass("navbar-fixed-top");
        if(jQuery("#left").css("top") == "0px"){
            jQuery("#left").css("top", 40);
        }
    },

    topbarFluid: function(){
        jQuery("#content").removeClass("nav-fixed");
        jQuery("#navigation").removeClass("navbar-fixed-top");
        if(jQuery("#left").css("top") == "40px" && !jQuery('#left').hasClass("sidebar-fixed")){
            jQuery("#left").css("top", 0);
        }
    },

    /**
     * Layout version Style Fixed or Fluid
     */
    versionFixed: function(){
        if(jQuery(window).width() >= 1200) {
            jQuery("#content").addClass("container").removeClass("container-fluid");
            jQuery("#navigation .container-fluid").addClass("container").removeClass("container-fluid");
            if(jQuery("#left").hasClass("sidebar-fixed")){
                jQuery("#left").css("left", jQuery("#content").offset().left);
            }
        }
    },

    versionFluid: function(){
        jQuery("#content").addClass("container-fluid").removeClass("container");
        jQuery("#navigation .container").addClass("container-fluid").removeClass("container");
        if(jQuery("body").hasClass("sidebar-right")){
            jQuery("#left").css("right", 0);
        } else {
            jQuery("#left").css("left", 0);
        }
    },

    /**
     * SlimScroll Functions
     */
    slimScrollUpdate: function (elem, toBottom) {
        if(elem.length > 0){
            var height = parseInt(elem.attr('data-height')),
                vis = (elem.attr("data-visible") == "true") ? true : false,
                start = (elem.attr("data-start") == "bottom") ? "bottom" : "top";
            var opt = {
                height: height,
                color: "#666",
                start: start
            };
            if (vis) {
                opt.alwaysVisible = true;
                opt.disabledFadeOut = true;
            }
            if (toBottom !== undefined) opt.scrollTo = toBottom+"px";
            elem.slimScroll(opt);
        }
    },

    destroySlimscroll: function(elem) {
        elem.parent().replaceWith(elem);
    },

    initSidebarScroll: function(){
        rzadmin.getSidebarScrollHeight();
        if(!jQuery("#left").hasClass("hasScroll")){
            jQuery("#left").niceScroll({
                cursorborder: 0,
                cursorcolor: '#999',
                railoffset:{
                    top:0,
                    left:-2
                },
                autohidemode:false,
                horizrailenabled:false
            });
            jQuery("#left").addClass("hasScroll");
            // if mobile prevent scroll
            jQuery("#left").on('touchmove', function(e){
                e.preventDefault();
            });
        } else {
            jQuery("#left").getNiceScroll().resize().show();
        }
    },

    getSidebarScrollHeight: function(){
        var $el = jQuery("#left"),
            $w = jQuery(window),
            $nav = jQuery("#navigation");
        var height = $w.height();

        if(($nav.hasClass("navbar-fixed-top") && $w.scrollTop() == 0) || $w.scrollTop() == 0) height -= 40;

        if($el.hasClass("sidebar-fixed") || $el.hasClass("mobile-show")){
            $el.height(height);
        }
    },

    /**
     * Navigation Functions
     */
    checkLeftNav: function(){
        var $w = jQuery(window),
            $content = jQuery("#content"),
            $left = jQuery("#left");
        if($w.width() <= 840){
            if(!$left.hasClass("mobile-show")){
                $left.hide();
                jQuery("#main").css("margin-left", 0 );
            }
            if(jQuery(".toggle-mobile").length == 0){
                jQuery("#navigation .user").before('<a href="#" class="toggle-mobile"><i class="icon-reorder"></i></a>');
            }

            if(jQuery(".mobile-nav").length == 0){
                rzadmin.createSubNav();
            }
        } else {
            if(!$left.is(":visible") && !$left.hasClass("forced-hide") && !jQuery("#content").hasClass("nav-hidden")){
                $left.show();
                jQuery("#main").css("margin-left", $left.width());
            }

            jQuery(".toggle-mobile").remove();
            jQuery(".mobile-nav").removeClass("open");

            if($content.hasClass("forced-fixed")){
                $content.removeClass("nav-fixed");
                jQuery("#navigation").removeClass("navbar-fixed-top");
            }

            if($w.width() < 1200) {
                if(jQuery("#navigation .container").length > 0){
                    rzadmin.versionFluid();
                    jQuery('body').addClass("forced-fluid");
                }
            } else {
                if(jQuery('body').hasClass("forced-fluid")){
                    rzadmin.versionFixed();
                }
            }
        }
    },

    resizeHandlerHeight: function(){
        var wHeight = jQuery(window).height(),
            minus = (jQuery(window).scrollTop() == 0) ? 40 : 0;
        jQuery("#left .ui-resizable-handle").height(wHeight-minus);
    },

    toggleMobileNav: function(){
        var mobileNav = jQuery(".mobile-nav");
        mobileNav.toggleClass("open");
        mobileNav.find(".open").removeClass("open");
    },

    getNavElement: function(current){
        var currentText = $.trim(current.find(">a").text()),
            element = "";
        element += "<li><a href='" + current.find(">a").attr("href") + "'>" + currentText + "</a>";
        if(current.find(">.dropdown-menu").length > 0){
            element += rzadmin.getNav(current.find(">.dropdown-menu"));
        }
        element += "</li>";
        return element;
    },

    getNav: function(current){
        var currentNav = "";
        currentNav += "<ul>";
        current.find(">li").each(function(){
            currentNav += rzadmin.getNavElement(jQuery(this));
        });
        currentNav += "</ul>";
        rzadmin.nav = currentNav;
        return currentNav;
    },

    createSubNav: function(){
        if(jQuery(".mobile-nav").length == 0){
            var original = jQuery("#navigation .main-nav");
            // loop
            var current = original;
            rzadmin.getNav(current);
            jQuery("#navigation").append(rzadmin.nav);
            jQuery("#navigation > ul").last().addClass("mobile-nav");

            jQuery(".mobile-nav > li > a").click(function(e){
                var el = jQuery(this);
                jQuery("#navigation").getNiceScroll().resize().show();
                if(el.next().length !== 0){
                    e.preventDefault();

                    var sub = el.next();
                    el.parents(".mobile-nav").find(".open").not(sub).each(function(){
                        var t = jQuery(this);
                        t.removeClass("open");
                        t.prev().find("i").removeClass("icon-angle-down").addClass("icon-angle-left");
                    });
                    sub.toggleClass("open");
                    el.find("i").toggleClass('icon-angle-left').toggleClass("icon-angle-down");
                }
            });
        }
    },

    hideNav: function(){
        jQuery("#left").toggle().toggleClass("forced-hide");
        if(jQuery("#left").is(":visible")) {
            jQuery("#main").css("margin-left", jQuery("#left").width());
        } else {
            jQuery("#main").css("margin-left", 0);
        }

        if(jQuery('.dataTable').length > 0){
            var table = $.fn.dataTable.fnTables(true);
            if ( table.length > 0 ) {
                jQuery(table).each(function(){
                    if(jQuery(this).hasClass("dataTable-scroller")){
                        jQuery(this).dataTable().fnDraw();
                    }
                });
                jQuery(table).dataTable().fnAdjustColumnSizing();
            }
        }

        if(jQuery(".calendar").length > 0){
            jQuery(".calendar").fullCalendar("render");
        }
    },

    scrolledClone: function ($el, $cloned){
        $cloned.remove();
        $el.parent().removeClass("open");
    },

    resizeContent: function(){
        if(jQuery("#main").height() < jQuery(window).height()){
            var height = 40;
            if(jQuery("#footer").length > 0) {
                height += jQuery("#footer").outerHeight();
            }
            jQuery("#content").css({
                "min-height": "auto",
                "height": jQuery(window).height() - height
            });
        }

        if((jQuery("#left").height() > jQuery('#main').height()) && (jQuery("#main").height() < jQuery(window).height())){
            jQuery("#left").addClass("full");
            jQuery("#footer").css({
                'position': 'fixed',
                'bottom': 0,
                'top': 'auto'
            });
        }

        if(jQuery("#left").height() < jQuery(window).height() && !jQuery("#left").hasClass("force-full")){
            jQuery("#left").removeClass("full");
            jQuery("#footer").attr("style", "");
        }
    },

    checkLayout:function() {
        // check layout
        if(jQuery("body").attr("data-layout") == "fixed"){
            rzadmin.versionFixed();
        }

        if(jQuery("body").attr("data-layout-topbar") == "fixed"){
            rzadmin.topbarFixed();
        }

        if(jQuery("body").attr("data-layout-sidebar") == "fixed"){
            rzadmin.sidebarFixed();
        }
    },

    resizeChosen: function(){

        if (jQuery('.chosen-container').length > 0){

            jQuery('.chosen-container').each(function() {
                var $el = jQuery(this);
                $el.css('width', $el.parent().width()+'px');
                $el.find(".chosen-drop").css('width', ($el.parent().width()-2)+'px');
//                $el.find(".chosen-search input").css('width', ($el.parent().width()-37)+'px');
            });
        }
    },

    mediaGrid: function() {
        if (jQuery('.rz_grid').length > 0){
            jQuery('.rz_grid').each(function(){
                jQuery(this).find('.yt_vid,.self_vid,.vimeo_vid').append('<span class="vid_ico"/>');
            });
        }
    },

    mediaGirdMixed: function() {
        if (jQuery('.rz_grid ul').length > 0){
            jQuery('.rz_grid ul').imagesLoaded(function() {
                // Prepare layout options.
                var options = {
                    autoResize: true, // This will auto-update the layout when the browser window is resized.
                    container: $('.rz_grid'), // Optional, used for some extra CSS styling
                    offset: 5, // Optional, the distance between grid items
                    itemWidth: 220, // Optional, the width of a grid item (li)
                    flexibleItemWidth: false
                };

                // Get a reference to your grid items.
                var handler = $('.rz_grid ul li');

                // Call the layout function.
                handler.wookmark(options);

                $('#mixed_grid ul li').on('mouseenter',function(){
                    $(this).addClass('act_tools');
                }).on('mouseleave',function(){
                        $(this).removeClass('act_tools');
                });
            });
        }
    },

    dashboardCurrentDateTime: function() {
        var $el = jQuery(".stats .icon-calendar").parent(),
            currentDate = new Date(),
            monthNames = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ],
            dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        $el.find(".details .big").html(monthNames[currentDate.getMonth()] + " " + currentDate.getDate() + ", " + currentDate.getFullYear());
        $el.find(".details span").last().html(dayNames[currentDate.getDay()] + ", " + currentDate.getHours()+":"+ ("0" + currentDate.getMinutes()).slice(-2));
        setTimeout(function(){
            rzadmin.dashboardCurrentDateTime();
        }, 10000);
    },


    /**
     * Initialize Plugins
     */

    initGoToTopActions: function() {
        jQuery(".gototop").on('click',function(e){
            e.preventDefault();
            jQuery("html, body").animate({
                scrollTop: 0
            }, 600);
        });
    },

    initNavi: function() {
        jQuery('.main-nav > li, .subnav-menu > li').hover(function() {
            if(jQuery(this).attr("data-trigger") == "hover"){
                if(jQuery(this).parents(".subnav-menu").length > 0 && jQuery("#left").hasClass("sidebar-fixed")){
                    jQuery(this).find(">a").trigger("click");
                } else {
                    jQuery(this).closest('.dropdown-menu').stop(true, true).show();
                    jQuery(this).addClass('open');
                }
            }
        }, function() {
            if(jQuery(this).attr("data-trigger") == "hover"){
                jQuery(this).closest('.dropdown-menu').stop(true, true).hide();
                jQuery(this).removeClass('open');
            }
        });

        jQuery(".subnav-menu > li > a[data-toggle=dropdown]").click(function(){
            // Clone dropdown menu to body
            var $el = jQuery(this);
            if(jQuery("#left").hasClass("sidebar-fixed") || jQuery("#left").hasClass("mobile-show")){
                // Remove open clones
                jQuery('.cloned').remove();
                var $ulToClone = $el.next();
                var offset = $el.offset();
                var $cloned = $ulToClone.clone().css({
                    top: offset.top,
                    left: offset.left + jQuery("#left").width()
                }).show().addClass("cloned");

                jQuery("body").append($cloned);

                $ulToClone.hide();

                jQuery("#left").scroll(function(){
                    scrolledClone($el, $cloned);
                });
                jQuery(window).scroll(function(){
                    scrolledClone($el, $cloned);
                });

                // if(jQuery("#left").hasClass("mobile-show")){
                // close when clicked
                jQuery("body").click(function(e){
                    var target = jQuery(e.target);
                    if(target.parents(".cloned").length == 0 && target.attr("data-toggle") != "dropdown"){
                        // close all
                        $el.parent().removeClass("open");
                        $cloned.remove();
                    }
                });
                // }

                // jQuery("body").on("mouseleave", '.cloned', function(){
                //     $el.parent().removeClass("open");
                //     $cloned.remove();
                // });
            }
        });

        jQuery(".subnav-hidden").each(function(){
            if(jQuery(this).find(".subnav-menu").is(":visible")) jQuery(this).find(".subnav-menu").hide();
        });

        rzadmin.createSubNav();

        //* more nav functions

        jQuery("#navigation").on('click', '.toggle-mobile' , function(e){
            e.preventDefault();
            rzadmin.toggleMobileNav();
        });
    },

    initToggleNav: function(){
        jQuery('.toggle-nav').click(function(e){
            e.preventDefault();
            rzadmin.hideNav();
        });

        if(jQuery("#content").hasClass("nav-hidden")){
            rzadmin.hideNav();
        }
    },

    initBoxActions: function(){
        jQuery(".content-slideUp").click(function (e) {
            e.preventDefault();
            var $el = jQuery(this),
                content = $el.parents('.box').find(".box-content");
            content.slideToggle('fast', function(){
                $el.find("i").toggleClass('icon-angle-up').toggleClass("icon-angle-down");
                if(!$el.find("i").hasClass("icon-angle-up")){
                    if(content.hasClass('scrollable')) slimScrollUpdate(content);
                } else {
                    if(content.hasClass('scrollable')) destroySlimscroll(content);
                }
            });
        });

        jQuery(".content-remove").click(function (e) {
            e.preventDefault();
            var $el = jQuery(this);
            var spanElement = $el.parents("[class*=span]");
            var spanWidth = parseInt(spanElement.attr('class').replace("span", "")),
                previousElement = (spanElement.prev().length > 0) ? spanElement.prev() : spanElement.next();
            if(previousElement.length > 0){
                var prevSpanWidth = parseInt(previousElement.attr("class").replace("span", ""));
            }
            bootbox.animate(false);
            bootbox.confirm("Do you really want to remove the widget <strong>" + $el.parents(".box-title").find("h3").text() + "</strong>?", "Cancel", "Yes, remove", function (r) {
                if (r){
                    $el.parents('[class*=span]').remove();
                    if(previousElement.length > 0){
                        previousElement.removeClass("span"+prevSpanWidth).addClass("span"+(prevSpanWidth+spanWidth));
                    }
                }
            });
        });

        jQuery(".content-refresh").click(function (e) {
            e.preventDefault();
            var $el = jQuery(this);
            $el.find("i").addClass("icon-spin");
            setTimeout(function () {
                $el.find("i").removeClass("icon-spin");
            }, 2000);
        });
    },

    initScrollable: function() {
        if(jQuery(".scrollable").length > 0){
            jQuery('.scrollable').each(function () {
                var $el = jQuery(this);
                var height = parseInt($el.attr('data-height')),
                    vis = ($el.attr("data-visible") == "true") ? true : false,
                    start = ($el.attr("data-start") == "bottom") ? "bottom" : "top";
                var opt = {
                    height: height,
                    color: "#666",
                    start: start,
                    allowPageScroll:true
                };
                if (vis) {
                    opt.alwaysVisible = true;
                    opt.disabledFadeOut = true;
                }
                $el.slimScroll(opt);
            });
        }
    },

    initPopOver: function() {
        if (jQuery("[rel=popover]").length > 0) {
            jQuery("a[data-toggle=popover]")
                .popover()
                .click(function(e) {
                    e.preventDefault()
                });
        }
    },

    initTopBar: function() {
        jQuery(".topbar-toggle > a").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            var $el = jQuery(this);
            var $parent = $el.parent();
            if(!$el.hasClass("active")){
                $parent.find(".active").removeClass("active");
                $el.addClass("active");
            }

            if($el.hasClass("set-topbar-fixed")){
                rzadmin.topbarFixed();
            } else {
                rzadmin.topbarFluid();
            }
        });
    },

    icheck:function() {
        if(jQuery(".icheck-me").length > 0){
            jQuery(".icheck-me").each(function(){
                var $el = jQuery(this);
                var skin = ($el.attr('data-skin') !== undefined) ? "_"+$el.attr('data-skin') : "",
                    color = ($el.attr('data-color') !== undefined) ? "-"+$el.attr('data-color') : "";

                var opt = {
                    checkboxClass: 'icheckbox' + skin + color,
                    radioClass: 'iradio' + skin + color,
                    increaseArea: "10%"
                }

                $el.iCheck(opt);
            });
        }
    },

    initToolTip: function() {
        if(rzadmin.tooltipOnlyForDesktop)
        {
            if(!rzadmin.mobile)
            {
                jQuery('[rel=tooltip]').tooltip();
            }
        }
    },

    initNotify: function() {
        // Notifications
        jQuery(".notify").click(function(){
            var $el = jQuery(this);
            var title = $el.attr('data-notify-title'),
                message = $el.attr('data-notify-message'),
                time = $el.attr('data-notify-time'),
                sticky = $el.attr('data-notify-sticky'),
                overlay = $el.attr('data-notify-overlay');

            $.gritter.add({
                title: 	(typeof title !== 'undefined') ? title : 'Message - Head',
                text: 	(typeof message !== 'undefined') ? message : 'Body',
                image: 	(typeof image !== 'undefined') ? image : null,
                sticky: (typeof sticky !== 'undefined') ? sticky : false,
                time: 	(typeof time !== 'undefined') ? time : 3000
            });
        });
    },

    initPickers: function() {
        // datepicker
//        if(jQuery('.datepick').length > 0){
//            jQuery('.datepick').datepicker();
//        }

        // daterangepicker
        if(jQuery('.daterangepick').length > 0){
            jQuery('.daterangepick').daterangepicker();
        }

        // timepicker
//        if(jQuery('.timepick').length > 0){
//            jQuery('.timepick').timepicker({
//                defaultTime: 'current',
//                minuteStep: 1,
//                disableFocus: true,
//                template: 'dropdown'
//            });
//        }
        // colorpicker
        if(jQuery('.colorpick').length > 0){
            jQuery('.colorpick').colorpicker();
        }
        // uniform
        if(jQuery('.uniform-me').length > 0){
            jQuery('.uniform-me').uniform({
                radioClass : 'uni-radio',
                buttonClass : 'uni-button'
            });
        }
        // Chosen (chosen)
//        if(jQuery('.chosen-select').length > 0)
//        {
//            jQuery('.chosen-select').each(function(){
//                var $el = jQuery(this);
//                var search = ($el.attr("data-nosearch") === "true") ? true : false,
//                    opt = {};
//                if(search) opt.disable_search_threshold = 9999999;
//                $el.chosen(opt);
//            });
//        }

        if(jQuery(".select2-me").length > 0){
            jQuery(".select2-me").select2();
        }

        // multi-select
//        if(jQuery('.multiselect').length > 0)
//        {
//            jQuery(".multiselect").each(function(){
//                var $el = jQuery(this);
//                var selectableHeader = $el.attr('data-selectableheader'),
//                    selectionHeader  = $el.attr('data-selectionheader');
//                if(selectableHeader != undefined)
//                {
//                    selectableHeader = "<div class='multi-custom-header'>"+selectableHeader+"</div>";
//                }
//                if(selectionHeader != undefined)
//                {
//                    selectionHeader = "<div class='multi-custom-header'>"+selectionHeader+"</div>";
//                }
//                $el.multiSelect({
//                    selectionHeader : selectionHeader,
//                    selectableHeader : selectableHeader
//                });
//            });
//        }

//        if(jQuery('.selectpicker').length > 0) {
//            jQuery('.selectpicker').selectpicker();
//        }
    },

    initSpinners:function() {

        // spinner
        if(jQuery('.spinner').length > 0){
            jQuery('.spinner').spinner();
        }
    },

    initRetina: function() {
        jQuery(".retina-ready").retina("@2x");
    },

    initProgressBar: function() {
        if (jQuery('.progress .bar').length > 0) {
            jQuery('.progress .bar').progressbar();
        }
    },

    initBlockUI: function() {
        jQuery.blockUI.defaults.css.border= '0px solid transparent';
        jQuery.blockUI.defaults.css.backgroundColor= 'transparent';
        jQuery.blockUI.defaults.css.cursor= 'wait';
        jQuery.blockUI.defaults.css.textAlign= 'left';
        jQuery.blockUI.defaults.centerY = false;
        jQuery.blockUI.defaults.border= 'none';
        jQuery.blockUI.defaults.baseZ= 9999;
        jQuery.blockUI.defaults.ignoreIfBlocked = true;
        jQuery.blockUI.defaults.fadeOut = 800;
        jQuery.blockUI.defaults.fadeIn = 800;
    },

    initFootable: function() {
        if(jQuery(".footable").length > 0) {
            jQuery(".footable").footable();
        }
    },

    initTabDrop: function() {
        if(jQuery(".tabdrop").length > 0) {
            jQuery(".tabdrop").tabdrop();
        }
    },

    //* Sonata Specific JS
    initBatchAction: function() {
        if (jQuery('#list_batch_checkbox').length > 0) {
            jQuery('#list_batch_checkbox').on('click', function() {
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
    },

    initAltPager: function() {
        if (jQuery('.rz-alt-pager').length > 0) {
            jQuery('input[type=submit]').hide();
            jQuery('.rz-alt-pager').on('change', function() {
                console.log('here'+ this.options[this.selectedIndex].value);
                window.top.location.href=this.options[this.selectedIndex].value;
            });
        }
    }
}

$.fn.scrollBottom = function() {
    return jQuery(document).height() - this.scrollTop() - this.height();
};

jQuery(window).scroll(function(e){
    var height = 0,
        $w = jQuery(window),
        $d = jQuery(document);

    if($w.scrollTop() == 0 || jQuery("#left").hasClass("sidebar-fixed"))
    {
        jQuery("#left .ui-resizable-handle").css("top", height);
    } else {
        if($w.scrollTop() + jQuery("#left .ui-resizable-handle").height() <= $d.height()) {
            height = $w.scrollTop() - 40;
        } else {
            height = $d.height() - jQuery("#left .ui-resizable-handle").height() - 40;
        }
        jQuery("#left .ui-resizable-handle").css("top", height);
    }

    if(!jQuery("#content").hasClass("nav-fixed") && jQuery("#left").hasClass("sidebar-fixed")){
        if($w.scrollTop() < 40){
            jQuery("#left").css("top", 40 - $w.scrollTop());
        } else {
            jQuery("#left").css("top", 0);
        }
    }



    rzadmin.getSidebarScrollHeight();
    rzadmin.resizeHandlerHeight();
});

jQuery(window).resize(function(e){
    rzadmin.checkLeftNav();
    rzadmin.getSidebarScrollHeight();
    rzadmin.resizeContent();
    rzadmin.resizeHandlerHeight();
});

jQuery("#main").on('heightChange', function(e){
    console.log('here');
    rzadmin.resizeContent();
});

(function( $ ){
    $.fn.retina = function(retina_part) {
        // Set default retina file part to '-2x'
        // Eg. some_image.jpg will become some_image-2x.jpg
        var settings = {'retina_part': '-2x'};
        if(retina_part) jQuery.extend(settings, { 'retina_part': retina_part });
        if(window.devicePixelRatio >= 2) {
            this.each(function(index, element) {
                if(!jQuery(element).attr('src')) return;

                var checkForRetina = new RegExp("(.+)("+settings['retina_part']+"\\.\\w{3,4})");
                if(checkForRetina.test(jQuery(element).attr('src'))) return;

                var new_image_src = jQuery(element).attr('src').replace(/(.+)(\.\w{3,4})$/, "$1"+ settings['retina_part'] +"$2");
                $.ajax({url: new_image_src, type: "HEAD", success: function() {
                    jQuery(element).attr('src', new_image_src);
                }});
            });
        }
        return this;
    }
})( jQuery );
