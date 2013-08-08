/*******************************************************
 *******************************************************
 * public C8O API for CEMS 6.3.0
 * for a jQuery Mobile application using the CTF
 * 
 * Dependences in HTML file:
 * * jquery(.min).js
 * * c8o.core.js
 * * c8o.jquerymobile.js
 * * ctf.core.js
 * * ctf.jquerymobile.js
 * * custom.js (this file)
 * * jquery.mobile(.min).js
 *******************************************************
 *******************************************************/


/*******************************************************
 * Global variables *
 *******************************************************/

$.extend(true, C8O, {
	/**
	 * init_vars variables values can only be set before the "init_finish" hook,
	 * by the code,
	 * their values must be strings, 
	 * their state cannot be modified later.
	 */
	init_vars: {
//		i18n: "" /** in case of multi-language application, force usage of the language selected. Empty string while select the browser language */
	},
	
	/**
	 * ro_vars variables values can only be set directly here, not dynamically
	 */
	ro_vars: {
//		i18n_files: [] /** list of language available for the application. The first is the default language. The application must have an i18n folder with 1 file per language like: i18n/en.json */
	},
	
	/**
	 * vars variables values can be set at any time.
	 * by the code, or by passing arguments to C8O.call() by adding __ 
	 * their values must be strings,
	 * their state can be modified later.
	 * 
	 * Value can be modified by code, 
	 * for example: C8O.vars.ajax_method="GET"
	 */
	vars: {
//		ajax_method: "POST", /** POST/GET: http method to request CEMS */
//		endpoint_url: "", /** base of the URL CEMS calls. Should not be modified */
//		first_call: "false", /** true/false: automatically call convertigo using the page query/hash parameters, after the init_finished hook */
//		log_level: "warn", /** none/error/warn/info/debug/trace: filter logs that appear in the browser console */
//		log_line: "false", /** true/false: add an extra line on Chrome console with a link to the log */
//		requester_prefix: "" /** string prepend to the .xml or .cxml requester */
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
 * name: string of the hook name
 * fn: function of the handler
 */
//C8O.addHook(name, fn);

/** 
 *  addRecallParameter function
 *  force C8O.call() to send automatically parameters
 *  added by this function with its last value
 *  already added parameter are __connector and __context
 *  to save a new value for a parameter, specify it to the C8O.call() function
 *  or call C8O.addRecallParameter again
 *  parameter_name: string of the parameter name to automatically send
 *  parameter_value (optional): initial value for this parameter
 */
//C8O.addRecallParameter(parameter_name, parameter_value);

/**
 * appendValue function
 * append value in data.key :
 * * set value if no previous
 * * make or reuse an array and push the value at the end
 * data: Object (key/value) that will be modified
 * key: string, key of the data to modify
 * value: any object pushed into data.key
 */
//C8O.appendValue(data, key, value);

/**
 * appendValues function
 * merge values of the source Object into the data Object
 * using appendValue on each source keys
 * data: Object (key/value) that will be modified
 * source: Object (key/value) that will be merged into data but not modified
 */
//C8O.appendValues(data, source);

/**
 * call function
 * make an AJAX request to CEMS in order to execute
 * a transaction or a sequence using specified parameters
 * data: string (query form) or Object (key/value) or HTML Form element
 *          used as AJAX parameters
 */
//C8O.call(data)

/**
 * canLog function
 * tell if the actual C8O.vars.log_level allow to log
 * level: string (error/warn/info/debug/trace) log level to test
 * return: true > can log
 *           false > cannot log
 */
//C8O.canLog(level)

/**
 * convertHTML function
 * copy an XML element to an HTML element or create a new fragment
 * input: XML element to copy to an HTML element into the ouput or a new fragment element
 * output (optional): HTML element where the input copy is appended
 * return: HTML element, output element or a new <fragment> element with the imported input
 */
//C8O.convertHTML(input, output)

/**
 * getLastCallParameter function
 * used for retrieve a parameter from the previous call
 *  or all parameter in a object key/value
 *  key: string of the parameter name
 *  return: string of the parameter value or undefined
 *             or retrieve object with key/value of all parameters
 */
//C8O.getLastCallParameter(key);

/**
 * isDefined function
 * just check the existence of the argument
 * obj: something to test
 * return: true > obj exists
 *            false > obj doesn't exist
 */
//C8O.isDefined(obj);

/**
 * isUndefined function
 * just check the existence of the argument
 * obj: something to test
 * return: true > obj doesn't exist
 *            false > obj exists
 */
//C8O.isUndefined(obj);

/**
 * removeRecallParameter function
 * reversed effect of addRecallParameter function
 * remove a parameter from automatically
 * added parameter list
 * parameter_name: parameter name to remove from the list
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
 *  data: key/value map of parameters sent to CEMS
 *  return: true > lets weblib perform the call
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
 *  return: true > lets weblib perform the init
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
 *  xml: pure DOM document
 *  return: true > lets weblib perform the xml
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
 *  return: true > lets weblib display the loading mask
 *             false > doesn't display anything
 */
//C8O.addHook("loading_start", function () {
//	return true;
//});

/**
 *  loading_stop hook
 *  used after xml_response execution
 *  
 *  return: true > lets weblib hide the loading mask
 *             false > doesn't hide anything
 */
//C8O.addHook("loading_stop", function () {
//	return true;
//});