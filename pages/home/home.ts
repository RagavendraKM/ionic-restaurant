import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { LocationServiceService } from '../location-service.service';
import { ContactPage } from '../contact/contact';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lat : Number;
  public lon : Number;
  public restaurant : [];
  public singleRestaurant : [];
  
  constructor(public navCtrl: NavController, private geolocation: Geolocation, private _loactionService: LocationServiceService, private navParams: NavParams) {
    this.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
        //  this.loc = {lat : this.location.lat, lon : this.location.lon} 
        // console.log("this.mapCenter.lat", this.lat)
        // console.log("this.mapCenter.lon", this.lon)
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
    console.log("Inside gotoRestaurant call", id);
    this._loactionService.getRestaurantById(id).subscribe(
      async res => this.singleRestaurant = await res,
      err => err
    )
    this.navCtrl.push(ContactPage, {id: id});
  }

  async sendLocDetails(lat,lon){
    console.log("lat",lat ,"lon", this.lon);
    const loc = {lat : lat, lon : this.lon};
    console.log("loc", loc)
    this._loactionService.sendLocation(loc).subscribe(
      async res => await res,
      err => err
    )
    this.getRestaurants();
  }

}
