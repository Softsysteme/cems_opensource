/////////////////// GLOBAL VARIABLES DECLARATIONS //////////////////

// overwrites auto_refresh mode for this project
C8O.vars.auto_refresh = false;

// declaration of array variable containing the list of transactions to call with their parameters
// for "initialize" client sequence
var index = 0;
var variablesNames = ["__transaction", "salutation", "name", "company", "city", "state", "email", "campaignName", "viewName"];
var variablesValues = [
	["ChangeLanguage", 	"",		"", 		"", 								"", 				"", 			"", 								"", 				""],
	["CreateCampaign", 	"",		"", 		"", 								"", 				"", 			"", 								"ConvertigoDemo", 	"ConvertigoDemoView"],
	["CreateLeadsView", 	"",		"", 		"", 								"", 				"", 			"", 								"ConvertigoDemo", 	""],
	["EmptyLeadsView", 	"",		"", 		"", 								"", 				"", 			"", 								"", 				"ConvertigoDemoView"],
	["InsertLead", 		"Mr.",	"Smith", 	"Holiday Inn Hotel", 				"New York", 		"New York", 	"smith@holiday-inn.com", 		"ConvertigoDemo", 	""],
	["InsertLead", 		"Ms.",	"Jones", 	"Greenwich Inn", 					"San Francisco", 	"California", 	"jones@greenwich-inn.com", 			"ConvertigoDemo", 	""],
	["InsertLead", 		"Mr.",	"Bond", 	"Grand Hyatt Seattle",				"Seattle", 			"Washington", 	"bond@grandseattle.hyatt.com", 			"ConvertigoDemo", 	""],
	["InsertLead", 		"Mrs.",	"Grey", 	"Courtyard By Marriott", 			"Atlanta", 			"Georgia", 		"grey@atl-intl-hostel.com", 		"ConvertigoDemo", 	""],
	["InsertLead", 		"Mr.",	"Rogers", 	"Manilow Suites", 					"Chicago", 			"Illinois", 	"rogers@james-chicago.com", 		"ConvertigoDemo", 	""],
	["InsertLead", 		"Mr.",	"Young", 	"Hotel St Marie", 					"New Orleans", 		"Louisiana", 	"young@stmarie-hotel.com", 			"ConvertigoDemo", 	""],
	["InsertLead", 		"Ms.",	"Davis", 	"Embassy Suites Hotel", 			"Philadelphia", 	"Pennsylvania", "davis@embassy-suites.com", 		"ConvertigoDemo", 	""],
	["InsertLead", 		"Mr.",	"Franklin", "Marriott Hotels & Resorts", 		"Washington", 		"D.C.", 		"franklin@marriott-resorts.com", 	"ConvertigoDemo", 	""],
	["InsertLead", 		"Mr.",	"Garner", 	"Lafayette Hotel", 					"Los Angeles", 		"California", 	"garner@thelafayette.qpg.com", 			"ConvertigoDemo", 	""]
];
var initializingDemo = false;

///////////////////// HOOKS DECLARATIONS //////////////////

C8O.addHook("result_filled", function () {
	// auto-launches the event after the login is finished in the first widget
	// this will launch an interaction that loads the second widget
	if (C8O.getLastCallParameter("__transaction") === "Login") {
		window.setTimeout(function () {
			C8O.doMashupEvent("LoginFinished");
		}, 2000);
	}
	callNextTransaction();
});

C8O.addHook("resize_calculation", function (xml, extra) {
	if ($.browser.msie) {
		$("body").attr("scroll", "no");
	} else {
		window.frameElement.scrolling = "no";
	}
	var lowest = 0;
	$("body, div, span, img").each(function() {
		lowest = Math.max(lowest, this.offsetTop+this.offsetHeight);
	});
	return lowest + 10;
});

///////////////////// MY METHODS DECLARATIONS //////////////////

// method that starts the demo initalization
function initializeDemo() {
	// setting the parameter to true to know that the initialization is running
	initializingDemo = true;
	
	// empties the body in order to append results of the several transactions that will run inside
	$("body").empty();
	
	// setting append mode
	C8O.vars.target_append = "true";
	
	// starts the initialization by calling the function callNextTransaction
	callNextTransaction();
}

// method that loops on each transaction to be launched in the "initialize" client sequence
// transactions to launch are described with their parameters in a javascript array variable
function callNextTransaction() {
	if (initializingDemo) {
		if (index < variablesValues.length) {
			// there is still a transaction to call
			var values = variablesValues[index],
				dataScriptCall = {}, j;
			
			// loop on each variable to create data string
			for (j = 0 ; j < variablesNames.length ; j++) {
				if (values[j] !== "") {
					dataScriptCall[variablesNames[j]] = values[j];
				}
			}
			
			// call transaction
			C8O.call(dataScriptCall);
			
			// increase index
			index ++;
		} else {
			// every transaction has been invoked
			initializingDemo = false;
			
			// remove append mode
			C8O.vars.target_append = "false";
			
			// sending event to say the initialization is over
			// will launch an interaction thats moves to the second page of the application
			C8O.doMashupEvent("InitializationFinished");
		}
	}
}