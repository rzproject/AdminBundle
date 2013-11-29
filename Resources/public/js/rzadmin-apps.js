



























$(document).ready(function () {

    resizeContent();

//    if($(".username-check").length > 0){
//        var timeout;
//
//        $(".username-check").change(function(e){
//            var $this = $(this);
//            $this.parent().next().html("<i class='icon-spinner icon-spin'></i> Checking availability...");
//            $.post("/check",{username: $this.val()}, function(e){
//                if(e.available == "true"){
//                    $this.parent().next().html("<i class='icon-ok'></i> Username is available!");
//                    $this.parents(".control-group").removeClass("error").addClass("success");
//                } else {
//                    $this.parent().next().html("<i class='icon-remove'></i> Username not available!");
//                    $this.parents(".control-group").removeClass("success").addClass("error");
//                }
//            }, "json");
//
//        });
//
//        $(".username-check-force").click(function(e){
//            e.preventDefault();
//            $(".username-check").trigger("change");
//        });
//
//        $(".username-check").keyup(function(e){
//            clearTimeout ( timeout );
//            timeout = setTimeout(function(){
//                $(".username-check").trigger("change");
//            }, 500);
//        });
//    }

//    if($(".gallery-dynamic").length > 0){
//        $(".gallery-dynamic").imagesLoaded(function(){
//            $(".gallery-dynamic").masonry({
//                itemSelector: 'li',
//                columnWidth: 201,
//                isAnimated: true
//            });
//        });
//    }

    $(".gototop").click(function(e){
        e.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 600);
    });

//    if($("body").attr("data-mobile-sidebar") == "slide"){
//        $("body").touchwipe({
//            wipeRight: function(){
//                $("#left").show().addClass("mobile-show");
//                initSidebarScroll();
//            },
//            wipeLeft:function(){
//                $("#left").hide().removeClass("mobile-show");
//            },
//            preventDefaultEvents: false
//        });
//    }

//    if($("body").attr("data-mobile-sidebar") == "button"){
//        $(".mobile-sidebar-toggle").click(function(e){
//            e.preventDefault();
//            $("#left").toggle().toggleClass("mobile-show");
//            initSidebarScroll();
//        });
//    }


//    $('body').on('click',".change-input", function(e){
//        e.preventDefault();
//        var $el = $(this);
//        var $inputToClone = $el.parent().prev(),
//            $parentCloned = $el.parent().clone();
//        $parentCloned.html($inputToClone.clone().val(""));
//        $inputToClone.after($parentCloned);
//        $el.addClass("btn-satgreen update-input").removeClass("btn-grey-4 change-input").text("Update");
//    });

//    $('body').on("click", '.update-input', function(e){
//        e.preventDefault();
//        var $el = $(this);
//        var $parent = $el.parent();
//        $el.after('<span><i class="icon-spinner icon-spin"></i>Updating...</span>');
//        setTimeout(function(){
//            $parent.find("span").remove();
//            $parent.prev().slideUp(200, function(){
//                $parent.prev().remove();
//                $el.removeClass("update-input btn-satgreen").addClass("btn-grey-4 change-input").text("Change");
//            });
//        }, 1000);
//    });



//    setTimeout(function(){
//        slimScrollUpdate($(".messages").parent(), 9999);
//    }, 1000);

    createSubNav();

    // hide breadcrumbs
//    $(".breadcrumbs .close-bread > a").click(function (e) {
//        e.preventDefault();
//        $(".breadcrumbs").fadeOut();
//    });





//    if($('#vmap').length > 0)
//    {
//        $('#vmap').vectorMap({
//            map: 'world_en',
//            backgroundColor: null,
//            color: '#ffffff',
//            hoverOpacity: 0.7,
//            selectedColor: '#2d91ef',
//            enableZoom: true,
//            showTooltip: false,
//            values: sample_data,
//            scaleColors: ['#8cc3f6', '#5c86ac'],
//            normalizeFunction: 'polynomial',
//            onRegionClick: function(){
//                alert("This Region has "+(Math.floor(Math.random() * 10) + 1) + " users!");
//            }
//        });
//    }

//    $(".custom-checkbox").each(function () {
//        var $el = $(this);
//        if ($el.hasClass("checkbox-active")) {
//            $el.find("i").toggleClass("icon-check-empty").toggleClass("icon-check");
//        }
//        $el.bind('click', function (e) {
//            e.preventDefault();
//            $el.find("i").toggleClass("icon-check-empty").toggleClass("icon-check");
//            $el.toggleClass("checkbox-active");
//        });
//    });

    // task-list
//    $(".tasklist").on('click', "li", function(e){
//        var $el = $(this),
//            $checkbox = $(this).find('input[type=checkbox]').first();
//        $el.toggleClass('done');
//
//        if(e.target.nodeName == 'LABEL'){
//            e.preventDefault();
//        }
//
//        if(e.target.nodeName != "INS" && e.target.nodeName != 'INPUT'){
//            $checkbox.prop('checked', !($checkbox.prop('checked')));
//            $(".tasklist input").iCheck("update");
//        }
//    });

//    $(".tasklist").on("is.Changed", 'input[type=checkbox]', function(){
//        $(this).parents("li").toggleClass("done");
//    });
//
//    if($("#new-task .select2-me").length > 0){
//        function formatIcons(option){
//            if (!option.id) return option.text;
//            return "<i class='" + option.text +"'></i> ." + option.text;
//        }
//        $("#new-task .select2-me").select2({
//            formatResult: formatIcons,
//            formatSelection:formatIcons,
//            escapeMarkup: function(m) { return m; }
//        });
//    }

//    $(".tasklist").on('click', '.task-bookmark', function(e){
//        var $el = $(this),
//            $lielement = $(this).parents('li'),
//            $ulelement = $(this).parents('ul');
//        e.preventDefault();
//        e.stopPropagation();
//        $lielement.toggleClass('bookmarked');
//
//        if($lielement.hasClass('bookmarked')){
//            $lielement.fadeOut(200,function(){
//                $lielement.prependTo($ulelement).fadeIn();
//            });
//        }else{
//            if($ulelement.find('.bookmarked').length > 0){
//                $lielement.fadeOut(200,function(){
//                    $lielement.insertAfter($ulelement.find('.bookmarked').last()).fadeIn();
//                });
//            }else{
//                $lielement.fadeOut(200,function(){
//                    $lielement.prependTo($ulelement).fadeIn();
//                });
//            }
//        }
//    });

//    $(".tasklist").on('click', '.task-delete', function(e){
//        e.preventDefault();
//        e.stopPropagation();
//        var $el = $(this);
//        $el.parents("li").fadeOut();
//    });

//    $(".tasklist").sortable({
//        items: "li",
//        opacity: 0.7,
//        placeholder: 'widget-placeholder-2',
//        forcePlaceholderSize: true,
//        tolerance: "pointer"
//    });

//    $(".sortable-box").sortable({
//        connectWith: ".box",
//        items: ".box",
//        opacity: 0.7,
//        placeholder: 'widget-placeholder',
//        forcePlaceholderSize: true,
//        tolerance: "pointer",
//        dropOnEmpty:true
//    });

//    $(".toggle-subnav").click(function (e) {
//        e.preventDefault();
//        var $el = $(this);
//        $el.parents(".subnav").toggleClass("subnav-hidden").find('.subnav-menu,.subnav-content').slideToggle("fast");
//        $el.find("i").toggleClass("icon-angle-down").toggleClass("icon-angle-right");
//
//        if($("#left").hasClass("mobile-show") || $("#left").hasClass("sidebar-fixed")){
//            getSidebarScrollHeight();
//            $("#left").getNiceScroll().resize().show();
//        }
//    });
//
//    $("#left").sortable({
//        items:".subnav",
//        placeholder: "widget-placeholder",
//        forcePlaceholderSize: true,
//        axis: "y",
//        handle:".subnav-title",
//        tolerance:"pointer"
//    });


//    $(".new-task-form").submit(function(e){
//        e.preventDefault();
//        $("#new-task").modal("hide");
//        var $form = $(this),
//            $tasklist = $(".tasklist");
//        var $icon = $form.find("select[name=icons]"),
//            $name = $form.find("input[name=task-name]"),
//            $bookmark = $form.find("input[name=task-bookmarked]");
//        if($name.val() != ""){
//            var elementToAdd = "";
//            ($bookmark.is(":checked")) ? elementToAdd += "<li class='bookmarked'>" : elementToAdd += "<li>";
//
//            elementToAdd += '<div class="check"><input type="checkbox" class="icheck-me" data-skin="square" data-color="blue"></div><span class="task"><i class="' + $icon.select2("val") + '"></i><span>' + $name.val() + '</span></span><span class="task-actions"><a href="#" class="task-delete" rel="tooltip" title="Delete that task"><i class="icon-remove"></i></a><a href="#" class="task-bookmark" rel="tooltip" title="Mark as important"><i class="icon-bookmark-empty"></i></a></span></li>';
//
//            if($tasklist.find(".bookmarked").length > 0){
//                if($bookmark.is(":checked")){
//                    $tasklist.find(".bookmarked").first().before(elementToAdd);
//                } else {
//                    $tasklist.find(".bookmarked").last().after(elementToAdd);
//                }
//            } else {
//                $tasklist.prepend(elementToAdd);
//            }
//
//            icheck();
//            $tasklist.find("[rel=tooltip]").tooltip();
//
//            $icon.select2("val", 'icon-adjust');
//            $name.val("");
//            $bookmark.prop("checked", false);
//        }
//    });

//    $("#message-form .text input").on("focus", function (e) {
//        var $el = $(this);
//        $el.parents(".messages").find(".typing").addClass("active").find(".name").html("John Doe");
//        slimScrollUpdate($el.parents(".scrollable"), 100000);
//    });
//
//    $("#message-form .text input").on("blur", function (e) {
//        var $el = $(this);
//        $el.parents(".messages").find(".typing").removeClass("active");
//        slimScrollUpdate($el.parents(".scrollable"), 100000);
//    });

//    if($(".jq-datepicker").length > 0){
//        $(".jq-datepicker").datepicker({
//            showOtherMonths: true,
//            selectOtherMonths: true,
//            prevText: "",
//            nextText: ""
//        });
//    }
//
//    if($(".spark-me").length > 0){
//        $(".spark-me").sparkline("html", {
//            height: '25px',
//            enableTagOptions: true
//        });
//    }


//    if(!$("#left").hasClass("no-resize")){
//        $("#left").resizable({
//            minWidth: 60,
//            handles: "e",
//            resize: function (event, ui) {
//                var searchInput = $('.search-form .search-pane input[type=text]'),
//                    content = $("#main");
//                searchInput.css({
//                    width: ui.size.width - 55
//                });
//                if(Math.abs(200 - ui.size.width) <= 20){
//                    $("#left").css("width", 200);
//                    searchInput.css("width", 145 );
//                    content.css("margin-left", 200);
//                } else{
//                    content.css("margin-left", $("#left").width());
//                }
//
//            },
//            stop: function(){
//                $("#left .ui-resizable-handle").css("background","none");
//            },
//            start: function(){
//                $("#left .ui-resizable-handle").css("background","#aaa");
//            }
//        });
//    }

    $("[rel=popover]").popover();

    $('.toggle-nav').click(function(e){
        e.preventDefault();
        hideNav();
    });

    if($("#content").hasClass("nav-hidden")){
        hideNav();
    }

//    $('.table-mail .sel-star').click(function(e){
//        e.preventDefault();
//        e.stopPropagation();
//        var $el = $(this);
//        $el.toggleClass('active');
//    });

//    $('.table .sel-all').change(function(e){
//        e.preventDefault();
//        e.stopPropagation();
//        var $el = $(this);
//        $el.parents('.table').find("tbody .selectable").prop('checked', (el.prop('checked')));
//    });

//    $('.table-mail > tbody > tr').click(function(e){
//        var $el = $(this);
//        var checkbox = $el.find('.table-checkbox > input');
//        $el.toggleClass('warning');
//
//        if(e.target.nodeName != 'INPUT')
//        {
//            checkbox.prop('checked', !(checkbox.prop('checked')));
//        }
//    });

// set resize handler to corret height
    resizeHandlerHeight();

//    $(".table .alpha").click(function (e) {
//        e.preventDefault();
//        var $el = $(this),
//            str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
//            elements = "",
//            available = [];
//        $el.parents().find('.alpha .alpha-val span').each(function(){
//            available.push($(this).text());
//        });
//
//        elements += "<li class='active'><span>All</span></li>";
//
//        for(var i=0; i<str.length; i++)
//        {
//            var active = ($.inArray(str.charAt(i), available) != -1) ? " class='active'" : "";
//            elements += "<li"+active+"><span>"+str.charAt(i)+"</span></li>";
//        }
//        $el.parents(".table").before("<div class='letterbox'><ul class='letter'>"+elements+"</ul></div>");
//        $(".letterbox .letter > .active").click(function(){
//            var $el = $(this);
//            if($el.text() != "All"){
//                slimScrollUpdate($el.parents(".scrollable"), 0);
//                var scrollToElement = $el.parents(".box-content").find(".table .alpha:contains('"+$el.text()+"')");
//                slimScrollUpdate($el.parents(".scrollable"), scrollToElement.position().top);
//            }
//            $el.parents(".letterbox").remove();
//        });
//    });

//    $(".theme-colors > li > span").hover(function(e){
//        var $el = $(this),
//            body = $('body');
//        body.attr("class","").addClass("theme-"+$el.attr("class"));
//    }, function(){
//        var $el = $(this),
//            body = $('body');
//        if(body.attr("data-theme") !== undefined) {
//            body.attr("class","").addClass(body.attr("data-theme"));
//        } else {
//            body.attr("class","");
//        }
//    }).click(function(){
//            var $el = $(this);
//            $("body").addClass("theme-"+$el.attr("class")).attr("data-theme","theme-"+$el.attr("class"));
//        });

//    $(".version-toggle > a").click(function(e){
//        e.preventDefault();
//        e.stopPropagation();
//        var $el = $(this);
//        var parent = $el.parent();
//        if(!$el.hasClass("active")){
//            parent.find(".active").removeClass("active");
//            $el.addClass("active");
//        }
//
//        if($el.hasClass("set-fixed")){
//            versionFixed();
//        } else {
//            versionFluid();
//        }
//    });

    $(".topbar-toggle > a").click(function(e){
        e.preventDefault();
        e.stopPropagation();
        var $el = $(this);
        var $parent = $el.parent();
        if(!$el.hasClass("active")){
            $parent.find(".active").removeClass("active");
            $el.addClass("active");
        }

        if($el.hasClass("set-topbar-fixed")){
            topbarFixed();
        } else {
            topbarFluid();
        }
    });

//    $(".sidebar-toggle > a").click(function(e){
//        e.preventDefault();
//        e.stopPropagation();
//        var $el = $(this);
//        var $parent = $el.parent();
//        if(!$el.hasClass("active")){
//            $parent.find(".active").removeClass("active");
//            $el.addClass("active");
//        }
//
//        $(".search-form .search-pane input").attr("style", "");
//        $("#main").attr("style","");
//
//        if($el.hasClass("set-sidebar-fixed")){
//            sidebarFixed();
//        } else {
//            sidebarFluid();
//        }
//    });


//    $(".del-gallery-pic").click(function(e){
//        e.preventDefault();
//        var $el = $(this);
//        var $parent = $el.parents("li");
//        $parent.fadeOut(400, function(){
//            $parent.remove();
//        });
//    });

    checkLeftNav();

    // check layout
    if($("body").attr("data-layout") == "fixed"){
        versionFixed();
    }

    if($("body").attr("data-layout-topbar") == "fixed"){
        topbarFixed();
    }

    if($("body").attr("data-layout-sidebar") == "fixed"){
        sidebarFixed();
    }

});

$.fn.scrollBottom = function() {
    return $(document).height() - this.scrollTop() - this.height();
};

$(window).scroll(function(e){
    var height = 0,
        $w = $(window),
        $d = $(document);

    if($w.scrollTop() == 0 || $("#left").hasClass("sidebar-fixed"))
    {
        $("#left .ui-resizable-handle").css("top", height);
    } else {
        if($w.scrollTop() + $("#left .ui-resizable-handle").height() <= $d.height()) {
            height = $w.scrollTop() - 40;
        } else {
            height = $d.height() - $("#left .ui-resizable-handle").height() - 40;
        }
        $("#left .ui-resizable-handle").css("top", height);
    }

    if(!$("#content").hasClass("nav-fixed") && $("#left").hasClass("sidebar-fixed")){
        if($w.scrollTop() < 40){
            $("#left").css("top", 40 - $w.scrollTop());
        } else {
            $("#left").css("top", 0);
        }
    }



    getSidebarScrollHeight();
    resizeHandlerHeight();
});

$(window).resize(function(e){
    checkLeftNav();
    getSidebarScrollHeight();
    resizeContent();
    resizeHandlerHeight();
});
