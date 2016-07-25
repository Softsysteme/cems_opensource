(function() {
	function getProjectSwagger(project) {
		return (
			"fragments/swagger-ui.html?url=%2Fconvertigo%2Fapi%3FYAML%26__project%3D" +
			project + "#/" + project
		)
	}

	function getURLMappedProjects() { // FIXME
		return [
		        'someProject',
		        'templateMaterialDesign',
		        'yetAnotherProject',
        ];
	}

	function setDefaultOption($page, select_name, value, content) {
		var sel;

		if (value)
			sel = 'select[name=' + select_name + '] > option[value="' + value + '"]';
		else if (content)
			sel = 'select[name=' + select_name + '] > option:contains("' + content + '")';

		// Set option as default, and refresh the parent select input
		$page.find(sel).prop("defaultSelected", true).parent().selectmenu("refresh");
	}

	// Used to know if we should setup putAPI
	var putAPIIsSetup = false;

	window.afterRendering = {
		putAPI: function($doc) {
			// Get the data we need from the C8O response document
			var $config_id = $doc.find("api > config_id");
			var $endpoint_id = $doc.find("api > endpoint_id");

			// Use the event to get the correct page
			// .ui-page-active has not been updated at this point
			$(document).one("pagechange", function(_, ui) {
				var $page = ui.toPage; 

				// Set config and enpoints to the ones from the DB
				if ($config_id.length)
					setDefaultOption($page, "config_id", $config_id.text());

				if ($endpoint_id.length)
					setDefaultOption($page, "endpoint_id", $endpoint_id.text());

				// TODO???
//				$page.find(".image-drag-drop").on("click", function() {
//					$(this).find("input[type=file]").click();
//				});

				// Is this the first time we get here?
				// Fixes inserting options more than once (same with event handlers)
				if (putAPIIsSetup && $doc.find("is_edit").length == 0)
					return;

				putAPIIsSetup = true;

				// Populate the c8o_project select input
				var $c8o_project = $page.find("select[name=c8o_project]");
				var project_list = getURLMappedProjects();

				$c8o_project.on("change", function() {
					var $swagger_ui = $("#swagger-ui");

					// Enable the collapsible
					$swagger_ui.parent().parent().removeClass("ui-disabled");

					$swagger_ui.attr("src", getProjectSwagger(this.value));
				});

				for (var i = 0; i < project_list.length; i++ ) {
					var project = project_list[i];
					// We have to set a value, otherwise JQM thinks the first option is a placeholder.
					// Even with data-placeholder="false"
					// See "Placeholder options" at http://api.jquerymobile.com/selectmenu/
					$c8o_project.append('<option value="' + project + '">' + project + "</option>");
				}

				$c8o_project.selectmenu("refresh");
			});
		},

		putConfig: function($doc) {
	    	var $visibility = $doc.find('config > visibility');

	    	// Same as putAPI
			$(document).one("pagechange", function(_, ui) {
				var $page = ui.toPage;

				if ($visibility.length)
					setDefaultOption($page, "visibility", null, $visibility.text());
			});
	    },
	}
})();
