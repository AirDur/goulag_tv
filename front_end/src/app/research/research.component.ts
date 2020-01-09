import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  results: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
	this.apiService.getResearchResult("tomato").subscribe((data : any[])=>{
		console.log(data);
		this.results = data;
    })
  }

}
