import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ApiserveicProvider } from '../../providers/apiserveic/apiserveic'

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents
} from "@ionic-native/background-geolocation";
import { HTTP } from "@ionic-native/http";
import 'rxjs/add/operator/filter';

@Component({
  selector: 'page-track',
  templateUrl: 'track.html'
})
export class TrackPage {
  gps_update_link: string = "your_http_request_link";

  pesan: any;
  number = 0;
  data;
  geoLocation: any;
  callBackState = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private ApiserveicProvider: ApiserveicProvider,
    private http: HTTP,
    public zone: NgZone,
    private backgroundGeolocation: BackgroundGeolocation) {
    this.data = localStorage.getItem("Number");
  }

  stopLocation(){
    this.backgroundGeolocation.stop();
  }

  backgeotracking() {
    this.backgroundGeolocation.start();

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 1,
      stationaryRadius: 1,
      distanceFilter: 1,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config)
      .then(() => {
        this.backgroundGeolocation.getCurrentLocation().then((locationGeo: any) => {
          // console.log(locationGeo);
          var geoCode = {
            "Tel": this.data,
            "latitude": locationGeo.latitude,
            "longitude": locationGeo.longitude,
            "Acc": this.number
          }
          this.ApiserveicProvider.load(1, geoCode).then(data => {
            this.pesan = data;
            // console.log(this.pesan);
          });
        this.backgroundGeolocation.finish(); // FOR IOS ONLY
        this.backgroundGeolocation.stop();
        })
        
        this.callFunctionInTenmin();
      })
  }

    callFunctionInTenmin() {
    if (!this.callBackState) {
      this.number = this.number + 1;
       setTimeout(() => {
        this.backgeotracking()
       }, 10000);
    } 
    else {
      console.log("Stop interval");
      this.number = 0;
    }
  }
  startLocation(aa) {
    if (aa == 'false') {
      this.callBackState = true;
    }
    else {
      this.callBackState = false;
    }
    this.callFunctionInTenmin();
  }
  logout() {
    localStorage.removeItem("Phone");
    console.log(localStorage.getItem("Phone"));
    this.navCtrl.push(HomePage);
  }



}
