/**
 * The panel to display NYTimes available feeds
 */
app.init.push({
	name: 'feeds',
	init: function () {
	
		// Overrides  Ext.data.TreeStore (buggy in sencha touch v1.1.0)
		Ext.data.TreeStore.override({
			// Defines missing 'isLoading' function in TreeStore
			isLoading: function () {
    			return false;
    		},
    		
    		// Defines a way to repopulate store with new items
    		// as the 'loading' config parameter is ignored
    		repopulate: function(newItems) {
				var proxy = this.proxy,
					reader = proxy.reader,
					rootNode = this.getRootNode();
				
				rootNode.attributes[reader.root] = newItems;
				
				this.read({
					node: rootNode,
					doPreload: true
				});
			}
		});
		
		// Defines the 'MenuItem' model
		Ext.regModel('MenuItem', {
		    fields: [
		        {name: 'title', type: 'string'},
		        {name: 'feed', type: 'string'},
		        {name: 'type', type: 'string'},
		        {name: 'items', type: 'auto'},
		    ]
		});
		
		// Defines an Ext.NestedList to display the retrieved feed list
		var feedList = new Ext.NestedList({
			id: 'feedList',
			dock: 'left',
			width: '400',
			height: '100%',
		    title: 'Home',
		    displayField: 'title',
		    
		    // Defines the Ext.data.TreeStore used by list
			store: new Ext.data.TreeStore({
				storeId: 'homeStore',
				model: 'MenuItem',
				root: {"items": []},	// Initialize with an empty list
			    proxy: {
			        type: 'ajax',
			        reader: {
			            type: 'tree',
			            root: 'items'
			        }
		    	}
			}),
		    
			// Defines the card to be displayed when a leaf item is tapped
			getDetailCard: function(item, parent) {
		        var parentData = parent.attributes.record.data;
		        this.backButton.setText(parentData.title);
		        
		        //detailCard = new Ext.Panel({
	            //	scroll: 'vertical',
	            //	styleHtmlContent: true,
	            //	tpl: ["{feed}"]
	        	//});
	        	//var itemData = item.attributes.record.data;
	        	//detailCard.update(itemData);
		        //return detailCard;
		        
		        // Returns null while we use another panel to display leaf
		        //(see below 'leafitemtap' event listener)
		        return null;	
		    },
		    
		    // Defines the item's template to use
		    getItemTextTpl: function() {
		        var tplConstructor = 	'<span style="font-weight: bold; color: black;">{title}</span><br/>' +
						        		'<span style="font-size: small; color: black; white-space: nowrap;">'+
						        			'<tpl if="items.length !== 0">({items.length} items)</tpl>' +
						        			'<tpl if="items.length == 0"><img src="img/feed_icon_10x10.gif"/>&nbsp;{feed}</tpl>' +
						        		'</span>';
		        return tplConstructor;
		    },
		    
		    listeners: {
		    	// Handles 'itemtap' event
				itemtap: function(list, index, item, e) {
					//console.info("Item tap at :" + index);
				},
				
				// Handles 'leafitemtap' event
				leafitemtap: function(subList, subIdx, el, e, detailCard) {
					var ds = subList.getStore();
	                var record  = ds.getAt(subIdx);
					//console.info("Leaf item tap at :" + subIdx);
					//console.info("Leaf item title :" + record.get('title'));
	                
	                // Store current feed record into an application variable
	                // This variable is used in the 'feed' panel (see feedPanel.js)
	                app.feedRecord = record;
	                
	                // Try to activate next 'feed' panel (see feedPanel.js)
	                if (!app.activatePanel('feed'))
	                	Ext.Msg.alert("Error", "Unable to load feed");
				}
		    }
		});

		// Defines a configuration panel
	    var feedsPanel = new Ext.Panel({
	        id: 'feedsPanel',
			title: 'Home',
			iconCls: 'home',
	        layout: 'card',
	        dockedItems: [app.toolbar],
	        
	        items : [feedList],	// The feeds list
	        
			listeners: {
	    		activate: function (comp) {
					if (app.checkConfiguration()) {
						console.info("Configuration checked");
						
						// Retrieves feed list load option
						var offline = app.feedsLoadOption === "offline";
						// Retrieve feeds store
						var store = Ext.StoreMgr.lookup('homeStore');
						// Defines the mask to use when panel is activated
						var mask = app.feedsMask;
						
						if (store) {
							// Retrieve store's root node
							var node = store.getRootNode();
							if (node) {
								
								// Explicitly show mask
								// because current version of TreeStore ignore 'loading' flag
								// and declared missing 'isLoading' function always return 'false'
								mask.show();
								
								// Retrieve the number of root children
								var count = node.getChildRecords().length;
								
								// If root has children, list's store is up to date
								if (count !== 0) {
									mask.hide();	// Hides the mask
									console.info("Feeds list loaded from store");
									return true;
								}
								// Else retrieve data from Convertigo and update list's store
								else {
									// Request Convertigo
									app.server.execute({
										sequence: 'loadFeedsTree',		// Convertigo sequence to execute
										params: {offline: offline},		// Sequence parameter to send
										callback : function (data) { 	// callback function to be executed after the response returns from Convertigo
											mask.hide();	// Hides the mask
											
											// Handles a possible error message returned by the sequence
											if (Ext.isDefined(data.document.errorMessage)) {
												Ext.Msg.alert("Error", data.document.errorMessage);
												// return false not to try filling the list
												return false;
											}
											console.info("Data retrieved from convertigo");
											
											// In case no error message was found
											// return true or false depending on the presence of data in the response
											if (Ext.isDefined(data.document.items)) {
												// Update list's store with received data
												store.repopulate(data.document.items);
												console.info("Feed list repopulated from data");
												return true;
											}
										}
									});
								}
							}
						}
					}
					return false;
	    		}
	    	}
	    });
	    
	    // Returns the feed list panel
	    return feedsPanel;
	}
});
