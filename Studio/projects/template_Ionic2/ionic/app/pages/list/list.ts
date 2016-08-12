import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {C8o, C8oLogLevel} from '../../providers/convertigo-service/convertigo-service';
import {Http, Connection, ConnectionBackend, Request, RequestOptions} from "@angular/http";
import {expect} from "@angular/core/testing";


@Component({
    templateUrl: 'build/pages/list/list.html',
    providers : [C8o]
})
export class ListPage {
    selectedItem: any;
    icons: string[];
    items: Array<{ title: string, note: string, icon: string }>;


    constructor(private nav: NavController, navParams: NavParams, private c8o: C8o) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        this.c8o.logLevelLocal = C8oLogLevel.DEBUG;
        this.c8o.logRemote = true;
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane', 'american-football', 'boat', 'bluetooth', 'build'];

    }
    checklogs(event, item){
        this.c8o.log.fatal("Ce log est Fatal avec des caractéres étranges (é[^^){!:#");
        this.c8o.log.error("Ce log est Error en chinois 汉语/漢語 or 中文");
        this.c8o.log.warn("Ce log est Warn");
        this.c8o.log.info("Ce log est Info");
        this.c8o.log.debug("Ce log est Debug");
        this.c8o.log.trace("Ce log est trace");
    }
    callJsonGetData(event, item){
        this.c8o.callJson(".getData",
            {"i": 10}
        ).then(data => {
            this.items = [];
            if (data != undefined) {
                for (let i = 0; i < data.item.length; i++) {
                    this.items.push({
                        title: data.item[i].title,
                        note: data.item[i].note,
                        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
                    });
                }
            }

        });
    }

    testC8oDefaultPing(event, item){
        this.c8o.callJson(".Ping").then(data => {
            console.log(data);
            if(JSON.stringify(data) != '{"pong":""}'){
                this.c8o.log.error('testC8oDefaultPing: fails');
            }
            else{
                this.c8o.log.info('testC8oDefaultPing: succes');
            }
        })

    }

    testC8oDefaultPingOneSingleValue(event, item){
        this.c8o.callJson(".Ping", "var1", "value one").then(data => {
            let value = JSON.stringify(data.pong.var1);
            if(value != '"value one"'){
                this.c8o.log.error('testC8oDefaultPingOneSingleValue: fails');
            }
            else{
                this.c8o.log.info('testC8oDefaultPingOneSingleValue: succes');
            }
        })
    }

    testC8oDefaultPingTwoSingleValues(event, item){
        this.c8o.callJson(".Ping", "var1", "value one", "var2", "value two").then(data => {
            let value = JSON.stringify(data.pong.var1);
            let value2 = JSON.stringify(data.pong.var2);
            if(value != '"value one"' || value2 != '"value two"'){
                this.c8o.log.error('testC8oDefaultPingOneSingleValue: fails');
            }
            else{
                this.c8o.log.info('testC8oDeaultPingOneSingleValue: succes');
            }
        })
        
    }

    testC8oDefaultPingTwoSingleValuesOneMulti(event, item){
        let mval : String[] = ["mvalue one", "mvalue two", "mvalue three"];
        this.c8o.callJson(".Ping", "var1", "value one", "var2", "value two", "mvar1", mval ).then(data => {
            let value = JSON.stringify(data.pong.var1);
            let value2 = JSON.stringify(data.pong.var2);
            let mvalue1 = <Array<String>> data.pong.mvar1;
            console.log(mvalue1[1]);
            if(value != '"value one"' || value2 != '"value two"'){
                this.c8o.log.error('testC8oDefaultPingOneSingleValue: fails');
            }
            else{
                this.c8o.log.info('testC8oDeaultPingOneSingleValue: succes');
            }
        })
    }
    /*ngAfterViewChecked(){
        console.log("ngAfterViewChecked");
    }
    ngAfterContentInit(){
        console.log("ngaftercontentinit");
    }
    ngOnInit(){
        console.log("ngoninit");
    }*/

    itemTapped(event, item) {
        this.nav.push(ItemDetailsPage, {
            item: item
        });
    }
}