import {Component, ViewChild, provide} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginForm} from './pages/LoginForm/LoginForm';
import {MapView} from './pages/MapView/MapView';
import {SearchForm} from './pages/SearchForm/SearchForm';
import {ListForm} from './pages/ListForm/ListForm';
import {DetailsForm} from './pages/DetailsForm/DetailsForm';
import {ListPage} from './pages/list/list';
import {C8o} from './providers/convertigo-service/convertigo-service';
import {HTTP_PROVIDERS, HTTP_BINDINGS} from "angular2/http";
import {ROUTER_PROVIDERS} from "@angular/router";
import {GOOGLE_MAPS_PROVIDERS, LazyMapsAPILoaderConfig} from 'angular2-google-maps/core';
import { enableProdMode } from '@angular/core';

@Component({
  templateUrl: 'build/ionicapp.html',
  viewProviders: [C8o]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = LoginForm;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
        { title: 'Login', component: LoginForm },
        {title: 'MapView', component: MapView},
        {title: 'Details', component: DetailsForm},
        { title: 'List', component: ListForm },
        { title: 'Search', component: SearchForm },
        {title:'List', component: ListPage},
        { title: 'Tests', component: ListPage }


    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}


ionicBootstrap(MyApp);
/*, [GOOGLE_MAPS_PROVIDERS, provide(LazyMapsAPILoaderConfig, {useFactory: () => {
    let config = new LazyMapsAPILoaderConfig();
    config.apiKey = 'AIzaSyBJTTDksnVFxrzQI2rDI1__ooOFE_GVtvI';
    return config;
}})
]);*/


