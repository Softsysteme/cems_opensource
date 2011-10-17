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
		Ext.regModel('RoomList', {
			fields: [
				{name: 'img', type: 'string'},
				{name: 'title', type: 'string'},
				{name: 'address', type: 'string'},
				{name: 'price', type: 'string'},
				{name: 'total', type: 'string'},
				{name: 'description', type: 'string'}
			]
		});

		Ext.apply(app.stores, {
			list: new C8O.Store({
				model: 'RoomList',
				root: 'document.results.result',
				server: app.server
			})
		});

		 /**
		 * Define the List panel displaying the store's data
		 */
		return new Ext.Panel({
			title: 'List',
			dockedItems: [app.toolbar],
			iconCls: 'info',
			layout: 'fit',
			items: [
			    {
					xtype: 'list',
					itemTpl : [
						'<table>',
							'<tr>',
								'<td class="list-img"><img src="{img}"/></td>',
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
								address: record.get("address"),
								price: record.get("price"),
								total: record.get("total")
							}
						}
						// handling description particular case : possibly not existing attribute for some records 
						if (record.get("description") != null && record.get("description") != "") {
							// setting description value if existing
							app.list.activatedRecord.description = record.get("description");
						} else {
							// removing possibly previous clicked item value 
							delete app.list.activatedRecord.description;
						}
						
						// trying to activate details panel
						if (!app.activatePanel('details')) {
							// details panel not existing
							// trying to activate map panel 
							app.activatePanel('map')												
						}
					}
			    }
			],
			listeners: {
				activate: function (comp) {
					if (app.checkAuthentication()) {
						// loading list content from the Convertigo sequence execution
						app.stores.list.load({
							sequence: 'LoadList',			// Convertigo sequence to execute
							form: (Ext.isDefined(app.search) && Ext.isDefined(app.search.form)) ? app.search.form : new Ext.form.FormPanel({title : 'Search'}),// the form to be submitted
							callback : function (data) {	// callback function to be executed after the response returns from Convertigo
								// handling a possible Convertigo exception returned by the sequence
								if (Ext.isDefined(data.document.error)) {
									Ext.Msg.alert("Error", data.document.error.message);
									// return false not to try filling the list
									return false;
								}	
								// handling a possible error message returned by the sequence
								if (Ext.isDefined(data.document.errorMessage)) {
									Ext.Msg.alert("Error", data.document.errorMessage);
									// return false not to try filling the list
									return false;
								}
								// in case no error message was found
								// return true or false depending on the presence of data in the response
								return Ext.isDefined(data.document.results.result);
							}
						});
					}
				}
			}
		});	
	}
});