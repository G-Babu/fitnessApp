import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy{

   isLoading=false;
   loadingSubs:Subscription;
  constructor(private authService:AuthService,
    private uiService:UiService) { }

  ngOnInit(): void {
    this.loadingSubs=this.uiService.loadingSpinner.subscribe(loading=>{
      this.isLoading=loading;
    })
  }

  onSubmit(form:NgForm){
    console.log(form);
    this.authService.loginUser({
      email:form.value.email,
      password:form.value.password
    })
  }

  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }
}
