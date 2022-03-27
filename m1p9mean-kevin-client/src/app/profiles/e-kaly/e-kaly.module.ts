import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EKalyRoutingModule } from './e-kaly-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    EKalyRoutingModule
  ]
})
export class EKalyModule { }
