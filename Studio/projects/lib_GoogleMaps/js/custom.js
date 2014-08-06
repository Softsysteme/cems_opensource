/** public C8O API for CEMS 5.3.0 */
var Map; // Global Object
var myVar = {
	zoom: 8,
	height: 400
}

/**
 * addHook function
 * some part of the weblib can be customized using a hook
 * just specify the hook name and its handler
 * all existing hook are explain bellow
 * name : string of the hook name
 * fn : function of the handler
 */
//C8O.addHook(name, fn);

/** 
 *  addRecallParameter function
 *  force C8O.call() to send automatically parameters
 *  added by this function with its last value
 *  already added parameter are __connector and __context
 *  to save a new value for a parameter, specify it to the C8O.call() function
 *  or call C8O.addRecallParameter again
 *  parameter_name : string of the parameter name to automatically send
 *  parameter_value (optional) : initial value for this parameter
 */
//C8O.addRecallParameter(parameter_name, parameter_value);

/**
 * call function
 * make an AJAX request to CEMS in order to execute
 * a transaction or a sequence using specified parameters
 * data : string (query form) or Object (key/value)
 *          used as AJAX parameters
 */
//C8O.call(data)

/** 
 *  doMashupEvent function
 *  dispatch a mashup event to the current container if any
 *  via the invocation of mashup_event hook
 *  event_name : string of the parameter name to automatically send
 *  payload (optional) : initial value for this parameter
 */
//C8O.doMashupEvent(event_name, payload);

/**
 * doNavigationBarEvent function
 * for HTML connector only
 * send an action to the navigation bar of the connector
 * action : string of value 'backward', 'forward', 'stop' or 'refresh'
 */
//C8O.doNavigationBarEvent(action);

/**
 * doReconnect function
 * reload the current window with the initial query
 */
//C8O.doReconnect();

/**
 * doResize function
 * perform a resize of the frame element if any
 * and calculate automatically the height if not provided
 * height (optional) : number of the iframe height in pixel
 *                          automatically calculed if empty
 */
//C8O.doResize(height);

/**
 * getLastCallParameter function
 * used for retrieve a parameter from the previous call
 *  or all parameter in a object key/value
 *  key : string of the parameter name
 *  return : string of the parameter value or undefined
 *             or retrieve object with key/value of all parameters
 */
//C8O.getLastCallParameter(key);

/**
 * isUndefined function
 * just check the existence of the argument
 * obj : something to test
 * return : true > obj exist
 *            false > obj doesn't exist
 */
//C8O.isUndefined(obj);

/**
 * removeRecallParameter function
 * reversed effect of addRecallParameter function
 * remove a parameter from automatically
 * added parameter list
 * parameter_name : parameter name to remove from the list
 */
//C8O.removeRecallParameter(parameter_name);

$.extend(true, C8O, {
	/**
	 * init_vars values can be set only before the first C8O.call()
	 * by the code (must be string) or by the first query
	 * and it state cannot be modified after
	 * 
	 * if set by query, value should be preceding by __
	 * sample : ?__enc=true&...
	 */
	init_vars : {
//		enc : "false" /** enable rsa encoding
	},
	/**
	 * vars values can be set at every time (must be string)
	 * by the code, by the query or by passing argument to C8O.call()
	 * and it state cannot be modified after
	 * Value can be change by code
	 * sample : C8O.vars.ajax_method="GET"
	 * If set by query, value should be preceding by __
	 * sample : ?__ajax_method=GET&...
	 */
	vars : {
//		ajax_method : "POST", /** POST/GET : http method to request CEMS */
//		auto_refresh : "true", /** true/false : allow auto refresh feature for clipping */
//		auto_resize : "true", /** true/false : allow weblib to perform resize after conent filled */
//		resize_offset : "50", /** integer : number of pixel added to the automatic resize */
//		target_append : "false", /** true/false : append content to target_id or to body element */
//		target_id : "", /** element id : element id for result insertion */
		xsl_side: "none" /** client/server/none: force the side of the xsl transformation or pure XML */
	}
});

