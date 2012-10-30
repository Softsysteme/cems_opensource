/**
 * Convertigo Keyring library
 */
console.log("Convertigo Keyring library - user keychain");

var urlParams = getHashParams();
var user = urlParams["user"];
var userID = null;

var convertigoBase = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1));
var notSetApplications = [];
var notSetApplicationsIDs = [];

$(function() {
	console.log("Document ready!");

	// calling getErrorMessages sequence
	getErrorMessages();
	
	// TODO user retrieval to be updated later with token authentication 
	$("#user").text(user);
	
	// calling getUserID sequence
	getUserID();
//	getNotSetApplications();
//	createAppList();
	
	
	$("button").button();
		
	$("#button-new-keychain-entry").button().click(function(eventObject) {
		showNewKeychain(user);
	});

	$("#keychain-entry-add").click(function(eventObject) {
		var application = $("#form-new-entry-application").val();
		$(".dialog-application").text(application);
		
		// Check form
		var username = $("#form-new-entry-username").val();
		if (username === "") {
			$("#dialog-error-missing-username").dialog({
				modal: true,
				buttons: {
					Ok: function() {
						$(this).dialog("close");
						$("#form-new-entry-username").focus();
					}
				}
			});
			return;
		}
		$(".dialog-username").text(username);
		
		var password1 = $("#form-new-entry-password1").val();
		var password2 = $("#form-new-entry-password2").val();

		if (password1 === "" || password2 === "" || password1 !== password2) {
			$("#dialog-error-new-passwords").dialog({
				modal: true,
				buttons: {
					Ok: function() {
						$(this).dialog("close");
						$("#form-new-entry-password1").focus();
					}
				}
			});
			return;
		}

		// retrieving applicationID
		var appID = notSetApplicationsIDs[application];
		addKeychainEntry(appID, username, password1);
	});

	$("#keychain-entry-delete").click(function(eventObject) {
		var buttonYes = $("#dialog-confirm-delete-keychain-entry").attr("buttonYes");
		var buttonNo = $("#dialog-confirm-delete-keychain-entry").attr("buttonNo");
		
		var application = $("#form-application").val();
		$(".dialog-application").text(application);

		$("#dialog-confirm-delete-keychain-entry").dialog({
			resizable: false,
			modal: true,
			buttons: [
				{
					text: buttonYes,
					click: function() {
						// var application = $("#form-application").val();
						var applicationID = $("#form-applicationID").val();
						deleteKeychainEntry(applicationID);
						$(this).dialog("close");
					}
				},
				{
					text: buttonNo,
					click: function() {
						$(this).dialog("close");
					}
				}
			]
		});
	});

	$("#keychain-entry-update").click(function() {
		var application = $("#form-application").val();
		$(".dialog-application").text(application);
		
		// Check form
		var username = $("#form-username").val();
		if (username === "") {
			$("#dialog-error-missing-username").dialog({
				modal: true,
				buttons: {
					"Ok": function() {
						$(this).dialog("close");
						$("#form-username").focus();
					}
				}
			});
			return;
		}
		$(".dialog-username").text(username);
		
		var newPassword1 = $("#form-new-password1").val();
		var newPassword2 = $("#form-new-password2").val();
		
		if ((newPassword1 === "" || newPassword2 === "") && newPassword1 !== newPassword2) {
			$("#dialog-error-new-passwords").dialog({
				modal: true,
				buttons: {
					"Ok": function() {
						$(this).dialog("close");
						$("#form-new-password1").focus();
					}
				}
			});
			return;
		}
		if (newPassword1 !== "") { 
			$(".dialog-password").text("*********");
		}
		
		var buttonYes = $("#dialog-confirm-update-keychain-entry").attr("buttonYes");
		var buttonNo = $("#dialog-confirm-update-keychain-entry").attr("buttonNo");
		
		$("#dialog-confirm-update-keychain-entry").dialog({
			resizable: false,
			modal: true,
			buttons: [
				{
					text: buttonYes,
					click: function() {
						//var application = $("#form-application").val();
						var applicationID = $("#form-applicationID").val();
						var username = $("#form-username").val();
						var newPassword1 = $("#form-new-password1").val();
						
						updateKeychainEntry(applicationID, username, newPassword1);
						$(this).dialog("close");
					}
				},
				{
					text: buttonNo,
					click: function() {
						$(this).dialog("close");
					}
				}
			]
		});
		
	});
	
	$("#button-new-keychain-entry").click();
});

/**
 * calls sequences to load the page content
 * @param reset: if true, is in reset mode, not the first launch: clicks on the button to display the new keychain form
 * 				if false, is the first launch of the widget 
 */
function startWidget(reset) {
	getNotSetApplications();
	createAppList();
	if (reset) {
		$("#button-new-keychain-entry").click();
	}
}

function getUserID() {
	libKeyringCall(
		"GetUserID",
		"ctxGetUserID",
		{ user: user },
		function($data) {
			// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
			if (handleApplicativeErrors($data)) {
				// error was found and displayed, nothing else to do
			} else {
				// no Convertigo exception nor status false (error code), handles sequence response
				var $user = $data.find(">user");
				var id = $user.attr("id");
				var userName = $user.attr("name");
				userID = id;
				
				// calling other sequences to load the page content
				startWidget(false);
				// TODO move this code part to Document ready after token is used?
			}
		}
	);
}

