import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { LocationServiceService } from '../location-service.service';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  private singleRestaurant : any = {}
  private singleRestaurantLocation : any = {}
  private id = this.navParams.get('id');
  private menuItems;

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
    this.getMenu()
  }

  getMenu() {
    this._loactionService.getMenu().subscribe(
      res => this.menuItems = res,
      err => err
    )
  }

}
