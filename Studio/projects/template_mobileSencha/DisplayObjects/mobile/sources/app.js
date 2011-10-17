/*******************************************************
 *******************************************************
 * public C8O/sencha API for CEMS 5.6.0 *
 *******************************************************
 *******************************************************/

/**
 * This file, index.html and others files in sources folder must be modified to make your own app
 * 
 * You can completely change the organization of your app,
 * this current organization is just a suggestion and a starter to help you to start your app.
 * 
 * You should discover and use other Sencha Touch object, using the
 * Sencha Touch API Documentation : http://dev.sencha.com/deploy/touch/docs/
 * 
 * Others live samples of Sencha application are available into the
 * Kitchen Sink : http://dev.sencha.com/deploy/touch/examples/kitchensink/
 * 
 * The common mobilelib.js included in index.html expose the following objects and functions
 *
 ****** C8O.Server object ******
 *** Extend Ext.util.Observable : http://dev.sencha.com/deploy/touch/docs/?class=Ext.util.Observable ***
 * Defines a Convertigo server. Each C8O mobile project must specify at least one
 * Server. This object will be used to interact with the C80 server directly
 * or through the C80.Store object.
 * 
 * Sample of creation :
 * 
 * app.server = new C80.Server({
 * 		endpoint: 'http://<myC8OServer>/convertigo/projects/<MyProject>
 * });
 * 
 * 
 *** Method : prepareParameters(args) ***
 * Prepare an args object to a plain key/value object
 * 
 * The args object can contains :
 *  * form : an Ext form object, used to retrieve fields
 *  * params : a plain key/value object copied to the result
 *  * connector : the connector name used by convertigo
 *  * transaction : the transaction name used by convertigo
 *  * sequence : the transaction name used by convertigo
 * 
 *  
 *** Method : execute(args) ***
 * Wrapper to execute a C8O Transaction or Sequence
 *
 * Sample code to invoke :
 * 
 * app.server.execute({	
 * 		transaction: '<transac name>', connector: '<connector name>', // or
 * 		sequence: '<sequence name>',	//
 * 		project : '<project name>', // the optional project name used by convertigo
 * 		params: {						// Optional Additional parameters
 * 			param1: 'value1',
 * 			param2: 'value3',
 * 			param3: 'value3',
* 		}, 
 * 		form: MyForm					// Optional form  from which query string will be build
 * 		mask: mask,						// the optional 'loading' mask
 * 		callback: function (data) {		// A call back to handle return data
 * 			console.log("Call C8O ok" + data);
 * 		}
 *  });
 *
 * 
 ***** C8O.Store object ******
 *** Extend Ext.data.Store : http://dev.sencha.com/deploy/touch/docs/?class=Ext.data.Store ***
 * This defines the Convertigo Store object derived from the Ext.data.store
 * This store is automatically configured for a JSONP proxy pointing on a Convertigo
 * C8O.Server object. 
 * 
 * Sample of creation :
 * 
 * store = new C8O.Store({
 *   model: 'RoomList',						// a registered model
 *   root: 'document.resultats.resultat',	// the root object to iterate on
 *   server : server							// a C8O.Server object
 * });
 * 
 * 
 *** Method : load(options) ***
 * Loads the store's data from Convertigo server.
 * 
 * The options object can contains :
 *  * form : an Ext form object, used to retrieve fields
 *  * params : a plain key/value object copied to the result
 *  * connector : the connector name used by convertigo
 *  * transaction : the transaction name used by convertigo
 *  * sequence : the transaction name used by convertigo
 *  * project : the optional project name used by convertigo
 *  * callback : the callback function called after data received, receive a rawData as parameter
 *  	and can break default loading process by returning false
 *  
 *  If no option is given, the data will be loaded with the default transaction
 *  
 *  Sample of use :
 *  
 *  store.load({
 *  	transaction: 'myTransaction',
 *  	form: form
 *  });
 */

/**
 * Declare current application stuff into the 'app' variable for a better variable organization
 */
Ext.namespace('app');

