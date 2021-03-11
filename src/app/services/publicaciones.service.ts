import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Publicacion } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  publicaciones: Publicacion[] = [];
  constructor(private storage: Storage) { 
    this.cargarPublicaciones();
  }


  guardarPublicacion(publicacion: Publicacion): Observable<Publicacion>{
    this.publicaciones.unshift(publicacion);
    this.storage.set('publicaciones', this.publicaciones);
    return of(publicacion);
  }

  async cargarPublicaciones(){
    const publicaciones = await this.storage.get('publicaciones');
    if(publicaciones){
      this.publicaciones = publicaciones;
    }
    return;
  }

   getPublicaciones(){
    this.cargarPublicaciones();
    return this.publicaciones;
  }

}
