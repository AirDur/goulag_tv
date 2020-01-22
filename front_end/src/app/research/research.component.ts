import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  results: any[] = [];
  order: any;

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) { }

  view_video(video_link) {
    
    console.log("j ai en parametre : "+video_link);
    var id_video = video_link.match(/\?v=(.*)/)[1];  //RegExp pour recuperer le id_video
    console.log("substring : "+id_video);
    this.router.navigate(['/viewer'], { queryParams : { query : id_video } });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.order = {...params.keys, ...params};
    });

	  this.apiService.getResearchResult(this.order.params.query).subscribe((data : any[])=>{
      this.results = data;
    })
  }

}