define(['zepto'], function($){

	function Widget(){
		this.boundingBox = null; // 最外层容器div
	}

	Widget.prototype = {

		renderUI: function(){}, // 接口：添加dom节点

		bindUI: function(){},	// 接口：监听事件

		syncUI: function(){},	// 接口：设置组件

		render: function(container) {
			this.renderUI();
			this.handlers = {};
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.boundingBox);
		},

		destructor: function(){}, //接口：销毁前的处理工作

		destroy: function(){
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		},

		///
		/// 自定义事件
		///
		on: function(type, handler){
			if (typeof this.handlers[type] == 'undefined') {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
		},

		fire: function(type, data){
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0; i < handlers.length; i++) {
					handlers[i](this, data);
				}
			}
		}
	}

	return {Widget: Widget}
})