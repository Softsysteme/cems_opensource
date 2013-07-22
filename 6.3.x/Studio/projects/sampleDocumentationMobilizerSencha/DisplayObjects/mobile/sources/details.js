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
			value: '',
			label: 'Title',
			disabled: true
		 });
		 
		 /**
		 * Declares a text container to display dynamically image data in HTML
		 */
		var description = new Ext.Container({
			name: 'description',
			layout: 'auto',
			html: '<p><strong>Description</strong></p><br/>',
			items: []
		});
		
		/**
		 * Defines an access button
		*/
		var accessedUrl = 'http://www.convertigo.com';
		var accessUrlButton = new Ext.Button({
			text: 'Access web site',
			handler: function() {
				window.location.href = accessedUrl;
			}	
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
				title: 'Result details',
				instructions: '',
				items: [
					title,
					description,
					accessUrlButton
				]
	          }
	        ],
			scroll: 'vertical',
			listeners : {
				activate: function(comp) {
					if (app.checkAuthentication()) {
						// retrieving data from stocked record, if stocked record exists
						if (Ext.isDefined(app.list) && Ext.isDefined(app.list.activatedRecord)) {
							// displaying title in details panel
							title.setValue(app.list.activatedRecord.title);
							// setting url to the button to access to clicked item
							accessedUrl = "http://" + app.list.activatedRecord.url;
							// calling a convertigo transaction using the data to improve item details content 
							app.server.execute({
								project: 'sample_documentation_CWI',	// Convertigo project to call
								transaction: 'searchGoogleImage', 		// Convertigo transaction to execute 
								params: { 								// parameters with data to send to convertigo
									keyword: app.list.activatedRecord.title
								}, 				
								mask: app.defaultMask, 					// waiting mask to be displayed while waiting for response
								callback : function (data) { 			// callback function to be executed after the response returns from Convertigo
									var html = "<p><strong>Description</strong></p><br/>";
									if (Ext.isDefined(data.document.errorMessage)) {
										html += '<p>' + data.document.errorMessage + '</p><br/>';
									} else {
										// display image in description container's HTML
										html += '<img src="' + data.document.imgUrl + '" alt="Clicked item image" broder="0"/><br/>'; 
									}
									description.update(html);
								}
							});
						} else {
							Ext.Msg.alert("Error", "No item was selected from the list.", function() {
								// activating list panel
								app.activatePanel('list');	
							});
						}
					}
				}
			}
		});
		
		return detailsPage;
	}
});