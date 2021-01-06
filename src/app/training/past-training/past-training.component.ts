import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ExerciseModel } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit,AfterViewInit,OnDestroy{
  displayedColumns=['date','name','duration','calories','state'];
  dataSource =new MatTableDataSource<ExerciseModel>();
  pastExercisesSubscription=new Subscription();
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator)paginator:MatPaginator;

  constructor(private exerciseService:ExerciseService) { }
  
 
  ngOnInit(): void {
console.log("ON InT")
    this.exerciseService.pastExercisesList.subscribe((exercises:ExerciseModel[])=>{
      this.dataSource.data=exercises;
      console.log("past exercises emmited"+exercises)
    })
    this.exerciseService.pastExercises();
console.log("Data Source"+this.dataSource.data)
  }

  doFilter(filterString:String){
this.dataSource.filter=filterString.toLocaleLowerCase();
  }

 ngAfterViewInit(){
   this.dataSource.sort=this.sort;
   this.dataSource.paginator=this.paginator;
  }

ngOnDestroy() {
  this.pastExercisesSubscription.unsubscribe();
}
}
