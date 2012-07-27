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
 * Define the search form Panel
 */
app.init.push(
{
	name: 'search',
	init: function ()
	{
		// Create the combo box, attached to the states data store
//		var selbox = new Ext.form.Select(
//		{
//			label: 'State',
//			name:'state',
//			labelWidth: '120px',
//			options: Ext.statesdata.states
//		});

		/**
			Defines search textfield
		 */
		var name = new Ext.form.Text(
		{
			label: 'Name',
			name: 'name',
			labelWidth: '120px',
			value: '*'
		});
		
		/**
		Defines search textfield
		 */
		var location = new Ext.form.Text(
		{
			label: 'Location',
			name: 'location',
			labelWidth: '120px',
			value: '*'
		});

		/**
			Defines a search form panel
		*/
		var searchForm = new Ext.form.FormPanel(
		{
			title: 'Search',
			dockedItems: [app.toolbar],
			iconCls: 'search',
			items: [
			{
				xtype: 'fieldset',
				title: 'Search',
				instructions: 'Fill in customer info and hit the search button',
				items: [
//					selbox,
					name,
					location
				]
			},
			{
				layout: 'hbox',
				direction: 'reverse',
				items: [
				{
					xtype: 'button',
					text: 'Search',
					handler: function ()
					{
						app.stores.list.load(
						{
							sequence: 'Search', 							// Convertigo sequence to execute 
							params: {
								SWEApplet: 'SIS Account List Applet',
								SWEView: 'All Account List View',			// parameters containing data to be sent to Convertigo
								Name: name.getValue(),
								Location: location.getValue()/*,
								State: selbox.getValue()*/
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
									if (Ext.isDefined(data.document.customers) && Ext.isDefined(data.document.customers.item))
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
					}
				}]
			}],
			scroll: 'vertical',
			listeners: {
				activate: function (comp){}
			}
		});
		return searchForm;
	}
});
