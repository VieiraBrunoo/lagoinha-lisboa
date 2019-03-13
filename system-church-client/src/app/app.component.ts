import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Banco Docentes';

  constructor() {
    let headers: Headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  }
}
