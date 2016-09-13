/**
 * Created by Convertigo on 10/08/2016.
 */
import {Component, Input} from '@angular/core';
import {C8o} from "../../providers/convertigo-service/convertigo-service";
import {NavController} from 'ionic-angular';
import {ListForm} from "../ListForm/ListForm";

@Component({
    templateUrl: 'build/pages/SearchForm/SearchForm.html',
    providers : [C8o]
})
export class SearchForm {

    private PostalCode : string;
    private date : string;
    constructor(private c8o : C8o, private nav: NavController) {
        this.PostalCode = "Paris";
        this.date = new Date().toISOString().slice(0,10);
    }
    search(){
        this.c8o.callJson("sampleMobileSearchRoom.LoadList")
        .then(
            (response, parameters)=>{
                this.nav.push(ListForm, response)
                return null
             }
        )
    }
}
