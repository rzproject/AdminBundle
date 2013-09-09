jQuery(document).ready(function(){
//    jQuery('input[type=checkbox],input[type=radio],input[type=file]').uniform();
//
//    jQuery('select').select2();
    rz_uniform.init();
//    rz_colorpicker.init();
    rz_progressbar.init();
    rz_ui_sliders.init();
    rz_multiselect.init();
    rz_taghandler.init();

});


//* uniform
var rz_uniform = {
    init: function() {
        jQuery(".uni_style").uniform();
    }
};

//* colorpicker
var rz_colorpicker = {
    init: function() {
        jQuery('.colorpicker').colorpicker();
    }
};

//* progressbar
var rz_progressbar = {
    init: function() {
        jQuery('.progress .bar').progressbar();
    }
}

//* select
var rz_selectpicker = {
    init: function() {
        jQuery('.selectpicker').selectpicker();
    }
}

//* sliders
var rz_ui_sliders = {
    init: function(){
        //* default slider
        jQuery( ".ui_slider1" ).slider({
            orientation: "horizontal",
            value:0,
            animate: true,
            max: 500,
            step: 10,
            value: 250,
            slide: function( event, ui ) {
                jQuery( ".ui_slider1_val" ).text(ui.value );
                jQuery( "#ui_slider_default_val" ).val(ui.value );
            }
        });
        jQuery( ".ui_slider1_val" ).text( jQuery( ".ui_slider1" ).slider( "value" ) );
        jQuery( "#ui_slider_default_val" ).val( jQuery( ".ui_slider1" ).slider( "value" ) );

        //* range slider
        jQuery( ".ui_slider2" ).slider({
            orientation: "horizontal",
            range: "min",
            animate: true,
            max: 500,
            step: 50,
            value: 100,
            slide: function( event, ui ) {
                jQuery( ".ui_slider2_val" ).text(ui.value );
                jQuery( "#ui_slider_default_val2" ).val(ui.value );
            }
        });
        jQuery( ".ui_slider2_val" ).text( "$" + jQuery( ".ui_slider2" ).slider( "value" ) );
        jQuery( "#ui_slider_default_val2" ).val( "$" + jQuery( ".ui_slider2" ).slider( "value" ) );

        jQuery( ".ui_slider3" ).slider({
            range: true,
            min: 0,
            max: 500,
            values: [ 75, 300 ],
            slide: function( event, ui ) {
                jQuery( ".ui_slider3_val" ).text( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
                jQuery( "#ui_slider_min_val" ).val( ui.values[ 0 ] );
                jQuery( "#ui_slider_max_val" ).val( ui.values[ 1 ] );
            }
        });
        jQuery( ".ui_slider3_val" ).text( jQuery( ".ui_slider3" ).slider( "values", 0 ) + " - " + jQuery( ".ui_slider3" ).slider( "values", 1 ) );
        jQuery( "#ui_slider_min_val" ).val( jQuery( ".ui_slider2" ).slider( "values", 0 ) );
        jQuery( "#ui_slider_max_val" ).val( jQuery( ".ui_slider2" ).slider( "values", 1 ) );
    }
};

//* multiselect
var rz_multiselect = {
    init: function(){
        if(jQuery('.multiselect').length) {
            //* searchable
            jQuery('.multiselect').multiSelect();
        }

    }
};

//* tag handler
var rz_taghandler = {
    init: function() {
        jQuery("#array_tag_handler").tagHandler({
            assignedTags: [ 'C', 'Perl', 'PHP' ],
            availableTags: [ 'C', 'C++', 'C#', 'Java', 'Perl', 'PHP', 'Python', 'Lorem', 'Ipsum', 'Ruby', 'Symfony', 'Yii', 'Sonata' ],
            autocomplete: true
        });
        jQuery("#max_tags_tag_handler").tagHandler({
            assignedTags: [ 'Perl' ],
            availableTags: [ 'C', 'C++', 'C#', 'Java', 'Perl', 'PHP', 'Python' ],
            autocomplete: true,
            maxTags:5
        });
    }
};


