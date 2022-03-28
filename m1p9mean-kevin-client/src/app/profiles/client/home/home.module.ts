import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HomeComponent } from './home.component';
import { AppModule } from 'src/app/app.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
