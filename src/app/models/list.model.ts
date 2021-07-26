import {ListItem} from './list-item.model';

export class List {
  id: number;
  titulo: string;
  creadaEn: Date;
  terminadoEn: Date;
  terminado: boolean;
  items: ListItem[];

  constructor( titulo: string) {
    this.titulo = titulo;

    this.creadaEn = new Date();
    this.terminado = false;
    this.items = [];
    this.id = new  Date().getTime();
  }
}
