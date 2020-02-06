import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  videos: any[] = [];
  chaine;
  public show:boolean = false;

  constructor(private apiService: ApiService, private router: Router, private cookieService: CookieService) { }
  
  view_video(id_video) {
    this.router.navigate(['/viewer'], { queryParams : { query : id_video } });
  }

	ngOnInit() {
    let value_id = this.cookieService.get("id");
    let data = {
      id_playlist : "1234",
      id_user : value_id,
      nom : "jeudi mdr",
      list : ["kutk2XHEZNU","n-gsDYUXWqU"]
    }

    // this.apiService.getPlaylist(value_id).subscribe( (data: any) => {
    //   console.log(data);
    // })

    data.list.forEach( (listItem, index)=>{
      this.apiService.getVideoInfos(listItem).subscribe((data : any)=>{
        console.log("video["+index+"]"+"="+JSON.stringify(data));
        this.videos[index]=data;
        this.videos[index].id = listItem;
        if(index==0) this.show=true;
      });
    });

   /*  for(var id in data.list){
      console.log("id : "+data.list[id]);

      this.apiService.getVideoInfos(data.list[id]).subscribe((data : any)=>{
        
        this.videos[id]=data;
        console.log("video["+id+"]"+JSON.stringify(data));

        this.chaine = JSON.stringify(this.videos);
        
        
        this.videos[id].description=data.description;
        this.videos[id].author=data.author;
        this.videos[id].views=data.view_count;
        console.log("video title : "+JSON.stringify(this.videos[id].title));
      });
    } */

		/* this.apiService.getPlaylist().subscribe((data: any[])=>{  
			this.videos = data;  
		}) */  
  }
}
