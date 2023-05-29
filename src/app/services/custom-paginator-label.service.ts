import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorLabelService {

  constructor() { }

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = '1';
    paginator._intl.itemsPerPageLabel = 'Registros por página';
    paginator._intl.lastPageLabel = '3';
    paginator._intl.nextPageLabel = 'Siguiente página';
    paginator._intl.previousPageLabel = 'Página anterior';
  }
}
