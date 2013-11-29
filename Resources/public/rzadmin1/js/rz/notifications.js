jQuery(document).ready(function(){
    jQuery('#rz-gritter1').on('click', function() {
      rz_gritter.addPrimary('Sticky Notice!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.');
    });

    jQuery('#rz-gritter2').on('click', function() {
        rz_gritter.addInfo('Sticky Notice!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.');
    });

    jQuery('#rz-gritter3').on('click', function() {
        rz_gritter.addSuccess('Sticky Notice!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.');
    });

    jQuery('#rz-gritter4').on('click', function() {
        rz_gritter.addWarning('Sticky Notice!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.');
    });

    jQuery('#rz-gritter5').on('click', function() {
        rz_gritter.addDanger('Sticky Notice!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.');
    });

    jQuery('#rz-gritter6').on('click', function() {
        rz_gritter.addDefault('Sticky Notice!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.');
    });
});

//* gritter
var rz_gritter = {
    addPrimary: function(title, text) {
        this.add(title, text, 'gritter-primary');
    },
    addInfo: function(title, text) {
        this.add(title, text, 'gritter-info');
    },
    addSuccess: function(title, text) {
        this.add(title, text, 'gritter-success');
    },
    addWarning: function(title, text) {
        this.add(title, text, 'gritter-warning');
    },
    addDanger: function(title, text) {
        this.add(title, text, 'gritter-danger');
    },
    addDefault: function(title, text) {
        this.add(title, text, '');
    },
    add: function(title, text, type) {
        jQuery.gritter.add({
            // (string | mandatory) the heading of the notification
            title: title,
            // (string | mandatory) the text inside the notification
            text: text,
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: false,
            // (int | optional) the time you want it to be alive for before fading out
            time: '',
            // (string | optional) the class name you want to apply to that specific message
            class_name: type
        });
    },
};
