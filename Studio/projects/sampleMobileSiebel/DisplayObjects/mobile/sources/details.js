/*
 * Copyright (c) 2009-2011 Convertigo. All Rights Reserved.
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
 * Define the details Panel
 */
app.init.push(
{
	name: 'details',
	init: function ()
	{
		/**
		 * Defines a title text
		 */
		var name = new Ext.form.Text(
		{
			name: 'name',
			labelWidth: '90px',
			value: '',
			label: 'Company'
		});
		/**
		 * Defines an address text
		 */
		var streetAddress = new Ext.form.TextArea(
		{
			name: 'streetAddress',
			labelWidth: '90px',
			value: '',
			label: 'Address'
		});
		/**
		 * Defines an address text
		 */
		var city = new Ext.form.TextArea(
		{
			name: 'city',
			labelWidth: '90px',
			value: '',
			label: 'City'
		});
		/**
		 * Defines an address text
		 */
		var state = new Ext.form.TextArea(
		{
			name: 'state',
			labelWidth: '90px',
			value: '',
			label: 'State',
			disabled: true
		});
		/**
		 * Defines an address text
		 */
		var country = new Ext.form.TextArea(
		{
			name: 'country',
			labelWidth: '90px',
			value: '',
			label: 'Country',
			disabled: true
		});
		/**
			Create details panel specific toolbar
		*/
		var tapHandler = function(btn, evt)
		{
			switch (btn.text)
			{
				case 'Back':
					app.enablePanels(['logoff', 'customers', 'search', 'details'], 'customers', false);
					break;
					
				case 'Map':
					app.enablePanels(['logoff', 'customers', 'search', 'details', 'map'], 'map');
					break;
			}
		}

		var buttonsSpecTop = [
			{ui: 'back', text: 'Back'},
			{xtype: 'spacer', text: ''},
			{xtype: 'textfield', ui: 'light', html: '<p style="color:white;">Details</p>'},
			{xtype: 'spacer', text: ''},
			{ui: 'button', text: 'Map', id:'map'},
		]

		var detailsToolbar = new Ext.Toolbar({
			dock: 'top',
			ui: 'light',
			items: buttonsSpecTop,
			defaults: {handler: tapHandler}
		});

		detailsToolbar.getChildItemById = function (itemid)
		{
			var items = this.items.items;
			for (var i=0;i<items.length;i++)
			{
				if (items[i].id == itemid)
					return items[i];
			}
			return null;
		}

		/**
		 	Defines a details form panel
		 */
		var detailsPage = new Ext.form.FormPanel(
		{
			fullscreen: true,
			title: 'Details',
			dockedItems: [detailsToolbar],
			iconCls: 'more',
			items: [
			{
				xtype: 'fieldset',
				title: 'Customer details',
				instructions: '',
				items: [
					name,
					streetAddress,
					city,
					state,
					country
				]
			}],
			scroll: 'vertical',
			listeners: {
				activate: function (comp)
				{					
					/**
						retrieving data from stocked record and setting its values into 
						elements from the panel display data into text fields
					*/
					name.setValue(app.list.activatedRecord.name);
					streetAddress.setValue(app.list.activatedRecord.streetAddress);
					city.setValue(app.list.activatedRecord.city);
					state.setValue(app.list.activatedRecord.state);
					country.setValue(app.list.activatedRecord.country);

					/**
						enable/disable Map button according to address
					*/
					if (streetAddress.getValue() === '' && city.getValue() === '')
						detailsToolbar.getChildItemById('map').disable();
					else
						detailsToolbar.getChildItemById('map').enable();
				}
			}
		});

		return detailsPage;
	}
});
