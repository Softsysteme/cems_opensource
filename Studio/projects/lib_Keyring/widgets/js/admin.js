/**
 * Convertigo Keyring library
 */
console.log("Convertigo Keyring library - administration");

var convertigoBase = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1));

$(function() {
	console.log("Document ready!");

	jQuery("#applications-grid").jqGrid({
		datatype: "local",
	   	colNames:['ID','Nom'],
	   	colModel:[
	   		{name:'id',index:'id', width:55},
	   		{name:'name',index:'name asc, invdate', width:400}
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
	
	$("button").button();
	
	$("#button-applications").click(function() {
		getApplications();
	});

	$("#button-users").click(function() {
		getUsers();
	});

});

function getApplications() {
	$(".form").hide();
	$("#applications").show();
	$("#applications-wait").show();
	$("#applications-content").hide();
	
	$.post(
			convertigoBase + "/projects/lib_Keyring/.xml",
			{
				__sequence: "GetApplications",
				__context: "ctxGetApplications"
			},
			function(data) {
				$("#applications-wait").hide();
				$("#applications-content").show();
				
				console.log("Applications data:");
				console.log(data);
				
				var $data = $(data);
				var $applicationsGrid = $("#applications-grid");

				$applicationsGrid.clearGridData();

				$data.find("application").each(function(index) {
					var $application = $(this);
					var applicationID = $application.attr("id");
					var applicationName = $application.attr("name");
					$applicationsGrid.addRowData(applicationID, { id: applicationID, name: applicationName });
				});
				
			},
			"xml"
	)
    .error(function(xhr, errorMessage, exception) {
    	console.log("Error when getting applications list: " + errorMessage);
    	console.log(exception.message);
    	$("#users-wait").hide();
    	$("#users-content").show();
    });
}

function getUsers() {
	$(".form").hide();
	$("#users").show();
	$("#users-wait").show();
	$("#users-content").hide();
	
	$.post(
			convertigoBase + "/projects/lib_Keyring/.xml",
			{
				__sequence: "GetUsersAndApplications",
				__context: "ctxGetUsers"
			},
			function(data) {
				$("#users-wait").hide();
				$("#users-content").show();
				
				console.log("Users data:");
				console.log(data);
				
				var $data = $(data);
				var $usersGrid = $("#users-grid");
				
				$usersGrid.clearGridData();
	
				$data.find("user").each(function(index) {
					var $user = $(this);
					var userID = $user.attr("id");
					var username = $user.attr("name");
					var applications = $user.attr("applications");
					$usersGrid.addRowData(userID, { id: userID, name: username, applications: applications });
				});
				
			},
			"xml"
	)
    .error(function(xhr, errorMessage, exception) {
    	console.log("Error when getting users list: " + errorMessage);
    	console.log(exception.message);
    	$("#users-wait").hide();
    	$("#users-content").show();
    });

}