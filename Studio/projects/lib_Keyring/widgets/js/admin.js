/**
 * Convertigo Keyring library
 */
console.log("Convertigo Keyring library - administration");

var $applicationsGrid;
var $usersGrid;

$(function() {
	console.log("Document ready!");

	jQuery("#applications-grid").jqGrid({
		datatype: "local",
	   	colNames:['Nom'],
	   	colModel:[
	   		{name:'name', index:'name asc', width:400}
	   	],
	   	rowNum:10,
	   	rowList:[10,20,30],
	   	sortname: 'Nom',
	    viewrecords: true,
	    sortorder: "desc"
	}).navGrid('#applications-grid-pager',{edit:false,add:false,del:false});
	
	jQuery("#users-grid").jqGrid({
		datatype: "local",
	   	colNames:['ID','Nom','Applications'],
	   	colModel:[
	   		{name:'id',index:'id', width:55},
	   		{name:'name',index:'name asc, invdate', width:200},
	   		{name:'applications',index:'name asc, invdate', width:400}
	   	],
	   	rowNum:10,
	   	rowList:[10,20,30],
	   	sortname: 'Nom',
	    viewrecords: true,
	    sortorder: "desc"
	}).navGrid('#users-grid-pager',{edit:false,add:false,del:false});

	$applicationsGrid = $("#applications-grid");
	$usersGrid = $("#users-grid");

	$("button").button();
	
	// Applications
	$("#button-applications").click(function() {
		getApplications();
	});

	$("#applications-add").click(function() {
		addApplication();
	});

	$("#applications-delete").click(function() {
		deleteApplication();
	});

	// Users
	$("#button-users").click(function() {
		getUsers();
	});

});

function addApplication() {
	var newApp = $("#applications-add-application").val();
	
	if (newApp.length > 0) {
		libKeyringCall(
			"AddApplication",
			"ctxApplications",
			{ application: newApp },
			function($data) {
				var $application = $data.find("application");
				var applicationID = $application.attr("id");
				var applicationName = $application.attr("name");
				$applicationsGrid.addRowData(applicationID, { name: applicationName });
				
				$applicationsGrid.sortGrid("name");
			}
		);		
	}
}

function deleteApplication() {
	var selectedRowId = $applicationsGrid.getGridParam('selrow');
	
	if (selectedRowId) {
		var selectedRow = $applicationsGrid.getRowData(selectedRowId);
		var deletedApp = selectedRow["name"];
		
		libKeyringCall(
			"DeleteApplication",
			"ctxApplications",
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
		"ctxApplications",
		{ },
		function($data) {
			$applicationsGrid.clearGridData();

			$data.find("application").each(function(index) {
				var $application = $(this);
				var applicationID = $application.attr("id");
				var applicationName = $application.attr("name");
				$applicationsGrid.addRowData(applicationID, { id: applicationID, name: applicationName });
			});
		}
	);		
}

function getUsers() {
	$(".form").hide();
	$("#users").show();
	
	libKeyringCall(
		"GetUsersAndApplications",
		"ctxGetUsersAndApplications",
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