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