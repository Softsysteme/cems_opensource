C8O.vars.auto_refresh = false;

C8O.addHook("resize_calculation", function (xml, extra) {
	if ($.browser.msie) {
		$("body").attr("scroll", "no");
	} else {
		window.frameElement.scrolling = "no";
	}
	var lowest = 0;
	$("body, div, span, img").each( function () {
		lowest = Math.max(lowest, this.offsetTop + this.offsetHeight);
	});
	var offset = new String(C8O.getLastCallParameter("__transaction")).toLowerCase() === "usdirectory" ? 30 : 0;
	return lowest + offset;
});