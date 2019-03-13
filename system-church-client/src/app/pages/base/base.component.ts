import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  response: string;
  api: string;
  currentUser;

  constructor(public router: Router, public http: Http){
  } 

  ngOnInit() {
  }   

}
