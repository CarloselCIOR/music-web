import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProvider } from '../providers/api.prov';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.component.html',
  styleUrl: './songs-modal.component.css'
})
export class SongsModalComponent {
  public new = true;
  public songId = "";
  public titulo = "";
  public artista = "";
  public album = "";
  public genero = "";
  public duracion = "";
  public anho = "";
  public url = "";
  
  constructor(
    public dialogRef: MatDialogRef<SongsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider) {
      this.new = data.new;
      this.songId = data.songId;
      this.titulo = data.titulo;
      this.artista = data.artista;
      this.album = data.album;
      this.genero = data.genero;
      this.duracion = data.duracion;
      this.anho = data.anho;
      this.url = data.url;
  }

  public createSong(): void{
    const data = {
      titulo : this.titulo,
      artista : this.artista,
      album : this.album,
      genero : this.genero,
      duracion : this.duracion,
      anho : this.anho,
      url : this.url
    }

    this.apiProv.createSong(data).then((res) => {
      if(res){
        Swal.fire({
          title: "Canción Creada",
          icon: "success"
        });
        this.onClose()
      }
    });
  }

  public updateSong(): void{
    const data = {
      titulo : this.titulo,
      artista : this.artista,
      album : this.album,
      genero : this.genero,
      duracion : this.duracion,
      anho : this.anho,
      url : this.url
    }

    this.apiProv.updateSong(this.songId, data).then((res) => {
      if(res){
        Swal.fire({
          title: "Canción Actualizada",
          icon: "success"
        });
        this.onClose()
      }
    });
  }
  
  onClose(){
    this.dialogRef.close();
  }

}


