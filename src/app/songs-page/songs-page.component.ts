import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';
import { SongsModalComponent } from '../songs-modal/songs-modal.component'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-songs-page',
  templateUrl: './songs-page.component.html',
  styleUrl: './songs-page.component.css'
})

export class SongsPageComponent {
  public songs : any = [];
  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog,
  ) {
    this.getSongs();
  }

  public toplaylists(){
    window.location.href = "/playlists"
  }
  //Llamada al GetSongss de ApiProvider
  public getSongs(){
    this.apiProv.getSongs().then(res => {
      this.songs = res.data;
    });
  }

  public logout(){
    this.apiProv.logout();
    window.location.href = "/login";
  }

  public newSongModal(){
    const dialogRef = this.dialog.open(SongsModalComponent, {
      data: {
        new: true
      },

      disableClose: true,
      hasBackdrop: true,
      width: '80%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getSongs();
    });
  }

  public updateSongModal(song: any){
    const dialogRef = this.dialog.open(SongsModalComponent, {
      data: {
        new: false,
        songId: song._id,
        titulo : song.titulo,
        artista : song.artista,
        album : song.album,
        genero : song.genero,
        duracion : song.duracion,
        anho : song.anho,
        url : song.url
      },

      disableClose: true,
      hasBackdrop: true,
      width: '80%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getSongs();
    });
  }

  public deleteSong(song: any){
    Swal.fire({
      showCancelButton: true,
      title: '¿Desea eliminar la cancion: "' + song.titulo + '" ? ',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((resutl) =>{
      if(resutl.isConfirmed) {
        this.apiProv.deleteSong(song._id).then((res) => {
          Swal.fire({
            title: 'Cancion Eliminada',
            icon: 'success'
          });
          this.getSongs();
        });
      }
    });
  }
}
