import { Injectable } from '@angular/core';
import {List} from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

 lists: List[] = [];

  constructor() {
 //   const lista1 = new List('Recoletar algo');
   // const lista2 =  new List('Heroes');
    this.cargarStorage();
    console.log(this.lists);
  }

  delete(lista: List){
    console.log(this.lists);
     this.lists = this.lists.filter( listaData => listaData.id !== lista.id );
      console.log(this.lists);
      this.guardarStorage();
  }

  createLista( titulo: string) {
    const nuevaLista = new List( titulo );
    this.lists.push(nuevaLista);
    this.guardarStorage();

    return nuevaLista.id;
  }
  obtenerLista(id: string | number){
    id = Number(id);
    return this.lists.find( listaData => listaData.id === id );
  }

  guardarStorage(){
    localStorage.setItem('data',JSON.stringify(this.lists));
  }

  cargarStorage(){
    if (localStorage.getItem('data')) {
      this.lists = JSON.parse(localStorage.getItem('data'));
    } else {
      this.lists = [];
    }
  }
}
