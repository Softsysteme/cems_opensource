$.extend(true, C8O, {
	routingTable : [
		{
			calledRequest: ".doNothing",
			actions: [
			    {
			    	condition: "document[userReference='page3']",
					goToPage: "#page3"
	 			}
			]
		},
		{
			calledRequest: ".doNothing",
			actions: [
			    {
					goToPage: "#page2"
	 			}
			]
		}
	]

});
