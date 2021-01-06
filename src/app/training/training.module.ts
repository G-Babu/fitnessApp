import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training/training.component';
import { MaterialModule } from '../materal.module';
import { StopConfirmComponent } from './current-training/stop-confirm/stop-confirm.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CurrentTrainingComponent, NewTrainingComponent, PastTrainingComponent, TrainingComponent, StopConfirmComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports:[CurrentTrainingComponent, NewTrainingComponent, PastTrainingComponent, TrainingComponent]
})
export class TrainingModule { }
