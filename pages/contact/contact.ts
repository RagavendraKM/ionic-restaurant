import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams,
  AlertController,
  ToastController,
  LoadingController } from 'ionic-angular';
import { LocationServiceService } from '../location-service.service';
import { CartService } from "../cart.service";
import { AboutPage } from '../about/about';

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

  constructor(public navCtrl: NavController, private navParams: NavParams, private _loactionService: LocationServiceService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public cartService: CartService) {
    
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

  getItemDetails(id) {
    this.navCtrl.push(AboutPage, {id: id});
  }

  

  // addToFevrt(key) {
  //   if (this.af.auth.currentUser) {
  //     this.db
  //       .object("/users/" + this.af.auth.currentUser.uid + "/favourite/" + key)
  //       .update({
  //         thumb: this.menuItems.thumb,
  //         title: this.menuItems.title,
  //         description: this.menuItems.description
  //       })
  //       .then(res => {
  //         this.isLiked = true;
  //         this.createToaster("added to favourites", "3000");
  //       });
  //   } else {
  //     this.createToaster("please login first", "3000");
  //   }
  // }

  // removeFevrt(key) {
  //   if (this.af.auth.currentUser) {
  //     this.db
  //       .object("/users/" + this.af.auth.currentUser.uid + "/favourite/" + key)
  //       .remove()
  //       .then(() => {
  //         this.isLiked = false;
  //         this.createToaster("removed from favourites", "3000");
  //       });
  //   }
  // }

}
