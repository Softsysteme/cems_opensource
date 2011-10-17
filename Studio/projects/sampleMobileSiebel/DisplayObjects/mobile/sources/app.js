/*
 * Copyright (c) 2009-2011 Convertigo. All Rights Reserved.
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
/*******************************************************
 *******************************************************
 * public C8O/sencha API for CEMS 5.5.3 *
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
	 * Auto-filled key/value object with panels currently displayed in the bottom dock
	 */
	curItems: [],
	/**
	 * Auto-filled key/value object with created panels
	 */
	panels: {},
	/**
	 * key/value object to put used stores 
	 */
	stores: {},
	/**
	 * TODO
	 */
	userName: '',
	/**
	 * App variable used to know if the user is currently logged by the remote service
	 */
	logged: false,
	/**
	 * TODO
	 */
	initialized: false,
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
				app.activate('login');
			});
			return false;
		}
		return true;
	},
	/**
	 * default animation
	 */
	animation: 'slide', 
	/**
		trim function, removes white spaces from 
		both sides of a string
	*/
	trim: function(string) {
		return string.replace(/^\s+/g,'').replace(/\s+$/g,''); 
	},
	/**
		this function modifies tabbar icons
		activates the specified tab
	*/
	enablePanels: function(names, active, animation) {
		/**
			check if animation parameter is provided
			otherwise we set it to default
		*/
		if (animation == undefined) 
			animation = app.animation;
		
		/**
			empty current icons list
		*/
		if (names != null) {
			app.curItems = [];
		
			/**
				browse names array and add
				panels corresponding to names
				to current icons list
			*/
			for(i=0; i<names.length; i++) {			
				app.curItems.push(app.panels[names[i]]);
				app.deactivate(names[i]);
			}
		}
		
		/**
			update toolbar properties in app to reflect new icons
		*/
		Ext.apply(app, {
			dock: new Ext.TabPanel({
				tabBarDock: 'bottom',
				cardSwitchAnimation: animation,
				fullscreen: true,
				items: app.curItems
			})
		});	
		
		/**
			activate requested icon
		*/
		if (active != undefined)
			app.activate(active);
	},
	
	/**
	 * Method usefull to switch between declared panels (in app.panels)
	 * 
	 * Return true if this panel exists or false otherwise
	 * activate the named tab
	 *	
	 *	nb: normally, setActiveItem will hilite an icon
	 *	while deactivating the others. In certain cases,
	 *	this is not the case, this is why we provide the 
	 *	deactivate function
	 */
	activate: function(panelName) {	
		// check if the panel 'panelName' exists
		if (Ext.isDefined(app.panels[panelName])) {
			// switch to that panel
			app.dock.setActiveItem(app.panels[panelName]);
			app.panels[panelName].doLayout();
			return true;
		}
		return false;
	},
	/**
		if possible deactivate the named tab
	*/
	deactivate: function(panelName) {		
		try {
			/** 
			* hack to force tab deactivated state 
			*/
			if ((Ext.isDefined(app.panels[panelName])))
				app.panels[panelName].tab.el.removeCls(app.panels[panelName].tab.activeCls);
		}
		catch(err) {
		}
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
	/**
		entry point
	*/
	onReady: function () {
		/**
			all panels are initialized
			and panel array is built
		*/
		Ext.each(app.init, function (item) {
			app.panels[item.name] = item.init();
		});

		/**
			hilite Login panel
		*/
		app.enablePanels(['login'], 'login');


		// Merge dock, listMask and defaultMask
		Ext.apply(app, {
			// declare the TabPanel dock object (see http://dev.sencha.com/deploy/touch/docs/?class=Ext.TabPanel)
			// that contains icons for each panel declared
			dock: new Ext.TabPanel({
				tabBarDock: 'bottom',
				fullscreen: true,           
				cardSwitchAnimation: 'slide',      
				items: app.curItems
			}),
			// create a waiting mask object (see http://dev.sencha.com/deploy/touch/docs/?class=Ext.LoadMask)
			// can be passed to C8O.execute or displayed using show()/hide() methods
			defaultMask: new Ext.LoadMask(Ext.getBody(), {
				msg: 'Loading<br>please wait...'
			}),
			// like the defaultMask but automatically displayed when the app.stores.list is loading data
			listMask: new Ext.LoadMask(Ext.getBody(), {
				msg: 'Loading<br>please wait...',
				// the mask appear when app.stores.list Store is loading (declared in listDisplay.js)
				store: app.stores.list
			})
		});
	}
});
