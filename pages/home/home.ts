import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { LocationServiceService } from '../location-service.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lat : Number;
  public lon : Number;
  public restaurant : [];
  
  constructor(public navCtrl: NavController, private geolocation: Geolocation, private _loactionService: LocationServiceService) {
    this.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
        //  this.loc = {lat : this.location.lat, lon : this.location.lon} 
        console.log("this.mapCenter.lat", this.lat)
        console.log("this.mapCenter.lon", this.lon)
      }).catch((error) => {
          console.log('Error getting location', error);
      });
  }

  getRestaurants() {
    console.log("getRestaurants called");
    this._loactionService.getRestaurants().subscribe(
      res => this.restaurant = res,
      err => err
    )
  }

  gotoRestaurant(id) {
    console.log("Inside gotoRestaurant call");
    
  }

  async sendLocDetails(lat,lon){
    console.log("lat",lat ,"lon", this.lon);
    const loc = {lat : lat, lon : this.lon};
    console.log("loc", loc)
    await this._loactionService.sendLocation(loc).subscribe(
      res => res,//this.restaurant = res,
      err => err
    )
    this.getRestaurants();
  }

}
