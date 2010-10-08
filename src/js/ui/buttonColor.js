/**
 * @class Button with color selection drop-down menu
 * @param  Object
 * @author Dmitry (dio) Levashov, dio@std42.ru
 **/
elRTE.prototype.ui.buttonColor = function(cmd) {
	this.c      = 'elrte-btn-menu';
	this.widget = $('<div/>');
	this.color  = '';
	this.auto   = '';
	
	/**
	 * Initilize widget and color indicator
	 * @return void
	 **/
	this.onInit = function() {
		var self = this,
			o    = {
				'class'  : '',
				label    : this.cmd.title,
				callback : function(c) { 
					self.rte.focus(); 
					if (c) {
						self.setColor(c); 
						self.cmd.exec(self.color);
					}
				}
			}, c;
		
		// control toggle widget while button - exec cmd
		this.control = $('<div class="elrte-btn-menu-control"/>')
			.hover(function() {
				self.state>0 && $(this).toggleClass(self.hc);
			})
			.mousedown(function(e) {
				e.preventDefault();
				e.stopPropagation();
				if (self.state) {
					if (self.widget.is(':hidden')) {
						self.cmd.rte.trigger('hideUI');
						self.widget.val(self.color, self.auto);
					}
					self.widget.toggle(128);
				}
			});
		
		this.btn.append(this.control);
		this.ui.append((this.ind = $('<div class="elrte-btn-color-ind"/>')));
		
		// init widget and set automatic color
		setTimeout(function() {
			self.ui.append(self.widget.elrteWidgetColor(o, self.rte).hide());
		}, 10);
		
		this.rte.bind('hideUI', function() {
			self.widget.hide();
		});
		
	}
	
	/**
	 * Store selected color and update color indicator
	 * @param  String
	 * @return void
	 **/
	this.setColor = function(c) {
		this.ind.css('background', (this.color = c));
	}
	
	/**
	 * Button mousedown event handler
	 * Call cmd.exec()
	 * @param  Event
	 * @return void
	 **/
	this.click = function(e) {
		e.preventDefault();
		if (this.state) {
			this.rte.focus();
			this.cmd.exec(this.color);
		}
	}
	
	/**
	 * Update button state and save automatic color for widget
	 * @return void
	 **/
	this.update = function() {
		this.rte.ui._button.update.call(this);
		if (!this.color) {
			this.auto = this.cmd.value();
			this.setColor(this.auto);
		}
	}
	
	this.init(cmd);
}

elRTE.prototype.ui.buttonColor.prototype = elRTE.prototype.ui._button;

