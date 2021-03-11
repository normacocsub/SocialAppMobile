import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-publicacion',
  templateUrl: './modal-publicacion.page.html',
  styleUrls: ['./modal-publicacion.page.scss'],
})
export class ModalPublicacionPage implements OnInit {

  publicacion: string = '';
  constructor(private modalController: ModalController) { }

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
}
