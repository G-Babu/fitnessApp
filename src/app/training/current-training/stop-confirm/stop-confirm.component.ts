import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-confirm',
  templateUrl: './stop-confirm.component.html',
  styleUrls: ['./stop-confirm.component.css']
})
export class StopConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public progressData:any) { }

  ngOnInit(): void {
  }

}
