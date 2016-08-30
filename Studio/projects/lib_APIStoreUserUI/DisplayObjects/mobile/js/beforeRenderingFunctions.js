/* These functions are used in custom.js, in the routing table. */
(function() {
	window.beforeRendering = {
		error: function($doc) {
			var translationKey = $doc.find("error > details").text();
			var message = $doc.find("error > message").text();

			if (translationKey)
				message = C8O.translate(translationKey);
			else if (!message)
				message = C8O.translate("errorUnknown");
			else {
				// Nicer message for missing required variables
				var groups = /^Variable named "(.+)" is required for sequence ".+"$/.exec(message);
				
				if (groups)
					message = 'Field "' + groups[1] + '" is required' 
			}

			// Show a toast with the error message
			new $.nd2Toast({
				message: message,
				action: {
					title: "Ok",
					color: "red",
					fn: function() { }
				}
			});
		}
	}
})();
