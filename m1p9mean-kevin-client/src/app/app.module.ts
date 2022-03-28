import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './profiles/client/client.component';
import { RestaurantComponent } from './profiles/restaurant/restaurant.component';
import { DeliveryManComponent } from './profiles/delivery-man/delivery-man.component';
import { EKalyComponent } from './profiles/e-kaly/e-kaly.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientRoutingModule } from './profiles/client/client-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeModule } from './profiles/client/home/home.module';
@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    RestaurantComponent,
    DeliveryManComponent,
    EKalyComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClientRoutingModule
  ],
  // exports: [
  //   HeaderComponent,
  //   FooterComponent
  // ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
