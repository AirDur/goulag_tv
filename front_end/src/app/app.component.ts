import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  @ViewChild('closeModal', {static: true}) closeModal;

  title: String = 'goulagtv';
  apiservice: ApiService;
  errorLogin: Boolean = false;
  isConnected: Boolean = false;

  constructor(private router: Router, private as: ApiService, private cookieService: CookieService) {
    this.apiservice = as;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    let value = this.cookieService.get("token");
    if(value !== "") {
      this.isConnected = true;
    }
  }

  search(search : any) {
    this.router.navigate(['/research'], { queryParams : { query : search.form.value.search } });
  }

  login(login : any) {
    this.errorLogin = false;

    this.apiservice.login(login.form.value).subscribe(
      (data : any[]) => {
        this.cookieService.set("id", data["id"]);
        this.cookieService.set("token", data["token"]);
        this.isConnected = true;
        this.router.navigate(["/"]);
        this.closeModal.nativeElement.click() //<-- here
      },
      (error) => {
        this.errorLogin = true;
      }
    )
  }

  logOff() {
    this.cookieService.delete("token");
    this.cookieService.delete("id");
    this.isConnected = false;
    this.router.navigate(["/"]);
  }
}