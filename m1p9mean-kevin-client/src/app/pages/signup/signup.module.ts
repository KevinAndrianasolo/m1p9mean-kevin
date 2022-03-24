import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';



@NgModule({
  declarations: [SignupComponent],
  exports: [SignupComponent],

  imports: [
    CommonModule
  ]
})
export class SignupModule { }
