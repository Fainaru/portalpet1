import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { AnimalesService } from '../../servicios/animales/animales.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {


  private subscriptions = new Subscription();
  ingresarM = new FormGroup({
    nombre: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    raza: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),

  });

  mes = ['Ene', 'Feb', 'Mar', 'Abr', 'Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  loading: any;

  id_mascota
  mascota: any;

  constructor(
    public modalController: ModalController,
    private animalesservice: AnimalesService,
    public alertcontroller: AlertController,
    private loadingcontroller: LoadingController,
    public toastController: ToastController,
    private routerac: ActivatedRoute,
  ) { }

  async ngOnInit() {

    if (await this.modalController.getTop()) {

    } else {

      this.id_mascota = this.routerac.snapshot.parent.params.id
      this.mascota = window.history.state.animal


      if (this.mascota) {
        this.ingresarM.setValue({
          nombre: this.mascota.data.nombre,
          tipo: this.mascota.data.tipo,
          raza: this.mascota.data.raza,
          edad: this.mascota.data.edad,
        })
      }

      this.buscar_dato()

    }


  }

  buscar_dato() {
    this.subscriptions.add(this.animalesservice.buscar_mascota(this.id_mascota).subscribe((dato: any) => {
      this.ingresarM.setValue({
        nombre: dato.payload.data().nombre,
        tipo: dato.payload.data().tipo,
        raza: dato.payload.data().raza,
        edad: dato.payload.data().edad,
      })
    }))
  }

  async ingresar() {
    if (this.ingresarM.valid) {
      await this.carga('cargando')
      this.animalesservice.ingresar(this.ingresarM.value).then(async () => {

        await this.loadingcontroller.dismiss();
        this.modalController.dismiss()
        this.toast('Se ingreso correctamente', 'success')
      }).catch(async () => {
        this.toast('Error al subir datos', 'danger')
        await this.loadingcontroller.dismiss();
      })
    } else {
      this.completardatos()

    }

  }


  async editar() {
    if (this.ingresarM.valid) {
      await this.carga('cargando')
      this.animalesservice.editar(this.id_mascota, this.ingresarM.value).then(async () => {

        await this.loadingcontroller.dismiss();

        this.toast('Se edito correctamente', 'success')
      }).catch(async () => {
        this.toast('Error al subir datos', 'danger')
        await this.loadingcontroller.dismiss();
      })
    } else {
      this.completardatos()

    }

  }

  async completardatos() {
    const alert = await this.alertcontroller.create({
      cssClass: 'my-custom-class',
      header: 'Calmao',
      subHeader: '',
      message: 'Debes Completar todos los campos.',
      mode: 'ios',
      buttons: ['OK']
    });

    await alert.present();
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
