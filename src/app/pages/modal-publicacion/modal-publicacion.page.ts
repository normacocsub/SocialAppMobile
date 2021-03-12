import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';

@Component({
  selector: 'app-modal-publicacion',
  templateUrl: './modal-publicacion.page.html',
  styleUrls: ['./modal-publicacion.page.scss'],
})
export class ModalPublicacionPage implements OnInit {

  publicacion: string = '';
  @Input() image: boolean = false;
  imagen: string = '';
  estado: string = 'a';
  constructor(private modalController: ModalController,
              private photoLibrary: PhotoLibrary) { }

  ngOnInit() {
  }

  cancelarModal(){
    this.modalController.dismiss();
  }

  publicarModal(){
    console.log(this.publicacion);
    this.modalController.dismiss({
      nombre:'Fernando Vega',
      publicacion: this.publicacion
    });
  }

  getText(event){
    this.publicacion = event.detail.value;
  }

   SeleccionarFoto(){
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary().subscribe({
        next: library => {
          library.forEach(function(libraryItem) {
            console.log(libraryItem.id);          // ID of the photo
            console.log(libraryItem.photoURL);    // Cross-platform access to photo
            console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
            console.log(libraryItem.fileName);
            console.log(libraryItem.width);
            console.log(libraryItem.height);
            console.log(libraryItem.creationDate);
            console.log(libraryItem.latitude);
            console.log(libraryItem.longitude);
            console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
          });
        },
        error: err => { console.log('could not get photos'); },
        complete: () => { console.log('done getting photos'); }
      });
    })
    .catch(err => console.log('permissions weren\'t granted'));
  }
}


