/*******************************************************
 *******************************************************
 * public jQuery Mobile C8O API for CEMS 6.1.0 *
 *******************************************************
 *******************************************************/


/*******************************************************
 * Global variables *
 *******************************************************/

$.extend(true, C8O, {
	/**
	 * vars variables values can be set at any time.
	 * 
	 * Value can be modified by code, 
	 * for example: C8O.vars.ajax_method="GET"
	 */
	vars : {
//		ajax_method : "POST", /** POST/GET : http method to request CEMS */
//		requester_prefix : "" /** string prepend to the .xml or .cxml requester */
	}
});

/*******************************************************
 * Functions *
 *******************************************************/


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
 * data : string (query form) or Object (key/value) or HTML Form element
 *          used as AJAX parameters
 */
//C8O.call(data)

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
 * isDefined function
 * just check the existence of the argument
 * obj : something to test
 * return : true > obj exists
 *            false > obj doesn't exist
 */
//C8O.isDefined(obj);

/**
 * isUndefined function
 * just check the existence of the argument
 * obj : something to test
 * return : true > obj doesn't exist
 *            false > obj exists
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

/*******************************************************
 * List of possible hooks *
 *******************************************************/


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
//C8O.addHook("document_ready", function () {
//	return true;
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
 *  loading_start hook
 *  used at C8O.call calling and display a transparent mask
 *  that prevents the user to act
 *  
 *  return : true > lets weblib display the loading mask
 *             false > doesn't display anything
 */
//C8O.addHook("loading_start", function () {
//	return true;
//});

/**
 *  loading_stop hook
 *  used after xml_response execution
 *  
 *  return : true > lets weblib hide the loading mask
 *             false > doesn't hide anything
 */
//C8O.addHook("loading_stop", function () {
//	return true;
//});