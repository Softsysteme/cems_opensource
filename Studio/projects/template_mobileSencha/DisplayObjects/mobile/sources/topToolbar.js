/**
 * Define a tool bar
 */
Ext.apply(app, {
	toolbar: {
		xtype: 'toolbar',
		dock: 'top',
		ui: 'light',
		layout: {pack: 'center'},
		items: [
		    {
		    	xtype: 'textfield',
		    	ui: 'light',
		    	html: '<p style="color:white">${}$</p>'
		    }
		]
	}
});