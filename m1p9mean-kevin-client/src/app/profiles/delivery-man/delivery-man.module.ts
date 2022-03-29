import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryManRoutingModule } from './delivery-man-routing.module';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AppModule } from 'src/app/app.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DeliveryManComponent } from './delivery-man.component';


@NgModule({
  declarations: [
    DeliveryManComponent,
    HomeComponent,
    OrdersComponent,
    OrderComponent
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    DeliveryManRoutingModule
  ],
  exports : [DeliveryManComponent]
})
export class DeliveryManModule { }
