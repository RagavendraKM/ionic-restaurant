import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams,
  AlertController,
  ToastController,
  LoadingController } from 'ionic-angular';
import { LocationServiceService } from '../location-service.service';
import { CartService } from "../cart.service";

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
  count: any = 1;
  isLiked: boolean = false;
  public cart = {
    itemId: String,
    extraOptions: [],
    price: {
      name: "",
      value: 0,
      currency: ""
    },
    title: "",
    thumb: String,
    itemQunatity: this.count
  };
  noOfItems: any;
  public selectedItems: Array<any> = [];

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
