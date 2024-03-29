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
  //Declaración de la variable songs
  public songs : any = [];
  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog,
  ) {
    this.getSongs();
  }

  //Redirige a la página de playlist
  public toplaylists(){
    window.location.href = "/playlists"
  }
  //Llamada al GetSongss de ApiProvider
  public getSongs(){
    this.apiProv.getSongs().then(res => {
      this.songs = res.data;
    });
  }

 
  //Llamada de logout de ApiProvider para cerrar sesión
  public logout(){
    Swal.fire({
      title: "¿Seguro que desea salir?",
      text: "Tu sesión será cerrada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Cerrar sesión!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiProv.logout();
        window.location.href = "/login";
      }
    });
  }

  //Abre un modal utilizando SongModalComponent para crear una nueva canción
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

  //Abre un modal utilizando SongModalComponent para actualizar una canción existente
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

  //Muestra una confirmación a través de Swal, llamada al metodo deleteSong de ApiProvider
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
