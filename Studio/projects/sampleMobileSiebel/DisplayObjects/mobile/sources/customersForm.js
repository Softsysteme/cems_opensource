/*
 * Copyright (c) 2009-2012 Convertigo. All Rights Reserved.
 *
 * The copyright to the computer  program(s) herein  is the property
 * of Convertigo.
 * The program(s) may  be used  and/or copied  only with the written
 * permission  of  Convertigo  or in accordance  with  the terms and
 * conditions  stipulated  in the agreement/contract under which the
 * program(s) have been supplied.
 *
 * Convertigo makes  no  representations  or  warranties  about  the
 * suitability of the software, either express or implied, including
 * but  not  limited  to  the implied warranties of merchantability,
 * fitness for a particular purpose, or non-infringement. Convertigo
 * shall  not  be  liable for  any damage  suffered by licensee as a
 * result of using,  modifying or  distributing this software or its
 * derivatives.
 */

/**
 * Displays the customers in the store in a list
 */
app.init.push(
{
	name: 'customers',
	init: function ()
	{
		/**
			Create details panel specific toolbar
		*/
		var tapHandler = function(btn, evt)
		{
			switch (btn.text)
			{
				case 'List All':
					app.stores.list.load(
					{
						/*sequence: 'Search', 							// Convertigo sequence to execute 
						params: {
							SWEApplet: 'SIS Account List Applet',
							SWEView: 'All Account List View',			// parameters containing data to be sent to Convertigo
							Name: '*',
							Location: '*'
						}*/
						sequence: 'GotoView',					// Convertigo sequence to execute 
						params: {								// sequence parameters
							SWEApplet: 'SIS Account List Applet',
							SWEView: 'All Account List View'	// form containing data to send to convertigo
						},
						callback: function (data)						// callback function executed after the response returns from Convertigo
						{ 
							/**
								check first for errors
							*/
							if (Ext.isDefined(data.document.errorMessage))
							{
								/**
									display returned error message
								*/
								Ext.Msg.alert("Error", data.document.errorMessage);
								/**
									return false not to try filling the list
								*/
								return false;
							}

							/**
								check for valid data and expected answer
							*/
							if (app.initialized = Ext.isDefined(data.document.attr.sequence == 'Search'))
							{
								/**
									we have items
								*/
								if (Ext.isDefined(data.document.customers.item))
								{
									/**
										show user badge with number of items
									*/
									app.panels['customers'].tab.setBadge(data.document.customers.item.length);
									app.enablePanels(['logoff', 'customers', 'search'], 'customers');
									app.panels['customers'].doLayout();
									return true;
								}
							}

							/**
								in case no error message was found
								return true or false depending on the presence of data in the response
							*/
							app.enablePanels(['logoff', 'customers', 'search'], 'search');
							app.panels['customers'].tab.setBadge('');
							Ext.Msg.alert('Message', 'No records have been found.<br>Try other values');
							return false;
						}
					});
					break;
			}
		}

		var buttonsSpecTop = [
			{ui: 'button', text: 'List All'},
			{xtype: 'spacer', text: ''},
			{xtype: 'textfield', ui: 'light', html: '<p style="color:white;">Customers</p>'},
			{xtype: 'spacer', text: ''}
		]

		var customersToolbar = new Ext.Toolbar({
			dock: 'top',
			ui: 'light',
			items: buttonsSpecTop,
			defaults: {handler: tapHandler}
		});

		var customersList = new Ext.List(
		{
			xtype: 'list',
			/**
				define list element display
			*/
			itemTpl: [
				'<table width="100%" border="0" cellspacing="0" cellpadding="0">',
					'<tr>',
						'<td width="50%">{Name}<br>{Location}</td>',
						'<td width="40%">{StreetAddress}<br>{City}{State}{Country}</td>',
					'</tr>',
				'</table>'
			],
			indexBar: false,
			clearSelectionOnDeactivate: false,
			singleSelect: true,
			store: app.stores.list,
			/**
				Reference to the store from which the data is to be displayed
			*/
			loadingText: undefined,
			listeners: {
				/**
					itemtap event will be fired for any click on a list line
					i.e for itemDisclosure or regular select/deselect action
					there is a hack to figure out which one of the former case 
					we are dealing with
				*/
				itemtap: function (view, idx, item, e)
				{
					if (e.getTarget('.x-list-item-body'))
					{ 
						/**
							!!!!!!!!!!!!! hack to differentiate disclosure from itemtap
						*/
					}
				},
				selectionchange: function (selectionModel, records)
				{
					/**
						check if we have something to display
					*/
					if (records.length > 0)
					{
						/**
							yes we have at least one record, 
							store the current selected record
						*/
						app.list = {
							activatedRecord: {
								rowID: app.trim(records[0].get('rowID')),
								name: app.trim(records[0].get('Name')),
								streetAddress: app.trim(records[0].get('StreetAddress')),
								city: app.trim(records[0].get('City')),
								state: app.trim(records[0].get('State')),
								country: app.trim(records[0].get('Country'))
							}
						}
						/**
							add details icon to tabbar, stay on customers tab, no 'slide' animation
						*/
						app.enablePanels(['logoff', 'customers', 'details', 'search'], 'customers');
					}
					else {
						/**
							ensure no details icon in tabbar, stay on customers tab, no 'slide' animation
						*/
						app.enablePanels(['logoff', 'customers', 'search'], 'customers');
					}
				}
			},
			onItemDisclosure: function (record, btn, index)
			{
				/**
					Store the activated record data into app.list
				*/
				app.list = {
					activatedRecord: {
						rowID: app.trim(record.get('rowID')),
						name: app.trim(record.get('Name')),
						streetAddress: app.trim(record.get('StreetAddress')),
						city: app.trim(record.get('City')),
						state: app.trim(record.get('State')),
						country: app.trim(record.get('Country'))
					}
				}

				/**
					activate details panel
				*/
				app.enablePanels(['logoff', 'customers', 'details'], 'details');
			}
		})

		var executeQuery = function (queryName)
		{
			app.stores.list.load(
			{
				sequence: 'SiebelInvoke',				// Convertigo sequence to execute 
				params: {								// sequence parameters
					SWEMethod: queryName,
					SWEApplet: 'All Account List View' 	// form containing data to send to convertigo
				},
				callback: function (data)				// callback function executed after the response returns from Convertigo
				{ 
					/**
						callback function executed after the response returns from Convertigo
						handling a possible error message returned by the sequence
					*/
					if (Ext.isDefined(data.document.Error))
					{
						Ext.Msg.alert("Error", data.document.Error);
						/**
							return false not to try filling the list
						*/
						return false;
					}

					return true;
				}
			});
		}

		/**
		 	Define the List panel displaying the store's data
		 */
		return new Ext.Panel(
		{
			title: 'Customers',
			fullscreen: true,
			dockedItems: [customersToolbar],
			iconCls: 'info',
			badgeText: '',
			layout: 'fit',
			items: [customersList],
			listeners: {
				activate: function (comp){}
			}
		}); // return new Ext.Panel
	} // init
}); // app.init.push
