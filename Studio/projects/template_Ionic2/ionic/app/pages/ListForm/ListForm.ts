/**
 * Created by charlesg on 10/08/2016.
 */
import {Component} from '@angular/core';
import { NavParams } from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {DetailsForm} from "../DetailsForm/DetailsForm";
import {C8o} from "../../providers/convertigo-service/convertigo-service";

@Component({
    templateUrl: 'build/pages/ListForm/ListForm.html',
    providers : [C8o]

})
export class ListForm {
    items: any;
    constructor(private navParams: NavParams, private nav: NavController, private c8o : C8o) {
        let id = navParams.data;
        this.items = id.results.result
    }
    detail(params){
        this.c8o.callJson("sampleMobileSearchRoom.GetDetails", "id", params)
            .then(
                (response, parameters)=>{
                    this.nav.push(DetailsForm, response);
                    return null
                }
            )
    }
}
