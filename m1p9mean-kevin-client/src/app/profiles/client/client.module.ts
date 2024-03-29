import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { SignupComponent } from '../../pages/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { AppModule } from 'src/app/app.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClientComponent } from './client.component';
import { BasketComponent } from './basket/basket.component';
import { OrdersComponent } from './orders/orders.component';
import { FormsModule } from '@angular/forms';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    ClientComponent,
    SignupComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    MenuComponent,
    BasketComponent,
    OrdersComponent,
    ContactUsComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HeaderModule,
    FooterModule,
    FormsModule
  ],
  exports : [ClientComponent]
})
export class ClientModule { }
