function onAfterRendering_getTopic($doc, c8oData) {
	// Render source code
	SyntaxHighlighter.highlight();
}

function formatHtmlSourceCode(fragment) {
	var source = fragment.innerHTML;
	source = vkbeautify.xml(source);
	source = source.replace(">", "&gt;").replace("<", "&lt;");
	
	return source;
}