define(['text!module1/tpl1.html'], function (tpl) {

    var controller = function (name,age) {
		appView.html(_.template(tpl)({name: name?name:'vivi', age: age?age:'27'}));

        $('button').on('click', function clickHandler() {
            alert('hello');
        });

        controller.onRouteChange = function () {
            console.log('change');      //可以做一些销毁工作，例如取消事件绑定
            $('button').off('click');   //解除所有click事件监听
        };
    };

    return controller;
});