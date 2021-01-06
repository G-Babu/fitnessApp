import { Component, OnInit,Output,EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthModule } from 'src/app/auth/auth.module';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit,OnDestroy {
  @Output() sidenavToggle=new EventEmitter<void>();
  constructor(private authService:AuthService) { }
 
isAuth:boolean;
 authSubscription=new Subscription();
  ngOnInit(): void {
this.authSubscription=this.authService.authChange.subscribe(authStatus=>{
  this.isAuth=authStatus;
})
  }

  onToggle(){
    this.sidenavToggle.emit()
  }

  onLogout(){
    this.authService.logoutUser();
    this.onToggle();
  }

 ngOnDestroy() {
   this.authSubscription.unsubscribe();
  }
}
