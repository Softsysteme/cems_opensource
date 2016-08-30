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
		},

		putAPI: function($doc) {
			// Transform tags array into comma separated string
			var $tags = $doc.find("api > tags");

			if ($tags.length == 0 || $tags.attr("type") != "array")
				return;

			var tagsString = $tags.find("item").map(function() {
				return $(this).text();
			}).toArray().join(", ");

			$tags.text(tagsString);
		},

		toast: function($doc) {
			var message = $doc.find("toast").text();

			if (!message)
				return;

			new $.nd2Toast({
				message: message,
				action: {
					fn: function() { }
				}
			});
		}
	}
})();
