import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'modal-publicacion',
    loadChildren: () => import('./pages/modal-publicacion/modal-publicacion.module').then( m => m.ModalPublicacionPageModule)
  },
  {
    path: 'modal-editar-publicacion',
    loadChildren: () => import('./pages/modal-editar-publicacion/modal-editar-publicacion.module').then( m => m.ModalEditarPublicacionPageModule)
  },  {
    path: 'ver-publicacion',
    loadChildren: () => import('./pages/ver-publicacion/ver-publicacion.module').then( m => m.VerPublicacionPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
