import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class ApiProvider{
    url = environment.apiURL;

    // Funcion para loguearse
    login(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.post(this.url + 'users/login', data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    // Mostrar un SweetAlert para la respuesta 401
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de autenticación',
                        text: 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.',
                    });
                } else {
                    console.log(err);
                }
            });
    });
}

    //Verificar si el usuario está logueado
    isAuthenticatedUser(): boolean{
        const token = localStorage.getItem("token");
        return token ? true : false;
    }

    //Terminar Sesion
    logout(){
        localStorage.removeItem("token");
    }
    
    //Registrar el usuario
    register(data: any): Promise<any>{
        return new Promise<any>((resolve, reject) =>{
            axios.post(this.url+'users', data).then(res =>{
                resolve(data);
            }).catch(err =>{
                console.log(err);
            });
        });
    }

    //Funcion para obtener todas las canciones, se le da la URL + 'songs' para comunicarse api. Devuelve data o imprime error.
     getSongs(): Promise<any>{
        return new Promise((resolve, reject) => {
            axios.get(this.url+'songs').then(res =>{
                resolve(res.data);
            }).catch(err =>{
                console.log(err);
            });
        });
    }

    //Funcion para obtener la cancion por Id, se le da la URL + 'songs' + Id para comunicarse api. Devuelve data o imprime error.
    getSongsById(songId: any): Promise<any>{
        return new Promise((resolve, reject) => {
            axios.get(this.url+'songs/'+songId).then(res =>{
                resolve(res.data);
            }).catch(err =>{
                console.log(err);
            });
        });
    }

    //Funcion para crear las canciones, se le da la URL y la data para comunicarse api. Devuelve data o imprime error.
    createSong(data: any): Promise<any>{
        const token = localStorage.getItem('token');

        return new Promise((resolve, reject) => {
            axios.post(this.url+'songs', data, { 
                headers : { 
                    Authorization : token
                } 
            }).then(res =>{
                resolve(res.data);
            }).catch(err =>{
                if (err.response && err.response.status === 401) {
                    // Mostrar un SweetAlert para la respuesta 401
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de autenticación',
                        text: 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.',
                        timer: 2000
                    });
                    setTimeout(function() {
                        window.location.href = "/login";
                      }, 2000);
                } else {
                    console.log(err);
                }
            })
        });       
    } 

    //Funcion para actualizar las canciones, se le da la URL, el ID, y la data para comunicarse api. Devuelve data o imprime error.
    updateSong(songId: any, data: any): Promise<any>{
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.put(this.url+'songs/'+songId, data, { 
                headers : { 
                    Authorization : token
                } 
            }).then(res =>{
                resolve(res.data);
            }).catch(err =>{
                if (err.response && err.response.status === 401) {
                    // Mostrar un SweetAlert para la respuesta 401
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de autenticación',
                        text: 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.',
                        timer: 2000
                    });
                    setTimeout(function() {
                        window.location.href = "/login";
                      }, 2000);
                } else {
                    console.log(err);
                }
            })
        });       
    } 

    //Funcion para borrar las canciones, se le da la URL + Id para comunicarse api. Devuelve data o imprime error.
    deleteSong(songId: any): Promise<any>{
        const token = localStorage.getItem('token');

        return new Promise((resolve, reject) => {
            axios.delete(this.url+'songs/'+ songId, { 
                headers : { 
                    Authorization : token
                } 
            }).then(res =>{
                resolve(res.data);
            }).catch(err =>{
                if (err.response && err.response.status === 401) {
                    // Mostrar un SweetAlert para la respuesta 401
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de autenticación',
                        text: 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.',
                        timer: 2000
                    });
                    setTimeout(function() {
                        window.location.href = "/login";
                      }, 2000);
                } else {
                    console.log(err);
                }
            })
        });       
    } 

    //Funcion para obtener todas las playlist, se le da la URL + 'playlist' para comunicarse api. Devuelve data o imprime error.
    getPlaylist(): Promise<any>{
        return new Promise((resolve, reject) => {
            axios.get(this.url+'playlists').then(res =>{
                resolve(res.data);
            }).catch(err =>{
                console.log(err);
            });
        });
    }

    //Funcion para obtener la playlist por Id, se le da la URL + 'playlist' + Id para comunicarse api. Devuelve data o imprime error.
    getPlaylistById(playlistId: any): Promise<any>{
        return new Promise((resolve, reject) => {
            axios.get(this.url+'playlists/'+playlistId).then(res =>{
                resolve(res.data);
            }).catch(err =>{
                console.log(err);
            });
        });
    }

    //Funcion para crear las playlist, se le da la URL y la data para comunicarse api. Devuelve data o imprime error.
    createPlaylist(data: any): Promise<any>{
        const token = localStorage.getItem('token');

        return new Promise((resolve, reject) => {
            axios.post(this.url+'playlists', data, { 
                headers : { 
                    Authorization : token
                } 
            }).then(res =>{
                resolve(res.data);
            }).catch(err =>{
                if (err.response && err.response.status === 401) {
                    // Mostrar un SweetAlert para la respuesta 401
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de autenticación',
                        text: 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.',
                        timer: 2000
                    });
                    setTimeout(function() {
                        window.location.href = "/login";
                      }, 2000);
                } else {
                    console.log(err);
                }
            })
        });       
    }
    
    //Funcion para actualizar las playlist, se le da la URL, el ID, y la data para comunicarse api. Devuelve data o imprime error.
    updatePlaylist(playlistId: any, data: any): Promise<any>{
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.put(this.url+'playlists/'+playlistId, data, { 
                headers : { 
                    Authorization : token
                } 
            }).then(res =>{
                resolve(res.data);
            }).catch(err =>{
                if (err.response && err.response.status === 401) {
                    // Mostrar un SweetAlert para la respuesta 401
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de autenticación',
                        text: 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.',
                        timer: 2000
                    });
                    setTimeout(function() {
                        window.location.href = "/login";
                      }, 2000);
                } else {
                    console.log(err);
                }
            })
        });       
    }
    
    //Funcion para borrar las canciones, se le da la URL + Id para comunicarse api. Devuelve data o imprime error.
    deletePlaylist(playlistId: any): Promise<any>{
        const token = localStorage.getItem('token');

        return new Promise((resolve, reject) => {
            axios.delete(this.url+'playlists/'+ playlistId, { 
                headers : { 
                    Authorization : token
                } 
            }).then(res =>{
                resolve(res.data);
            }).catch(err =>{
                if (err.response && err.response.status === 401) {
                    // Mostrar un SweetAlert para la respuesta 401
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de autenticación',
                        text: 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.',
                        timer: 2000
                    });
                    setTimeout(function() {
                        window.location.href = "/login";
                      }, 2000);
                } else {
                    console.log(err);
                }
            })
        });       
    } 
}