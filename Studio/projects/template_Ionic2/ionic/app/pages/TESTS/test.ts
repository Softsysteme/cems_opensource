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
        console.log("test03: C8oFsPostGetDelete : Start")
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
                console.log("test03: C8oFsPostGetDelete : Finished")
                return null
            }
        )
/*

 */


    }
    testC8oFsPostGetDeleteRev(){
        console.log("test04: C8oFsPostGetDeleteRev : Start")
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
                            console.log("test04: C8oFsPostGetDeleteRev : Finihed")
                            return null
                        }
                    )
            })
        })


    }

    testC8oFsPostGetDestroyCreate(){
        console.log("test05: C8oFsPostGetDestroyCreate : Start")
        let ts
        let ts2
        let rev
        let id

        this.C8O_FS_PUSH().then(()=> {
            new Promise((resolve, reject)=> {
                this.c8o.callJson("fs://ClientSDKtesting.reset")
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true) {
                                console.log("test05 .reset: ok")
                            }
                            else {
                                console.log("test05 .reset: ERROR")
                            }
                            ts = "ts=" + (new Date().getTime())
                            ts2 = ts +"@test"
                            return this.c8o.callJson("fs://ClientSDKtesting.post", "ts", ts)
                        }
                    )
                    .then(
                        (response: any, parameters)=>{
                            if(response.ok == true){

                                console.log("test05 .post: ok")

                            }
                            else {
                                console.log("test05 .post: ERROR")
                            }
                            id = response.id
                            rev = response.rev
                            return this.c8o.callJson("fs://ClientSDKtesting.post", "_id", id, "rev", rev, "ts", ts, "ts2", ts2)
                        }
                    )
                    .then(
                        (response: any, parameters)=>{
                            if(response.ok == true){

                                console.log("test05 .post: ok")

                            }
                            else {
                                console.log("test05 .post: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.get", "docid", id)
                        }
                    )
                    .then(
                        (response: any, parameters)=>{
                            if(response.ts == ts && response.ts2 == ts2){

                                console.log("test05 .get: ok")

                            }
                            else {
                                console.log("test05 .get: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.destroy")
                        }
                    )
                    .then(
                        (response: any, parameters)=>{
                            if(response.ok){

                                console.log("test05 .destroy: ok")

                            }
                            else {
                                console.log("test05 .destroy: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.create")
                        }
                    )
                    .then(
                        (response: any, parameters)=>{
                            if(response.ok){

                                console.log("test05 .cerate: ok")

                            }
                            else {
                                console.log("test05 .create: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.get", "docid", id)
                        }
                    )
                    .then(
                        (response: any, parameters)=>{
                            console.log("test05 .get failed: ERROR")
                            return null
                        }
                    )
                    .fail(
                        (error, parameters)=>{
                            if(error instanceof C8oException){
                                console.log("test05 .get failed: ok")
                            }
                            else{
                                console.log(error)
                            }
                            console.log("test05: C8oFsPostGetDeleteRev : Finihed")
                            return null
                        }
                    )
            })
        })
    }
    testC8oFsPostReset() {
        console.log("test06: C8oFsPostReset : Start")
        let rev
        let id

        this.C8O_FS_PUSH().then(()=> {
            new Promise((resolve, reject)=> {
                this.c8o.callJson("fs://ClientSDKtesting.reset")
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true) {
                                console.log("test06 .reset: ok")
                            }
                            else {
                                console.log("test06 .reset: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.post")
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true) {

                                console.log("test06 .post: ok")

                            }
                            else {
                                console.log("test06 .post: ERROR")
                            }
                            id = response.id
                            return this.c8o.callJson("fs://ClientSDKtesting.reset")
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true) {

                                console.log("test06 .reset: ok")

                            }
                            else {
                                console.log("test06 .reset: ERROR")
                            }
                            id = response.id
                            return this.c8o.callJson("fs://ClientSDKtesting.get", "docid", id)
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            console.log("test06 .get failed: ERROR")
                            return null
                        }
                    )
                    .fail(
                        (error, parameters)=>{
                            if(error instanceof C8oException){
                                console.log("test06 .get failed: ok")
                            }
                            else{
                                console.log(error)
                            }
                            console.log("test06: C8oFsPostReset : Finihed")
                            return null
                        }
                    )
            })
        })
    }

    testC8oFsPostExisting(){
        console.log("test07: C8oFsPostExisting : Start")
        let rev
        let id

        this.C8O_FS_PUSH().then(()=> {
            new Promise((resolve, reject)=> {
                this.c8o.callJson("fs://ClientSDKtesting.reset")
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true) {
                                console.log("test07 .reset: ok")
                            }
                            else {
                                console.log("test07 .reset: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.post")
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true) {

                                console.log("test07 .post: ok")

                            }
                            else {
                                console.log("test07 .post: ERROR")
                            }
                            id = response.id
                            return this.c8o.callJson("fs://ClientSDKtesting.post", "_id", id)
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            console.log("test07 .post failed: ERROR")
                            return null
                        }
                    )
                    .fail(
                        (error, parameters)=>{
                            if(error instanceof C8oException){
                                console.log("test07 .post failed: ok")
                            }
                            else{
                                console.log(error)
                            }
                            console.log("test07: C8oFsPostExisting : Finihed")
                            return null
                        }
                    )
            })
        })
    }

    testC8oFsPostExistingPolicyNone(){
        console.log("test08: C8oFsPostExistingPolicyNone : Start")
        let rev
        let id

        this.C8O_FS_PUSH().then(()=> {
            new Promise((resolve, reject)=> {
                this.c8o.callJson("fs://ClientSDKtesting.reset")
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true) {
                                console.log("test08 .reset: ok")
                            }
                            else {
                                console.log("test08 .reset: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.post", C8o.FS_POLICY, C8o.FS_POLICY_NONE)
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true) {

                                console.log("test08 .post: ok")

                            }
                            else {
                                console.log("test08 .post: ERROR")
                            }
                            id = response.id
                            return this.c8o.callJson("fs://ClientSDKtesting.post", "_id", id, C8o.FS_POLICY, C8o.FS_POLICY_NONE)
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            console.log("test08 .post failed: ERROR")
                            return null
                        }
                    )
                    .fail(
                        (error, parameters)=>{
                            if(error instanceof C8oException){
                                console.log("test08 .post failed: ok")
                            }
                            else{
                                console.log(error)
                            }
                            console.log("test08: C8oFsPostExistingPolicyNone : Finihed")
                            return null
                        }
                    )
            })
        })
    }

    testC8oFsPostExistingPolicyCreate(){
        console.log("test09: C8oFsPostExistingPolicyCreate : Start")
        let rev
        let id

        this.C8O_FS_PUSH().then(()=> {
            new Promise((resolve, reject)=> {
                this.c8o.callJson("fs://ClientSDKtesting.reset")
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true) {
                                console.log("test09 .reset: ok")
                            }
                            else {
                                console.log("test09 .reset: ERROR")
                            }
                            id =  "C8oFsPostExistingPolicyCreate-" + + (new Date().getTime())
                            return this.c8o.callJson("fs://ClientSDKtesting.post", "_id", id)
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true && response.id == id) {

                                console.log("test09 .post: ok")

                            }
                            else {
                                console.log("test09 .post: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.post", "_id", id, C8o.FS_POLICY, C8o.FS_POLICY_CREATE)
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true && response.id != id) {

                                console.log("test09 .post: ok")

                            }
                            else {
                                console.log("test09 .post: ERROR")
                            }
                            console.log("test09: C8oFsPostExistingPolicyCreate : Finihed")
                            return null
                        }
                    )
                    .fail(
                        (error, parameters)=>{

                            console.log(error)

                            console.log("test09: C8oFsPostExistingPolicyCreate : Finihed")
                            return null
                        }
                    )
            })
        })
    }
    testC8oFsPostExistingPolicyOverride(){
        console.log("test10: testC8oFsPostExistingPolicyOverride : Start")
        let rev
        let id

        this.C8O_FS_PUSH().then(()=> {
            new Promise((resolve, reject)=> {
                this.c8o.callJson("fs://ClientSDKtesting.reset")
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true) {
                                console.log("test10 .reset: ok")
                            }
                            else {
                                console.log("test10 .reset: ERROR")
                            }
                            id = "C8oFsPostExistingPolicyOverride-" + +(new Date().getTime())
                            return this.c8o.callJson("fs://ClientSDKtesting.post", "_id", id, C8o.FS_POLICY, C8o.FS_POLICY_OVERRIDE, "a", 1, "b", 2)
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true && response.id == id) {

                                console.log("test10 .post: ok")

                            }
                            else {
                                console.log("test10 .post: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.post", "_id", id, C8o.FS_POLICY, C8o.FS_POLICY_OVERRIDE, "a", 3, "c", 4)
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true && response.id == id){// && 3 == response.a && response.b == undefined && 4 == response.c) {

                                console.log("test10 .post: ok")

                            }
                            else {
                                console.log("test10 .post: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.get", "docid", id)
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            if (response._id == id && 3 == response.a && response.b == undefined && 4 == response.c) {

                                console.log("test10 .post: ok")

                            }
                            else {
                                console.log("test10 .post: ERROR")
                            }
                            console.log("test10: testC8oFsPostExistingPolicyOverride : Finihed")
                            return null
                        }
                    )
                    .fail(
                        (error, parameters)=>{
                            console.log(error)
                            console.log("test10: testC8oFsPostExistingPolicyOverride : Finihed")
                            return null
                        }
                    )
            })
        })
    }
    testC8oFsPostExistingPolicyMergeSub(){
        console.log("test11: testC8oFsPostExistingPolicyMergeSub : Start")
        let rev
        let id
        let sub_f : any = {"g":true, "h":["one", "two", "three", "four"]}
        let sub_c : any = {"d" : 3, "e" : "four", "f": sub_f.valueOf()}

        this.C8O_FS_PUSH().then(()=> {
            new Promise((resolve, reject)=> {
                this.c8o.callJson("fs://ClientSDKtesting.reset")
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok == true) {
                                console.log("test11 .reset: ok")
                            }
                            else {
                                console.log("test11 .reset: ERROR")
                            }
                            id = "C8oFsPostExistingPolicyMergeSub-" + +(new Date().getTime())
                            return this.c8o.callJson("fs://ClientSDKtesting.post","_id", id, "a", 1, "b", -2,"c", sub_c.valueOf())
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok) {

                                console.log("test11 .post: ok")

                            }
                            else {
                                console.log("test11 .post: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.post", "_id", id, C8o.FS_POLICY, C8o.FS_POLICY_MERGE, "i", ["4", 6, 7.1, null], "c.f.j", "good", "c.f.h", [true, false])
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok) {

                                console.log("test11 .post: ok")

                            }
                            else {
                                console.log("test11 .post: ERROR")
                            }
                            return this.c8o.callJson("fs://ClientSDKtesting.post", "_id", id, C8o.FS_POLICY, C8o.FS_POLICY_MERGE, C8o.FS_SUBKEY_SEPARATOR, "<>", "c<>i-j", "great")
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            if (response.ok) {

                                console.log("test11 .post: ok")

                            }
                            else {
                                console.log("test11 .post: ERROR")
                            }

                            return this.c8o.callJson("fs://ClientSDKtesting.get", "_id", id, C8o.FS_POLICY, C8o.FS_POLICY_MERGE, C8o.FS_SUBKEY_SEPARATOR, "<>", "_id", id, "c<>i-j", "great")
                        }
                    )
                    .then(
                        (response: any, parameters)=> {
                            response.pop("_rev")
                            if (response.pop("_id") == id) {

                                console.log("test11 .post: ok")

                            }
                            else {
                                console.log("test11 .post: ERROR")
                            }
                            let expectedJson = "{\n  \"b\" : -2,\n  \"a\" : 1,\n  \"i\" : [\n    \"5\",\n    6,\n    7.1,\n    null\n  ],\n  \"c\" : {\n    \"f\" : {\n      \"g\" : true,\n      \"j\" : \"good\",\n      \"h\" : [\n        true,\n        false,\n        \"three\",\n        \"four\"\n      ]\n    },\n    \"i-j\" : \"great\",\n    \"e\" : \"four\",\n    \"d\" : 3\n  }\n}"
                            if(response == expectedJson){
                                console.log("test11 .expected: ok")
                            }
                            else{
                                console.log("test11 expected: ERROR")
                            }
                            console.log("test11: testC8oFsPostExistingPolicyMergeSub : Finihed")
                            return null
                        }
                    )
                    .fail(
                        (error, parameters)=>{
                            console.log(error)
                            console.log("test11: testC8oFsPostExistingPolicyMergeSub : Finihed")
                            return null
                        }
                    )
            })
        })
    }

}
