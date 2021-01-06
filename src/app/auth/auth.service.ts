import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { ExerciseService } from '../training/exercise.service';
import { AuthDataModel } from './auth-data-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private rout: Router, private afAuth: AngularFireAuth,private exerciseService:ExerciseService) { }

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
    console.log("IN Register service");
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password
    ).then(result=>{
      console.log(result);
    }).catch((error)=>{
      console.log(error);
    });
  
  }

  loginUser(authData: AuthDataModel) {
    console.log("IN LOGIN");
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password
      ).then(result=>{
        console.log(result)
      }).catch((error)=>{
        console.log(error);
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
