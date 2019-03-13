import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material";

@Injectable()
export class MatPaginatorIntlGerman extends MatPaginatorIntl {
    itemsPerPageLabel = 'Itens por página: ';
    nextPageLabel = 'Página seguinte';
    previousPageLabel = 'Página anterior';
    firstPageLabel = 'Primeira página';
    lastPageLabel = 'Última página';

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' de ' + length;
    }
}