define(['widget', 'zepto'], function (widget, $) {
	
	function Window () {
		this.cfg = {
			title: "消息",
			content: "",
			width: 300,
			height: 150,
			handlerForAlertBtn: null,
			handlerForCloseBtn: null,
			hasMask: false,
			skinClassName: 'window_skin_a',
			hasCloseBtn: false
		};
		this.handlers = {};
	}

	Window.prototype = $.extend({}, new widget.Widget(), {
		
		renderUI: function(){
			this.boundingBox = $('<div class="window_boundingBox">' +
				'<div class="window_header">' + this.cfg.title + '</div>' +
				'<div class="window_body">' + this.cfg.content + '</div>' + 
				'<div class="window_footer"><input class="window_alertBtn" type="button" value="确定"></div>' +
				'</div>');

			if (this.cfg.hasMask) {
				this._mask = $('<div class="window_mask"></div>');
				this._mask.appendTo("body");
			}

			if (this.cfg.hasCloseBtn) {
				this.boundingBox.append('<span class="window_closeBtn">X</span>');
			}
		},

		bindUI: function() {
			var self = this;
			this.boundingBox.delegate(".window_alertBtn", "click", function(){
				self.fire("ok");
				self.destroy();
			}).delegate(".window_closeBtn", "click", function(){
				self.fire("close");
				self.destroy();
			});

			if (this.cfg.handlerForAlertBtn) {
				this.on("ok", this.cfg.handlerForAlertBtn);
			}
			if (this.cfg.handlerForCloseBtn) {
				this.on("close", this.cfg.handlerForCloseBtn);
			}
		},

		syncUI: function(){
			this.boundingBox.css({
				width: this.cfg.width + 'px',
				height: this.cfg.height + 'px',
				left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
				top: (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + 'px'
			});
			if (this.cfg.skinClassName) {
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
		},

		destructor: function() {
			this._mask && this._mask.remove();
		},

		alert:function(cfg){
			$.extend(this.cfg, cfg, {_winType: 'alert'});
			this.render();
			return this;
		},
	
		confirm:function(){
			$.extend(this.cfg, cfg, {_winType: 'confirm'});
			this.render();
			return this;
		},
	
		prompt:function(){
			$.extend(this.cfg, cfg, {_winType: 'prompt'});
			this.render();
			return this;
		}
	});

	return { 
		Window: Window
	}
});