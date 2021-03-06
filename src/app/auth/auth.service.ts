import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { ExerciseService } from '../training/exercise.service';
import { AuthDataModel } from './auth-data-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private rout: Router, 
    private afAuth: AngularFireAuth,
    private exerciseService:ExerciseService,
    private snackBar:MatSnackBar,
    private uiService:UiService) { }

  private user: Boolean=false;
  authChange = new Subject<boolean>();

  initAuthListener(){
    this.afAuth.authState.subscribe(user=>{
      if(user){
        this.user=true;
        this.authChange.next(true);
        this.rout.navigate(['/training']);
      }
      else{
        this.user = false;
        this.authChange.next(false);
        this.rout.navigate(['/']);
      }
    })

  }

  registerUser(authData: AuthDataModel) {
    this.uiService.loadingSpinner.next(true);
    console.log("IN Register service");
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password
    ).then(result=>{
      this.uiService.loadingSpinner.next(false);
      console.log(result);
    }).catch((error)=>{
      this.uiService.loadingSpinner.next(false);
     this.uiService.openSnackBar(error.message,null,3000);
    });
  
  }

  loginUser(authData: AuthDataModel) {
    console.log("IN LOGIN");
    this.uiService.loadingSpinner.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password
      ).then(result=>{
        this.uiService.loadingSpinner.next(false);
        console.log(result)
      }).catch((error)=>{
        this.uiService.loadingSpinner.next(false);
        this.uiService.openSnackBar(error.message,null,3000);
      });
      
  }

  logoutUser() {
    this.afAuth.auth.signOut();
    this.exerciseService.unSubscribeExercises();
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != false;
  }
}
