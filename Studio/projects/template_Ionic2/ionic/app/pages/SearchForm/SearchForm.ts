/**
 * Created by charlesg on 10/08/2016.
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
        console.log(this.date.toString());

    }
    search(){//, password: string){
        this.c8o.callJson("sampleMobileSearchRoom.LoadList").then(data => {
            console.log(data);
            this.nav.push(ListForm, data);


        });
    }
}
