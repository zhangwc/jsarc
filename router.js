
define(['backbone_route', 'underscore'], function (Router, _) {

	var routes = {
		'module1(/:name)(/:age)': 'module1/controller1.js'
		// 'module2/:name/:age': ''
	};

	var currentController = null;

    //用于把字符串转化为一个函数，而这个也是路由的处理核心
    var routeHandler = function (config) {
        return function () {
            var url = config;
            var params = arguments;
            require([url], function (controller) {
                if(currentController && currentController !== controller){
                    currentController.onRouteChange && currentController.onRouteChange();
                }
                currentController = controller;
                controller.apply(null, params);
            });
        }
    };

    for (var key in routes) {
		routes[key] = routeHandler(routes[key]);
    }

    Router.routes = routes;
    return Router;

});