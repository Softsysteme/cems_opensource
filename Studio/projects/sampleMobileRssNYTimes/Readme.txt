/*********************************************/
/*			sampleMobileRssNYTimes			 */
/*********************************************/

This project is a New York Times RSS feed reader.

When accessing to the RSS index page of the New York Times web site,
the available feeds are presented into a hierarchical list of categories.
While navigating, any feed may be read by clicking on it's link.


The purpose of this project is to:
----------------------------------
* retrieve the hierarchical list of feeds using a Convertigo transaction|sequence
* read a given feed using a Convertigo transaction|sequence
* have a Sencha Touch Web application to navigate through feed's categories
  and then display details for a given feed
  
As hierarchical list of feeds won't often change,
the project is optimized in order to cache the list into an XML file.
This optimization gives the project the ability to work off line.



The project has two connectors:
-------------------------------
* The 'WEB_NYT' connector is an HTML connector which targets the NYTimes web site.
	It declares a 'getFeeds' default transaction which targets the main RSS index page.
	Its default screen class defines two XMLTable extraction rules in order to extract
	the main categories and the sub categories feeds.
	  
* The 'FEEDS_NYT' connector is an HTTP connector which targets the RSS NYTimes web site.
	It declares a 'getFeed' default transaction to read a given feed which URL may be
	specified by the special '_OVER__ConnectionString' variable.
	  
The project has five sequences:
-------------------------------
* The 'getAndStoreFeeds' sequence simply calls the 'getFeeds' transaction and stores parts
	of the returned response (categories and feeds) into an XML file (storedFeeds.xml).
	> It retrieves and stores feeds and categories.
	
* The 'getSubFeedsTree' sequence reads the 'storedFeeds.xml' file,
	then organize feeds for a given category which may be specified by the 'groupTitle' variable.
	> It builds a hierarchical tree of feed items for a given category.
	
* The 'getAndStoreFeedsTree' sequence reads the 'storedFeeds.xml' file,
	then call previous 'getSubFeedsTree' sequence for each category,
	and finally stores the entire tree into an XML file (storedFeedsTree.xml).
	> It builds and stores the whole hierarchical tree of feed items.
	
* The 'loadFeedsTree' sequence declares a variable named 'offline' (default 'true').
	* In case 'offline' is 'true':
		It simply reads the 'storedFeedsTree.xml' file and returns the feed items tree.
	* Otherwise:
		It calls the 'getAndStoreFeeds' sequence to update stored categories and feeds from the web,
	  	then calls the 'getAndStoreFeedsTree' sequence to update feed items tree,
	  	and finally returns the tree.
	> It returns the feed items tree in off line or on line mode.
	  	
* The 'getFeed' sequence calls the 'getFeed' transaction passing the 'feedURL' variable value as input,
	then returns only found RSS channel items.
	> It reads a given RSS feed.
	  


Looking at mobile source files:
-------------------------------
All source files are commented: server.js, app.js, topToolBar.js, configPanel.js, feedsPanel.js, feedPanel.js.

* The 'configPanel.js' is the panel where working mode may be configured (off|on line mode)
	When clicking on the 'Validate' button, the 'feedsPanel' is activated.
	
* The 'feedsPanel.js' is the panel which display the hierarchical list of available feeds
	It uses an Ext.NestedList working with an Ext.data.TreeStore.
	  
	When panel is activated:
	  * If the Ext.TreeStore root node is 'empty' OR if the working mode has changed:
	  	Data are retrieved by requesting Convertigo 'loadFeedsTree' sequence, passing working mode as input parameter.
	  	The TreeStore is then explicitly re-populated with received data, which automatically update the Ext.NestedList.
	  * Otherwise:
	  	The Ext.NestedList doesn't need to be updated, works on its current TreeStore
	  	
	 When a leaf of the Ext.NestedList is tapped, the 'feedPanel' is activated.
	  
* The 'feedPanel.js' is the panel which display the feed details (RSS items)
	It uses an Ext.List working with a C8O.Store.
	  
	When panel is activated:
	  * If the C8O.Store has not been loaded:
	  	C8O.Store is filled by requesting Convertigo 'getFeed' sequence, passing feed link as input parameter.
	  	The Ext.List is automatically updated.
	  * Otherwise:
	  	The Ext.List doesn't need to be updated, works on its current C8O.Store



