import {Component} from '@angular/core';
import {GoogleMap, GoogleMapsEvent} from 'ionic-native';
import {
    C8o, FullSyncPolicy, Dictionary, C8oFullSyncCbl, C8oHttpInterface, C8oPromise
} from "../../providers/convertigo-service/convertigo-service";
import {NavController} from 'ionic-angular';
import {SearchForm}  from './../SearchForm/SearchForm';
let PouchDB = require('pouchdb');

@Component({
  templateUrl: 'build/pages/LoginForm/LoginForm.html',
    providers : [C8o]
})
export class LoginForm {

    myC8o: C8o
    HOST = "buildus.twinsoft.fr" // "192.168.100.95"
    PROJECT_PATH = "/convertigo/projects/ClientSDKtesting"
    PORT = ":28080" // 18080
    PREFIX = "http://"
    PREFIXS = "https://"
    test : C8oHttpInterface
    //c8o_FS : C8o = new C8o(this.PREFIX + this.HOST + this.PORT + this.PROJECT_PATH)

  constructor(private c8o: C8o, private nav: NavController){//}, private toastController : ToastController) {
     this.test = new C8oHttpInterface(c8o)
  }


  ionViewLoaded(){


      /*for(var pair in dict){
          console.log(dict[pair])
      }*/



      /*let dict: Dictionary = new Dictionary()
      dict.add("aa", "bb")
      if(dict["ab"] != null){
          console.log("il est différent de null")
      }*/

      //let a = new C8oPromise()

      /*
      var a = new Promise((resolve, reject)=>{
          let a = "1er dans le code mais seconde dans les logs";
          resolve(a)
          //new Promise((resolve))
      }).then((result)=>{
          console.log(result)
      })

      var b = new Promise((resolve, reject)=>{
          let a = "2eme dans le code mais premiére dans les logs";;
          resolve(a)
          //new Promise((resolve))
      }).then((result)=>{
          console.log(result)
      })

      Promise.all([b]).then(()=>{
          a
      })*/

      //a.then(()=>{b})
      /*let dict = new Dictionary();
      dict.add("include_docs", true);
      dict.add("attachments", true);
      dict.add("limit", 4);

      let db = new PouchDB('http://localhost:5984/retaildb');
      console.log("dd")*/
      /*let c = new Dictionary()
      let d :Dictionary =  new Dictionary()
      d.add("hh", c)
      this.test.ess().then((result)=>{
          console.log('result')
      })
      this.test.ess().then((result)=>{
          console.log('result')
      })
      this.test.ess().then((result)=>{
          console.log('result')
      })
      this.test.ess().then((result)=>{
          console.log('result')
      })
      this.test.ess().then((result)=>{
          console.log('result')
      })*/

     /* this.test.test("test1").then((res)=>{
          console.log(res + "sensé test1");
      })

      this.test.test("test2").then((res)=>{
          console.log(res + "sensé test2");
      })

      this.test.test("test3").then((res)=>{
          console.log(res + "sensé test3");
      })

      this.test.test("test4").then((res)=>{
          console.log(res + "sensé test4");
      })

      this.test.test("test5").then((res)=>{
          console.log(res + "sensé test5");
      })

      this.test.test("test6").then((res)=>{
          console.log(res + "sensé test6");
      })*/


      /*this.test.handleRequest("url", d)
      this.test.handleRequest("url", d)
      this.test.handleRequest("url", d)
      this.test.handleRequest("url", d)
      this.test.handleRequest("url", d)
      this.test.handleRequest("url", d)
      this.test.handleRequest("url", d)
      //this.test.handleRequest2(d)*/

      /*db.get().then(function (result) {
          console.log(result)
      }).catch(function (err) {
          if (err.name !== 'conflict') {
              throw err;
          }
      })*/
      /*db.query('design/children_byFather',{
      }).then(function (result) {
          console.log(result)
      }).catch(function (err) {
          if (err.name !== 'conflict') {
              throw err;
          }
      })
      /*db.query('design_doc_name/children_byFather').then(function (result) {
          console.log(result)
      }).catch(function (err) {
          if (err.name !== 'conflict') {
              throw err;
          }
      })

/*
      db.put({
          _id: 'mydoc' + (new Date).getTime().toString(),
          title: 'Heroes'
      }).then(function () {
          return db.put({
              _id: 'mydoc' + (new Date).getTime().toString(),
              title: 'Heroes'
          })
      }).then(function () {
          return db.allDocs(
              dict.toArray()
              //limit: 4
              /*include_docs: true,
              attachments: true*/
             /*)
      }).then(function (result) {
          console.log(result);
      }).catch(function (err) {
          console.log(err);
      })



      /*let fp = new FullSyncPolicy(C8o.FS_POLICY_NONE, function (database : any, newProperties : Dictionary){
            database = db;
            newProperties = new Dictionary();
            newProperties.add("_id", "monIDCG");
      } )*/
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
      console.log("A1 DEB")
      this.c8o.callJson("sampleMobileSearchRoom.Login", "user", username, "password", password).then((response, parameters)=>{
          console.log("A2 CLOSURE")
          if((response as any).logon == "true"){
              console.log("A3 CLOSURE OK")
              this.nav.push(SearchForm);

          }
          else{
                console.log("A4 CLOSURE ELSE")
          }
          console.log("A5 ??")
      })
      console.log("A6 Fin")
      //this.c8o.callJson("sampleMobileSearchRoom.Login", "user", username, "password", password).then(new C8oOnResponse<JSON>())





    /*this.c8o.callJson("sampleMobileSearchRoom.Login", "user", username, "password", password).then(data => {
        if(data.logon == "true"){
            this.nav.push(SearchForm);
        }
        else{

        }


    });*/
  }
}
