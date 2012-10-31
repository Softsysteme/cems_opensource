/**
 * Convertigo Keyring library
 */
console.log("Convertigo Keyring library - administration");

var $applicationsGrid;
var $usersGrid;
var applications = [];


var current_iRow;
var current_iCol;

$(function() {
	console.log("Document ready!");
	
	// calling getErrorMessages sequence
	getErrorMessages();

	// retrieving column names for applications grid
	var appColumns = [];
	$("#app-col-template>p").each(function(index) {
		appColumns[index] = $(this).text();
	});
	$("#app-col-template").hide();
	// building applications grid
	jQuery("#applications-grid").jqGrid({
		datatype: "local",
	   	colNames: appColumns,
	   	colModel:[
	   		{name:'name', editable:true, edittype:'text', width:400}
	   	],
	   	sortname: 'name',
	   	sortorder: "asc",
	   	cellEdit: true,
	   	cellsubmit: "clientArray",
	    afterSaveCell: function(rowid, cellname, value, iRow, iCol) {
	    	updateApplication(rowid, value);
	    },
	    beforeEditCell: function(rowid, cellname, value, iRow, iCol) {
	    	current_iRow = iRow;
	    	current_iCol = iCol;
	    }
	}).navGrid('#applications-grid-pager',{edit:false,add:false,del:false});
	
	// retrieving column names for users grid
	var userColumns = [];
	$("#user-col-template>p").each(function(index) {
		userColumns[index] = $(this).text();
	});
	$("#user-col-template").hide();
	// building users grid
	jQuery("#users-grid").jqGrid({
		datatype: "local",
	   	colNames: userColumns,
	   	colModel:[
	   		{name:'name', editable:true, edittype:'text', width:200},
	   		{name:'applications', editable:false, width:400}
	   	],
	   	sortname: 'name',
	   	sortorder: "asc",
	   	cellEdit: true,
	   	cellsubmit: "clientArray",
	    afterSaveCell: function(rowid, cellname, value, iRow, iCol) {
	    	updateUser(rowid, value);
	    },
	    beforeEditCell: function(rowid, cellname, value, iRow, iCol) {
	    	current_iRow = iRow;
	    	current_iCol = iCol;
	    }
	}).navGrid('#users-grid-pager',{edit:false,add:false,del:false});

	$applicationsGrid = $("#applications-grid");
	$usersGrid = $("#users-grid");
	
	$("button").button();
	
	// Applications
	$("#button-applications").click(function() {
		getApplications();
	});

	$("#applications-add").click(function() {
		addApplication($("#applications-add-application").val());
	});
	
	$("#applications-add-application").bind('keydown', function(event){
		if (event.which == 13) {
			addApplication($("#applications-add-application").val());
		}
	});
	
	$("#applications-delete").click(function() {
		deleteApplication($applicationsGrid.getGridParam('selrow'));
	});

	// Users
	$("#button-users").click(function() {
		getUsers();
	});

	$("#users-add").click(function() {
		addUser($("#users-add-user").val());
	});
	
	$("#users-add-user").bind('keydown', function(event){
		if (event.which == 13) {
			addUser($("#users-add-user").val());
		}
	});

	$("#users-delete").click(function() {
		deleteUser($usersGrid.getGridParam('selrow'));
	});
	
	$("#users-add-application").click(function() {
		addApplicationForUser($usersGrid.getGridParam('selrow'));
	});

	// calling getApplications sequence
	getApplications();
	
});

