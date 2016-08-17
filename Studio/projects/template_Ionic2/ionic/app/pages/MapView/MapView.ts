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
    private onPlatformReady(): void {
            let map = new GoogleMap('map-canvas');
            map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
                map.animateCamera({target: this.navParams.data[0], zoom: 15});
                map.addMarker({position: this.navParams.data[0], title: this.navParams.data[1]});
            });
    }
}

