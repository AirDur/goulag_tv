import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private SERVER_URL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(){
    return this.httpClient.get(this.SERVER_URL).pipe(catchError(this.handleError));
  }

  public getResearchResult(arg0: string) {
    return this.httpClient.get(this.SERVER_URL + '/recherche/recherche/' + arg0).pipe(catchError(this.handleError));
  }

  public getVideoInfos(arg0: string) {
    return this.httpClient.get(this.SERVER_URL + '/recherche/recherche/video/getinfos/' + arg0).pipe(catchError(this.handleError));
  }

  public getYoutubeVideoLink(arg0: string) {
    return this.httpClient.get(this.SERVER_URL + '/recherche/recherche/video/' + arg0).pipe(catchError(this.handleError));
  }

  public getPlaylist(){
    return this.httpClient.get(this.SERVER_URL + '/playlist/playlists/').pipe(catchError(this.handleError));
  }

  public checkexistazurestorage(video_id){
    return this.httpClient.post(this.SERVER_URL + '/playlist/storage/checkexist',video_id).pipe(catchError(this.handleError));
  }

  public uploadVideoToAzureStorage(video_json){
    return this.httpClient.post(this.SERVER_URL + '/playlist/storage/upload',video_json).pipe(catchError(this.handleError));
  }

  public login(value: any) {
    return this.httpClient.post(this.SERVER_URL + '/utilisateur/api/login', value).pipe(catchError((error) => { return throwError(error) }));
  }

  public register(value: any) {
    return this.httpClient.post(this.SERVER_URL + '/utilisateur/api/', value).pipe(catchError((error) => { return throwError(error) }));
  }

  public addToPlaylist(value: any) {
    return this.httpClient.post(this.SERVER_URL + '/playlist/playlists/', value).pipe(catchError((error) => { return throwError(error) }));
  }
}