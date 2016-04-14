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
				child.height = index != args.activeIndex ? 0 : Ti.UI.SIZE;
			}
			
			$.container.add(child);
		});
	}
}

function togglePanel(e) {
	if (this.isActive) {
		this.isActive = false;
		panes[ this.paneIndex ].height = 0;
		args.activeIndex = null;
		
		$.container.fireEvent('toggle', { visible: false, index: this.paneIndex });
	} else {
		this.isActive = true;
		panes[ this.paneIndex ].height = Ti.UI.SIZE;
		args.activeIndex = this.paneIndex;
		
		$.container.fireEvent('toggle', { visible: true, index: this.paneIndex });
	}
};