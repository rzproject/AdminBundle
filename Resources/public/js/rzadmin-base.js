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
        jQuery('html').removeClass('no-js');
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
        rzadmin.initMasonry();
        //rzadmin.initChosen();

        //Sonata
        rzadmin.addPrettyErrors(document);
        rzadmin.addFilters(document);
        rzadmin.initListPopovers();
        rzadmin.setObjectFieldValue(document);
        rzadmin.setupCollectionButtons(document);
        rzadmin.setupPerPageSwitcher(document);
        rzadmin.setupFormTabsForErrors(document);
        rzadmin.initQtips(document);
    },

    shared_setup: function(subject) {
        rzadmin.log("[Admin] apply shared_setup");
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
        rzadmin.initRetina();
        rzadmin.initProgressBar();
        rzadmin.initBatchAction();
        rzadmin.initAltPager();
        rzadmin.initBlockUI();
        rzadmin.mediaGrid();
        rzadmin.mediaGirdMixed();
        rzadmin.initFootable();
        rzadmin.initTabDrop();
        rzadmin.dashboardCurrentDateTime();
        rzadmin.initMasonry();
        //rzadmin.initChosen();

        //Sonata
        rzadmin.addPrettyErrors(subject);
        rzadmin.addFilters(subject);
        rzadmin.initListPopovers();
        rzadmin.setObjectFieldValue(subject);
        rzadmin.setupCollectionButtons(subject);
        rzadmin.setupPerPageSwitcher(subject);
        rzadmin.setupFormTabsForErrors(subject);

        if (typeof rzadmin_fieldtype !== 'undefined') {
            rzadmin_fieldtype.init();
        }
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
                console.log('heres');
                var $el = jQuery(this);
                $el.css('width', $el.parent().width()+'px');
                $el.find(".chosen-drop").css('width', ($el.parent().width()-2)+'px');
//                $el.find(".chosen-search input").css('width', ($el.parent().width()-37)+'px');
            });
        }
    },

    resizeChosenModal: function(modal){
        if (jQuery('.chosen-container', modal).length > 0){

            jQuery('.chosen-container', modal).each(function() {
                var $el = jQuery(this);
                $el.css('width', $el.parent().width()+'px');
                $el.find(".chosen-drop").css('width', ($el.parent().width()-2)+'px');
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
            //jQuery("a[data-toggle=popover]")
            jQuery("[rel=popover]")
                    .popover()
                    .click(function(e) {
                        e.preventDefault();
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
                if(jQuery('[rel=tooltip]').length > 0){
                    jQuery('[rel=tooltip]').tooltip();
                }

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

        // daterangepicker
        if(jQuery('.daterangepick').length > 0){
            jQuery('.daterangepick').daterangepicker();
        }

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

        if(jQuery(".select2-me").length > 0){
            jQuery(".select2-me").select2();
        }

        if(jQuery(".selectpicker").length > 0){
            jQuery(".selectpicker").selectpicker();
        }
    },

    initChosen:function() {

//        if(jQuery('.chosen-select').length>0) {
//            console.log('chosen-select');
//            jQuery(".chosen-select").chosen({
//                allow_single_deselect: true
//            });
//
//            rzadmin.resizeChosen();
//        }
//
//        if(jQuery(".chosen-select-multiple").length > 0) {
//            console.log('chosen-select-multiple');
//            jQuery(".chosen-select-multiple").chosen().change(function(){
//                var ret = null;
//                $(this).find('.chosen-choices').each(function(){})
//            });
//        }
    },

    initSpinners:function() {

        // spinner
        if(jQuery('.spinner').length > 0){
            jQuery('.spinner').spinner();
        }
    },

    initRetina: function() {
        if(jQuery('.retina-ready').length > 0){
            jQuery(".retina-ready").retina("@2x");
        }
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

    initMasonry: function() {
        if($(".rz-masonry-gallery").length > 0){
            $(".rz-masonry-gallery").imagesLoaded(function(){
                $(".rz-masonry-gallery").masonry({
                    itemSelector: '.rz-gallery-item',
                    isAnimated: true,
                    isFitWidth: true,
                    gutter: 10
                });
            });
        }
    },

    initElements: function(modal) {

        rzadmin.log('FUNCTION CALL [rzadmin-base.js] initElements');
        //rzadmin.log(sprintf('VARIABLE: modal => %s', modal));

        console.log(modal);

        if(jQuery(".icheck-me", modal).length > 0){
            rzadmin.log('PROCESSING initElements [%s]', 'icheck-me');
            jQuery(".icheck-me", modal).each(function(){
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

        //TODO: change to selector
        if (jQuery('[class*="selectpicker"]', modal).length > 0) {
            rzadmin.log('PROCESSING initElements => selectpicker');
            jQuery('[class*="selectpicker"]', modal).selectpicker();
        }

        if (jQuery('.footable', modal).length > 0) {
            rzadmin.log('PROCESSING initElements [%s]', 'footable');
            jQuery('.footable', modal).footable();
        }

        if(jQuery('select.chosen-select', modal).length>0) {
            rzadmin.log('PROCESSING initElements [%s]', 'select.chosen-select');
            modal.find("select.chosen-select").select2();
        }

//        if(jQuery('.chosen-select', modal).length>0) {
//            modal.find(".chosen-select").chosen({
//                allow_single_deselect: true
//            });
//
//            rzadmin.resizeChosenModal(modal);
//        }
//
//        if(jQuery(".chosen-select-multiple", modal).length > 0) {
//            modal.find(".chosen-select-multiple").chosen().change(function(){
//                var ret = null;
//                $(this).find('.chosen-choices').each(function(){})
//            });
//        }

        if(jQuery('.rz-datepicker', modal).length > 0) {
            rzadmin.log('PROCESSING initElements [%s]', 'rz-datepicker');
            modal.find('.rz-datepicker').datepicker({'autoclose': true});
        }

        if(jQuery('.rz-timepicker', modal).length > 0) {
            rzadmin.log('PROCESSING initElements [%s]', 'rz-timepicker');
            modal.find('.rz-timepicker').timepicker({'defaultTime': false, 'showMeridian': false});
        }

        if(jQuery('.rz-datetimepicker', modal).length > 0) {
            rzadmin.log('PROCESSING initElements [%s]', 'rz-datetimepicker');
            modal.find('.rz-datetimepicker').datetimepicker({
                autoclose: true,
                todayBtn: true,
                pickerPosition: "bottom-left",
                minuteStep: 5
            });
        }

        if(jQuery('.datepicker.dropdown-menu', modal).length > 0) {
            rzadmin.log('PROCESSING initElements [%s]', 'datepicker.dropdown-menu');
            jQuery('.datepicker.dropdown-menu').css('z-index', 9999);
        }


        if(jQuery('.rz_grid ul', modal).length > 0) {
            rzadmin.log('PROCESSING initElements [%s]', 'rz_grid ul');
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

        if(jQuery('.multiselect', modal).length > 0)
        {
            rzadmin.log('PROCESSING initElements [%s]', 'multiselect');
            jQuery(".multiselect", modal).each(function(){
                var $el = jQuery(this);
                var selectableHeader = $el.attr('data-selectableheader'),
                    selectionHeader  = $el.attr('data-selectionheader');
                if(selectableHeader != undefined)
                {
                    selectableHeader = "<div class='multi-custom-header'>"+selectableHeader+"</div>";
                }
                if(selectionHeader != undefined)
                {
                    selectionHeader = "<div class='multi-custom-header'>"+selectionHeader+"</div>";
                }
                $el.multiSelect({
                    selectionHeader : selectionHeader,
                    selectableHeader : selectableHeader
                });
            });
        }

        if(jQuery(".rz-masonry-gallery", modal).length > 0){
            rzadmin.log('PROCESSING initElements [%s]', 'rz-masonry-gallery');
            jQuery(".rz-masonry-gallery", modal).imagesLoaded(function(){
                $(".rz-masonry-gallery", modal).masonry({
                    itemSelector: '.rz-gallery-item',
                    isAnimated: true,
                    isFitWidth: true,
                    gutter: 10
                });
            });
        }
    },

    //* Sonata Specific JS
    initBatchAction: function() {
        if (jQuery('#list_batch_checkbox').length > 0) {

            if(jQuery('#list_batch_checkbox').hasClass( "icheck-me" )) {
                jQuery('#list_batch_checkbox').on('ifChecked', function(event){
                    jQuery.each(jQuery('.admin-field-batch'), jQuery.proxy(function(key, el) {
                        $(el).iCheck('check');
                    }, this));
                });

                jQuery('#list_batch_checkbox').on('ifUnchecked', function(event){
                    var is_checked = $(this).is(':checked');
                    jQuery.each(jQuery('.admin-field-batch'), jQuery.proxy(function(key, el) {
                        $(el).iCheck('uncheck');
                    }, this));
                });
            } else {
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
        }
    },

    initAltPager: function() {
        if (jQuery('.rz-alt-pager').length > 0) {
            jQuery('input[type=submit]').hide();
            jQuery('.rz-alt-pager').on('change', function() {
                window.top.location.href=this.options[this.selectedIndex].value;
            });
        }
    },

    initListPopovers: function() {
        //specific for rzadmin
        if (jQuery("#rz-admin-list-settings-batch-action-trigger").length > 0) {
            jQuery("#rz-admin-list-settings-batch-action-trigger")
                .popover({html: true})
                .click(function(e) {
                    e.preventDefault();
                    rzadmin.initElements(jQuery('#rz-admin-list-settings-batch-action-container'));
                    jQuery("#rz-admin-list-settings-download-action-trigger").popover('hide');
                    jQuery("#rz-admin-list-settings-per-page-action-trigger").popover('hide');

                });
        }

        if (jQuery("#rz-admin-list-settings-download-action-trigger").length > 0) {
            jQuery("#rz-admin-list-settings-download-action-trigger")
                .popover({html: true})
                .click(function(e) {
                    e.preventDefault();
                    jQuery("#rz-admin-list-settings-batch-action-trigger").popover('hide');
                    jQuery("#rz-admin-list-settings-per-page-action-trigger").popover('hide');
                });
        }

        if (jQuery("#rz-admin-list-settings-per-page-action-trigger").length > 0) {
            jQuery("#rz-admin-list-settings-per-page-action-trigger")
                .popover({html: true})
                .click(function(e) {
                    e.preventDefault();
                    rzadmin.initElements(jQuery('#rz-admin-list-settings-per-page-action-container'));
                    rzadmin.setupPerPageSwitcher();
                    jQuery("#rz-admin-list-settings-batch-action-trigger").popover('hide');
                    jQuery("#rz-admin-list-settings-download-action-trigger").popover('hide');
                });
        }
    },

    /** Sonata Admin **/

    //* detect touch devices
    isTouchDevice: function() {
        return !!('ontouchstart' in window);
    },

    /**
     * display related errors messages
     *
     * @param subject
     */
    addPrettyErrors: function(subject) {

        if(!rzadmin.isTouchDevice()) {

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
                if(jQuery(input).is('text')) {
                    target = input;
                }
                else {
                    //input.wrap('<span></span>');
                    //target = input.parent();
                    target =input.closest('.control-group').find('label');
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
                            my		: 'right bottom',
                            at		: 'top left',
                            adjust : {
                                method: 'shift'

                            },
                            viewport: jQuery(window)
                        },
                        style: {
                            classes: 'qtip-bootstrap qtip-shadow'
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

    addFilters: function(subject) {
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
    setObjectFieldValue: function(subject) {

        jQuery('a.sonata-ba-edit-inline', subject).click(function(event) {
            rzadmin.stopEvent(event);

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
                        rzadmin.setObjectFieldValue(elm);
                    } else {
                        jQuery(subject).parent().effect("highlight", {'color' : '#C43C35'}, 2000);
                    }
                }
            });
        });
    },

    setupCollectionButtons: function(subject) {

        jQuery(subject).on('click', '.sonata-collection-add', function(event) {
            rzadmin.stopEvent(event);

            var container = jQuery(this).closest('[data-prototype]');
            var proto = container.attr('data-prototype');
            var protoName = container.attr('data-prototype-name') || '__name__';
            // Set field id
            //var idRegexp = new RegExp(container.attr('id')+'___name__','g');
            var idRegexp = new RegExp(container.attr('id')+'_'+protoName,'g');
            proto = proto.replace(idRegexp, container.attr('id')+'_'+(container.children().length - 1));

            // Set field name

            var parts = container.attr('id').split('_');
            var nameRegexp = new RegExp(parts[parts.length-1]+'\\]\\['+protoName,'g');
            proto = proto.replace(nameRegexp, parts[parts.length-1]+']['+(container.children().length - 1));

            jQuery(proto)
                .insertAfter(jQuery('.sonata-collection-container-'+container.attr('id')))
                .trigger('sonata-admin-append-form-element')
            ;

            jQuery(this).trigger('sonata-collection-item-added');

        });

        jQuery(subject).on('click', '.sonata-collection-delete', function(event) {
            rzadmin.stopEvent(event);

            jQuery(this).closest('.sonata-collection-row').remove();

            jQuery(this).trigger('sonata-collection-item-deleted');
        });
    },

    setupPerPageSwitcher: function(subject) {
        if(jQuery('select.per-page').length > 0) {
            jQuery('select.per-page').change(function(event) {
                jQuery('input[type=submit]').hide();

                window.top.location.href=this.options[this.selectedIndex].value;
            });
        }
    },

    setupFormTabsForErrors: function(subject) {
        // Switch to first tab with server side validation errors on page load
        jQuery('form', subject).each(function() {
            rzadmin.showFormFirstTabWithErrors(jQuery(this), '.sonata-ba-field-error');
        });

        // Switch to first tab with HTML5 errors on form submit
        jQuery(subject)
            .on('click', 'form [type="submit"]', function() {
                rzadmin.showFormFirstTabWithErrors(jQuery(this).closest('form'), ':invalid');
            })
            .on('keypress', 'form [type="text"]', function(e) {
                if (13 === e.which) {
                    rzadmin.showFormFirstTabWithErrors(jQuery(this), ':invalid');
                }
            })
        ;
    },

    initQtips: function(subject) {

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
            if(jQuery('.ttip_b').length > 0) {
                jQuery('.ttip_b').qtip( jQuery.extend({}, shared, {
                    position	: {
                        my		: 'top center',
                        at		: 'bottom center',
                        viewport: jQuery(window)
                    }
                }));
            }
            if(jQuery('.ttip_t').length > 0) {
                jQuery('.ttip_t').qtip( jQuery.extend({}, shared, {
                    position: {
                        my		: 'bottom center',
                        at		: 'top center',
                        viewport: jQuery(window)
                    }
                }));
            }
            if(jQuery('.ttip_l').length > 0) {
                jQuery('.ttip_l').qtip( jQuery.extend({}, shared, {
                    position: {
                        my		: 'right center',
                        at		: 'left center',
                        viewport: jQuery(window)
                    }
                }));
            }
            if(jQuery('.ttip_r').length > 0) {
                jQuery('.ttip_r').qtip( jQuery.extend({}, shared, {
                    position: {
                        my		: 'left center',
                        at		: 'right center',
                        viewport: jQuery(window)
                    }
                }));
            };

    },

    showFormFirstTabWithErrors: function(form, errorSelector) {
        var tabs = form.find('.rz-form-tabs a'),
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


    /** DoctrineORMAdminBundle */

    /** DoctrineORMAdminBundle One To Many */

    rz_orm_otm: {
        id: null,
        sortable_id: null,
        type: 'table',

        init:function(options) {
            rzadmin.rz_orm_otm.id = options.id;
            rzadmin.rz_orm_otm.sortable_id = options.sortable_id;
            rzadmin.rz_orm_otm.type = options.type;
            rzadmin.rz_orm_otm.initSortable();
            rzadmin.rz_orm_otm.addElement();
        },

        initSortable: function() {
            //table
            if (jQuery('div#field_container_'+rzadmin.rz_orm_otm.id+' tbody.sonata-ba-tbody').length > 0) {
                jQuery('div#field_container_'+rzadmin.rz_orm_otm.id+' tbody.sonata-ba-tbody').sortable({
                    axis: 'y',
                    opacity: 0.6,
                    items: 'tr',
                    stop: rzadmin.rz_orm_otm.addElement
                });
            } else if (jQuery('div#field_container_'+rzadmin.rz_orm_otm.id+' .rz-widget-container-one-to-many').length > 0) {
                jQuery('div#field_container_'+rzadmin.rz_orm_otm.id+' .rz-widget-container-one-to-many').sortable({
                    axis: 'y',
                    opacity: 0.6,
                    items: 'div.sonata-ba-box',
                    stop: rzadmin.rz_orm_otm.addElement
                });
            }

            rzadmin.rz_orm_otm.applyPositionValue();
        },

        applyPositionValue: function() {

            var container = null;
            // update the input value position
            if (rzadmin.rz_orm_otm.type =='table') {

                container = 'div#field_container_'+rzadmin.rz_orm_otm.id+
                            ' tbody.sonata-ba-tbody td.sonata-ba-td-'+rzadmin.rz_orm_otm.id+'-'+rzadmin.rz_orm_otm.sortable_id;

            } else if (rzadmin.rz_orm_otm.type == 'form'){

                container = 'div#field_container_'+rzadmin.rz_orm_otm.id+
                            ' .sonata-ba-box .sonata-ba-control-group-'+rzadmin.rz_orm_otm.id+'-'+rzadmin.rz_orm_otm.sortable_id;
            }

            jQuery(container).each(function(index, element) {
                    if (rzadmin.rz_orm_otm.type =='table') {
                        // remove the sortable handler and put it back
                        jQuery('span.sonata-ba-sortable-handler', element).remove();
                        jQuery(element).append('<span class="sonata-ba-sortable-handler"><i class="icon-move"></i></span>');
                        jQuery('input', element).hide();
                    } else if (rzadmin.rz_orm_otm.type =='form') {
                        jQuery('span.sonata-ba-sortable-handler', element).remove();
                        jQuery('.controls', element).append('<span class="sonata-ba-sortable-handler"><i class="icon-move"></i></span>');
                        jQuery('input', element).hide();
                    }
                });

            jQuery(container+' input').each(function(index, value) {
                    //update position
                    jQuery(value).val(index + 1);
                });
        },

        addElement: function() {
            if (jQuery('#sonata-ba-field-container-'+rzadmin.rz_orm_otm.id).length > 0 ) {
                jQuery('#sonata-ba-field-container-'+rzadmin.rz_orm_otm.id).on('sonata.add_element', function() {
                    rzadmin.rz_orm_otm.applyPositionValue();
                    if (rzadmin.rz_orm_otm.type =='table') {
                        jQuery('div#field_container_'+rzadmin.rz_orm_otm.id+' tbody.sonata-ba-tbody').sortable('refresh');
                    } else if (rzadmin.rz_orm_otm.type =='table') {
                        jQuery('div#field_container_'+rzadmin.rz_orm_otm.id+' .rz-widget-container-one-to-many').sortable('refresh');
                    }
                    rzadmin.initElements(jQuery('#field_container_'+rzadmin.rz_orm_otm.id));
                });

                rzadmin.rz_orm_otm.applyPositionValue();
            }
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
