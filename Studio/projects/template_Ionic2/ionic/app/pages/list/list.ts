import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {C8o, C8oLogLevel} from '../../providers/convertigo-service/convertigo-service';
import {Http, Connection, ConnectionBackend, Request, RequestOptions} from "@angular/http";


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

        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane', 'american-football', 'boat', 'bluetooth', 'build'];

    }
    checklogs(event, item){
        this.c8o.logLevelLocal = C8oLogLevel.TRACE;
        this.c8o.logRemote = true;
        this.c8o.log.fatal("Ce log est Fatal (é[^^){!:#");
        this.c8o.log.error("Ce log est Error 汉语/漢語 or 中文");
        this.c8o.log.warn("Ce log est Warn");
        this.c8o.log.info("Ce log est Info");
        this.c8o.log.debug("Ce log est Debug");
        this.c8o.log.trace("Ce log est trace");
    }
    callJsonGetData(event, item){
        this.c8o.callJsonDictionary("getData",
            { "i": "10" }
        ).then(data => {
            console.log(data);
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