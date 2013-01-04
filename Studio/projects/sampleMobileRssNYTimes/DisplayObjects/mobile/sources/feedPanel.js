/**
 * The panel to display NYTimes feed details
 */
app.init.push({
	name: 'feed',
	init: function () {
		
		// Defines a 'FeedItem' model
		Ext.regModel('FeedItem', {
			fields: [
		        {name: 'title', type: 'string'},
		        {name: 'description', type: 'string'},
		        {name: 'pubDate', type: 'date'},
		        {name: 'dc:creator', type: 'auto'},
		        {name: 'media:content', type: 'auto'},
		        {name: 'atom:link', type: 'auto'},
		        // Defines a 'creator' field from the 'dc:creator' field
		        {
		        	name: 'creator',
		            convert: function(value, record) {
		                var creator = record.data['dc:creator'];
		                return creator ? creator:'';
		        	}
		        },
		        // Defines a 'img' field from the 'media:content' field
		        {
		        	name: 'img',
		        	convert: function(value, record) {
		        		var media = record.data['media:content'];
		        		if (media) {
		        			var img  = media.attr.url;
		        			return img ? img:'';
		        		}
		        		return '';
		        	}
				},
				// Defines a 'link' field from the 'atom:link' field
		        {
		        	name: 'link',
		        	convert: function(value, record) {
		        		var atom = record.data['atom:link'];
		        		if (atom) {
		        			var link  = atom.attr.href;
		        			return link ? link:'';
		        		}
		        		return '';
		        	}
				}
			]
		});
		
		// Defines a C8O store (app.stores.feed) used by following defined list
		Ext.apply(app.stores, {
			feed: new C8O.Store({
				autoload: false,
				storeId: 'feedStore',
				sorters: [{property: 'pubDate', direction: 'DESC'}],
				model: 'FeedItem',
				root: 'document.item',
				server: app.server
			})
		});
	
		// Defines a Ext.List to display feed items
		var feedItemList = new Ext.List({
			id: 'feedItemList',
			store: 'feedStore',
			height: '100%',
			width: '100%',
			indexBar: false,
			styleHtmlContent: true,
			loadingText: undefined,
			// Defines the item template to use
			itemTpl: new Ext.XTemplate(	'<div>'+ 
											'<span class="feed-item-title">{title}</span>'+
											'<br/><span class="feed-item-date">{pubDate}, {creator}</span>'+
											'<br/><table border="0"><tr><tpl if="img !== \'\'"><td width="75" valign="top"><img src="{img}"/></td></tpl><td valign="top"><span class="feed-item-desc">{description}</span></td></tr></table>'+
										'</div>'),
			// Handles the 'onItemDisclosure'
			onItemDisclosure: function (record, btn, index) {
				// Retrieves feed item link
				var link = record.get("link");
				// If used from phone, display the link url
				if (Ext.is.Phone) Ext.Msg.alert("Info", "Available at :\n"+link);
				// Else open link in a new window (see app.js)
				else app.openLinkInNewWindow(link);
			},
		});

		// Defines a feed panel
		var feedPanel = new Ext.Panel({
			id: 'feedPanel',
			title: 'Feed',
			iconCls: 'info',
			dockedItems: [app.toolbar,
			    {
			    	id: 'menuToolbar',
		            xtype: 'toolbar',
		            ui: 'light',
		            items: [
		                {
		                	id: 'backBtn',
			                ui: 'back',
			                text: 'Back',
							scope: this,
			                handler: function(){
			            		app.activatePanel('feeds');
			                }
		                },
		             ]
			    }
			],
			items : [feedItemList],	// the feed's item list
			
			listeners: {
			
				// Handles 'activate' event
				activate: function (comp) {
					var lastRecord = app.lastRecord;
					var feedRecord = app.feedRecord;
					var feedItemList = this.items.get('feedItemList');
					if (app.checkConfiguration()) {
						// If same feed record
						if (feedRecord === lastRecord) {
							return true;
						}
						// Else retrieve feed data from Convertigo
						else {
							// Retrieve feed url
							var feedUrl = feedRecord.get('feed');
							
							// Loads store using Convertigo, the list will be automatically updated
							app.stores.feed.load({
								sequence: 'getFeed',				// Convertigo sequence to execute
								params: {feedURL: feedUrl},			// Sequence parameters
								callback : function (data) {		// callback function to be executed after the response returns from Convertigo
									// Handles a possible error message returned by the sequence
									if (Ext.isDefined(data.document.errorMessage)) {
										Ext.Msg.alert("Error", data.document.errorMessage);
										// return false not to try filling the list
										return false;
									}
									console.info("Data retrieved from convertigo");
									
									// In case no error message was found
									// return true or false depending on the presence of data in the response
									if (Ext.isDefined(data.document.item)) {
										console.info("Feed retrieved from Convertigo");
										// Remember last record
										app.lastRecord = feedRecord;
										// Scrolls list at the beginning
										feedItemList.scroller.scrollTo({x: 0,y: 0});
										return true;
									}
									return false;
								}
							});
						}
					}
				}
			}
		});
		
		// Returns the feed panel
		return feedPanel;
	}
});