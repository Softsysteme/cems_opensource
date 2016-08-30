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
			});

			$(document).one("nd2includesready", function(e) {
				var $page = $(e.target);

				$page.find("ul[data-role=nd2tabs]").tabs();
			});
		},

		putAPI: function($doc) {
			// Get the data we need from the C8O response document
			var $projectName = $doc.find("api > project");
			var $config_id = $doc.find("api > config_id");
			var $endpoint_ids = $doc.find("api > endpoint_ids > *");
			var projectList = $doc.find("> project > name").map(function(_, e) {
				return $(e).text();
			}).toArray();

			// Same reason as in getAPI
			$(document).one("pagechange", function(_, ui) {
				var $page = ui.toPage;

				// Set the placeholders
				setPlaceholderText($page, "endpoint_ids", "Choose an EndPoint");
				setPlaceholderText($page, "config_id", "Choose a Configuration");
				setPlaceholderText($page, "project", "Choose a Project");

				// Set default values in selects to the ones from the DB
				if ($config_id.length)
					setDefaultOption($page, "config_id", $config_id.text());

				if ($endpoint_ids.length)
					setDefaultOptions($page, "endpoint_ids", $endpoint_ids.map(function(_, e) { return $(e).text()}));

				if ($projectName.length) {
					updateSwaggerUI($page, $projectName.text());
					setDefaultOption($page, "project", null, $projectName.text());
				}

				var $c8o_project = $page.find("select[name=project]");

				$c8o_project.on("change", function(e) {
					var $select = $(e.target);
					var $option = $select.find('[value="' + $select.val() + '"]')

					var $apiName = $page.find("input[name=name]");

					// Set the API name only when it is empty, or one of the other project names
					if (!$apiName.val() || projectList.indexOf($apiName.val()) != -1)
						$apiName.val($select.val());

					// Set the API description if it is empty
					var description = $page.find("textarea[name=description]");
					if (!description.val())
						description.val($option.attr("data-comment"));

					$page.find("input[name=version]").val($option.attr("data-version"));

					updateSwaggerUI($page, this.value);
				});
			});
		},

		putConfig: function($doc) {
			var $visibility = $doc.find("config > visibility");

			if ($visibility.length == 0)
				return;

			// Same reason as in getAPI
			$(document).one("pagechange", function(_, ui) {
				setDefaultOption(ui.toPage, "visibility", $visibility.text());
			});
		},

		putEndPoint: function($doc) {
			var $endpoint_type = $doc.find("endpoint > endpoint_type");

			// Same reason as in getAPI
			$(document).one("pagechange", function(_, ui) {
				var $page = ui.toPage;

				if ($endpoint_type.length)
					setDefaultOption($page, "endpoint_type", $endpoint_type.text());

				// Toggle elements based on the value of an input
				$page.find("[data-show-when]").each(function (_, el) {
					var $el = $(el);
					var hasValue = $el.attr("data-has-value");

					$page.find($el.attr("data-show-when")).on("change", function() {
						if (this.checked || this.value == hasValue)
							$el.show();
						else
							$el.hide();
					}).change();
				});
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

	function setDefaultOption($page, selectName, value, content) {
		var sel;

		if (value)
			sel = 'select[name="' + selectName + '"] > option[value="' + value + '"]';
		else if (content)
			sel = 'select[name="' + selectName + '"] > option:contains("' + content + '")';

		// Set option as default, and refresh the parent select input
		$page.find(sel).prop("defaultSelected", true).parent().selectmenu("refresh");
	}

	function setDefaultOptions($page, selectName, values, content) {
		var $select = $page.find('select[multiple][name="' + selectName + '"]');

		for (var i = 0; i < values.length; i++)
			$select.find('option[value="' + values[i] + '"]').prop("defaultSelected", true);

		$select.selectmenu("refresh");
	}

	function setPlaceholderText($page, selectName, text) {
		var $select = $page.find('select[name="' + selectName + '"]');

		var placeholder = ($("<option/>")
				.attr("data-placeholder", "true")
				.attr("value", "")
				.text(text)
		);

		$select.prepend(placeholder);
		$select.prop("selectedIndex", 0); // Select the placeholder
		$select.selectmenu("refresh");
	}
})();
