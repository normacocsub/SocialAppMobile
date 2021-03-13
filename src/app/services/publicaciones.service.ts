import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Publicacion } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  publicaciones: Publicacion[] = [];
  private storag: SQLiteObject;
  constructor(private platform: Platform,
              private storage: Storage,
               private sqlite: SQLite) { 
    this.openDataBase();
  }


  

  async cargarPublicaciones(){
    const publicaciones = await this.storage.get('publicaciones');
    if(publicaciones){
      this.publicaciones = publicaciones;
    }
    return;
  }

   getPublicaciones(sql: SQLiteObject){
    this.publicaciones = [];
    return sql.executeSql('SELECT * FROM Publicaciones', []).then(r =>{
      console.log(r.rows.length);
      if(r.rows.length > 0){
        debugger;
        for( var i = 0; i < r.rows.length; i++){
          this.publicaciones.unshift(r.rows.item(i));
        }
      }
    });
  }


  //conect to sql Lite

  insertPublicaciones(publicacion: Publicacion){
    publicacion.idPublicacion = (this.publicaciones.length + 1).toString();
    let data = [ publicacion.idPublicacion, publicacion.nombre, publicacion.publicacion, publicacion.urlImg ];
    this.storag.transaction(tx =>{
      tx.executeSql('INSERT INTO Publicaciones(idPublicacion,nombre,publicacion,urlImg) VALUES(?,?,?,?)', data)
    });

    this.getPublicaciones(this.storag);
    return of(publicacion);
  }


  updatePublicacion(publicacion: Publicacion){
    let data = [ publicacion.publicacion ];

    this.storag.transaction(tx => {
      tx.executeSql(`UPDATE Publicaciones SET publicacion=? WHERE idPublicacion=${publicacion.idPublicacion}`, data)
    });

    this.getPublicaciones(this.storag);
    return of(publicacion);
  }

  deletePublicacion(publicacion: Publicacion){
    this.storag.transaction(tx =>{
      tx.executeSql('DELETE FROM Publicaciones WHERE idPublicacion = ?', [publicacion.idPublicacion])
    });
    this.getPublicaciones(this.storag);
    return of(publicacion);
  }

  openDataBase(){
    this.platform.ready().then(() =>{
      this.sqlite.create({
        name: 'data.db',
        location: 'default',    
      }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE if not exists Publicaciones (idPublicacion varchar(5) primary key,nombre varchar(30), publicacion varchar(500), urlImg varchar(100))', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
        
        this.storag = db;
        this.getPublicaciones(db);
      })
      .catch(e => console.log(e));
    })
  }
}