/**
 * Define a tool bar
 */
Ext.apply(app, {
	toolbar: {
		xtype: 'toolbar',
		dock: 'top',
		ui: 'light',
		title: 'Mobile UsDirectory',
		layout: {pack: 'right'},
		items: [
			{
				xtype: 'textfield',
				ui: 'light',
				html: '<img src="img/36x36.png" />'
			}
		]
	}
});