/**
 * Ext.apply "Copies all the properties of config to obj"
 * see http://dev.sencha.com/deploy/touch/docs/?class=Ext
 */
Ext.apply(app, {
	/**
	 * Auto-filled array of included panel JS
	 * 
	 * Each panel should declare itself by calling
	 * (see loginForm.js, searchForm.js, listDisplay.js, details.js or googleMap.js for more details)
	 *   app.init.push({
	 *     name : 'panelName',
	 *     init : function () {
	 *        // some initialization code for this panel
	 *        return panel; // return the current Panel
	 *     }
	 *   })
	 */
	init: [],
	
	/**
	 * Auto-filled key/value object with created panels
	 */
	panels: {},
	
	/**
	 * key/value object to put used stores 
	 */
	stores: {},
	
	/**
	 * App variable used to know if the user is currently logged by the remote service
	 */
	logged: false,
	
	/**
	 * This is the toolbar instance (false means no toolbar), overridden to define the top toolbar (look at topToolbar.js)
	 */
	toolbar: false,
	
	/**
	 * Method used by panel to know if the user is authenticated and prompt login panel if not
	 * 
	 * Return true if currently authenticated or false otherwise
	 */
	checkAuthentication: function () {
		// check if not logged and the login panel is defined (no login panel, no authentication needed)
		if (!app.logged && Ext.isDefined(app.panels.login)) {
			// display a popout error message
			Ext.Msg.alert("Error","Identification required", function() {
				// switch to login panel
				app.activatePanel('login');
			});
			return false;
		}
		return true;
	},
	
	/**
	 * Method usefull to switch between declared panels (in app.panels)
	 * 
	 * Return true if this panel exists or false otherwise
	 */
	activatePanel: function (panelName) {
		// check if the panel 'panelName' exists
		if (Ext.isDefined(app.panels[panelName])) {
			// switch to that panel
			app.dock.setActiveItem(app.panels[panelName]);
			return true;
		}
		return false;
	}
});

/**
 * Ext.setup "Sets up a page for use on a mobile device."
 * see http://dev.sencha.com/deploy/touch/docs/?class=Ext
 * for more detail about the config parameter object
 */
Ext.setup({
	icon: (Ext.is.Phone && !Ext.is.Tablet) ? 'img/48x48.png' : 'img/72x72.png',
	tabletStartupScreen: 'img/tabletStartup.png',
	phoneStartupScreen: 'img/phoneStartup.png',
	glossOnIcon: false,
	
	// called when the page is loaded
	onReady: function () {
		// temporary store created panel to insert them into the dock
		var items = [];
		
		// Ext.each iterate over many object like array (see http://dev.sencha.com/deploy/touch/docs/?class=Ext)
		// Consume positioned item in the app.init array
		Ext.each(app.init, function (item) {
			// create the current panel and declare it 'item.name' into app.panels
			app.panels[item.name] = item.init();
			// add it to the temporary array for the dock
			items.push(app.panels[item.name]);
		});
		
		// Merge dock, listMask and defaultMask
		Ext.apply(app, {
			// declare the TabPanel dock object (see http://dev.sencha.com/deploy/touch/docs/?class=Ext.TabPanel)
			// that contains icons for each panel declared
			dock: new Ext.TabPanel({
				tabBarDock: 'bottom',
				fullscreen: true,           
				cardSwitchAnimation: 'flip',      
				items: items
			}),
			// create a waiting mask object (see http://dev.sencha.com/deploy/touch/docs/?class=Ext.LoadMask)
			// can be passed to C8O.execute or displayed using show()/hide() methods
			defaultMask: new Ext.LoadMask(Ext.getBody(), {
				msg: 'Loading, please wait ...'
			}),
			// like the defaultMask but automatically displayed when the app.stores.list is loading data
			listMask: new Ext.LoadMask(Ext.getBody(), {
				msg: 'Loading, please wait ...',
				// the mask appear when app.stores.list Store is loading (declared in listDisplay.js)
				store: app.stores.list
			})
		});
	}
});