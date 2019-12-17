import { HttpClientModule } from '@angular/common/http'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ViewerComponent } from './viewer/viewer.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { HistoriqueComponent } from './historique/historique.component';
import { MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ViewerComponent,
    PlaylistComponent,
    HistoriqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
