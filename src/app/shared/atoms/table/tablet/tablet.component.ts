import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableHeader, TableRow } from '../../../../interface/table.interface';

@Component({
  selector: 'app-tablet',
  standalone: false,
  templateUrl: './tablet.component.html',
  styleUrls: ['./tablet.component.scss'],
})
export class TabletComponent {
  @Input() ariaLabel = 'Listado de países';
  @Input() header: TableHeader[] = [];
  @Input() row: TableRow[] = [];

  @Output() rowClicked = new EventEmitter<TableRow>();

  selectedRow?: TableRow;

  getLabel(id: string): string {
    const match = this.header.find((h) => h.id === id);
    return match ? match.label : '';
  }

  get useVirtualScroll(): boolean {
    return this.row.length > 50;
  }

  onRowClick(item: TableRow): void {
    this.selectedRow = item;
    this.rowClicked.emit(item);
  }

  isSelected(item: TableRow): boolean {
    return this.selectedRow === item;
  }
}
