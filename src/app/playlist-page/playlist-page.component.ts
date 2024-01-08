import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import {PlaylistModalComponent} from '../playlist-modal/playlist-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrl: './playlist-page.component.css'
})
export class PlaylistPageComponent {
  public playlist : any = [];
  constructor(
    private apiProv: ApiProvider,
    public dialog : MatDialog,
  ) {
    this.getPlaylist();
  }

  public tosongs(){
    window.location.href = "/songs"
  }

  //Llamada al GetPlaylist de ApiProvider
  public getPlaylist(){
    this.apiProv.getPlaylist().then(res => {
      this.playlist = res.data;
    });
  }

  public logout(){
    this.apiProv.logout();
    window.location.href = "/login";
  }

  public newPlaylistModal(){
    const dialogRef = this.dialog.open(PlaylistModalComponent, {
      data: {
        new: true
      },

      disableClose: true,
      hasBackdrop: true,
      width: '80%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getPlaylist();
    });
  }

  public updatePlaylistModal(playlist: any){
    const dialogRef = this.dialog.open(PlaylistModalComponent, {
      data: {
        new: false,
        playlistId: playlist._id,
        usuario_email: playlist.usuario_email,
        nombre: playlist.nombre,
        descripcion: playlist.descripcion,
        canciones: playlist.canciones
      },
      disableClose: true,
      hasBackdrop: true,
      width: '80%',
      height: '80%'
    });
    console.log(playlist)
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getPlaylist();
    });
  }

  public deletePlaylist(playlist: any){
    Swal.fire({
      showCancelButton: true,
      title: '¿Desea eliminar la playlist: "' + playlist.nombre + '" ? ',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((resutl) =>{
      if(resutl.isConfirmed) {
        this.apiProv.deletePlaylist(playlist._id).then((res) => {
          Swal.fire({
            title: 'Playlist Eliminada',
            icon: 'success'
          });
          this.getPlaylist();
        });
      }
    });
  }


}
