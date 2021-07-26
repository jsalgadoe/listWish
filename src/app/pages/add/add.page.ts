import { Component, OnInit } from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {ActivatedRoute} from '@angular/router';
import {List} from "../../models/list.model";
import { ListItem } from '../../models/list-item.model';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
lista: List;
nameItem = '';
  constructor( private deseoService: DeseosService,
               private route: ActivatedRoute) {

  const listaId = this.route.snapshot.paramMap.get('listaId');
  this.lista = this.deseoService.obtenerLista(listaId);

  }

  addItem(){
     if(this.nameItem.length == 0){
        return;
     }
     const nuevoItem = new ListItem( this.nameItem );
     this.lista.items.push( nuevoItem);

     this.nameItem = '';
     this.deseoService.guardarStorage();
  }

  delete(i: number){
    this.lista.items.splice(i,1);
    this.deseoService.guardarStorage();
  }

  cambioCheck( item: ListItem ){
   console.log( item );
   const pendientes = this.lista.items
                       .filter(itemdata => !itemdata.completado)
                       .length;

   if( pendientes === 0){
     this.lista.terminadoEn = new Date();
     this.lista.terminado = true;
   }else {
     this.lista.terminadoEn = null;
     this.lista.terminado = false;
   }

   this.deseoService.guardarStorage();
   this.deseoService.lists;
  }

  ngOnInit() {
  }

}
