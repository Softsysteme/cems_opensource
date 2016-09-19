import {Component, ViewChild, provide} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginForm} from './pages/LoginForm/LoginForm';
import {MapView} from './pages/MapView/MapView';
import {SearchForm} from './pages/SearchForm/SearchForm';
import {ListForm} from './pages/ListForm/ListForm';
import {DetailsForm} from './pages/DetailsForm/DetailsForm';
import {C8o} from './providers/convertigo-service/convertigo-service';



@Component({
    templateUrl: 'build/ionicapp.html',
    viewProviders: [C8o]
})
class MyApp {
    @ViewChild(Nav) nav: Nav;

    // make LoginForm the root (or first) page
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
            { title: 'Search', component: SearchForm }


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




