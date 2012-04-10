/**
 * Convertigo Keyring library
 */
console.log("Convertigo Keyring library - user keychain");

var user = "fabien";
var convertigoBase = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1));

$(function() {
	console.log("Document ready!");

	createAppList();
	$("button").button();
	
	$("#update-keychain-entry").click(function() {
		var application = $("#form-application").val();
		$("#dialog-confirm-application").text(application);
		
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
		$("#dialog-confirm-username").text(username);
		
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
			$("#dialog-confirm-password").text($("#dialog-confirm-modify-keychain-entry").attr("labelPasswordNotChanged"));
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
			$("#dialog-confirm-password").text("*********");
		}
	
		
		var buttonYes = $("#dialog-confirm-modify-keychain-entry").attr("buttonYes");
		var buttonNo = $("#dialog-confirm-modify-keychain-entry").attr("buttonNo");
		
		$("#dialog-confirm-modify-keychain-entry").dialog({
			resizable: false,
			modal: true,
			buttons: [
						{
							text: buttonYes,
							click: function() {
								updateKeychain(user, application, username, oldPassword, newPassword1);
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
});

function createAppList() {
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
				
				$(".wait-div-app-list").hide();
				
				var $ul = $("#app-list-ul")
				$data.find("authentication").each(function(index) {
					var $application = $(this);
					var applicationID = $application.attr("applicationID");
					var username = $application.attr("username");
					var applicationName = $application.attr("application");
					$ul.append(
						$("<li/>").
							append(
								$("<a/>").
									attr("class", "application").
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
    	console.log("Error when getting applications: " + errorMessage);
    	console.log(exception.message);
    });
}

function showKeychainData(application, username) {
	console.log(application);
	$("#form-application").val(application);
	$("#form-username").val(username);
}

function updateKeychain(user, application, username, oldPassword, newPassword1) {
	
}