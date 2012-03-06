/*******************************************************
 *******************************************************
 * public jQuery Mobile C8O API for CEMS 5.6.0 *
 *******************************************************
 *******************************************************/

$(document).bind('mobileinit',function(){
   $.mobile.selectmenu.prototype.options.nativeMenu = false;
});

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
		geocoder : new google.maps.Geocoder()
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
 * isUndefined function
 * just check the existence of the argument
 * obj : something to test
 * return : true > obj doesn't exist
 *            false > obj exist
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
//return true;
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
C8O.addHook("document_ready", function () {
	/* 
	 * handles username and password storing in local storage 
	 * or removing from storage when checking or unchecking the "remember me" checkbox   
	 */
	if(C8O.isUndefined(localStorage)) {
		$("#rememberme").attr("disabled", "disabled");
	} else if (localStorage.getItem('userId') !== null) {
		// sets back the values from the local storage to the form's fields
		$("#rememberme").attr("checked", "checked");
		$("#userId").val(localStorage.getItem('userId'));
		$("#password").val(localStorage.getItem('password'));
	}
	
	/* 
	 * add a submit event handler on each form
	 * to perform a C8O.call on the submitted form
	 * and stop the submit action (by the return false statement)
	 */  
	$("form").submit(function () {
		C8O.call(this);
		return false;
	});
	
	/*
	 * define a click event handler on the "localize" button to execute the map 
	 * and display the last accessed address stored in "C8O.vars.address" variable
	 */
	$("#localize").click(function() {
		C8O.vars.geocoder.geocode({address: C8O.vars.address}, 
			function (results, status) {
				if (!C8O.isUndefined(C8O.vars.exMarker)) {
					C8O.vars.exMarker.setMap(null);
				}
				if (C8O.isUndefined(C8O.vars.map)) {
					C8O.vars.map = new google.maps.Map(
							document.getElementById("map-canvas"),
							{
								zoom: 14,
								mapTypeId: google.maps.MapTypeId.ROADMAP
							}
					);
				}
				C8O.vars.map.setCenter(results[0].geometry.location);
				C8O.vars.exMarker = new google.maps.Marker({
					map: C8O.vars.map,
					position: results[0].geometry.location
				});
				$.mobile.changePage($("#map"));
			}
		);
	});
	
	return true;
});

/**
 *  xml_response hook
 *  used for tweak, retrieve value or do transformation
 *  using the XML response from CEMS
 *  
 *  xml : pure DOM document
 *  return : true > lets weblib perform the xml
 *             false > break the processing of xml
 */
C8O.addHook("xml_response", function (xml) {

	var $xml = $(xml);
	var lastTr = C8O.getLastCallParameter("__transaction");
	var lastSeq = C8O.getLastCallParameter("__sequence");
	
	/*
	 * Handles Convertigo exception XML response
	 * to automatically pop the error dialog
	 */
	if ($xml.find("document>error").length) {
		// erreur exception Convertigo
		$("#errorMessageTarget").text($xml.find("document>error>message").text());
		$.mobile.changePage($("#errorMessage"), {transition : "pop"});
	} else {
	/*
	 * no Convertigo exception
	 * figures out which transaction or sequence was last called
	 * to handle its response in a dedicated function
	 */
		if(lastSeq == "Login") {
			/* returning from Login sequence */
			loginResponse($xml);
		} else if(lastSeq == "LoadList") {
			/* returning from LoadList sequence */
			loadListResponse($xml);
		}
	}

	return true;
});

/**
* Executed on Login sequence response
* @param $xml : the xml response from Convertigo
*/
function loginResponse ($xml) {
	if ($("#rememberme").attr("checked")) {
		// stocking in local storage the login data
		localStorage.setItem('userId', $("#userId").val());
		localStorage.setItem('password', $("#password").val())
	} else if (C8O.isDefined(localStorage) && localStorage.getItem('userId') !== null) {
		// removing from local storage the login data
		localStorage.removeItem('userId');
		localStorage.removeItem('password');
	}
	var logon = $xml.find("document>logon").text();
	if(logon == "true") {
		$.mobile.changePage($("#search"));
	} else {
		$("#errorMessageTarget").text("Login failed");
		$.mobile.changePage($("#errorMessage"), {transition : "pop"});
	}
}

/**
* Executed on LoadList sequence response
* @param $xml : the xml response from Convertigo
*/
function loadListResponse($xml) {
	//clean the list of results
	var $ul = $("#listing ul");
	$ul.empty();

	var $result= $xml.find("document>results>result");
	$("#nbleave").text($result.length);

	$result.each(function () {
		var img = $(this).find("img").text();
		var title = $(this).find("title").text();
		var address = $(this).find("address").text();
		var description = $(this).find("description").text();
		var price = $(this).find("price").text();
		var total = $(this).find("total").text();
		$ul.append(
			$("<li/>").append(
				$("<a/>").attr("href", "#").append(
					$("<img/>").attr("src", img),
					$("<h3/>").text(title)
				)
			).click(function () {
				C8O.vars.address = address;
				$("#maindetails ul").empty();
				$("#maindetails ul").append(
					$("<li/>").append(
						$("<b/>").text("Title : "), title
					),
					$("<li/>").append(
							$("<b/>").text("Address : "), address
					),
					$("<li/>").append(
							$("<b/>").text("Price : "), price
					),
					$("<li/>").append(
							$("<b/>").text("Total : "), total
					)
				);
				
				$("#description").empty();
				$("#description").append($("<p/>").text(description));
				$.mobile.changePage($("#details"));

				try {
					$("#maindetails ul").listview("refresh");
				} catch (e) {}
			})
		);
	});
	
	try {
		$ul.listview("refresh");
	} catch (e) {}
	
	$.mobile.changePage($("#listing"));
}

/**
 *  loading_start hook
 *  used at C8O.call calling and display a transparent mask
 *  that prevents the user to act
 *  
 *  return : true > lets weblib display the loading mask
 *             false > doesn't display anything
 */
//C8O.addHook("loading_start", function () {
//return true;
//});

/**
 *  loading_stop hook
 *  used after xml_response execution
 *  
 *  return : true > lets weblib hide the loading mask
 *             false > doesn't hide anything
 */
//C8O.addHook("loading_stop", function () {
//return true;
//});