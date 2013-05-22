$(document).ready(function() {
    //* init grid
    rz_media_grid.init();
    //* mixed grid
    rz_media_grid.mixed();
});

rz_media_grid = {
    init: function() {
        $('.rz_grid').each(function(){
            $(this).find('.yt_vid,.self_vid,.vimeo_vid').append('<span class="vid_ico"/>');
        });
    },
    mixed: function() {
        $('.rz_grid ul').imagesLoaded(function() {
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

//            $('#mixed_grid ul li > a').not('.int_video').attr('rel', 'mixed_gallery').colorbox({
//                maxWidth	    : '80%',
//                maxHeight	    : '80%',
//                opacity		    : '0.3',
//                photo		    : true,
//                loop		    : false,
//                fixed		    : true
//            });

//            if($(window).width() < 768 ) {
//                var videoW = '90%',
//                    videoH = '90%';
//            } else {
//                var videoW = '640px',
//                    videoH = '360px';
//            }

//            $('#mixed_grid .int_video').attr('rel', 'mixed_gallery').colorbox({
//                width    		: videoW,
//                height	   		: videoH,
//                opacity		    : '0.3',
//                inline		    : true,
//                loop		    : false,
//                scrolling		: false,
//                fixed		    : true,
//                onComplete 		: function() {
//                    $.colorbox.resize();
//                }
//            });

        });
    }
};
