import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AnimalesService {

  constructor(
    private angularfirestore: AngularFirestore
  ) { }

  ingresar(data) {
    return this.angularfirestore.collection('mascotas').add(data)
  }

  editar(id,data) {
    return this.angularfirestore.collection('mascotas').doc(id).update(data)
  }

  buscarmascotas() {
    return this.angularfirestore.collection('mascotas').snapshotChanges()
  }

  buscar_mascota(id){
    return this.angularfirestore.collection('mascotas').doc(id).snapshotChanges()
  }

  eliminar(id){
    return this.angularfirestore.collection('mascotas').doc(id).delete()
  }




  //funcion_nombre(dato compartido){
  //  que hace la funcion
  //}
}
