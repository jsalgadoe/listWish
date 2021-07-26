import { Component } from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {List} from '../../models/list.model';
import { Router } from '@angular/router';
import {AlertController} from "@ionic/angular";
import {placeholdersToParams} from "@angular/compiler/src/render3/view/i18n/util";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
list: List[] = [];

constructor( public deseoService: DeseosService,
             private route: Router,
             private alert: AlertController) {

  }

 async add(){

    const alert =  await this.alert.create({
      header: 'Nueva lista',
      inputs: [
        {
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista',
         }
      ],
      buttons: [
        {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('cancelar');
        }
        },
        {
          text: 'Ok',
          handler: ( data ) => {
            console.log(data.titulo);
           if(data.titulo.length === 0 ){
               return;
           }

            const listaId =  this.deseoService.createLista( data.titulo );
           console.log(listaId);
            this.route.navigateByUrl(`tabs/tab1/add/${listaId}`);
          }
        }
      ]
    });

   alert.present();

  }






}
