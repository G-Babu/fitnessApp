import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { ExerciseModel } from '../exercise.model';
import { ExerciseService } from '../exercise.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit,OnDestroy {


exercisesSubscription= new Subscription();
  exercises: ExerciseModel[];
  isLoading=false;
  loadingSubs:Subscription;
  constructor(private exerciceService: ExerciseService,private uiService:UiService) { }
 
  ngOnInit() {
    this.loadingSubs=this.uiService.loadingSpinner.subscribe(loading=>{
  this.isLoading=loading;
})
   this.exercisesSubscription =this.exerciceService.exerciseListChanged.subscribe(result => {
      this.exercises = result;
    })
    this.exerciceService.getAvailableExercise();
  }

  onStartTraining(form: NgForm) {
    this.exerciceService.startExercise(form.value.exerciseSelected);
  }

  ngOnDestroy(){
   this.exercisesSubscription.unsubscribe();
   this.loadingSubs.unsubscribe();
  }
}
