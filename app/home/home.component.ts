import { Component, OnInit } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mapCenter = {lat: null, lng: null};
  
  constructor(private geolocation: Geolocation) { 

  this.geolocation.getCurrentPosition().then((resp) => {
        this.mapCenter.lat = resp.coords.latitude;
        this.mapCenter.lng = resp.coords.longitude;
        console.log("this.mapCenter.lat", this.mapCenter.lat)
        console.log("this.mapCenter.lng", this.mapCenter.lng)
      }).catch((error) => {
          console.log('Error getting location', error);
      });
  }

  ngOnInit() {
  }

}