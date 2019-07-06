import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TrackPage } from '../pages/track/track';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if(localStorage.getItem("Phone") == "true")
        this.rootPage = TrackPage;
      else
        this.rootPage = HomePage;
    });
  }
}
