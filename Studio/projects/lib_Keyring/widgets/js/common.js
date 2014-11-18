/**
 * Convertigo Keyring library
 */

var convertigoBase = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1));
var errorMessages = new Array();

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
    $("#dialog-error-standard").dialog({
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
* Function that displays the error dialog if an error is found in $data
* @param $data the XML response from a sequence
* @return true if an error is found and displayed, false if no error
*/
function handleApplicativeErrors($data) {
    // if Convertigo error or applicative error returned by sequence
    if (($data.find(">error").length) || ($data.find(">errorCode").length && $data.find(">errorCode").text() != "0")) {
        var errorCode = "";
        var errorMessage = "";
        var errorDetails = "";
        
        if ($data.find(">error").length) {
            // Convertigo exception error
            displayException("Error while executing an action", $data.find(">error>message").text(), $data.find(">error>exception").text())
        } else if ($data.find(">errorCode").length && $data.find(">errorCode").text() != "0") {
            // error code returned
            errorCode = parseInt($data.find(">errorCode").text());
            errorMessage = getErrorMessage(errorCode);
            errorDetails = $data.find(">errorDetails").text();
            // display error div
            displayErrorMessage(errorMessage, errorDetails, errorCode);
        }
        return true;
    } else {
        return false;
    }
}

/**
* Retrieves the error message corresponding to the error code
* @param errorCode the error code
* @return the error message to display or "" if no message found
*/
function getErrorMessage(errorCode) {
    if (errorMessages.length > 0) {
        var message = errorMessages[errorCode];
        if (message != undefined && message != null) {
            return message;
        }
    } // else
    return "";
}

function getErrorMessages() {
    // calling GetErrorMessages sequence
    libKeyringCall(
        "GetErrorMessages",
        "default",
        { },
        function($data) {
            // Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
            if (handleApplicativeErrors($data)) {
                // error was found and displayed, nothing else to do
            } else {
            // no Convertigo exception nor status false (error code), handles sequence response
                var $errors = $data.find(">erreur");
                $errors.each(function () {
                    var $error = $(this);
                    var code = $error.find(">code").text();
                    var label = $error.find(">label").text();
                    errorMessages[code] = label;
                    console.log("Error messages[" + code + "]: " + label);
                });
            }
        }
    );
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
            
            var $data = $(data.documentElement);
            if (successAction) successAction.call(null, $data);
        },
        "xml"
    )
    .error(function(event) {
        $("#wait").hide();
        handleError("Error when executing libKeyringCall: " + sequence + " on context '" + context + "'", event.responseXML);
    });
}