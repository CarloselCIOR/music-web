import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProvider } from '../providers/api.prov';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrl: './playlist-modal.component.css'
})

export class PlaylistModalComponent {
  public new = true; 
  public playlistId = "";
  public usuario_email = "";
  public nombre = "";
  public descripcion = "";
  public canciones: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<PlaylistModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider) {
      this.new = data.new;
      this.playlistId = data.playlistId;
      this.usuario_email = data.usuario_email;
      this.nombre = data.nombre;
      this.descripcion = data.descripcion;
      this.canciones = data.canciones;
  }

  public createPlaylist(): void{
    const data = {
      usuario_email : this.usuario_email,
      nombre : this.nombre,
      descripcion : this.descripcion,
      canciones : this.canciones
    }
    console.log(data)
    this.apiProv.createPlaylist(data).then((res) => {
      if(res){
        Swal.fire({
          title: "Playlist Creada",
          icon: "success"
        });
        this.onClose()
      }
    });
  }

  public updatePlaylist(): void{
    const data = {
      usuario_email : this.usuario_email,
      nombre : this.nombre,
      descripcion : this.descripcion,
      canciones : this.canciones
    }

    this.apiProv.updatePlaylist(this.playlistId, data).then((res) => {
      if(res){
        Swal.fire({
          title: "Playlist Actualizada",
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
