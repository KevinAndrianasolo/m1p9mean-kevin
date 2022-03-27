import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryManRoutingModule } from './delivery-man-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DeliveryManRoutingModule
  ]
})
export class DeliveryManModule { }
