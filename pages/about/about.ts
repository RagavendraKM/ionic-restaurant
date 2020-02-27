import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocationServiceService } from '../location-service.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private id = this.navParams.get('id');
  private itemDetail: any = {};

  constructor(public navCtrl: NavController, private navParams: NavParams, private _loactionService: LocationServiceService) {

  }

  ngOnInit() {
    this._loactionService.getItemDetails(this.id).subscribe(
      res => this.itemDetail = res,
      err => err
    )
  }

}
