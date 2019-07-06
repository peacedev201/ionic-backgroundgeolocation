import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TrackPage} from '../track/track'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  inputValue: string = "";
  checkValue: string = "";

  constructor(public navCtrl: NavController) {

  }
  gotrackpage(){
    this.navCtrl.push(TrackPage, this.inputValue);
    localStorage.setItem("Number", this.inputValue);
    if(this.checkValue != "false"){
      localStorage.setItem("Phone", "true");
    }
  }

}
