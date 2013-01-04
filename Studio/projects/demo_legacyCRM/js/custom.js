
function getQuery(){
	var l = window.location;
	var q = l.search.length>0?l.search.substring(1):"";
	var h = l.hash.length>0?l.hash.substring(1):"";
	return (q.length>0 && h.length>0)?(q+"&"+h):(q.length>0?q:h);
}

window.onload = function(){
	initVar();
	tooltip.show = f_void;
	tooltip.hide = f_void;
	
	getOriginalFontSize();
	var search = window.location.search.length>0?window.location.search.substring(1):"";

	if(getQuery().indexOf("__container=df")!=-1){
		$.ajax({
			data: search,
			success: function(xml){
				var params = [];
				$(xml).find("parameter").each(function(){
					var $param = $(this);
					params.push(encodeURIComponent($param.attr("name"))+"="+encodeURIComponent($param.attr("value")));
				});
				ajaxXmlPostData(xmlhttp, params.join("&"));
			},
			type: "GET",
			url: "../../df/dfe/interface/provider"
		});
	}else{
		ajaxXmlPostData(xmlhttp, search);
	}
	return false;
};