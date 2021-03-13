import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Publicacion } from 'src/app/interfaces/interfaces';
import { ModalPublicacionPage } from '../../pages/modal-publicacion/modal-publicacion.page';
import { PublicacionesService } from '../../services/publicaciones.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  publicaciones: Publicacion[] = [];
  constructor(private modalController: ModalController,
              public publicacionService: PublicacionesService) { }

  ngOnInit() {
    
  }


  async crearPublicacion(){
    const modal = await this.modalController.create({
      component: ModalPublicacionPage
    });
    await modal.present();

    const {data} = await modal.onDidDismiss();

 

    this.publicacionService.insertPublicaciones(data).subscribe(result =>{
      
    });
  }

  async crearPublicacionWithImagen(){
    const modal = await this.modalController.create({
      component: ModalPublicacionPage,
      componentProps: {
        image: true
      }
    });
    await modal.present();

    const {data} = await modal.onDidDismiss();
    this.publicacionService.insertPublicaciones(data).subscribe(result =>{
      console.log(result);
    });
  }
}