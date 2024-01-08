import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SongsPageComponent } from './songs-page/songs-page.component';
import { PlaylistPageComponent } from './playlist-page/playlist-page.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'songs', component: SongsPageComponent },
  {path: 'playlist', component: PlaylistPageComponent},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
