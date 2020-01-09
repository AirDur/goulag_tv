import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';

import { HomeComponent } from './home/home.component';
import { HistoriqueComponent } from './historique/historique.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ViewerComponent } from './viewer/viewer.component';
import { ResearchComponent } from './research/research.component';


// MODIFY HERE TO ADD COMPONENT ETC...
// ,pathMatch: 'prefix'
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'viewer', component: ViewerComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'historique', component: HistoriqueComponent, canActivate: [AuthGuard]},
  { path: 'research', component: ResearchComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }