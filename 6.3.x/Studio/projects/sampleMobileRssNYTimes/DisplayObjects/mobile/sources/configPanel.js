/**
 * The configuration panel (choose feeds load option)
 */
app.init.push({
	name: 'config',
	init: function () {

		// Defines a Ext.form.Select component for feeds load option
		var select = new Ext.form.Select({
		    label: 'Convertigo load option',
		    name: 'loadselect',
		    value: 'offline',
			options: [
		              {text: 'Use latest stored list',  value: 'offline'},
		              {text: 'Update list and store it', value: 'online'}
		    ],
			listeners: {
				afterrender : function(comp) {
					// Retrieve feed list load option
					app.feedsLoadOption = this.getValue();
					console.info("Feeds load option: "+ app.feedsLoadOption);
				},
				// Handle load option changes
				change : function(comp, value ) {
					// Update feed list load option
					app.feedsLoadOption = value;
					console.info("Feeds load option changed to : "+value);
					
					// Checks for store
					var store = Ext.StoreMgr.lookup('homeStore');
					if (store) {
						// Re-initialize store by removing all root's child nodes
		        		store.getRootNode().removeAll();
		        		console.info("Home store reinitialiazed");
					}
				}
			}
		});
	
		// Defines a configuration panel
		var configPanel = new Ext.form.FormPanel({
			title : 'Config',
			dockedItems: [app.toolbar],
			iconCls: 'user',
			items: [
				{
					xtype: 'fieldset',
					title: 'Hierarchical list of available rss feeds',
					instructions: 'Please choose a configuration option',
					items: [select],
				},
				{
					layout: 'vbox',
					items: [{
						xtype: 'button',
						text : 'Validate',
						handler: function() {
							app.logged = true;
							console.info("Logged");
							// Try to activate next panel: 'feeds' (see feedPanel.js)
			        		if (!app.activatePanel('feeds')) {
			        			Ext.Msg.alert("Error","Home feeds list load Failed");
			        		}
			        	}
					}]
				}
			],
		});
		
		// Returns the configuration's panel to be added
		return configPanel;
	}
});