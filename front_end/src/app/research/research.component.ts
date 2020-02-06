import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  results: any[] = [];
  order: any;
  video_id;
  video_title="";
  video_description="";
  video_author="";
  video_views="";
  video_link="";
  
  user_id="";
  playlist_nom:"";
  show_addToPlaylist: Boolean = true;

  public alert:Boolean = false;
  alertText: String;
  public added:Boolean = false;
  addedText: String;

  constructor(private router: Router, private apiService: ApiService,
    private cookieService: CookieService, private route: ActivatedRoute) { 
      if(this.cookieService.check("id")) {

        this.user_id = this.cookieService.get("id");
      } else {
        this.show_addToPlaylist = false;
      }
  }

  addToPlaylist(video_link) {

    this.alert = false; this.added = false;

    console.log("ajout de la video dans la playlist du bdd utilisateur");

    /* Fonction de Teddy BDD */
    var video = {
      title: this.video_title,
      link: "https://www.youtube.com/watch?v="+this.video_id,
      date: Date,
    }

    var playlist = {
      user_id: this.user_id,
      name :  this.playlist_nom,
      playlist: [video]
    }

    this.apiService.addToPlaylist(playlist).subscribe( (data : any[])=> {
      console.log("reponse playlist : "+JSON.stringify(data));
    });

    //Upload de la video dans Azure
    var video_json = {
      lien : video_link,
      nom :  video_link.match(/\?v=(.*)/)[1] //RegExp pour recuperer le id_video
    }
    this.apiService.uploadVideoToAzureStorage(video_json).subscribe( (data : any[])=> {
      console.log("reponse ulpoad : "+JSON.stringify(data));
    });
  }

  view_video(video_link) {  
    var id_video = video_link.match(/\?v=(.*)/)[1];  //RegExp pour recuperer le id_video
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