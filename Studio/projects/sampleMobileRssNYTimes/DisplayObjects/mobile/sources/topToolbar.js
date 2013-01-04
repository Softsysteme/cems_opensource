/**
 * Define a tool bar
 */
Ext.apply(app, {
	toolbar: {
		xtype: 'toolbar',
		dock: 'top',
		ui: 'dark',
		layout: {pack: 'center'},
		items: [{
			xtype: 'textfield',
			ui: 'light',
			html: '<p style="font-size:x-large;color:white">The New York Times</p>'
		}]
	}
});
