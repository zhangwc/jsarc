define(['text!module2/tpl.html'], function (tpl) {

    var controller = function () {
		appView.html(_.template(tpl));

	    //setup模式[推荐]
	    $('.button').button();

	    $('#btn1').button().on( 'click', function() {
	        // $('#btn1').button( 'state', 'disabled' );
	        $('#dialog1').dialog('open'); 
	    });

	    //setup模式
	    $('#dialog1').dialog({
	        autoOpen: false,
	        closeBtn: false,
	        buttons: {
	            '取消': function(){
	                this.close();
	            },
	            '确定': function(){
	                this.close();
	            }
	        }
	    });
    };

    return controller;
});