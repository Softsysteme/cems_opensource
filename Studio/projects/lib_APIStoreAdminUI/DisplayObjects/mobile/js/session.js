/* Handles session related functions: login, logout, etc. */
(function() {
	// Stores the current session's data, if any.
	var sessionData;

	var registrationEnabled;

	window.session = {
		// Called when the login succeeded.
		// Used in custom.js as a beforeRendering function
		onLogin: function($doc) {
			new $.nd2Toast({
				message: "You are now logged in"
			});

			session.set($doc);
		},

		// Renders data in the given page
		renderDataIn: function(page) {
			var $page = $(page);

			if (!sessionData) { // User not logged in
				// Swap which elements are shown
				$page.find("[data-is-admin]").hide();
				$page.find("[data-logged=in]").hide();
				$page.find("[data-logged=out]").show();

				if (registrationEnabled)
					$page.find("[data-can-register]").show();
				else
					$page.find("[data-can-register]").hide();

				return;
			}

			// Set the src for the User's avatar image
			$page.find("[data-user-info=avatar]").attr("src", sessionData.avatar);

			// Set the User's name in the panel
			$page.find("[data-user-info=name]").text(sessionData.name);

			// Add title if applicable
			if (sessionData.is_admin) {
				$page.find("[data-is-admin]").show();
				$page.find("[data-user-info=title]").text("Administrator");
			}
			else {
				$page.find("[data-is-admin]").hide();
				$page.find("[data-user-info=title]").text("");
			}

			// Swap which elements are shown
			$page.find("[data-logged=out]").hide();
			$page.find("[data-can-register]").hide();
			$page.find("[data-logged=in]").show();
		},

		set: function($doc) {
			session._storeData($doc); // Save the data to render new pages
			session.renderDataIn(document); // Render all existing pages
		},

		_storeData: function($doc) {
			var $session = $doc.find("> session");

			if ($session.length == 0) { // Not logged in
				// Clear the sessionData (useful when logging out)
				sessionData = undefined;

				registrationEnabled = $doc.find("> can_register").length == 1;

				return;
			}

			sessionData = {
				is_admin: $session.find("is_admin").text() === "true",
				name: $session.find("name").text(),
				avatar: $session.find("avatar").text()
			}
		}
	}

	// Whenever a new page is loaded, add the session data to the left panel
	$(document).on("nd2includesready", function(e) {
		session.renderDataIn(e.target);
	});
})();
