var afterRendering = {
	putAPI: function($doc) {
		var $config_id = $('api > config_id', $doc);
		var $endpoint_id = $('api > endpoint_id', $doc);

		if ($config_id.length)
			$('option[value="' + $config_id.text() + '"]').prop("defaultSelected", true);

		if ($endpoint_id.length)
			$('option[value="' + $endpoint_id.text() + '"]').prop("defaultSelected", true);

		$('select').selectmenu('refresh');
	},

	putConfig: function($doc) {
    	var $visibility = $('config > visibility', $doc);

		$('option:contains("' + $visibility.text() + '")').prop("defaultSelected", true);
    	$('select').selectmenu('refresh');
    },
}
