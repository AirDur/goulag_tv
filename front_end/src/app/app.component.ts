import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'goulagtv';

  constructor(private router: Router) {}

  search(search : any) {
    this.router.navigate(['/research'], { queryParams : { query : search.form.value.search } });
  }
}