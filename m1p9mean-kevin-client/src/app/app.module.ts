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
import { ClientModule } from './profiles/client/client.module';
import { RestaurantModule } from './profiles/restaurant/restaurant.module';
import { EKalyModule } from './profiles/e-kaly/e-kaly.module';
import { DeliveryManModule } from './profiles/delivery-man/delivery-man.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClientRoutingModule,
    ClientModule,
    RestaurantModule,
    EKalyModule,
    DeliveryManModule,

  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
