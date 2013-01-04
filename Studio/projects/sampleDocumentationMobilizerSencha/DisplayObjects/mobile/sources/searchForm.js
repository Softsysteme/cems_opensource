/**
 * Define the search form Panel
 */
app.init.push({
	name: 'search',
	init: function () {
		/**
		 * Defines a search form panel
		 */
		var form = new Ext.form.FormPanel({
			iconCls: 'search',
			items: [
				{
					xtype: 'fieldset',
					title: 'Google search',
					instructions: 'Fill in a keyword and hit the search button',
					items: [
						{
							xtype: 'textfield',
							name : 'keyword',
							value: 'Convertigo',
							label: 'Keyword'
						},
						{
							xtype: 'numberfield',
							name : 'maxPages',
							value: '2',
							label: 'Pages to accumulate'
						},
						{
							layout: 'hbox',
							direction: 'reverse',
							items: [
								{
									xtype: 'button',
									text: 'Search',
									handler: function() {
										// activating list panel
										app.activatePanel('list');
									}
								}
							]
						}
					]
				}
			],
			
			title : 'Search',
			listeners : {
				activate: function(comp) {
					if (app.checkAuthentication()) {
						// do something here if required
					}
				}
			},
			dockedItems: [app.toolbar]
		});
		
		/**
		 * Stocking search form in app.search  
		 */
		app.search = {
			form: form,
		}
		
		return form;
	}
});