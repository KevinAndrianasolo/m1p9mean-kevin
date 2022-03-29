import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { SignupComponent } from './signup/signup.component';
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

@NgModule({
  declarations: [
    ClientComponent,
    SignupComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    MenuComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HeaderModule,
    FooterModule
  ],
  exports : [ClientComponent]
})
export class ClientModule { }
