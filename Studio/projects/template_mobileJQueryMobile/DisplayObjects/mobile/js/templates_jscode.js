/**
 * This page proposes a set of JS code lines to be included in your "custom.js" file if needed.
 * To use a page in your mobile application, simply copy and paste the needed lines of code in
 * corresponding function in your "custom.js" file. 
 */ 


/**
 * JS code that can be added on the "document_ready" hook
 * 
 *  document_ready hook
 *  used at page loading
 *  can perform some DOM tweak
 *  or break the processing of request
 *  
 *  return : true > lets weblib perform the init
 *             false > break the processing of request
 *
 */
C8O.addHook("document_ready", function () {
	/* 
	 * checks the existence of HTML5 localStorage
	 * if exists, activates the "rememberme" checkbox and sets back the stored values in the login inputs
	 * if does not exist, disables the "rememberme" checkbox
	 */
	if(C8O.isUndefined(localStorage)) {
		$("#rememberme").attr("disabled", "disabled");
	} else if (localStorage.getItem('user') !== null) {
		// sets back the values from the local storage to the form's fields
		$("#rememberme").attr("checked", "checked");
		$("#user").val(localStorage.getItem('user'));
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
	 * defines a click event handler on a button
	 * to change displayed page in application
	 */
	$("#switchPage").click(function() {
		$.mobile.changePage($("#otherPage"));
	});
	
	/*
	 * defines a click event handler on a button
	 * to call a Convertigo sequence
	 */
	$("#callSeq").click(function() {
		C8O.call({
			/*
			 * Customize here the name of the Convertigo Sequence or Transaction to call
			 * as well as other parameters, such as context name, or project if the method is in a separate project,
			 * and all the variables the sequence or transaction needs. 
			 */
//          __project: "XXX", 
			__sequence:"XXX",
//			__connector:"XXX",
//			__transaction:"XXX",
//			__context:"XXX",
			variable1: value1,
			variable2: value2
		});
	});
	
	/*
	 * returning true at the end of this hook will let the process continue ;
	 * returning false at the end of this hook stops the process 
	 */
	return true;
}


/**
 *  JS code that can be added on the "xml_response" hook
 * 
 *  xml_response hook
 *  used for tweak, retrieve value or do transformation
 *  using the XML response from CEMS
 *  
 *  xml : pure DOM document
 *  return : true > lets weblib perform the xml
 *             false > break the processing of xml
 *             
 */
C8O.addHook("xml_response", function (xml) {

	/*
	 * Retrieving xml DOM in a jQuery variable
	 */
	var $xml = $(xml);
	
	/*
	 * Retrieving document element in a jQuery variable
	 */
	var $doc = $(xml.documentElement);
	
	/*
	 * Retrieving last transaction and last sequence from last call to Convertigo server.
	 * This will help determining which actions have to be achieved : which data to manage in which screen.
	 * The choice can be done depending on the last "requestable", but also on the xml response itself, depending on tis content (see above code).
	 */
	var lastTr = C8O.getLastCallParameter("__transaction");
	var lastSeq = C8O.getLastCallParameter("__sequence");
	
	/**
	 * Following code implements a choice of response management: 
	 * - first handles Exceptions (identified in XML response)
	 * - then manages the different transactions / sequences responses and fill the matching screens.
	 */
	
	/*
	 * Manages Convertigo exception XML response to automatically pop the error dialog
	 */
	if ($xml.find("document>error").length) {
		// setting exception message in error page content
		$("#errorMessageTarget").text($xml.find("document>error>message").text());
		// changing page to display error message page as a popup dialog
		$.mobile.changePage($("#errorMessage"), {transition : "pop"});
	} else {
	/*
	 * no Convertigo exception
	 * figures out which transaction or sequence was last called
	 * to handle its response in a dedicated function
	 */
	 	if(lastSeq == "authentication") {
			/* returning from authentication sequence */
			authenticationResponse($xml);
		} else if(lastSeq == "list") {
			/* returning from list sequence */
			listResponse($xml);
		} else if(lastSeq == "details") {
			/* returning from details sequence */
			detailsResponse($xml);
		}
	}

	return true;
});


/**
* Example of function that can be executed on authentication sequence response
* @param $xml : the xml response from Convertigo
*/
function authenticationResponse ($xml) {
	// managing the rememberme checkbox : storing in local storage the username / password 
	// or removing from local storage if the checkbox is not checked 
	if ($("#rememberme").attr("checked")) {
		// stocking in local storage the login data
		localStorage.setItem('user', $("#user").val());
		localStorage.setItem('password', $("#password").val())
	} else if (C8O.isDefined(localStorage) && localStorage.getItem('user') !== null) {
		// removing from local storage the login data
		localStorage.removeItem('user');
		localStorage.removeItem('password');
	}
	// managing the return of the authentication sequence / transaction
	var logon = $xml.find("document>logon").text();
	if(logon == "true") {
		// login OK, changing page to display a form page
		$.mobile.changePage($("#form"));
	} else {
		// login KO, changing page to display an error message in a popup
		$("#errorMessageTarget").text("Login failed");
		$.mobile.changePage($("#errorMessage"), {transition : "pop"});
	}
}

/**
* Example of function that can be executed on response of a sequence returning a list
* @param $xml : the xml response from Convertigo
*/
function listResponse($xml) {
	//cleaning the list of results
	var $ul = $("#listing ul");
	$ul.empty();

	// retrieving the iterated element from XML response
	var $result= $xml.find("document>results>item");
	
	// setting the number of results in the page header
	$("#nbleave").text($result.length);

	// iterating on the list of results
	$result.each(function () {
		// retrieving column values in variables
		var img = $(this).find("img").text();
		var title = $(this).find("title").text();
		
		// creating and adding a row to the list 
		$ul.append(
			$("<li/>").append(
				$("<a/>").attr("href", "#").append(
					$("<img/>").attr("src", img),
					$("<h3/>").text(title)
				)
			).click(function () {
				// setting a click event handler on the created row
				// For example, calling a Convertigo sequence named "details", 
				// with a variable named "name" using row's title as value 
				C8O.call({
					__sequence:"details",
					name: title
				});
			})
		);
	});
	
	// after the iteration on list elements, refreshing the list for it to be correctly displayed 
	try {
		$ul.listview("refresh");
	} catch (e) {}
	
	// changing page to display the created list
	$.mobile.changePage($("#listing"));
}


/**
* Example of function that can be executed on details sequence response
* @param $xml : the xml response from Convertigo
*/
function detailsResponse ($xml) {
	// cleaning the details list
	$("#maindetails ul").empty();
	
	// retrieving data from XML response 
	var $details= $xml.find("document>details");
	// retrieving details values in variables
	var address = $details.find("address").text();
	var postCode = $details.find("PC").text();
	var city = $details.find("city").text();
	var description = $details.find("description").text();
	
	// creating and adding rows to the details list 
	$("#maindetails ul").append(
		$("<li/>").append(
				$("<b/>").text("Address : "), address
		),
		$("<li/>").append(
				$("<b/>").text("Post code : "), postCode
		),
		$("<li/>").append(
				$("<b/>").text("City : "), city
		)
	);
	
	// after filling the list, refreshing it for it to be correctly displayed 
	try {
		$("#maindetails ul").listview("refresh");
	} catch (e) {}
	
	// cleaning the description DIV
	$("#description").empty();
	
	// creating and adding description content 
	$("#description").append($("<p/>").text(description));
	
	// changing page to display the details page
	$.mobile.changePage($("#details"));
}
