/*
 args = {
 	activeIndex: null,
 	children: null or []
 }
 * */
var args = arguments[0] || {},
	panes = [],
	G;

init();
function init() {
	var exclude = ['id', 'children', 'activeIndex'];
	$.container.applyProperties(_.omit(args, exclude));
	
	if (args.children) {
		loadContent(args.children); 
		delete args.id;
		delete args.children;
	}
}

/*
 params = {
 	activeIndex: null,
 	children: null or [],
 	reset: false
 }
 * */
exports.load = function(_G, params) {
	G = _G;
	
	if (params == null) { params = {}; }
	params.activeIndex && (args.activeIndex = params.activeIndex);
	
	params.children && loadContent(params.children, params.reset);
};

exports.unload = function() {
	reset();
	G = null;
};

function reset() {
  	$.container.removeAllChildren();
	panes.length = 0;
}

function loadContent(children, reset) {
	reset && reset();
	
	if (children) {
		_.each(children, function(child) {
			var index = panes.length;
			
			if (child.role == 'header') {
				child.paneIndex = index;
				child.addEventListener('click', togglePanel);
			} else if (child.role == 'body') {
				panes.push(child);
				if (index != args.activeIndex) {
					child.height = 0;
					child.visible = false;
				} else {
					child.height = Ti.UI.SIZE;
					child.visible = true;
				}
			}
			
			$.container.add(child);
		});
	}
}

function togglePanel(e) {
	var visible = !this.isActive,
		index = this.paneIndex,
		pane = panes[index];
	
	if (visible) {
		pane.height = Ti.UI.SIZE;
		pane.visible = true;
		args.activeIndex = index;
	} else {
		pane.height = 0;
		pane.visible = false;
		args.activeIndex = null;
	}
	
	this.isActive = visible;
	
	$.trigger('toggle', { visible: visible, index: index, header: this, body: pane });
};