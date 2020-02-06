import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  public show:boolean = false;
  title = 'goulagtv';
  query_url;
  video_id;
  video_title="";
  video_description="";
  video_author="";
  video_views="";
  video_link="";
  user_id=""
  playlist_nom:"";
  
  constructor(private router: Router, private apiservice: ApiService,
              private cookieService: CookieService, private route: ActivatedRoute) { 
      this.user_id = this.cookieService.get("id");
  }

  addToPlaylist(){    
    var video = {
      title: this.video_title,
      link: "https://www.youtube.com/watch?v="+this.video_id,
      date: Date,
    }

    var playlist = {
      user_id: this.user_id,
      name : this.playlist_nom,
      playlist: [video]
    }

    /* Fonction de Teddy BDD */
    this.apiservice.addToPlaylist(playlist).subscribe( (data : any[])=> {
      console.log("reponse playlist : "+JSON.stringify(data));
    });

    //Upload de la video dans Azure
    var video_json = {
      lien : "https://www.youtube.com/watch?v="+this.video_id,
      nom :  this.video_id
    }

    this.apiservice.uploadVideoToAzureStorage(video_json).subscribe( (data : any[])=> {
      console.log("reponse ulpoad : "+JSON.stringify(data));
    });

  }

  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      this.query_url = {...params.keys, ...params};
    });

    this.video_id = this.query_url.params.query;

    console.log("dans le viewer video id : "+this.video_id);

    var obj_json = {
      id_v: this.video_id
    }

    this.apiservice.checkexistazurestorage(obj_json).subscribe((data : any)=>{
      console.log("Check azure : data = "+data.link);
      if(data.link == "Null"){
        this.apiservice.getYoutubeVideoLink(this.video_id).subscribe((data: any)=>{
          console.log("YT data = "+ JSON.stringify(data));
          this.video_link = data.ytlink;
          this.show=true;
        });
      }
      else{
        this.video_link=data.link;
        this.show=true;
      }

      this.apiservice.getVideoInfos(this.video_id).subscribe((data : any)=>{
        console.log("recu : "+ JSON.stringify(data));
        this.video_title=data.title;
        this.video_description=data.description;
        this.video_author=data.author;
        this.video_views=data.view_count;
      });
    }); 
  }
}
