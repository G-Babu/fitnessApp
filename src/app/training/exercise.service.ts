import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiService } from '../shared/ui.service';
import { ExerciseModel } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private runningExercise: ExerciseModel;
   exerciseStarted = new Subject<ExerciseModel>();
   exerciseListChanged = new Subject<ExerciseModel[]>();
   pastExercisesList=new Subject<ExerciseModel[]>();
   fbSubscription: Subscription[]=[];
  private availableExercises: ExerciseModel[] = [];

  constructor(private db: AngularFirestore,
    private uiService:UiService) { }


  getAvailableExercise() {
this.uiService.loadingSpinner.next(true);
  this.fbSubscription.push(this.db.collection('exercises')
      .snapshotChanges().pipe(
        map(docArray => {
          return docArray.map(doc => {
            const id = doc.payload.doc.id;
            const obj = doc.payload.doc.data() as ExerciseModel;
            return {
              id, ...obj
            }
          }
          )
        })
      ).subscribe((exerciseList: ExerciseModel[]) => {
        this.availableExercises = exerciseList;
        this.exerciseListChanged.next(this.availableExercises);
        console.log("SERVICE Gresult:" + this.availableExercises);
      }));
    console.log("SERVICE GOT:" + this.availableExercises)
    this.uiService.loadingSpinner.next(true);
  }

  startExercise(exerciseId: string) {
    // console.log("Event emmited id:" + exerciseId);
    // console.log("start exercise:" + this.availableExercises);
    // this.availableExercises.forEach((value) => {
    //   console.log(value)
    // })
    this.runningExercise = this.availableExercises.find(ex => ex.id === exerciseId);
    this.exerciseStarted.next(this.runningExercise);
  }

  getRunningExercise() {
    // console.log("current exercise" + this.runningExercise);
    return { ...this.runningExercise };
  }
  completedTraining() {
   this.addExerciseToDataBase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseStarted.next(null);
  }

  canceledTraining(progress: number) {
   this.addExerciseToDataBase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'canceled'
    });
    this.runningExercise = null;
    this.exerciseStarted.next(null);

  }

  addExerciseToDataBase(exercise:ExerciseModel){
    this.db.collection('finishedExercises').add(exercise);
  }

  pastExercises() {
   this.fbSubscription.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises:ExerciseModel[])=>{
    this.pastExercisesList.next(exercises);
    }));
  }

  unSubscribeExercises(){
    for(const sub of this.fbSubscription){
      sub.unsubscribe();
    }
  }
}