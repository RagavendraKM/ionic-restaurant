import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// import { SplashScreenOriginal } from '@ionic-native/splash-screen';
// import { StatusBarOriginal } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CartPage } from '../pages/cart/cart';
import { HomeComponent } from './home/home.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { LocationServiceService } from '../pages/location-service.service'
import { CartService } from '../pages/cart.service';
import { AuthServiceProvider } from '../pages/auth-service';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    CartPage,
    RegisterPage,
    LoginPage,
    TabsPage,
    HomeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    CartPage,
    RegisterPage,
    LoginPage,
    HomePage,
    TabsPage
  ],
  providers: [
    LocationServiceService,
    Geolocation,
    AuthServiceProvider,
    CartService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
