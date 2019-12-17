import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HistoriqueComponent } from './historique/historique.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ViewerComponent } from './viewer/viewer.component';

// MODIFY HERE TO ADD COMPONENT ETC...
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'viewer', component: ViewerComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'historique', component: HistoriqueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }