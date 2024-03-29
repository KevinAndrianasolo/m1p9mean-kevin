import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EKalyRoutingModule } from './e-kaly-routing.module';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfitComponent } from './profit/profit.component';
import { ManagementComponent } from './management/management.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { EKalyComponent } from './e-kaly.component';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';


@NgModule({
  declarations: [
    EKalyComponent,
    HomeComponent,
    OrdersComponent,
    ProfitComponent,
    ManagementComponent,
    OrderComponent,
    RestaurantComponent,
    EmployeeFormComponent,
    RestaurantFormComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    EKalyRoutingModule,
    FormsModule
  ],
  exports : [EKalyComponent]
})
export class EKalyModule { }
