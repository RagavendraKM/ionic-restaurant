import { Injectable } from "@angular/core";

@Injectable()
export class CartService {
  Cart: any[] = [];
  itemCart: any = {};
  itemInCart = [];

  constructor() {
    this.Cart = JSON.parse(localStorage.getItem("Cart"));
  }

  OnsaveLS(item: any) {
    console.log("item",item)
    this.Cart = JSON.parse(localStorage.getItem("Cart"));
    let ExtotalPrice: number = 0;
    let totalPrice: number = 0;
    this.itemInCart = [];
    if (this.Cart == null) {
      // for (let i = 0; i <= item.extraOptions.length - 1; i++) {
      //   ExtotalPrice = ExtotalPrice + Number(item.extraOptions[i].value);
      // }
      // if (item.price.specialPrice) {
        // totalPrice = Number(item.price);
      // } else {
        totalPrice = Number(item.price);
      // }
      this.itemCart.itemTotalPrice = totalPrice * item.itemQunatity;
      this.itemCart.item = item;
      this.itemInCart.push(this.itemCart);
      localStorage.setItem("Cart", JSON.stringify(this.itemInCart));
    } else {
      // for (let i = 0; i <= this.Cart.length - 1; i++) {
      //   if (
      //     this.Cart[i].item.itemId == item.itemId &&
      //     this.Cart[i].item.price.pname == item.price.pname
      //   ) {
      //     this.Cart.splice(i, 1);
      //   }
      // }
      // for (let k = 0; k <= item.extraOptions.length - 1; k++) {
      //   ExtotalPrice = ExtotalPrice + Number(item.extraOptions[k].value);
      // }
      // if (item.price.specialPrice) {
      //   totalPrice = ExtotalPrice + Number(item.price.specialPrice);
      // } else {
        console.log("in else part od cart service")
        totalPrice = Number(item.price);
      // }
      this.itemCart.itemTotalPrice = totalPrice * item.itemQunatity;
      this.itemCart.item = item;
      this.Cart.push(this.itemCart);
      localStorage.setItem("Cart", JSON.stringify(this.Cart));
    }
  }







}