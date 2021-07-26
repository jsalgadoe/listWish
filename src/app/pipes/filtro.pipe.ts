import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/list.model';
@Pipe({
  name: 'filtro',
  pure: false
})
export class FiltroPipe implements PipeTransform {

  transform(listas: List[], completado = true): List[] {
    return listas.filter(lista => lista.terminado == completado);
  }

}
