import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationServiceService {

  private _baseUrl = "https://maps-node--ragavendrakm.repl.co/api";
  private _restaurantUrl = `${this._baseUrl}/restaurant`;
  private _menuUrl = `${this._baseUrl}/menu`;

  constructor(private http:HttpClient) { }

  sendLocation(loc: Object) {
    console.log("sendLocation in service file");
    const _url = `${this._baseUrl}/setLocation` //lat=${lat}&lon=${lng}`
    return this.http.post<any>(_url, loc)
  }

  getRestaurants() {
    console.log("getRestaurants in service file");
    return this.http.get<any>(this._restaurantUrl)
  }

  getRestaurantById(id) {
    console.log("getRestaurantsById in service file");
    const _url = `${this._restaurantUrl}/${id}`
    return this.http.get<any>(_url)
  }

  getMenu() {
    return this.http.get<any>(this._menuUrl);
  }

  getItemDetails(id) {
    const _url = `${this._menuUrl}/:${id}`
    return this.http.get<any>(_url);
  }
}