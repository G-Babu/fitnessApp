import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private snackBar:MatSnackBar) { }

  loadingSpinner= new Subject<boolean>();

  openSnackBar(message,action,duration){

this.snackBar.open(message,action,{
  duration:duration
})
  }
}
