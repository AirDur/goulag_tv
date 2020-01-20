import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  public show:boolean = false;
  title = 'goulagtv';
  video_link="";

  constructor(private router: Router, private apiservice: ApiService) { }

  ngOnInit() {
    var obj_json = {
      id_v: "ououzos"
    }

    this.apiservice.checkexistazurestorage(obj_json).subscribe((data : any)=>{
      console.log("Check azure : data = "+data.link);
      if(data.link == "Null"){
        this.apiservice.getYoutubeVideoLink("CS7SEhBQjTQ").subscribe((data: any)=>{
          console.log("YT data = "+ JSON.stringify(data));
          this.video_link = data.ytlink;
          this.show=true;
        });
      }
      else{
        this.video_link=data.link;
        this.show=true;
      }
    }); 

  }

}
