/**
 * Define a List for the addresses
 */
// Set up a model to use in our Store
app.init.push({
	name: 'list',
	init: function () {
		/**
		 * Define a List for the addresses
		 */
		// Set up a model to use in our Store
		Ext.regModel('Addresses', {
			fields: [
				{name: 'name', type: 'string'},
				{name: 'address', type: 'string'}
			]
		});

		Ext.apply(app.stores, {
			list: new C8O.Store({
				model: 'Addresses',
				root: 'document.results.item',
				server: app.server
			})
		});

		 /**
		 * Define the List panel displaying the store's data
		 */
		return new Ext.Panel({
			dockedItems: [app.toolbar],
			title: 'List',
			layout: 'fit',
			iconCls: 'info',
			badgeText: '',
			items: [{
				xtype: 'list',
				itemTpl : [
					'<table>',
						'<tr>',
							'<td class="list-img">{name}</td>',
							'<td class="list-title">{address}</td>',
						'</tr>',
					'</table>'
				],
				indexBar: false,
				store: app.stores.list,	// Reference to the store from which the data is to be displayed
				loadingText: undefined,
				onItemDisclosure: function (record, btn, index) {
					app.list =  {
						activatedRecord : record
					};
					app.activatePanel('map')												
				}
			}],
			
			listeners: {
				activate: function (comp) {
					if (app.checkAuthentication()) {
						// loading list content from the Convertigo sequence execution
						if (app.isDataDirty) {
							app.isDataDirty = false;
							app.stores.list.load({
								transaction: 'searchBusiness',										// Convertigo transaction to execute
								form: (Ext.isDefined(app.search.form)) ? app.search.form : null,	// the form to be submitted
								callback : function (data) {										// callback function to be executed after the response returns from Convertigo
									// handling a possible error message returned by the sequence
									// in case no error message was found
									// return true or false depending on the presence of data in the response
								
									if (Ext.isDefined(data.document.results)) {
										return true;
									} else if(data.document.error) {
										Ext.Msg.alert("Error", data.document.error);
										return false;
									} else if(data.document.errorMessage) {
										Ext.Msg.alert("Error", data.document.errorMessage);
										return false;
									}
								}
							});
						}
					}
				}
			}
		});	
	}
});