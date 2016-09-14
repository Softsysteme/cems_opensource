import {Component} from '@angular/core';
import {
    C8o, Dictionary, C8oLogLevel, C8oSettings,
    C8oRessourceNotFoundException, C8oException
} from "../../providers/convertigo-service/convertigo-service";
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
            let settings : C8oSettings = new C8oSettings()
            settings
                .setDefaultDatabaseName("clientsdktesting")
                .setLogRemote(false)
                .setLogLevelLocal(C8oLogLevel.ERROR)
            this.c8o.copy(settings)
        console.log('C8O_FS: ok')
    }

  C8O_FS_PULL(): Promise<any>{
      return new Promise((resolve, reject)=> {
          let settings : C8oSettings = new C8oSettings()
          settings.setDefaultDatabaseName("qa_fs_pull")
          settings.setLogRemote(false)
          settings.setLogLevelLocal(C8oLogLevel.ERROR)
          this.c8o.copy(settings)
          this.c8o.callJson("ClientSDKtesting.InitFsPull")
              .then(
                  (response : any, parameters)=>{
                      if(response.document.ok){
                          console.log(console.log("C8O_FS_PULL: ok"))
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

    C8O_FS_PUSH(): Promise<any>{
        return new Promise((resolve, reject)=> {
            let settings : C8oSettings = new C8oSettings()
            settings
                .setDefaultDatabaseName("qa_fs_push")
                .setLogRemote(false)
                .setLogLevelLocal(C8oLogLevel.ERROR)
            this.c8o.copy(settings)
            this.c8o.callJson("ClientSDKtesting.InitFsPush")
                .then(
                    (response : any, parameters)=>{
                        if(response.document.ok){
                            console.log("C8O_FS_PUSH: ok")
                            resolve()
                        }
                        else{
                            throw new Error("C8O_FS_PUSH returns bad value ... see C8O_FS_PUSH function of test.ts")
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
    testC8oFsPostGetDelete(){
        console.log("testC8oFsPostGetDelete : Start")
        this.C8O_FS()

        let myID
        let done : boolean = false

            this.c8o.callJson("fs://ClientSDKtesting.reset")
            .then(
                (response: any, parameters)=>{
                    if(response.ok == true){
                        console.log("test03 .reset: ok")
                    }
                    else {
                        console.log("test03 .reset: ERROR")
                    }
                    myID = "C8oFsPostGetDelete-" + (new Date().getTime())
                    return this.c8o.callJson("fs://ClientSDKtesting.post", "_id", myID)
            }
        )
        .then(
            (response: any, parameters)=>{

                if(response.ok == true && response.id == myID ){
                    console.log("test03 .post: ok")
                }
                else {
                    console.log("test03 .post: ERROR")
                }
                return this.c8o.callJson("fs://ClientSDKtesting.get", "docid", response.id)
            }
        )
        .then(
            (response: any, parameters)=>{
                if(response._id == myID ){
                    console.log("test03 .get: ok")
                }
                else {
                    console.log("test03 .get: ERROR")
                }
                return this.c8o.callJson("fs://ClientSDKtesting.delete", "docid", response._id)
            }
        )
        .then(
            (response: any, parameters)=>{
                if(response.ok){
                    console.log("test03 .delete: ok")
                    done = true
                }
                else{
                    console.log("test03 .delete: ERROR")
                }
                return this.c8o.callJson("fs://ClientSDKtesting.delete", "docid", response._id)
            }
        )
        .then(
            (response: any, parameters)=>{
                console.log("test03 .delete failed: ERROR")
            }
        )
        .fail(
            (error, parameters)=>{
                if(done && error.message == "Unable to run the delete document query" && error instanceof C8oException){
                    console.log("test03 .delete failed: ok")
                }
                else{
                    console.log(error)
                }
                console.log("testC8oFsPostGetDelete : Finished")
                return null
            }
        )
/*

 */


    }
    testC8oFsPostGetDeleteRev(){
        console.log("testC8oFsPostGetDeleteRev : Start")
        let myID
        let rev

        this.C8O_FS_PUSH().then(()=>{
            new Promise((resolve, reject)=>{
                this.c8o.callJson("fs://ClientSDKtesting.reset")
                .then(
                    (response: any, parameters)=>{
                        if(response.ok == true){
                            console.log("test04 .reset: ok")
                        }
                        else {
                            console.log("test04 .reset: ERROR")
                        }
                        myID = "C8oFsPostGetDelete-Rev" + (new Date().getTime())
                        return this.c8o.callJson("fs://ClientSDKtesting.post", "_id", myID)
                    }
                )
                .then(
                    (response: any, parameters)=>{
                        rev = response.rev
                        if(response.ok == true && response.id == myID ){

                            console.log("test04 .post: ok")

                        }
                        else {
                            console.log("test04 .post: ERROR")
                        }
                        return this.c8o.callJson("fs://ClientSDKtesting.delete", "docid", response.id, "rev", "1-123456")
                    }
                )
                .then(
                    (response: any, parameters)=>{
                        console.log("test04 .delete failed: ERROR")
                    }
                ).fail(
                (error, parameters)=>{
                    if(error instanceof C8oException){
                        console.log("test04 .delete failed: ok")
                    }
                    else{
                        console.log(error)
                    }
                    resolve()
                    return null
                }
            )
        }).then(()=>{
                this.c8o.callJson("fs://ClientSDKtesting.delete", "docid", myID, "rev", rev)
                    .then(
                        (response: any, parameters)=>{
                            if(response.ok == true){
                                console.log("test04 .delete: ok")
                            }
                            else {
                                console.log("test04 .delete: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.get", "docid", myID)
                        }
                    )
                    .then(
                        (response: any, parameters)=>{
                            console.log("test04 .get failed: ERROR")
                            return null
                        }
                    )
                    .fail(
                        (error, parameters)=>{
                            if(error instanceof C8oException){
                                console.log("test04 .get failed: ok")
                            }
                            else{
                                console.log(error)
                            }
                            console.log("testC8oFsPostGetDeleteRev : Finihed")
                            return null
                        }
                    )
            })
        })


    }
}
