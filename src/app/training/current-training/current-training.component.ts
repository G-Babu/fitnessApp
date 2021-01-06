import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseService } from '../exercise.service';

import { StopConfirmComponent } from './stop-confirm/stop-confirm.component';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
 
  constructor(public dialog: MatDialog, private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.onStartOrResumeTimer();
  }

  onStartOrResumeTimer() {
    const step = this.exerciseService.getRunningExercise().duration / 100 * 1000;
    this.timer = window.setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.exerciseService.completedTraining();
      }
    }, step);
  }
  onStop() {

    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopConfirmComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
       this.exerciseService.canceledTraining(this.progress);
      }
      else {
        this.onStartOrResumeTimer();
      }
    })
  }

}
