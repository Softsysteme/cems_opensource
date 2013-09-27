String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function onAfterRendering_getTopic($doc, c8oData) {
	// Render source code
	SyntaxHighlighter.highlight();
}

function formatHtmlSourceCode(fragment) {
	var source = fragment;
	
	// Serialize XML fragment to string if needed
	if (typeof(source) == "object") {
		source = (new XMLSerializer()).serializeToString(fragment);
	}
	
	// Remove unwanted <fragment> node
	source = source.replace("<fragment>", "").replace("</fragment>", "");
	
	// Return beautified code
	return formatHtmlCode(source);
}

function formatHtmlCode(code) {
	// Indent the code
	code = vkbeautify.xml(code);
	
	// HTML-format the result
	code = code.replace(">", "&gt;").replace("<", "&lt;");
	
	return code;
}

function getAndFormatHtmlSourceCode(fragment) {
	var url = $(fragment).find("source").attr("url");
	var $cdata = $(this);
	var $parent = $cdata.parent();

    $.ajax({
        type: "post",
        url: url,
        dataType: "text",
        success: function (data, text) {
            var code = formatHtmlSourceCode(data);
            
            $parent.empty();
            if (url.endsWith(".js")) {
            	$cdata.addClass("brush: js");
            }
            else {
            	$cdata.addClass("brush: html");
            }
            $cdata.text(code).appendTo($parent);
            
            // Render source code
            SyntaxHighlighter.highlight();
        },
        error: function (request, status, error) {
            alert(error);
        }
    });
	
	return "Getting content...";
}
