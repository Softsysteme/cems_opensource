/**
 * Convertigo Keyring library
 */
console.log("Convertigo Keyring library - users administration");

$(function() {
	console.log("Document ready!");

	var convertigoBase = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1));

	$.post(
			convertigoBase + "/projects/Keyring/.pxml",
			{
				__sequence: "GetUsers",
				__context: "ctxGetUsers"
			},
			function(data) {
				console.log("Sabre data:");
				console.log(data);
				
				var $data = $(data);
				
				$(".waitDiv1").hide();
				
				var $divBestResult = $("#bestResult");
				var $divBestResultPrice = $("#bestResultPrice");
				console.log("$divBestResultPrice: " + $divBestResultPrice);
				var bestPrice = "$" + $data.find("Price").text();
				
				$divBestResultPrice.text(bestPrice);
				console.log("Best price found: " + bestPrice);
			},
			"xml"
	)
    .error(function(xhr, errorMessage, exception) {
    	console.log("Error when getting SABRE data: " + errorMessage);
    	console.log(exception.message);
    });
	
	$.post(
			convertigoBase + "/projects/SabreAPI/.pxml",
			{
				__sequence: "GetFares",
				__context: "ctxGetFares",
				DepartureDateTime: formatGFSDateToSabreDate(selectedFlight.fDepartureDateTime),
				ArrivalDateTime: formatGFSDateToSabreDate(selectedFlight.fArrivalDateTime),
				DestinationLocation: selectedFlight.fArrivalAirport,
				OriginLocation: selectedFlight.fDepartureAirport,
				AirLine: selectedFlight.fCompany,
				FlightNo: selectedFlight.fFlightNumber,
				RDepartureDateTime: formatGFSDateToSabreDate(selectedFlight.rfDepartureDateTime),
				RArrivalDateTime: formatGFSDateToSabreDate(selectedFlight.rfArrivalDateTime),
				RDestinationLocation: selectedFlight.rfArrivalAirport,
				ROriginLocation: selectedFlight.rfDepartureAirport,
				RAirLine: selectedFlight.rfCompany,
				RFlightNo: selectedFlight.rfFlightNumber
			},
			function(data) {
				console.log("Sabre data:");
				console.log(data);
				
				var $data = $(data);
				
				var $divResults = $("#cwtResults");
				
				$(".waitDiv2").hide();
				$divResults.append('<h4>Carlson WagonLit Travel has also found the following flights matching your search:</h4>');

				$data.find("flight").each(function(i, flight) {
					var $flight = $(flight);
					
					var carrier = $flight.find("carrier").text();
					var cost = $flight.find("cost").text();
					
					$divResults.append("<p style='padding: 6px; color: white; background-color: #1798a1; font-weight: bold'>" + getFullCarrierName(carrier) + " $" + cost + "</p>");
					
					var table = "";
					
					table = "<table>";
					table += "<tr><th align='left'>Takeoff</th><th align='left'>Arrival</th><th align='left'>Airline</th><th align='left'>Route</th></tr>";
					$flight.find("segment").each(function(i, segment) {
						var $segment = $(segment);

						var takeoff = $segment.find("DepartureDateTime").text();
						var arrival = $segment.find("ArrivalDateTime").text();
						var airline = $segment.find("Airline").text();
						var flightNo = airline + $segment.find("FlightNo").text();
						var route = $segment.find("Origin").text() + "-" + $segment.find("Destination").text();
						
						table += "<tr valign='middle'>";
						table += "<td width='200'>" + formatSabreDate(takeoff) + "</td>";
						table += "<td width='200'>" + formatSabreDate(arrival) + "</td>";
						table += "<td valign='middle' width='300'><img src='http://www.gstatic.com/flights/airline_logos/24px/" + airline + ".png'> " + getFullCarrierName(airline) + " " + flightNo + "</td>";
						table += "<td width='200'>" + route + "</td>";
						table += "</tr>";
					});
					table += "</table>";
					
					$divResults.append(table);
				});
			},
			"xml"
	)
    .error(function(xhr, errorMessage, exception) {
    	console.log("Error when getting SABRE data: " + errorMessage);
    	console.log(exception.message);
    });

}

function getFullCarrierName(carrier) {
	if (carrier == "US") return "US Airways";
	if (carrier == "DL") return "Delta Airlines";
	if (carrier == "UA") return "United Airlines";
	if (carrier == "AF") return "Air France";
	if (carrier == "VX") return "Virgin America";
	if (carrier == "AA") return "American Airlines";
	if (carrier == "B6") return "JetBlue Airways";
	if (carrier == "SY") return "Sky Airlines";
	if (carrier == "FL") return "AirTran Airways";
	return carrier;
}
