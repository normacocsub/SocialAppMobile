import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonTextarea, ModalController } from '@ionic/angular';
import { Publicacion } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-modal-editar-publicacion',
  templateUrl: './modal-editar-publicacion.page.html',
  styleUrls: ['./modal-editar-publicacion.page.scss'],
})
export class ModalEditarPublicacionPage implements OnInit {

  @Input() publica: Publicacion;

  @ViewChild(IonTextarea) textArea: IonTextarea;


  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    
    this.textArea.value = this.publica.publicacion;
  }


  cancelarModal(){
    this.modalController.dismiss();
  }

  editarModal(){
    this.modalController.dismiss({
      idPublicacion: this.publica.idPublicacion,
      nombre: this.publica.nombre,
      publicacion: this.publica.publicacion
    });
  }

  getText(event){
    this.publica.publicacion = event.detail.value;
  }

}
