/*
	To be multi-page the panel needs to be outside the div page.
	This implies to initialize objects manually: Panel, Listview, Collapsible...
*/
C8O.addHook("document_ready", function () {
	$("#leftpanel").panel();
	$("ul[data-role='listview']").listview();
	$("div[data-role='collapsible']").collapsible();
    return true;
});