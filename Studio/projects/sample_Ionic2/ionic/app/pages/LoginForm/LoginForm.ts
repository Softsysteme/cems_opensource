/**
 * Created by Convertigo on 10/08/2016.
 */
import {Component} from '@angular/core';
import {C8o} from "../../providers/convertigo-service/convertigo-service";
import {NavController, AlertController} from 'ionic-angular';
import {SearchForm}  from './../SearchForm/SearchForm';
let PouchDB = require('pouchdb');

@Component({
  templateUrl: 'build/pages/LoginForm/LoginForm.html',
    providers : [C8o]//, Alert]
})
export class LoginForm {

  constructor(private c8o: C8o, private nav: NavController, public alertCtrl: AlertController){
  }

  ionViewLoaded(){}
  login(username:string, password:string){
      this.c8o.callJson("sampleMobileSearchRoom.Login", "user", username, "password", password)
      .then(
          (response, parameters)=>{
              if((response as any).logon == "true"){
                  this.nav.push(SearchForm);
              }
              else{
                  let alert = this.alertCtrl.create({
                      title: 'Error',
                      subTitle: 'Login or password incorrect',
                      buttons: ['OK']
                  });
                  alert.present();
              }
              return null
          }
      )
      .fail(
          (error, parameters)=>{
              console.log(error.message)
              return null
          }
      )
  }
}