function createAppList() {
	console.log("Getting application list");
	
	// calling GetUserKeychain sequence
	libKeyringCall(
		"GetUserKeychain",
		"ctxGetUserKeychain",
		{ userID: userID },
		function($data) {
			// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
			if (handleApplicativeErrors($data)) {
				// error was found and displayed, nothing else to do
			} else {
				// no Convertigo exception nor status false (error code), handles sequence response

				$("#app-menu-wait").hide();
				
				// emptying destination ul
				var $ul = $("#app-list-ul");
				$(".app-li").remove();
				
				$data.find(">keychain>authentication").each(function(index) {
					var $authentication = $(this);
					var $application = $authentication.find(">application");
					var $username = $authentication.find(">username");
					
					var applicationName = $application.text();
					var applicationID = $application.attr("id");
					var username = $username.text();
					
					$ul.append(
						$("<li class='app-li'/>").append(
							$("<a/>").attr("class", "application").attr("appid", applicationID).attr("application", applicationName).attr("username", username).text(applicationName)
						)
					);
				});

				$(".application").button().click(function(eventObject) {
					var application = $(this).text();
					var applicationID = $(this).attr("appid");
					var username = $(this).attr("username");
					showKeychainData(application, applicationID, username);
				});
			}
		}
	);
}

function getNotSetApplications() {
	// calling GetUserNotSetApplications sequence
	libKeyringCall(
		"GetUserNotSetApplications",
		"ctxGetUserNotSetApplications",
		{ userID: userID },
		function($data) {
			// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
			if (handleApplicativeErrors($data)) {
				// error was found and displayed, nothing else to do
			} else {
				// no Convertigo exception nor status false (error code), handles sequence response
				notSetApplications = [];
				
				$data.find(">applications>application").each(function(index) {
					var $application = $(this);
					var applicationID = $application.attr("id");
					var applicationName = $application.text();
					notSetApplications.push(applicationName);
					notSetApplicationsIDs[applicationName] = applicationID;
				});
				
				console.log("Not set applications: " + notSetApplications);

				$("#form-new-entry-application").autocomplete({
				    source: notSetApplications
				});
			}
		}
	);
}

/**
 * shows the edit keychain form with application data
 */
function showKeychainData(application, applicationID, username) {
	// resetting values in form
	$("#keychain-entry input").val("");
	// setting values in form
	var formApplication = $("#form-application");
	formApplication.attr('disabled', true);
	formApplication.val(application);
	$("#form-applicationID").val(applicationID);
	$("#form-username").val(username);
	// hiding / showing divs
	$("#keychain-entry-new").hide();
	$("#keychain-entry").show();
	
}

/**
 * shows the new keychain form
 */ 
function showNewKeychain(username) {
	// emptying / setting values in form
	$("#keychain-entry-new input").val("");
	$("#form-username").val(username);
	// hiding / showing divs
	$("#keychain-entry").hide();
	$("#keychain-entry-new").show();
}


function addKeychainEntry(appID, username, password) {
	// calling AddAuthentication sequence
	libKeyringCall(
		"AddAuthentication",
		"ctxAddAuthentication",
		{ 
			userID: userID, 
			applicationID: appID, 
			username: username,
			password: password
		},
		function($data) {
			// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
			if (handleApplicativeErrors($data)) {
				// error was found and displayed, nothing else to do
			} else {
				// no Convertigo exception nor status false (error code), handles sequence response
				$("#dialog-info-keychain-entry-added").dialog({
					resizable: false,
					modal: true,
					buttons: [
						{
							text: "OK",
							click: function() {
								$(this).dialog("close");
								startWidget(true);
								
							}
						}
					]
				});
			}
		}
	);
}

function updateKeychainEntry(appID, username, newPassword) {
	// calling UpdateAuthentication sequence
	libKeyringCall(
		"UpdateAuthentication",
		"ctxUpdateAuthentication",
		{ 
			userID: userID, 
			applicationID: appID,
			username: username,
			password: newPassword
		},
		function($data) {
			// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
			if (handleApplicativeErrors($data)) {
				// error was found and displayed, nothing else to do
			} else {
				// no Convertigo exception nor status false (error code), handles sequence response
				createAppList();
				$("#dialog-info-keychain-entry-updated").dialog({
					resizable: false,
					modal: true,
					buttons: [
						{
							text: "OK",
							click: function() {
								$(this).dialog("close");
								$("#button-new-keychain-entry").click();
							}
						}
					]
				});
			}
		}
	);
}

function deleteKeychainEntry(appID) {
	// calling DeleteAuthentication sequence
	libKeyringCall(
		"DeleteAuthentication",
		"ctxDeleteAuthentication",
		{ 
			userID: userID, 
			applicationID: appID
		},
		function($data) {
			// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
			if (handleApplicativeErrors($data)) {
				// error was found and displayed, nothing else to do
			} else {
				// no Convertigo exception nor status false (error code), handles sequence response
				$("#dialog-info-keychain-entry-deleted").dialog({
					resizable: false,
					modal: true,
					buttons: [
						{
							text: "OK",
							click: function() {
								$(this).dialog("close");
								startWidget(true);
							}
						}
					]
				});
			}
		}
	);
}

