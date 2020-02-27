import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { LocationServiceService } from '../location-service.service';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  singleRestaurant : any = {}
  singleRestaurantLocation : any = {}
  id = this.navParams.get('id');

  constructor(public navCtrl: NavController, private navParams: NavParams, private _loactionService: LocationServiceService) {
    
  }
  
  ngOnInit() {
  this._loactionService.getRestaurantById(this.id).subscribe(
      async res => {
        this.singleRestaurant = await res;
        this.singleRestaurantLocation = this.singleRestaurant.location
        return this.singleRestaurant, this.singleRestaurantLocation
        },
      err => err
    )
  }

}
