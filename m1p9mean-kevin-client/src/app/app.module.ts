import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './profiles/client/client.component';
import { RestaurantComponent } from './profiles/restaurant/restaurant.component';
import { DeliveryManComponent } from './profiles/delivery-man/delivery-man.component';
import { EKalyComponent } from './profiles/e-kaly/e-kaly.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    RestaurantComponent,
    DeliveryManComponent,
    EKalyComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
