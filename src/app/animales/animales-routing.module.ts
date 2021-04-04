import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalesPage } from './animales.page';

const routes: Routes = [
  {
    path: '',
    component: AnimalesPage
  },
  {
    path: 'ingresar',
    loadChildren: () => import('./ingresar/ingresar.module').then( m => m.IngresarPageModule)
  },
  {
    path: 'ingresar/:id',
    loadChildren: () => import('./ingresar/ingresar.module').then( m => m.IngresarPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalesPageRoutingModule {}
