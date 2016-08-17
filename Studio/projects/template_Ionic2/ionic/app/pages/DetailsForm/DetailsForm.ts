/**
 * Created by charlesg on 10/08/2016.
 */
import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {C8outils} from "../../providers/convertigo-service/convertigo-service";
import {MapView} from "../MapView/MapView";
import {GoogleMapsLatLng} from "ionic-native";

@Component({
    templateUrl: 'build/pages/DetailsForm/DetailsForm.html',
    providers: [C8outils]
})
export class DetailsForm {
    item: any;
    constructor(private navParams: NavParams, private c8outils : C8outils, private nav: NavController) {
        this.item = navParams.get('result');
    }
    local(address : string){
        this.c8outils.geocode(this.item.address,"AIzaSyATV1eswzYgDzqzGmD6c_TjjVuogw5R5RI").then(data =>{
            //noinspection TypeScriptUnresolvedVariable
            var myLatLng = new GoogleMapsLatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
            let array : any[] =[myLatLng, this.item.title];
            this.nav.setRoot(MapView, array);
        });
    }
}
