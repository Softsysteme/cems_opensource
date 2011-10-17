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
			title : 'Search',
			dockedItems: [app.toolbar],
			iconCls: 'search',
			items: [
				{
					xtype: 'fieldset',
					title: 'Search a Room',
					instructions: 'Fill in meeting room info and hit the search button',
					items: [
						{
							xtype: 'selectfield',
							name: 'country',
							label: 'Country',
							labelWidth: '120px',
							options: [
								{text: 'France', value: '620~A~FR'},
								{text: 'USA', value: '657~A~US'},
								{text: 'Belgium', value: '609~A~BE'},
								{text: 'Italy', value: '627~A~IT'},
								{text: 'Spain', 	value: '648~A~ES'}
							]
						}, 
						{
							xtype: 'textfield',
							name : 'postCode',
							labelWidth: '120px',
							value: 'Paris',
							label: 'Postal Code'
						}, 
						{
							xtype: 'datepickerfield',
							name: 'date',
							label: 'Meeting date',
							labelWidth: '120px',
							value: new Date(),
							picker: {
								yearFrom: new Date().getFullYear(),
								yearTo: new Date().getFullYear() + 10
							}
						}, 
						{
							xtype: 'selectfield',
							name: 'options',
							labelWidth: '120px',
							label: 'Options',
							options: [
								{text: 'Theater', value: '10300'},
								{text: 'Meeting room', value: '10400'},
								{text: 'Class room', value: '10500'}
							]
						}, 
						{
							layout: 'hbox',
							direction: 'reverse',
							items: [
								{
									xtype: 'button',
									text: 'Search',
									handler: function() {
										// trying to activate list panel
										if (!app.activatePanel('list')) {
											// list panel not existing
											// trying to activate details panel 
											app.activatePanel('details')												
										}	
									}
								}
							]
						}
					]
				}
			],
			scroll: 'vertical',
			listeners : {
				activate: function(comp) {
					if (app.checkAuthentication()) {
						// do something here if required
					}
				}
			}
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