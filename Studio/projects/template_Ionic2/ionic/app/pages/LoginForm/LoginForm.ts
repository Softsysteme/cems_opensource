import {Component} from '@angular/core';
import {GoogleMap, GoogleMapsEvent} from 'ionic-native';
import {C8o} from "../../providers/convertigo-service/convertigo-service";
import {NavController} from 'ionic-angular';
import {SearchForm}  from './../SearchForm/SearchForm';
let PouchDB = require('pouchdb');

@Component({
  templateUrl: 'build/pages/LoginForm/LoginForm.html',
    providers : [C8o]
})
export class LoginForm {
  constructor(private c8o: C8o, private nav: NavController){//}, private toastController : ToastController) {

  }

  ionViewLoaded(){
    let db = new PouchDB('db1');
      db.put({
          _id: 'id1',
          name: 'charles',
          age: 22
      });

      db.changes().on('change', function() {
          console.log("my database has changed");
      });

  }
  login(username:string, password:string){
    this.c8o.callJson("sampleMobileSearchRoom.Login", "user", username, "password", password).then(data => {
        console.log(data);
        if(data.logon == "true"){
            this.nav.push(SearchForm);
        }
        else{

        }


    });
  }
}
