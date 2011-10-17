/** public C8O API for CEMS 5.2.0 */

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
 *  payload (optional) : key/value map object ( {key: "value"} ) or an HTML Element.
 *                             In case of HTML Element, its attributes are transformed to a key/value map object.
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
//		enc = "false" /** enable rsa encoding
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
//		ajax_method = "POST", /** POST/GET : http method to request CEMS */
//		auto_refresh = "true", /** true/false : allow auto refresh feature for clipping */
//		auto_resize: "true", /** true/false : allow weblib to perform resize after conent filled */
//		target_append: "false", /** true/false : append content to target_id or to body element */
//		target_id: "", /** element id : element id for result insertion */
//		xsl_side: "client" /** client/server : force the side of the xsl transformation */
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
//C8O.addHook("call", function (data) {
//	return true;
//});


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
//	return true;
//});

/**
 *  mashup_event hook
 *  used for handle doMashupEvent call
 *  and used to implement how to forward event
 *  to the 'mashup' container
 *  
 *  eventName : name of the event
 *  payload : key/value map object
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
 *  text_response hook
 *  used for tweak, retrieve value or do transformation
 *  using the text response from CEMS (after a server XSL transformation)
 *  
 *  aText : array with only one string, aText[0], of the text received
 *            and can be replaced by a new value
 *  return : true > lets weblib perform the inclusion in the DOM
 *             false > break the processing of the weblib
 */
//C8O.addHook("text_response", function (aText) {
//  var text = aText[0];
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