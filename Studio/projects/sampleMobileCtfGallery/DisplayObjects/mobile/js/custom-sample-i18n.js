$.extend(true, C8O, {
	init_vars: {
		// Set here the default language when your page is loading
		i18n: "en"
	},
	
	ro_vars: {
		// Put here the list of I18N codes, enabling JSON dictionaries for each supported language
		i18n_files: [ "en", "fr", "pt" ]
	},

	vars: {
		first_call: "false"
	},
	
	options: {
	}
});

C8O.addHook("document_ready", function () {
	// Update the language combo with the current selected language
	var $i18nSelector = $("#i18nSelector");
	$i18nSelector.val(C8O.init_vars.i18n);
	$i18nSelector.change(function() {
		// Use C8O.translate to get the translation for the
		// key 'languageChanged' (JavaScript are not translated
		// during the C8O core lib standard process).
		alert(C8O.translate("languageChanged"));
	});
	return true;
});
