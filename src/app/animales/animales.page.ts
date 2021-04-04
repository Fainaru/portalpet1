import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { IngresarPage } from './ingresar/ingresar.page'
import { AnimalesService } from '../servicios/animales/animales.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})
export class AnimalesPage implements OnInit {
  animales: any[];
  loading: HTMLIonLoadingElement;
  private subscriptions = new Subscription();
  constructor(
    public modalController: ModalController,
    private animalesservice: AnimalesService,
    private loadingcontroller: LoadingController,
    public toastController: ToastController,

  ) { }
  ngOnInit() {
    this.buscar_datos()
  }

  buscar_datos() {
    this.animales = []
    this.subscriptions.add(this.animalesservice.buscarmascotas().subscribe((datos) => {
      this.animales = []
      datos.forEach((dato) => {
        this.animales.push({
          id: dato.payload.doc.id,
          data: dato.payload.doc.data()
        })
      })
    }))

  }

  async ingreso_mascotas() {

    const modal = await this.modalController.create({
      component: IngresarPage
    })
    return await modal.present();

  }

  async borrar(id) {
    await this.carga('Eliminando...')
    this.animalesservice.eliminar(id).then(() => {
      this.loadingcontroller.dismiss()
      this.toast('Se elimino correctamente', 'success')
    }).catch(() => {
      this.loadingcontroller.dismiss()
      this.toast('Error al eliminar', 'danger')
    })

  }


  async carga(message) {
    this.loading = await this.loadingcontroller.create({
      message: message,
      translucent: true,
    });
    return await this.loading.present();
  }

  async toast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();


  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();

  }
}
