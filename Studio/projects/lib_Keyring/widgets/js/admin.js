/**
 * Convertigo Keyring library
 */
console.log("Convertigo Keyring library - administration");

var $applicationsGrid;
var $usersGrid;
var applications = [];
var errorMessages = new Array();

var current_iRow;
var current_iCol;

$(function() {
	console.log("Document ready!");

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

	$("#users-delete").click(function() {
		deleteUser($usersGrid.getGridParam('selrow'));
	});
	
	$("#users-add-application").click(function() {
		addApplicationForUser($usersGrid.getGridParam('selrow'));
	});

	getApplications();

});

function addApplication(newApp) {
	if (newApp.length > 0) {
		libKeyringCall(
			"AddApplication",
			"default",
			{ application: newApp },
			function($data) {
				// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
				if (handleApplicativeErrors($data)) {
					// error was found and displayed, nothing else to do
				} else {
				// no Convertigo exception nor status false (error code), handles sequence response
					var $application = $data.find("application");
					var applicationID = $application.attr("id");
					var applicationName = $application.attr("name");
					// adding row in the jqgrid
					$applicationsGrid.addRowData(applicationID, { name: applicationName });
					// sorting the jqgrid
					$applicationsGrid.sortGrid("name", true);
					
					// emptying the add input
					$("#applications-add-application").val("");
				}
			}
		);		
	}
}

function updateApplication(appID, appName) {
	if (appName.length > 0) {
		libKeyringCall(
			"UpdateApplication",
			"default",
			{ applicationID: appID, name: appName }, 
			function($data) {
				// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
				if (handleApplicativeErrors($data)) {
					// error was found and displayed, nothing else to do
				} else {
					// no Convertigo exception nor status false (error code), handles sequence response
//					var $updatedApp = $data.find("updatedRows>application");
//					var numberOfUpdatedApp = parseInt($updatedApp.text());
					// nothing to do, update ok
				}
			}
		);		
	}
}

function deleteApplication(selectedRowId) {
	if (selectedRowId) {
		// Prevents currently edited cell to interfere with deletion process
		$applicationsGrid.restoreCell(current_iRow, current_iCol);
		
//		var selectedRow = $applicationsGrid.getRowData(selectedRowId);
//		var deletedApp = selectedRow["name"];
		
		libKeyringCall(
			"DeleteApplication",
			"default",
			{ applicationID: selectedRowId },
			function($data) {
				// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
				if (handleApplicativeErrors($data)) {
					// error was found and displayed, nothing else to do
				} else {
				// no Convertigo exception nor status false (error code), handles sequence response
					$applicationsGrid.delRowData(selectedRowId);
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
		"default",
		{ },
		function($data) {
			// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
			if (handleApplicativeErrors($data)) {
				// error was found and displayed, nothing else to do
			} else {
			// no Convertigo exception nor status false (error code), handles sequence response
				$applicationsGrid.clearGridData();
				applications = [];
	
				$data.find("applications>application").each(function(index) {
					var $application = $(this);
					var applicationID = $application.attr("id");
					var applicationName = $application.text();
					$applicationsGrid.addRowData(applicationID, { id: applicationID, name: applicationName });
					applications.push(applicationName);
				});
	
				console.log("Applications: " + applications);
			}
		}
	);		
}

function addUser(newUser) {
	if (newUser.length > 0) {
		libKeyringCall(
			"AddUser",
			"default",
			{ user: newUser },
			function($data) {
				// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
				if (handleApplicativeErrors($data)) {
					// error was found and displayed, nothing else to do
				} else {
				// no Convertigo exception nor status false (error code), handles sequence response
					var $user = $data.find("user");
					var userID = $user.attr("id");
					var userName = $user.attr("name");
					// adding row in the jqgrid
					$usersGrid.addRowData(userID, { name: userName });
					// sorting the jqgrid
					$usersGrid.sortGrid("name");
					
					// emptying the add input
					$("#users-add-user").val("");
				}
			}
		);		
	}
}

function updateUser(userID, userName) {
	if (userName.length > 0) {
		libKeyringCall(
			"UpdateUser",
			"default",
			{ userID: userID, name: userName }, 
			function($data) {
				// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
				if (handleApplicativeErrors($data)) {
					// error was found and displayed, nothing else to do
				} else {
					// no Convertigo exception nor status false (error code), handles sequence response
//					var $updatedUser = $data.find("updatedRows>user");
//					var numberOfUpdatedUser = parseInt($updatedUser.text());
					// nothing to do, update ok
				}
			}
		);		
	}
}

function deleteUser(selectedRowId) {
	if (selectedRowId) {
		// Prevents currently edited cell to interfere with deletion process
		$usersGrid.restoreCell(current_iRow, current_iCol);
		
//		var selectedRow = $usersGrid.getRowData(selectedRowId);
//		var deletedUser = selectedRow["name"];
		
		libKeyringCall(
			"DeleteUser",
			"default",
			{ userID: selectedRowId },
			function($data) {
				// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
				if (handleApplicativeErrors($data)) {
					// error was found and displayed, nothing else to do
				} else {
				// no Convertigo exception nor status false (error code), handles sequence response
					$usersGrid.delRowData(selectedRowId);
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
		"default",
		{ },
		function($data) {
			// Handles Convertigo exception in XML response or error code (status false) to automatically pop the error dialog
			if (handleApplicativeErrors($data)) {
				// error was found and displayed, nothing else to do
			} else {
			// no Convertigo exception nor status false (error code), handles sequence response
				$usersGrid.clearGridData();
				
				$data.find("users>user").each(function(index) {
					var $user = $(this);
					var userID = $user.attr("id");
					var username = $user.attr("name");
					var applications = "";
					$user.find("applications>application").each(function(index) {
						var $app = $(this);
						var appName = $app.text();
						if (applications != "") {
							applications += ", ";
						}
						applications += appName;
					});
					$usersGrid.addRowData(userID, { id: userID, name: username, applications: applications });
				});
			}
		}
	);		
}