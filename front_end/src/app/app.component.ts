import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'goulagtv';
  apiservice: ApiService;
  errorLogin = false;

  constructor(private router: Router, private as: ApiService) {
    this.apiservice = as;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  search(search : any) {
    this.router.navigate(['/research'], { queryParams : { query : search.form.value.search } });
  }

  login(login : any) {
    console.log(login.form.value);
    //TODO
    this.apiservice.login(login.form.value).subscribe(
      (data : any[]) => {
        console.log(login);
      },
      (error) => {
        this.errorLogin = true;

      }
    )
  }

}