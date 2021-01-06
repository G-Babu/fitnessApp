import { Component, OnInit,Output,EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  @Output() onNavToggleHead=new EventEmitter<void>();  
  
  constructor(private authService:AuthService) { }

 isAuth:boolean;
  private authSubscription=new Subscription();
  ngOnInit(): void {

  this.authSubscription =  this.authService.authChange.subscribe(authStatus=>{
  this.isAuth=authStatus;
})
  }

  navToggle(){
this.onNavToggleHead.emit();
  }

  onLogout(){
    console.log("IN LOGOUT");
    this.authService.logoutUser()
    };
  

  ngOnDestroy(){
this.authSubscription.unsubscribe();
  }
}
