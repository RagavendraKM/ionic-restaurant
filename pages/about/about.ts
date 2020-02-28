import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,
  ToastController,
  LoadingController } from 'ionic-angular';
import { LocationServiceService } from '../location-service.service';
import { CartService } from "../cart.service";
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private id = this.navParams.get('id');
  private itemDetail: any = {};
  private count = 1;
  private itemDetailInCart: any = {}
  public cart = {
    itemId: String,
    price: String,
    thumb: String,
    itemQunatity: Number
  };


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

  addToCart(id) {
    // if (this.cart.price.name == "") {
    //   let alert = this.alertCtrl.create({
    //     title: "Please!",
    //     subTitle: "Select Size and Price!",
    //     buttons: ["OK"]
    //   });
    //   alert.present();
    // } else {
      console.log(id);
      this._loactionService.getItemDetails(this.id).subscribe(
      async res => {
        this.itemDetailInCart = await res;
        console.log(this.itemDetailInCart,"sss");
        this.cart.itemId = this.itemDetailInCart.itemName;
        this.cart.itemQunatity = this.count;
        this.cart.price = this.itemDetailInCart.price;
        this.cart.thumb = this.itemDetailInCart.imgUrl;
        this.cartService.OnsaveLS(this.cart);
        this.navCtrl.push(CartPage, {id: id});
        return this.itemDetailInCart
        },
      err => err
    )
      
    // }
  }

}
