import {Component} from '@angular/core';
import {C8o, Dictionary} from "../../providers/convertigo-service/convertigo-service";
import {NavController} from 'ionic-angular';
import {LoginForm} from "../LoginForm/LoginForm";
let PouchDB = require('pouchdb');


@Component({
  templateUrl: 'build/pages/TESTS/test.html',
    providers : [C8o]//, Alert]
})
export class Test {

  constructor(private c8o: C8o, private nav: NavController){
  }

  ionViewLoaded(){}
  switch(){
      this.nav.push(LoginForm)
  }
  test01(){
      this.c8o.callJson("sampleMobileSearchRoom.Login", "user", "username", "password", "password")
      .then(
          (response, parameters)=>{
              if((response as any).logon == "true"){
                  console.log('callJson works')
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

    test02(){
        let dict = new Dictionary()
        dict.add("user", "username")
        dict.add("password", "password")
        this.c8o.callJsonDict("sampleMobileSearchRoom.Login", dict)
            .then(
                (response, parameters)=>{
                    if((response as any).logon == "true"){
                        console.log('callJson works')
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
    test03(){

    }
}
