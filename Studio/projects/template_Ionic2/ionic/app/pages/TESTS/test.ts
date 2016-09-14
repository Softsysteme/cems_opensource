import {Component} from '@angular/core';
import {C8o, Dictionary, C8oLogLevel, C8oSettings} from "../../providers/convertigo-service/convertigo-service";
import {NavController} from 'ionic-angular';
import {LoginForm} from "../LoginForm/LoginForm";
import { LoadingController } from 'ionic-angular';
let PouchDB = require('pouchdb');


@Component({
  templateUrl: 'build/pages/TESTS/test.html',
    providers : [C8o]//, Alert]
})
export class Test {

  constructor(private c8o: C8o, private nav: NavController, public loadingCtrl: LoadingController){

  }

  ionViewLoaded(){
      //this.test03()
  }

  switch(){
      this.nav.push(LoginForm)
  }



    C8O_FS() {
            console.log('C8O_FS')
            let settings : C8oSettings = new C8oSettings()
            settings
                .setDefaultDatabaseName("clientsdktesting")
                .setLogRemote(false)
                .setLogLevelLocal(C8oLogLevel.ERROR)
            this.c8o.copy(settings)
    }

  C8O_FS_PULL(): Promise<any>{
      return new Promise(function (resolve, reject) {
          let settings : C8oSettings = new C8oSettings()
          settings.setDefaultDatabaseName("qa_fs_pull")
          settings.setLogRemote(false)
          settings.setLogLevelLocal(C8oLogLevel.ERROR)
          this.c8o.copy(settings)
          this.c8o.callJson("ClientSDKtesting.InitFsPull")
              .then(
                  (response, parameters)=>{
                      if(response.document == "ok"){
                          console.log(response.document)
                          resolve()
                      }
                      else{
                          throw new Error("C8O_FS_PULL returns bad value ... see C8O_FS_PULL function")
                      }
                      return null
                  }
              )
              .fail(
                  (error, parameters)=>{
                      reject(error)
                      return null
                  }
              )
      })

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

        this.C8O_FS()

        let myID

            this.c8o.callJson("fs://ClientSDKtesting.reset")
            .then(
                (response: any, parameters)=>{
                    if(response.ok == true){
                        console.log("test03 .reset ok")
                    }
                    else {
                        console.log("test03 .reset ERROR")
                    }
                    myID = "C8oFsPostGetDelete-" + (new Date().getTime())
                    return this.c8o.callJson("fs://ClientSDKtesting.post", "_id", myID)
            }
        )
        .then(
            (response: any, parameters)=>{

                if(response.ok == true && response.id == myID ){
                    console.log("test03 .post ok")
                }
                else {
                    console.log("test03 .post ERROR")
                }
                return this.c8o.callJson("fs://ClientSDKtesting.get", "docid", response.id)
            }
        )
        .then(
            (response: any, parameters)=>{
                if(response.id == myID ){
                    console.log("test03 .get ok")
                }
                else {
                    console.log("test03 .get ERROR")
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
/*

 */


    }
    test04(){
        let a : string[] = new Array<string>(0)
        a.push("salut")
        console.log(a[0])


    }
}
