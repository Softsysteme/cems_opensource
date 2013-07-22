var C8O_demo = {
	doLoad : function () {
		$("#wgtcontent_SalesForceDemoLogin").append("<iframe style=\"width: 100%; height: 163px; display: inline;\" name=\"SalesForceDemoLogin_WebClipplet\"	id=\"SalesForceDemoLogin_WebClipplet\" " +
				"src=\"../demo_SalesForce/index.html#__container=standalone&__widget_name=SalesForceLogin&__context=SalesForce&__transaction=Login\" frameborder=\"0\" scrolling=\"no\"></iframe>"
		);
	},
	doInitialize : function () {
		$("#wgtcontent_SalesForceDemoInitialize").append("<iframe style=\"width: 100%; height: 163px; display: inline;\" name=\"SalesForceDemoInitialize_WebClipplet\"	id=\"SalesForceDemoInitialize_WebClipplet\" " +
				"src=\"../demo_SalesForce/index.html#__container=standalone&__widget_name=SalesForceInitialize&__context=SalesForce&__transaction=InitializeDemo\" frameborder=\"0\" scrolling=\"no\"></iframe>"
		);
	},
	doContinue : function () {
		$("#Page1").slideUp("slow", function () {
			$(this).remove();
			$("#Page2").slideDown("slow", function () {
				$("#wgtcontent_SalesForceDemoLeads").html("<iframe style=\"width: 100%; height: 476px; display: inline;\" name=\"SalesForceDemoLeads_WebClipplet\" id=\"SalesForceDemoLeads_WebClipplet\" " +
						"src=\"../demo_SalesForce/index.html#__container=standalone&__widget_name=SalesForceLeads&__context=SalesForce&__transaction=GoLeads\" frameborder=\"0\" scrolling=\"no\"></iframe>"
				);
				$("#wgtcontainer_GoogleMaps").html("<iframe style=\"width: 100%; height: 100%; display: inline;\" " +
						"src=\"../lib_GoogleMaps/index.html#__container=standalone&__widget_name=GoogleMaps&__connector=GoogleMapsConnector&__transaction=ShowMap&Location=San%20Francisco&Zoom=2&Height=360\" frameborder=\"0\" scrolling=\"no\"></iframe>"
				);
				$("#wgtcontent_USdirectorySearch").html("<iframe style=\"width: 100%; height: 61px; display: inline;\"	name=\"USdirectorySearch_WebClipplet\" id=\"USdirectorySearch_WebClipplet\" " +
						"src=\"../demo_usDirectory/index.html#__container=standalone&__widget_name=usDirectory&__transaction=usdirectory\" frameborder=\"0\" scrolling=\"no\"></iframe>"
				);
				$("#wgtcontent_LegacyCRMCustomerList").html("<iframe	id=\"LegacyCRMCustomerList_WebClipplet\" frameborder=\"0\" height=\"500\" scrolling=\"auto\" width=\"100%\" src=\"../demo_legacyCRM/index.html?__transaction=loginCRM&__context=LegacyCRM\"></iframe>");
			});	
		});
	}
};

eventHub = {
	SalesForceLogin : { // label origin
		LoginFinished : [{ // event name
			target : "HubPage",
			data : {action : C8O_demo.doInitialize}
		}]},
	SalesForceInitialize : {
		InitializationFinished : [{ 
			target : "HubPage",
			data : {action : C8O_demo.doContinue}
		}]},
	SalesForceLeads : {
		ItemClicked : [{
			target : "usDirectory",
			data : function (data) {
				data.__transaction = "usdSearchByName";
				data.business = data.company;
			}
		}],
		ItemToTransfer : [{
			target : "LegacyCRM",
			data : function (data) {
				data.__transaction = "editClientCRM";
				data.__context = "LegacyCRM";
			}
		}]},
	usDirectory : {
		usd2salesforce : [{
			target : "SalesForceLeads",
			data : function (data) {
				return {
					__transaction : "EditLead",
					company : data.res_name,
					street : data.res_address,
					postcode : data.res_zip,
					city : data.res_city,
					state : data.res_state,
					country : data.res_country,
					rowindex : data.rowindex
				}
			}
		}],
		usdAddressClicked : [{
			target : "GoogleMaps",
			data : function(data){
				return {
					__transaction : "ShowMap",
					Location : data.address,
					Zoom: 15
				}
			}
		}]}
}

$(window).ready(function () {
	C8O_hub.subscribe("HubPage", function (payload) {
		payload.data.action();
	});

	C8O_hub.subscribe("LegacyCRM", function (payload) {
		var $iframe = $("#LegacyCRMCustomerList_WebClipplet");
		var url = $iframe.attr("src");
		url = url.substring(0, url.indexOf("?") + 1) + $.param(payload.data);
		$iframe.attr("src", url);
	});
	
	C8O_demo.doLoad();
});