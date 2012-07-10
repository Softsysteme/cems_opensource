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
 * Define the Map
 */
app.init.push({
	name: 'map',
	init: function () {
		var exMarker = null;
		var displayableAddress = '';
		app.extMap = new Ext.Map({
			useCurrentLocation: false,	// Gets user's current location
			mapOptions: {				// Used in rendering map
				zoom: 10
			}
		});

		app.geocoder = new google.maps.Geocoder();
		
		/**
			Create details panel specific toolbar
		*/
		var tapHandler = function(btn, evt)
		{
			switch (btn.text)
			{
				case 'Back':
					app.enablePanels(['logoff', 'customers', 'search', 'details'], 'details', 'slide', 'right');
					break;
			}
		}		

		var buttonsSpecTop = [
			{ui: 'back', text: 'Back'},
			{xtype: 'spacer', text: ''},
			{xtype: 'textfield', ui: 'light', html: '<p style="color:white;">Map</p>'},
			{xtype: 'spacer', text: ''},
		]

		var mapToolbar = new Ext.Toolbar({
			dock: 'top',
			ui: 'light',
			items: buttonsSpecTop,
			defaults: {handler: tapHandler}
		});

		return new Ext.Panel({
			dockedItems: [mapToolbar],
			title: 'Map',				// Name that appears on this tab
			iconCls: 'maps',
			listeners : {
				activate: function(comp) {
					/*
					 * Use Google Maps api to display the stored address on the map
					 */
					if (exMarker !== null)
						exMarker.setMap(null);						
					 
					displayableAddress = app.list.activatedRecord.name
						+ '\n' + app.list.activatedRecord.streetAddress 
						+ '\n' + app.list.activatedRecord.city
						+ '\n' + app.list.activatedRecord.state	+ ', ' + app.list.activatedRecord.country;
					 
					app.geocoder.geocode(
						{
							address: app.list.activatedRecord.streetAddress 
								+ ',' + app.list.activatedRecord.city
									+ ',' + app.list.activatedRecord.state
										+ ',' + app.list.activatedRecord.country
						}, 
						function (results, status) {
							try {
								app.extMap.map.setCenter(results[0].geometry.location);
								
								exMarker = new google.maps.Marker({
									map: app.extMap.map,
									position: results[0].geometry.location,
									title: displayableAddress,
									animation: google.maps.Animation.DROP
								});
							}
							catch(err) {								
							}							
						}
					);
				}
			},
			items : [
				app.extMap
			]
		});
	}
});