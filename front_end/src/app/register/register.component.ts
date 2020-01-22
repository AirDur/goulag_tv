import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  apiservice: ApiService;
  error: Boolean = false;
  errorText: String = "";

  constructor(private router: Router, private as: ApiService) {
    this.apiservice = as;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
  }

  registerNewAccount(newAccount: any) {    
    this.error = false;
    this.apiservice.register(newAccount.form.value).subscribe(
      (data : any[]) => {
        this.router.navigate(['/registered']);
      },
      (error) => {
        this.error = true;
        if(error.error.res && error.error.res === "Champ Manquant") {
          this.errorText = error.error.res + " : " + error.error.missing;
        } else {
          this.errorText = error.error;
        }
      }
    )
  }
}
