/**
 * Created by charlesg on 10/08/2016.
 */
import {Component} from '@angular/core';
import {C8o} from "../../providers/convertigo-service/convertigo-service";

@Component({
    templateUrl: 'build/pages/SearchForm/SearchForm.html',
    providers : [C8o]
})
export class SearchForm {
    constructor() {

    }

    search(username: string){//, password: string){

    }
}
