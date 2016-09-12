import {GoogleMapsEvent, GoogleMap} from "ionic-native";
import {Component} from "@angular/core";
import {NavParams,Platform} from "ionic-angular";
import 'rxjs/add/operator/map'


@Component({
    templateUrl: 'build/pages/MapView/MapView.html'
})
export class MapView {
    constructor(private navParams: NavParams, private platform: Platform) {
        this.platform.ready().then(() => this.onPlatformReady());
}

    // Due to an ionic2 / googlemaps cordova issue, we are obliged to set root page opacity to zero on initialization
    ngOnInit(){
        document.getElementsByClassName("app-root")[0].setAttribute("style", "opacity:0");
    }

    // Then on destroy we set opacity to one
    ngOnDestroy(){
        document.getElementsByClassName("app-root")[0].setAttribute("style", "opacity:1");
    }

    private onPlatformReady(): void {
            let map = new GoogleMap('map-canvas');
            map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
                map.animateCamera({target: this.navParams.data[0], zoom: 15});
                map.addMarker({position: this.navParams.data[0], title: this.navParams.data[1]});
            });
    }

}

