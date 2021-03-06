import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
maxDate;
isLoading=false;
loadingSubs:Subscription;
  constructor(private authService:AuthService,
    private uiService:UiService) { }

  ngOnInit(): void {
    this.loadingSubs=this.uiService.loadingSpinner.subscribe(loading=>{
      this.isLoading=loading;
    })
this.maxDate=new Date();
this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

  onSubmit(form:NgForm){
    console.log(form);
    this.authService.registerUser({
      email:form.value.email,
      password:form.value.password
    })

  }
  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }
}
