jQuery(document).ready(function(){
    rz_uniform_batch_action.init();
    rz_footable.init();
});

//* uniform
var rz_uniform_batch_action = {
    init: function() {
        jQuery(".uni_style_batch_action").uniform();
    }
};

//* footable
var rz_footable = {
    init: function() {
        jQuery(".footable").footable();
    }
};

