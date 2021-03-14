export interface Publicacion {
  idPublicacion: string;
  nombre: string;
  publicacion: string;
  urlImg: string;
  Comentarios: Comentar[];

}

export interface Comentar{
  idComentario: string;
  comentario: string;
  idPublicacion: string;
}