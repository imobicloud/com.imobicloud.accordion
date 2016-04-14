# Titanium UI - Accordion

====

Accordion widget 

xml

	<Widget id="accordion" class="accordion" src="com.imobicloud.accordion" activeIndex="1">
		<View class="accordion-header" role="header">
			
		</View>
		<View class="accordion-body" role="body">
			
		</View>
	</Widget>

tss

	".accordion": { top: 100 }
	    ".accordion-header": { height: 32 }
	    ".accordion-body": { height: Ti.UI.SIZE, layout: 'vertical }

js 

	/*
	// load accordion content dynamically
	var header1 = Alloy.createController('header', {}).getView();
	header1.role = 'header';
	
	var body1 = Alloy.createController('body', {}).getView();
	body1.role = 'body';
	
	$.accordion.load($, {
		activeIndex: 1,
		children: [ 
			header1,
			body1
		],
		reset: false
	});
	*/
	
    $.accordion.unload();

