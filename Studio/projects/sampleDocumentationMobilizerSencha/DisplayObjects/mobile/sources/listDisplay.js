/**
 * Define a List for the rooms
 */
// Set up a model to use in our Store
app.init.push({
	name: 'list',
	init: function () {
		/**
		 * Define a List for the rooms
		 */
		// Set up a model to use in our Store
		Ext.regModel('GoogleResult', {
			fields: [
				{name: 'title', type: 'string'},
				{name: 'url', type: 'string'}
			]
		});

		Ext.apply(app.stores, {
			list: new C8O.Store({
				model: 'GoogleResult',
				root: 'document.listResults.resultItem',
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
							'<td class="list-title">{title}</td>',
						'</tr>',
					'</table>'
				],
				indexBar: false,
				store: app.stores.list,	// Reference to the store from which the data is to be displayed
				loadingText: undefined,
				onItemDisclosure: function (record, btn, index) {
					// Stocking the activated record data into app.list				
					app.list = {
						activatedRecord: {
							title: record.get("title"),
							url: record.get("url")
						}
					}
					// activating details panel
					app.activatePanel('details');
				}
			}],
			listeners: {
				activate: function (comp) {
					if (app.checkAuthentication()) {
						// loading list content from the Convertigo sequence execution
						app.stores.list.load({
							project: 'sample_documentation_CWI',	// convertigto project to call
							transaction: 'searchGoogleWithLimit',	// Convertigo transaction to execute
							form: app.search.form,					// the form to be submitted
							callback : function (data) {			// callback function to be executed after the response returns from Convertigo
								// handling a possible exception returned by Convertigo
								if (Ext.isDefined(data.document.error)) {
									Ext.Msg.alert("Error", data.document.error.message, function() {
										// activating search panel
										app.activatePanel('search');	
									});
									// return false not to try filling the list
									return false;
								}
								// handling a possible error message returned by the transaction
								if (Ext.isDefined(data.document.errorMessage)) {
									Ext.Msg.alert("Error", data.document.errorMessage, function() {
										// activating search panel
										app.activatePanel('search');	
									});
									// return false not to try filling the list
									return false;
								}
								// in case no error message was found
								// return true or false depending on the presence of data in the response
								return Ext.isDefined(data.document.listResults.resultItem);
							}
						});
					}
				}
			}
		});	
	}
});