import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {C8O} from '../../providers/convertigo-service/convertigo-service';


@Component({
  templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(private nav: NavController, navParams: NavParams, private c8o: C8O) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

      
	c8o.call(".getData", {
		"data1":"val1",
		"data2":"val2",
		"data3":"val3"
	}).then(data => {
		console.log(data);	
	    this.items = [];
	    for(let i = 0; i < data.item.length; i++) {
	      this.items.push({
	        title: data.item[i].title,
	        note: data.item[i].note,
	        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
	      });
	    }
	});
  }

  itemTapped(event, item) {
    this.nav.push(ItemDetailsPage, {
      item: item
    });
  }
}
