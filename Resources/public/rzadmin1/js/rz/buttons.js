/* [ ---- rzadmin theme - buttons ---- ] */

jQuery(document).ready(function() {
    jQuery('#fat-btn').click(function () {
        var btn = jQuery(this);
        btn.button('loading');
        setTimeout(function () {
            btn.button('reset')
        }, 3000)
    });
    jQuery('.btns_state').find('.btn').click(function(e) {
        $this_btn = jQuery(this);
        $this = $this_btn.closest('.btns_state');
        if(!$this_btn.hasClass('active')) {
            $this.find('.btn_txt').html($this_btn.text()+" button active");
        } else {
            $this.find('.btn_txt').html($this_btn.text()+" button inactive");
        }
        e.preventDefault();
    });
});
