C8O.addHook("document_ready", function () {	
	C8O.re = {
		dates : new RegExp("([\\w]*) (.*)"),
		type : new RegExp("^([a-z]+)([A-Z]*)$")
	}
	
	C8O.call({
		__sequence : "Start"
	});
	
	$("form").submit(function () {
		C8O.call(this);
		return false;
	});
	
	$("#validate, #refuse").click(function () {
		C8O.call({
			__sequence : $(this).val(),
			index : $("#index").val()
		});
		return false;
	});
	
	$(".quit").click(function () {
		C8O.call({
			__sequence : "Deconnection"
		});
		return false;
	});
	
	$(".requests").click(function () {
		C8O.call({
			__sequence : "Requests"
		});
		return false;
	});
	
	$(".calendarbar a").click(function () {
		C8O.call({
			__sequence : $(this).attr("href")
		});
		return false;
	});
	
	$("#reload").click(function () {
		window.location.hash = "";
		window.location.reload();
		return false;
	});
	
	$("#seeCalendar").click(function () {
		C8O.call({
			__sequence : "Calendar"
		});
		return false;
	});
});

C8O.addHook("call", function (data) {
	data.sequence = data.__sequence;
	data.__sequence = "Fake";
	return true;
});

C8O.addHook("xml_response", function (xml) {
	var sequence = C8O.getLastCallParameter("sequence");
	var $xml = $(xml);
	var status = $(xml).find("document>status").text();
	if (sequence == "Deconnection") {
		$.mobile.changePage($("#fin"), {transition : "pop"});
		return;
	}
	if (status === "1") {
		if ($xml.find("document>requests").length) {
			var $ul = $("#listing ul");
			$ul.empty();
			var $requests = $xml.find("document>requests>request");
			$("#nbleave").text($requests.length);

			$requests.each(function () {
				var name = $(this).find("name").text();
				var when = $(this).find("when").text();
				var date = $(this).find("date").text();
				var index = $(this).find("index").text();
				switch (index) {
				  case "4":
				  case "5": when += " (simulate error)"; break;
				}
				$ul.append(
					$("<li/>").append(
						$("<a/>").attr("href", "#").append(
							$("<h3/>").text(name + " - " + date),
							$("<p/>").text(when)
						)
					).click(function () {
						C8O.call({
							__sequence : "Details",
							index : index
						});
					})
				);
			});
			
			if ($.mobile.activePage.attr("id") !== "listing") {
				$.mobile.changePage($("#listing"), {
					reverse: ($.inArray(sequence, ["Start", "Login"]) === -1)
				});
			}
			try {
				$ul.listview("refresh");
			} catch (e) {}
		} else if ($xml.find("document>request").length) {
			$("#maindetails").empty();
			$xml.find("document>request").children().not("index").each(function () {
				$("#maindetails").append(
					$("<div/>").append(
						$("<b/>").text(this.tagName + " : "),
						$(this).text()
					)
				);
			});
			
			$("#index").val($xml.find("document>request>index").text());
			
			$.mobile.changePage($("#details"));
		} else if ($xml.find("document>calendar").length) {
			var $eltCalendar = $("#calendars .tpl_week tbody:first").empty();
			
			var weeks = [];
			$xml.find("weeks>week:not(:empty)").each(function () {
				var dates = C8O.re.dates.exec($(this).text()); 
				var $eltweek = $("#templates .tpl_week:first").clone();
				$eltweek.find(".txt_num_week:first").text(dates[1]);
				$eltweek.find(".txt_dates_week:first").text(dates[2]);
				weeks.push($eltweek);
			});
			$xml.find("employee").each(function (j) {
				var nom = $(this).find(">status:first").text();
				var rowClass = j%2 ? "odd" : "even";
				var $row = null;
				$(this).find(">status:not(:first)").each(function (i) {
					var label = $(this).find(">label").text();
					var mType = C8O.re.type.exec($(this).find(">type").text());
					var $week = weeks[Math.floor(i/7)];
					var $eltday = $("<td/>");
					if (mType !== null) {
						if (mType[2] === "") {
							$("<div/>").addClass(mType[1]).text(label).appendTo($eltday);
						} else {
							$("<div/>").css({position : "relative"}).append(
								$("<div/>").addClass(mType[1]).addClass(mType[2].toLowerCase()).html("&nbsp;"),
								$("<div/>").addClass("position").text(label)
							).appendTo($eltday);
						}
					} else {
						$eltday.text(label);
					}
					if (i%7 === 0) {
						$row = $("<tr/>").addClass(rowClass).appendTo($week);
						$row.append($("<td/>").addClass("nomPrenom").text(nom));
					} else if (i%7 >= 5) {
						$eltday.addClass("weekend");
					}
					$row.append($eltday);
				});
			});
			$.each(weeks, function () {
				$eltCalendar.append(this.children().detach());
			});
			$eltCalendar.find("tr:first").remove();
			$.mobile.changePage($("#calendar"));
		} else if ($xml.find("document>reasons").length) {
			var $ul = $("#refuse_options ul").empty();
			$xml.find("document>reasons>option").each(function () {
				var label = $(this).find("label").text();
				var index = $(this).find("index").text();
				$ul.append(
					$("<li/>").append(
						$("<a/>").attr("href", "#").append(
							$("<h3/>").text(label)
						).click(function () {
							C8O.call({
								__sequence : "Validate",
								index : index
							});
							return false;
						})
					)
				)
			});
			
			$.mobile.changePage($("#refuse_options"));
			
			try {
				$ul.listview("refresh");
			} catch (e) {}
		}
		if ($xml.find("document>alertMessage").length) {
			$("#alertMessageTarget").text($xml.find("document>alertMessage").text());
			$.mobile.changePage($("#alertMessage"), {transition : "pop", role : "dialog"});
		}
	} else {
		var error = $xml.find("document>error_message").text();
		if (error === "") {
			error = "Unknown error";
		}
		if ($xml.find("document>alertMessage").length) {
			error = error + "  "+ $xml.find("document>alertMessage").text();
		}
		$("#errorMessageTarget").text(error);
		$.mobile.changePage($("#errorMessage"), {transition : "pop", role : "dialog"});
	}
	return true;
});