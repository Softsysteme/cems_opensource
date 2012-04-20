/**
 * Convertigo Keyring library
 */
console.log("Convertigo Keyring library - user keychain");

var user = "fabien";
var convertigoBase = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1));
var notSetApplications = [];

$(function() {
	console.log("Document ready!");

	$("#user").text(user);
	
	getNotSetApplications();
	createAppList();
	
	$("button").button();
		
	$("#button-new-keychain-entry")
	.button()
	.click(function(eventObject) {
		showKeychainData("", user);
	});

	$("#keychain-entry-add")
	.click(function(eventObject) {
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

		addKeychainEntry(application, username, password1);
	});

	$("#keychain-entry-delete")
	.click(function(eventObject) {
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
								var application = $("#form-application").val();
								deleteKeychainEntry(application);
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
					Ok: function() {
						$(this).dialog("close");
						$("#form-username").focus();
					}
				}
			});
			return;
		}
		$(".dialog-username").text(username);
		
		var oldPassword = $("#form-old-password").val();
		var newPassword1 = $("#form-new-password1").val();
		var newPassword2 = $("#form-new-password2").val();

		if (oldPassword === "") {
			if (newPassword1 !== "" || newPassword2 !== "") {
				$("#dialog-error-missing-old-password").dialog({
					modal: true,
					buttons: {
						Ok: function() {
							$(this).dialog("close");
							$("#form-old-password").focus();
						}
					}
				});
				return;
			}
			$(".dialog-password").text($("#dialog-confirm-update-keychain-entry").attr("labelPasswordNotChanged"));
		}
		else {
			if (newPassword1 === "" || newPassword2 === "" || newPassword1 !== newPassword2) {
				$("#dialog-error-new-passwords").dialog({
					modal: true,
					buttons: {
						Ok: function() {
							$(this).dialog("close");
							$("#form-new-password1").focus();
						}
					}
				});
				return;
			}
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
								var application = $("#form-application").val();
								var username = $("#form-username").val();
								var oldPassword = $("#form-old-password").val();
								var newPassword1 = $("#form-new-password1").val();
								
								updateKeychainEntry(application, username, oldPassword, newPassword1);
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

function createAppList() {
	console.log("Getting application list");
	$.post(
			convertigoBase + "/projects/lib_Keyring/.xml",
			{
				__sequence: "GetUserKeychain",
				__context: "ctxGetUserKeychain",
				user: user
			},
			function(data) {
				console.log("User keychain:");
				console.log(data);
				
				var $data = $(data);
				
				$("#app-menu-wait").hide();
				
				var $ul = $("#app-list-ul");
				$(".app-li").remove();
				$data.find("authentication").each(function(index) {
					var $application = $(this);
					var applicationID = $application.attr("applicationID");
					var username = $application.attr("username");
					var applicationName = $application.attr("application");
					$ul.append(
						$("<li class='app-li'/>").
							append(
								$("<a/>").
								attr("class", "application").
								attr("application", applicationName).
								attr("username", username).
									text(applicationName)
							)
					);
				});

				$(".application").
					button().
					click(function(eventObject) {
						var application = $(this).text();
						var username = $(this).attr("username");
						showKeychainData(application, username);
					});
			},
			"xml"
	)
    .error(function(xhr, errorMessage, exception) {
    	handleError("Error when getting applications", errorMessage, exception);
    });
}

function getNotSetApplications() {
	$.post(
			convertigoBase + "/projects/lib_Keyring/.xml",
			{
				__sequence: "GetUserNotSetApplications",
				__context: "ctxGetUserNotSetApplications",
				user: user
			},
			function(data) {
				console.log("User not set applications:");
				console.log(data);
				
				var $data = $(data);
				
				$data.find("application").each(function(index) {
					var $application = $(this);
					var applicationName = $application.attr("name");
					notSetApplications.push(applicationName);
				});
				
				console.log("Not set applications: " + notSetApplications);

				$("#form-new-entry-application").autocomplete({
				    source: notSetApplications
				});
			},
			"xml"
	)
    .error(function(xhr, errorMessage, exception) {
    	handleError("Error when getting not set applications", errorMessage, exception);
    });
}

function showKeychainData(application, username) {
	var formApplication = $("#form-application");
	if (application === "") {
		formApplication.removeAttr("disabled");
		$("#keychain-entry").hide();
		$("#keychain-entry-new").show();
		$("#keychain-entry-new input").val("");
	}
	else {
		formApplication.attr('disabled', true);
		$("#keychain-entry-new").hide();
		$("#keychain-entry").show();
		$("#keychain-entry input").val("");
	}

	formApplication.val(application);
	$("#form-username").val(username);
}

function addKeychainEntry(application, username, password) {
	$.post(
			convertigoBase + "/projects/lib_Keyring/.xml",
			{
				__sequence: "AddAuthentication",
				user: user,
				application: application,
				username: username,
				password: password
			},
			function(data) {
				console.log("Entry added for application: " + application);
				$("#dialog-info-keychain-entry-added").dialog({
					resizable: false,
					modal: true,
					buttons: [
								{
									text: "OK",
									click: function() {
										$(this).dialog("close");
										
										createAppList();
										$("#button-new-keychain-entry").click();
									}
								}
					]
				});
			},
			"xml"
	)
    .error(function(xhr, errorMessage, exception) {
    	handleError("Error when getting not set applications", errorMessage, exception);
    });

}

function updateKeychainEntry(application, username, oldPassword, newPassword) {
	$.post(
			convertigoBase + "/projects/lib_Keyring/.xml",
			{
				__sequence: "UpdateAuthentication",
				user: user,
				application: application,
				username: username,
				oldPassword: oldPassword,
				newPassword: newPassword
			},
			function(data) {
				console.log("Entry updated for application: " + application);

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
			},
			"xml"
	)
    .error(function(xhr, errorMessage, exception) {
    	handleError("Error when updating keychain entry", errorMessage, exception);
    });
}

function deleteKeychainEntry(application) {
	$.post(
			convertigoBase + "/projects/lib_Keyring/.xml",
			{
				__sequence: "DeleteAuthentication",
				user: user,
				application: application
			},
			function(data) {
				console.log("Entry deleted for application: " + application);
				$("#dialog-info-keychain-entry-deleted").dialog({
					resizable: false,
					modal: true,
					buttons: [
								{
									text: "OK",
									click: function() {
										$(this).dialog("close");

										getNotSetApplications();
										createAppList();
										$("#button-new-keychain-entry").click();
									}
								}
					]
				});
			},
			"xml"
	)
    .error(function(xhr, errorMessage, exception) {
    	handleError("Error when deleting keychain entry", errorMessage, exception);
    });
}

function handleError(message, errorMessage, exception) {
	console.log(message);
	console.log(errorMessage);
	console.log(exception.message);

	$("#dialog-error-message").text(message);
	$("#dialog-error-sub-message").text(errorMessage);
	$("#dialog-error-exception-message").text(exception.message);
	
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