function addApplication(newApp) {
	if (newApp.length > 0) {
		libKeyringCall(
			"AddApplication",
			"ctxAddApplication",
			{ application: newApp },
			function($data) {
				// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
				if (handleApplicativeErrors($data)) {
					// error was found and displayed, nothing else to do
				} else {
				// no Convertigo exception nor status false (error code), handles sequence response
					var $application = $data.find(">application");
					var applicationID = $application.attr("id");
					var applicationName = $application.attr("name");
					// adding row in the jqgrid
					$applicationsGrid.addRowData(applicationID, { name: applicationName });
					// sorting the jqgrid
					$applicationsGrid.sortGrid("name", true, "asc");
					
					// emptying the add input
					$("#applications-add-application").val("");
					
					$(".dialog-application").text(applicationName);
					$("#dialog-info-application-entry-added").dialog({
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
			}
		);
	}
}

function updateApplication(appID, appName) {
	if (appName.length > 0) {
		libKeyringCall(
			"UpdateApplication",
			"ctxUpdateApplication",
			{ applicationID: appID, name: appName }, 
			function($data) {
				// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
				if (handleApplicativeErrors($data)) {
					// error was found and displayed, nothing else to do
				} else {
					// no Convertigo exception nor status false (error code), handles sequence response
					$("#dialog-info-application-entry-updated").dialog({
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
			}
		);		
	}
}

function deleteApplication(selectedRowId) {
	if (selectedRowId) {
		// Prevents currently edited cell to interfere with deletion process
		$applicationsGrid.restoreCell(current_iRow, current_iCol);
		
		libKeyringCall(
			"DeleteApplication",
			"ctxDeleteApplication",
			{ applicationID: selectedRowId },
			function($data) {
				// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
				if (handleApplicativeErrors($data)) {
					// error was found and displayed, nothing else to do
				} else {
					// no Convertigo exception nor status false (error code), handles sequence response
					$applicationsGrid.delRowData(selectedRowId);
					$("#dialog-info-application-entry-deleted").dialog({
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
			}
		);
	}
}

function getApplications() {
	$(".form").hide();
	$("#applications").show();
	
	libKeyringCall(
		"GetApplications",
		"ctxGetApplications",
		{ },
		function($data) {
			// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
			if (handleApplicativeErrors($data)) {
				// error was found and displayed, nothing else to do
			} else {
				// no Convertigo exception nor status false (error code), handles sequence response
				$applicationsGrid.clearGridData();
				applications = [];
	
				$data.find(">applications>application").each(function(index) {
					var $application = $(this);
					var applicationID = $application.attr("id");
					var applicationName = $application.text();
					$applicationsGrid.addRowData(applicationID, { id: applicationID, name: applicationName });
					applications.push(applicationName);
				});
	
				console.log("Applications: " + applications);
				
				$applicationsGrid.sortGrid("name", true, "asc");
			}
		}
	);		
}

function addUser(newUser) {
	if (newUser.length > 0) {
		libKeyringCall(
			"AddUser",
			"ctxAddUser",
			{ user: newUser },
			function($data) {
				// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
				if (handleApplicativeErrors($data)) {
					// error was found and displayed, nothing else to do
				} else {
					// no Convertigo exception nor status false (error code), handles sequence response
					var $user = $data.find(">user");
					var userID = $user.attr("id");
					var userName = $user.attr("name");
					// adding row in the jqgrid
					$usersGrid.addRowData(userID, { name: userName });
					// sorting the jqgrid
					$usersGrid.sortGrid("name", true, "asc");
					
					// emptying the add input
					$("#users-add-user").val("");
					
					$(".dialog-user").text(userName);
					$("#dialog-info-user-entry-added").dialog({
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
			}
		);		
	}
}

function updateUser(userID, userName) {
	if (userName.length > 0) {
		libKeyringCall(
			"UpdateUser",
			"ctxUpdateUser",
			{ userID: userID, name: userName }, 
			function($data) {
				// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
				if (handleApplicativeErrors($data)) {
					// error was found and displayed, nothing else to do
				} else {
					// no Convertigo exception nor status false (error code), handles sequence response
					$("#dialog-info-user-entry-updated").dialog({
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
			}
		);		
	}
}

function deleteUser(selectedRowId) {
	if (selectedRowId) {
		// Prevents currently edited cell to interfere with deletion process
		$usersGrid.restoreCell(current_iRow, current_iCol);
		
		libKeyringCall(
			"DeleteUser",
			"ctxDeleteUser",
			{ userID: selectedRowId },
			function($data) {
				// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
				if (handleApplicativeErrors($data)) {
					// error was found and displayed, nothing else to do
				} else {
					// no Convertigo exception nor status false (error code), handles sequence response
					$usersGrid.delRowData(selectedRowId);
					$("#dialog-info-user-entry-deleted").dialog({
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
			}
		);
	}
}

function getUsers() {
	$(".form").hide();
	$("#users").show();
	
	libKeyringCall(
		"GetUsersAndApplications",
		"ctxGetUsersAndApplications",
		{ },
		function($data) {
			// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
			if (handleApplicativeErrors($data)) {
				// error was found and displayed, nothing else to do
			} else {
				// no Convertigo exception nor status false (error code), handles sequence response
				$usersGrid.clearGridData();
				
				$data.find(">users>user").each(function(index) {
					var $user = $(this);
					var userID = $user.attr("id");
					var username = $user.attr("name");
					var applications = "";
					$user.find(">applications>application").each(function(index) {
						var $app = $(this);
						var appName = $app.text();
						if (applications != "") {
							applications += ", ";
						}
						applications += appName;
					});
					$usersGrid.addRowData(userID, { id: userID, name: username, applications: applications });
				});
				// sorting the jqgrid
				$usersGrid.sortGrid("name", true, "asc");
			}
		}
	);		
}