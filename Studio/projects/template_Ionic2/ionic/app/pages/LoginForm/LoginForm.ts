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
      /*console.log((new Date).getTime().toString());
      let array = ['db', 'db2', 'db3', 'maNouvelleBase', 'retaildb_device'];
      for(var i=0; i <5; i++){
          let db = new PouchDB(array[i]);
          console.log(array[i])
          db.destroy().then(function (response) {

          });
      }
      /*let db = new PouchDB('db');
      db.destroy().then(function (response) {

      });

      db.changes().on('change', function(change) {
          console.log("my database has changed");

          for(var a in change.changes[0].rev){

                  console.log(a);


          }
      });*/



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
