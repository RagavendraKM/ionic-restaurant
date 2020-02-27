import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,
  ToastController,
  LoadingController } from 'ionic-angular';
import { LocationServiceService } from '../location-service.service';
import { CartService } from "../cart.service";
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private id = this.navParams.get('id');
  private itemDetail: any = {};
  

  constructor(public navCtrl: NavController, private navParams: NavParams, private _loactionService: LocationServiceService, public alertCtrl: AlertController, public loadingCtrl: LoadingController,public toastCtrl: ToastController, public cartService: CartService) {

  }

  ngOnInit() {
    this._loactionService.getItemDetails(this.id).subscribe(
      res => this.itemDetail = res,
      err => err
    )
  }

  addQuantity() {
    if (this.count < 10) {
      this.count = this.count + 1;
      this.cart.itemQunatity = this.count;
    }
  }

  removeQuantity() {
    if (this.count > 1) {
      this.count = this.count - 1;
      this.cart.itemQunatity = this.count;
    }
  }

  addToCart() {
    if (this.cart.price.name == "") {
      let alert = this.alertCtrl.create({
        title: "Please!",
        subTitle: "Select Size and Price!",
        buttons: ["OK"]
      });
      alert.present();
    } else {
      this.cartService.OnsaveLS(this.cart);
      this.navCtrl.push("CartPage");
    }
  }

}
