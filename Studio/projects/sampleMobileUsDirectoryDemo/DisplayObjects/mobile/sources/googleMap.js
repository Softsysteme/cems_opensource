/**
 * Define the Map
 */
app.init.push({
	name: 'map',
	init: function () {
		var displayableAddress = '';
		var exMarker = null;
		app.extMap = new Ext.Map({
			useCurrentLocation: false,	// Does not get user's current location
			mapOptions: {				// Used in rendering map
				zoom: 10
			}
		});
		app.geocoder = new google.maps.Geocoder();
		
		return new Ext.Panel({
			dockedItems: [app.toolbar],
			title: 'Map',        		// Name that appears on this tab
			iconCls: 'maps',
			listeners : {
				activate: function(comp) {
					if (app.checkAuthentication()) {
						/*
						 * Use Google Maps api to display the stored address on the map
						 */
						if (exMarker !== null)
							exMarker.setMap(null);

						displayableAddress = app.list.activatedRecord.get('address');

						app.geocoder.geocode(
							{
								address: app.list.activatedRecord.get('address')
							}, 
							function (results, status) {
								app.extMap.map.setCenter(results[0].geometry.location);
								exMarker = new google.maps.Marker({
									map: app.extMap.map,
									title: displayableAddress,
									position: results[0].geometry.location
								});
							}
						);
					}
				}
			},
			items : [
				app.extMap
			]
		});
	}
});