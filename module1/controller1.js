define(['text!module1/tpl1.html', 'window'], function (tpl, w) {

    var controller = function (name,age) {
		appView.html(_.template(tpl)({name: name?name:'vivi', age: age?age:'27'}));

        $('button').on('click', function clickHandler() {
            var win = new w.Window();
			win.alert({
				title: "提示",
				content: "welcome",
				handlerForAlertBtn: function(a,b){
					console.log("ok button click");
				},
				handlerForCloseBtn: function(a, b){
					console.log("close button click");
				},
				width: 200, 
				height: 150,
				hasCloseBtn: true,
				hasMask: true
			});
        });

        controller.onRouteChange = function () {
            console.log('change');      //可以做一些销毁工作，例如取消事件绑定
            $('button').off('click');   //解除所有click事件监听
        };
    };

    return controller;
});