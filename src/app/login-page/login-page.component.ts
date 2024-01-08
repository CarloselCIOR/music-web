import { Component } from '@angular/core';
import { ApiProvider } from '../providers/api.prov';
import { MatDialog } from '@angular/material/dialog';

import {RegisterModalComponent} from '../register-modal/register-modal.component';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  public email: string = '';
  public password: string = '';

  constructor(private apiProv: ApiProvider, public dialog : MatDialog){
    if(apiProv.isAuthenticatedUser()) { 
      window.location.href = "/playlist";
    }
  }

  public login(){
    const data = {
      email: this.email,
      password: this.password
    }

    this.apiProv.login(data).then(res =>{
      console.log(res);
      if(res.token){
        localStorage.setItem('token', res.token);
        window.location.href = "/playlist";
      }
    });
  }

  public newUserModal(){
    const dialogRef = this.dialog.open(RegisterModalComponent, {
      data: {
        new: true
      },

      disableClose: true,
      hasBackdrop: true,
      width: '80%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      window.location.href = "/login";
    });
  }

}
