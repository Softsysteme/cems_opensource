/**
 * Define the details Panel
 */
app.init.push({
	name: 'details',
	init: function () {
		/**
		 * Defines a title text
		*/
		var title = new Ext.form.Text({
		 	xtype: 'text',
			name: 'title',
			labelWidth: '100px',
			value: 'Montparnasse',
			label: 'Title',
			disabled: true
		 });
		 /**
		 * Defines an address text
		 */
		 var address = new Ext.form.TextArea({
		 	xtype: 'text',
			name: 'address',
			labelWidth: '100px',
			value: '140 Bis Rue de Rennes Paris, Paris France, 75006',
			label: 'Address',
			disabled: true
		 });
		 /**
		 * Defines a price text
		 */
		 var price = new Ext.form.Text({
			xtype: 'text',
			name: 'price',
			labelWidth: '100px',
			value: '37,80 €',
			label: 'Price',
			disabled: true
		 });
		 /**
		 * Defines a total text
		 */
		 var total = new Ext.form.Text({
		 	xtype: 'text',
			name: 'total',
			labelWidth: '100px',
			value: '189,00 €',
			label: 'Total',
			disabled: true
		 });
		 /**
		 * Declares a text container to display dynamically description data in HTML
		 */
		var description = new Ext.Container({
			name: 'description',
			layout: 'auto',
			html: '<p><strong>Description</strong></p><br/><p>Ideally located within the exciting district of the Gare Montparnasse, More than 1600 square meters of fully equipped offices providing every comfort, Center close to two public parkings.</p><br/>',
			items: []
		});
		
		/**
		 * Defines a details form panel
		 */
		var detailsPage = new Ext.form.FormPanel({
			title: 'Details',
		    fullscreen: true,
		    dockedItems: [app.toolbar],
			iconCls: 'more',
		    items: [
		        {
		        	xtype: 'fieldset',
					title: 'Room details',
					instructions: '',
					items: [
						title,
						address,
						price,
						total,
						description,
						{
							xtype: 'button',
							text: 'Localize',
							handler: function() {
								// trying to activate map panel
								if (!app.activatePanel('map')) {
									Ext.Msg.alert("Error", "Map panel is not available, can't display localization.");
								}
							}	
						}
					]
		        }
	        ],
			scroll: 'vertical',
			listeners : {
				activate: function(comp) {
					if (app.checkAuthentication()) {
						// retrieving data from stocked record and setting its values into elements from the panel 
						// display data into text fields
						if (Ext.isDefined(app.list) && Ext.isDefined(app.list.activatedRecord)) {
							// data from the item clicked in the list
							title.setValue(app.list.activatedRecord.title);
							address.setValue(app.list.activatedRecord.address);
							price.setValue(app.list.activatedRecord.price);
							total.setValue(app.list.activatedRecord.total);
							// display description data into HTML
							if (app.list.activatedRecord.description != null && app.list.activatedRecord.description != "") {
								var html = "<p><strong>Description</strong></p><br/>";
								html += '<p>' + app.list.activatedRecord.description + '</p><br/>'; 
								description.update(html);
							} else {
								// empty html if description is empty
								description.update('<br/>');
							}
						}
					}
				}
			}
		});
		
		return detailsPage;
	}
});