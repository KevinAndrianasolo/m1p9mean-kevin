import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfitComponent } from './profit/profit.component';
import { ManagementComponent } from './management/management.component';
import { OrderComponent } from './order/order.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { RestaurantComponent } from './restaurant.component';
import { FormsModule } from '@angular/forms';
import { MenuFormComponent } from './menu-form/menu-form.component';


@NgModule({
  declarations: [
    RestaurantComponent,
    HomeComponent,
    OrdersComponent,
    ProfitComponent,
    ManagementComponent,
    OrderComponent,
    MenuFormComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    FormsModule,
    RestaurantRoutingModule
  ],
  exports : [RestaurantComponent]
})
export class RestaurantModule { }
