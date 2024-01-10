import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProvider } from '../providers/api.prov';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {
  //Variables 
  public userName = "";
  public email = "";
  public password = "";
  public createdAt = new Date();

  areFieldsEmpty(): boolean {
    // Verificar si algún campo está vacío
    return (
        !this.userName || !this.email || !this.password
    );
  }

  constructor(
    public dialogRef: MatDialogRef<RegisterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider) {
      this.userName = data.userName;
      this.email = data.email;
      this.password = data.password;
  }

  //createUser se ejecuta cuando se intenta crear un nuevo usuario
  public createUser(): void{
    const data = {
      userName : this.userName,
      email : this.email,
      password : this.password,
      createdAt : this.createdAt
    }

    this.apiProv.register(data).then((res) => {
      if(res){
        Swal.fire({
          title: "Usuario Creado",
          icon: "success"
        });
        this.onClose()
      }
    });
  }
  
  //Método para cerrar el modal
  onClose(){
    this.dialogRef.close();
  }
}
