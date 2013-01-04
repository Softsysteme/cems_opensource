/**
 * Define the Map
 */
app.init.push({
	name: 'map',
	init: function () {
		var exMarker = null;
		app.extMap = new Ext.Map({
			useCurrentLocation: false,	// Does not get current location
			mapOptions: {				// Used in rendering map
				zoom: 10
			}
		});
		app.geocoder = new google.maps.Geocoder();
		
		return new Ext.Panel({
			title: 'Map',
			dockedItems: [app.toolbar],
			iconCls: 'maps',
			items: [
				app.extMap
			],
			listeners : {
				activate: function(comp) {
					if (app.checkAuthentication()) {
						/*
						 * Use Google Maps api to display the stored address on the map
						 */
						if (exMarker !== null) {
							exMarker.setMap(null);
						}
						 var address = (Ext.isDefined(app.list) && Ext.isDefined(app.list.activatedRecord)) ? app.list.activatedRecord.address : "Paris, France";
							app.geocoder.geocode(
								{
									address: address
							}, 
							function (results, status) {
								app.extMap.map.setCenter(results[0].geometry.location);
								exMarker = new google.maps.Marker({
									map: app.extMap.map,
									position: results[0].geometry.location
								});
							}
						);
					}
				}
			}
		});
	}
});