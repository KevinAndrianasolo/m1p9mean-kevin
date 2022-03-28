import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from './restaurants.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { AppModule } from 'src/app/app.module';



@NgModule({
  // declarations: [RestaurantsComponent],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule
  ],
})
export class RestaurantsModule { }
