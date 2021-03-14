import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comentar, Publicacion } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  comentarios: Comentar[] = [];
  constructor(
    private platform: Platform,
    private storage: Storage,
    private sqlite: SQLite
  ) {
    this.openDataBase();
  }

  getPublicaciones(sql: SQLiteObject, publica: string) {
    this.comentarios = [];
    let data = [publica];
    sql.executeSql('SELECT * FROM Comentarios WHERE idPublicacionComent=?', data).then((r) => {
      console.log(r.rows.length);
      if (r.rows.length > 0) {
        for (var i = 0; i < r.rows.length; i++) {
          this.comentarios.unshift(r.rows.item(i));
        }
      }
    });

    return this.comentarios;
  }

  openDataBase() {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: 'data.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          db.executeSql(
            'CREATE TABLE if not exists Comentarios (idComentario varchar(5) primary key,comentario varchar(100), idPublicacionComent varchar(5)), FOREIGN KEY (idPublicacionComent) REFERENCES Publicacion(idPublicacion)',
            []
          )
            .then(() => console.log('Executed SQL'))
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    });
  }
}
