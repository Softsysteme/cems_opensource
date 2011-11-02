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
			scroll: 'vertical',
			items: [
				{
					xtype: 'fieldset',
					title: 'Search an address',
					instructions: 'Fill in the required fields and hit the search button',
					items: [
					    {
							xtype: 'textfield',
							name : 'business',
							labelWidth: '120px',
							value: 'Adobe',
							label: 'Business'
						}, {
							xtype: 'textfield',
							name : 'city',
							labelWidth: '120px',
							value: 'San Francisco',
							label: 'City'
						}, {
							xtype: 'selectfield',
							name: 'state',
							labelWidth: '120px',
							label: 'State',
							value: 'California',
							options: [
								{text: 'Alabama', value: 'Alabama'},
								{text: 'Alaska', value: 'Alaska'},
								{text: 'Arizona', value: 'Arizona'},
								{text: 'Arkansas', value: 'Arkansas'},
								{text: 'California', value: 'California', selected:'true'},
								{text: 'Colorado', value: 'Colorado'},
								{text: 'Connecticut', value: 'Connecticut'},
								{text: 'Delaware', value: 'Delaware'},
								{text: 'Florida', value: 'Florida'},
								{text: 'Georgia', value: 'Georgia'},
								{text: 'Hawaii', value: 'Hawaii'},
								{text: 'Idaho', value: 'Idaho'},
								{text: 'Illinois', value: 'Illinois'},
								{text: 'Indiana', value: 'Indiana'},
								{text: 'Iowa', value: 'Iowa'},
								{text: 'Kansas', value: 'Kansas'},
								{text: 'Kentucky', value: 'Kentucky'},
								{text: 'Louisiana', value: 'Louisiana'},
								{text: 'Maine', value: 'Maine'},
								{text: 'Maryland', value: 'Maryland'},
								{text: 'Massachusetts', value: 'Massachusetts'},
								{text: 'Michigan', value: 'Michigan'},
								{text: 'Minnesota', value: 'Minnesota'},
								{text: 'Mississippi', value: 'Mississippi'},
								{text: 'Missouri', value: 'Missouri'},
								{text: 'Montana', value: 'Montana'},
								{text: 'Nebraska', value: 'Nebraska'},
								{text: 'Nevada', value: 'Nevada'},
								{text: 'New Hampshire', value: 'New Hampshire'},
								{text: 'New Jersey', value: 'New Jersey'},
								{text: 'New Mexico', value: 'New Mexico'},
								{text: 'New York', value: 'New York'},
								{text: 'North Carolina', value: 'North Carolina'},
								{text: 'North Dakota', value: 'North Dakota'},
								{text: 'Ohio', value: 'Ohio'},
								{text: 'Oklahoma', value: 'Oklahoma'},
								{text: 'Oregon', value: 'Oregon'},
								{text: 'Pennsylvania', value: 'Pennsylvania'},
								{text: 'Rhode Island', value: 'Rhode Island'},
								{text: 'South Carolina', value: 'South Carolina'},
								{text: 'South Dakota', value: 'South Dakota'},
								{text: 'Tennessee', value: 'Tennessee'},
								{text: 'Texas', value: 'Texas'},
								{text: 'Utah', value: 'Utah'},
								{text: 'Vermont', value: 'Vermont'},
								{text: 'Virginia', value: 'Virginia'},
								{text: 'Washington', value: 'Washington'},
								{text: 'West Virginia', value: 'West Virginia'},
								{text: 'Wisconsin', value: 'Wisconsin'},
								{text: 'Wyoming', value: 'Wyoming'}
							]
						}, {
							layout: 'hbox',
							direction: 'reverse',
							items: [
								{
									xtype: 'button',
									text: 'Search',
									handler: function() {
										app.isDataDirty = true;
										app.enablePanels(['search', 'list'], 'list');
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