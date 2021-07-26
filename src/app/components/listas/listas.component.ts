import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {List} from '../../models/list.model';
import {Router } from '@angular/router';
import {AlertController, IonList} from "@ionic/angular";

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
@Input() terminada =true;
@ViewChild(IonList) lista: IonList;

  constructor( public deseoService: DeseosService,
               private route: Router,
               private alert: AlertController) { }

  ngOnInit() {}

  seleccionarLista(lista: List){
    const listaId = lista.id;
    if (this.terminada) {
      this.route.navigateByUrl(`tabs/tab2/add/${listaId}`);
    }else {
      this.route.navigateByUrl(`tabs/tab1/add/${listaId}`);
    }
  }

  delete(lista: List){
    console.log({lista});
   this.deseoService.delete( lista );
  }

  async editTitulo(lista: List) {


    const alert =  await this.alert.create({
      header: 'Editar Titulo',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: `${lista.titulo}`,
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
            if(data.titulo.length === 0 ){
              return;
            }
            lista.titulo =  data.titulo;
            this.deseoService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();


  }
}
