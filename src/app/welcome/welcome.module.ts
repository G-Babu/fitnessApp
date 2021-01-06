import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from '../materal.module';



@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[WelcomeComponent]
})
export class WelcomeModule { }