/**
 *  call hook
 *  used before AJAX request to CEMS server
 *  can tweak data before sending
 *  or perform request itself
 *  
 *  data : key/value map of parameters sent to CEMS
 *  return : true > lets weblib perform the call
 *             false > weblib doen't perform the call
 */
C8O.addHook("call", function (data) {
	var Transaction = data["__transaction"];
	var Connector = data["__connector"];
	
	// If the call is done on an other connector, do the standard C8O job, calling the server 
	if (Connector !== 'GoogleMapsConnector') {
		return true;
	}

	var geocoder = new google.maps.Geocoder();
	
	if (Transaction === "ShowMap") {
		var Location = data["Location"];
		if (typeof(data["Zoom"]) !== "undefined") {
			myVar.zoom = data["Zoom"];
		}
		if (typeof(data["Height"]) !== "undefined") {
			myVar.height = data["Height"];
		}
		C8O.doResize(myVar.height * 1);
		
		geocoder.geocode( {address : Location}, function(results, status) {
		      if (status === google.maps.GeocoderStatus.OK) {
		    	  var myOptions = {
		    			  zoom : myVar.zoom * 1,
		    			  center : results[0].geometry.location,
		    			  mapTypeId : google.maps.MapTypeId.ROADMAP
		    	  };
		    	  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		    	  
		    	  var markerOptions = {
		    			  map : map,
		    			  position : results[0].geometry.location
		    	  };
		    	  var marker = new google.maps.Marker(markerOptions);
		    	  Map = map; // save map pointer in global object
		      } else {
		    	  alert("Geocode was not successful for the following reason: " + status);
		      }
		});
	} else if (Transaction === "MarkLocation") {
		var Location = data["Location"];
		var Tooltip  = data["Tooltip"];
		
		geocoder.geocode( {address: Location}, function(results, status) {
		      if (status === google.maps.GeocoderStatus.OK) {
		    	  var markerOptions = {
		    			  map : Map,
		    			  position : results[0].geometry.location
		    	  };
		    	  var marker = new google.maps.Marker(markerOptions);
		    	  
		    	  var infoWindowOptions = {
		    			  content : "<p style='font-family:Arial'>" + Tooltip + "</p>",
		    			  position : results[0].geometry.location
		    	  }
		    	  var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
		    	  infoWindow.open(Map);
		      } else {
			        alert("Geocode was not successful for the following reason: " + status);
			  }
		} );
	}
	return false;
});


/**
 *  document_ready hook
 *  used at page loading
 *  can perform some DOM tweak
 *  or break the processing of request
 *  
 *  return : true > lets weblib perform the init
 *             false > break the processing of request
 */
//C8O.addHook("document_ready", function (data) {
	//return true;
//});

/**
 *  mashup_event hook
 *  used for handle doMashupEvent call
 *  and used to implement how to forward event
 *  to the 'mashup' container
 *  
 *  eventName : name of the event
 *  payload : key/value map
 */
//C8O.addHook("mashup_event", function (eventName, payload) {
//
//});

/**
 *  xml_response hook
 *  used for tweak, retrieve value or do transformation
 *  using the XML response from CEMS
 *  
 *  xml : pure DOM document
 *  return : true > lets weblib perform the xml
 *             false > break the processing of xml
 */
//C8O.addHook("xml_response", function (xml) {
//	return true;
//});

/**
 *  resize_calculation hook
 *  used after the content is filled
 *  for calculate the height of the
 *  iframe element
 *  
 *  return : false > bypass weblib resize 
 *             type of 'number' > height for the iframe
 *             other > do standard resize
 */
//C8O.addHook("resize_calculation", function () {
//	return true;
//});


/**
 *  result_filled hook
 *  used after the content is filled
 *  but before set event listener
 *  and iframe resize
 *  
 *  return : true > lets weblib perform the init 
 *             false > bypass weblib resize
 */
//C8O.addHook("result_filled", function () {
//	return true;
//});