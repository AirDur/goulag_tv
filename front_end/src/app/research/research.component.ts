import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  results: any[] = [];
  order: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.order = {...params.keys, ...params};
    });

	  this.apiService.getResearchResult(this.order.params.query).subscribe((data : any[])=>{
      this.results = data;
    })
  }

}