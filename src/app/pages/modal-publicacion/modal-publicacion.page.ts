import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;


@Component({
  selector: 'app-modal-publicacion',
  templateUrl: './modal-publicacion.page.html',
  styleUrls: ['./modal-publicacion.page.scss'],
})
export class ModalPublicacionPage implements OnInit {

  publicacion: string = '';
  @Input() image: boolean = false;
  imagen: string = '';
  tempImg: string[] = [];
  constructor(private modalController: ModalController,
              private camera: Camera
              ) { }

  ngOnInit() {
  }

  
  cancelarModal(){
    this.modalController.dismiss();
  }

  publicarModal(){
    console.log(this.publicacion);
    this.modalController.dismiss({
      nombre:'Fernando Vega',
      publicacion: this.publicacion,
      urlImg: this.imagen
    });
  }

  getText(event){
    this.publicacion = event.detail.value;
  }

   SeleccionarFoto(){


    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.procesarImagen(options);
    
  }

  Gallery(){
    
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let win: any = window;
      const img = win.Ionic.WebView.convertFileSrc( imageData );
      this.imagen = img;
     }, (err) => {
      // Handle error
     });
  }
}



