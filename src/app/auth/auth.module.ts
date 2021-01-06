import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../materal.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports:[SignupComponent,LoginComponent]
})
export class AuthModule { }
