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

	jQuery("#applications-grid").jqGrid({
		datatype: "local",
	   	colNames:['Nom'],
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
	
	jQuery("#users-grid").jqGrid({
		datatype: "local",
	   	colNames:['Nom','Applications'],
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
				var $application = $data.find("application");
				var applicationID = $application.attr("id");
				var applicationName = $application.attr("name");
				$applicationsGrid.addRowData(applicationID, { name: applicationName });
				
				$applicationsGrid.sortGrid("name", true);
			}
		);		
	}
}

function updateApplication(appID, appName) {
	if (appName.length > 0) {
		libKeyringCall(
			"UpdateApplication",
			"default",
			{ applicationID: appID, name: appName }
		);		
	}
}

function deleteApplication(selectedRowId) {
	if (selectedRowId) {
		// Prevents currently edited cell to interfere with deletion process
		$applicationsGrid.restoreCell(current_iRow, current_iCol);
		
		var selectedRow = $applicationsGrid.getRowData(selectedRowId);
		var deletedApp = selectedRow["name"];
		
		libKeyringCall(
			"DeleteApplication",
			"default",
			{ application: deletedApp },
			function($data) {
				$applicationsGrid.delRowData(selectedRowId);
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
			$applicationsGrid.clearGridData();
			applications = [];

			$data.find("application").each(function(index) {
				var $application = $(this);
				var applicationID = $application.attr("id");
				var applicationName = $application.attr("name");
				$applicationsGrid.addRowData(applicationID, { id: applicationID, name: applicationName });
				applications.push(applicationName);
			});

			console.log("Applications: " + applications);
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
				var $user = $data.find("user");
				var userID = $user.attr("id");
				var userName = $user.attr("name");
				$usersGrid.addRowData(userID, { name: userName });
				
				$usersGrid.sortGrid("name");
			}
		);		
	}
}

function updateUser(userID, userName) {
	if (userName.length > 0) {
		libKeyringCall(
			"UpdateUser",
			"default",
			{ userID: userID, name: userName }
		);		
	}
}

function deleteUser(selectedRowId) {
	if (selectedRowId) {
		// Prevents currently edited cell to interfere with deletion process
		$usersGrid.restoreCell(current_iRow, current_iCol);
		
		var selectedRow = $usersGrid.getRowData(selectedRowId);
		var deletedUser = selectedRow["name"];
		
		libKeyringCall(
			"DeleteUser",
			"default",
			{ user: deletedUser },
			function($data) {
				$usersGrid.delRowData(selectedRowId);
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
			$usersGrid.clearGridData();
			
			$data.find("user").each(function(index) {
				var $user = $(this);
				var userID = $user.attr("id");
				var username = $user.attr("name");
				var applications = $user.attr("applications");
				$usersGrid.addRowData(userID, { id: userID, name: username, applications: applications });
			});
		}
	);		
}