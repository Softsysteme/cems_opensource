/**
 * Convertigo Keyring library
 */

var convertigoBase = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1));

function getHashParams() {
	var params = {};
	var hash = window.location.hash;
	hash.replace(/[#&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
		params[key] = value;
	});
	 
	return params;
}

$(function() {
	$("body").on({
	    ajaxStart: function() { 
	        $(this).addClass("loading"); 
	    },
	    ajaxStop: function() { 
	        $(this).removeClass("loading"); 
	    }    
	});
});

function handleError(message, httpContent) {
	var errorMessage = $(httpContent).find("message").text();
	console.log(message + errorMessage);
	alert(errorMessage);
}

/**
* This function fills the error divs with message and exception, and shows the error div as a dialog
* @param errorMessage : the error message
* @param errorDetails : the error details (optional)
* @param errorCode : the error code
*/
function displayException(message, errorMessage, exception) {
	console.log(message);
	console.log(errorMessage);
	console.log(exception);

	$("#dialog-error-message").text(message);
	$("#dialog-error-sub-message").text(errorMessage);
	$("#dialog-error-exception-message").text(exception);
	
	$("#dialog-error").dialog({
		resizable: false,
		modal: true,
		buttons: [
					{
						text: "OK",
						click: function() {
							$(this).dialog("close");
						}
					}
		]
	});

}

/**
* This function fills the error divs with message and details, and shows the error div as a dialog
* @param errorMessage : the error message
* @param errorDetails : the error details (optional)
* @param errorCode : the error code
*/
function displayErrorMessage(errorMessage, errorDetails, errorCode) {
	console.log(errorCode);
	console.log(errorMessage);
	console.log(errorDetails);
	
	$("#errorMessage").text(errorMessage);
	$("#errorDetails").text(errorDetails);
	$("#error-standard").dialog({
		modal: true,
		draggable: false,
		resizable: false,
		buttons: { 
			"Ok": function() { 
				$(this).dialog("close");
			}
		}
	});
}


/**
* Function that displays the error dialog if an error is found in $doc
* @param $doc the document element of XML response from a sequence 
* @return true if an error is found and displayed, false if no error
*/
function handleApplicativeErrors($doc) {
	// if Convertigo error or applicative error returned by sequence
	if (($doc.find(">error").length) || ($doc.find(">errorCode").length && $doc.find(">errorCode").text() != "0")) {
		var errorCode = "";
		var errorMessage = "";
		var errorDetails = "";
		
		if ($doc.find(">error").length) {
			// Convertigo exception error
			displayException("Error while executing an action", $doc.find(">error>message").text(), $doc.find(">error>exception").text())
		} else if ($doc.find(">errorCode").length && $doc.find(">errorCode").text() != "0") {
			// error code returned
			errorCode = parseInt($doc.find(">errorCode").text());
			errorMessage = getErrorMessage(errorCode);
			errorDetails = $doc.find(">errorDetails").text();
			// display error div
			displayErrorMessage(errorMessage, errorDetails, errorCode);
		} 
		return true;
	} else {
		return false;
	}
}

function libKeyringCall(sequence, context, params, successAction) {
	console.log("libKeyringCall: " + sequence + " on context '" + context + "'");
	
	var sequenceCallParams = {};
	
	sequenceCallParams["__sequence"] = sequence;
	sequenceCallParams["__context"] = context;

	for (var param in params) {
		sequenceCallParams[param] = params[param];
	}
	
	console.log("Call params:");
	console.log(sequenceCallParams);
	
	$.post(
			convertigoBase + "/projects/lib_Keyring/.xml",
			sequenceCallParams,
			function(data) {
				console.log("Received data:");
				console.log(data);
				
				var $data = $(data);
				if (successAction) successAction.call(null, $data);
			},
			"xml"
	)
    .error(function(event) {
    	$("#wait").hide();
    	handleError("Error when executing libKeyringCall: " + sequence + " on context '" + context + "'",
    		event.responseXML);
    });
}