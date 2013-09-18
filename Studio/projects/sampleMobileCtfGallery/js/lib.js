function onAfterRendering_getTopic($doc, c8oData) {
	// Render source code
	SyntaxHighlighter.highlight();
}

function formatHtmlSourceCode(fragment) {
	var source = (new XMLSerializer()).serializeToString(fragment);
	
	// Remove unwanted <fragment> node
	source = source.replace("<fragment>", "").replace("</fragment>", "");
	
	// Indent the code
	source = vkbeautify.xml(source);
	
	// HTML-format the result
	source = source.replace(">", "&gt;").replace("<", "&lt;");
	
	return source;
}