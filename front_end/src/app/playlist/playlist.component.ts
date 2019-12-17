import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  videos = [];
  constructor(private apiService: ApiService) { }
  
	ngOnInit() {
		this.apiService.sendGetRequest().subscribe((data: any[])=>{  
			this.videos = data;  
		})  
  }
}
