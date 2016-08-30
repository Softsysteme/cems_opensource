/* These functions are used in custom.js, in the routing table. */
(function() {
	window.afterRendering = {
		getAPI: function($doc) {
			var $projectName = $doc.find("api > project");

			if ($projectName.length == 0)
				return;

			// Use the event to get the correct page because
			// .ui-page-active has not been updated at this point
			$(document).one("pagechange", function(_, ui) {
				updateSwaggerUI(ui.toPage, $projectName.text());

				// Init the ratings on the page, and get the first one,
				// which is the one in the API card (as opposed to in the comments)
				var apiRating = starRating.initPage(ui.toPage).eq(0);

				// Add callback to submit the rating when the user changes it
				apiRating.rating({
					onUserEditValue: function() {
						apiRating.closest("form").submit();
					}
				})
			});
		},

		getSubscription: function() {
			// Same reason as in getAPI
			$(document).one("pagechange", function(_, ui) {
				// Select the content of pre elements when they are clicked
				ui.toPage.find("pre").each(function(_, pre) {
					// Create a range with the pre's text
					var range = document.createRange();
					range.selectNodeContents(pre);

					$(pre).on("click", function() {
						var sel = window.getSelection();
						sel.removeAllRanges();
						sel.addRange(range);
					});
				});
			});
		},

		getAPIs: function() {
			// Same reason as in getAPI
			$(document).one("pagechange", function(_, ui) {
				starRating.initPage(ui.toPage);
			});
		}
	}

	function updateSwaggerUI($page, projectName) {
		var $swagger_ui = $page.find(".swagger-ui");

		$swagger_ui.removeClass("ui-disabled");

		$swagger_ui.find("iframe").attr("src", 
			"fragments/swagger-ui.html?url=%2Fconvertigo%2Fapi%3FYAML%26__project%3D" +
			projectName + "#/" + projectName
		);
	}
})();
