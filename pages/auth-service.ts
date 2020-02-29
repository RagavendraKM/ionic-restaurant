import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  
  // Change to this http://ed43bb3b.ngrok.io/api/login
  static readonly LOGIN_URL = 'https://AliveEvilTraining--five-nine.repl.co/user/login';
  // Change to this http://ed43bb3b.ngrok.io/api/register
  static readonly REGISTER_URL = 'https://AliveEvilTraining--five-nine.repl.co/user/register';
  access: boolean;
  token: string;

  constructor(public http: Http) {}

  // Login
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials.");
    } else {
      return Observable.create(async observer => {

        let a = await this.http.post(AuthServiceProvider.LOGIN_URL, credentials)
        .map(res => res.json())
        .subscribe( async data => {
          console.log("data", data);
          if (data.token) {
            this.token = 'Bearer ' + data.token;
            this.access = await true;
            console.log("this.access", this.access)
            setTimeout(() => {
          console.log(this.access, "access")
              observer.next(this.access);
          }, 500);

        setTimeout(() => {
              observer.complete();
          }, 1000);
          } else {
            this.access = await false;
          }
        })
      }, err => console.error(err));
    }
  }

  // Register
  public register(credentials) {
    if (credentials.name === null || credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {

        this.http.post(AuthServiceProvider.REGISTER_URL, credentials)
        .map(res => res.json())
        .subscribe( data => {
          console.log(data);
        });

        observer.next(true);
        observer.complete();
      });
    }
  }

  // Get Token
  public getToken() {
    return this.token;
  }

  // Logout
  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

}