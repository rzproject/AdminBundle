/* [ ---- rzadmin theme - common ---- ] */
jQuery(document).ready(function() {

    //* pre block prettify
    if(typeof prettyPrint == 'function') {
        console.log('here');
        prettyPrint();
    }
});


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
