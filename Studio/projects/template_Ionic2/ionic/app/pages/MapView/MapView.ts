import {GoogleMapsEvent, GoogleMap, GoogleMapsLatLng, GoogleMapsMarker} from "ionic-native";
import {Component} from "@angular/core";

@Component({
    templateUrl: 'build/pages/MapView/MapView.html'
})
export class MapView {
    constructor() {
}
    ionViewLoaded () {
        var myLatLng = new GoogleMapsLatLng("48.7", "2.183333");
        var marker = new GoogleMapsMarker(myLatLng);

        let map = new GoogleMap('map-canvas');


        //map.addMarker(marker)
        map.on(GoogleMapsEvent.MAP_READY).subscribe(() => console.log('Map is ready!'));
        map.setCenter(myLatLng);
        map.addMarker({position: myLatLng});
        map.setZoom(15);

    }
}

