import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  apiservice: ApiService;

  constructor(private as: ApiService) {
    this.apiservice = as;
  }

  ngOnInit() {
  }

  registerNewAccount(newAccount: any) {
    console.log(newAccount.form.value);
    
    this.apiservice.register(newAccount.form.value).subscribe(
      (data : any[]) => {
        console.log(newAccount);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
