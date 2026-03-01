import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  header: string;
  key: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableRow {
  [key: string]: any;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'sn-datatable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-datatable.html',
  styleUrl: './sn-datatable.scss',
})
export class SnDatatableComponent implements OnInit {
  @Input() columns: TableColumn[] = [];
  @Input() data: TableRow[] = [];
  @Input() striped: boolean = true;
  @Input() hoverable: boolean = true;
  @Input() bordered: boolean = false;
  @Input() pageSize: number = 10;
  @Output() sorted = new EventEmitter<SortEvent>();

  sortedData: TableRow[] = [];
  paginatedData: TableRow[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.updateTable();
  }

  ngOnChanges(): void {
    this.updateTable();
  }

  sort(column: string): void {
    const col = this.columns.find(c => c.key === column);
    if (!col || col.sortable === false) return;

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sorted.emit({ column, direction: this.sortDirection });
    this.updateTable();
  }

  private updateTable(): void {
    // Sort data
    this.sortedData = [...this.data];
    if (this.sortColumn) {
      this.sortedData.sort((a, b) => {
        const aVal = a[this.sortColumn!];
        const bVal = b[this.sortColumn!];

        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        let comparison = 0;
        if (typeof aVal === 'string') {
          comparison = aVal.localeCompare(bVal);
        } else if (typeof aVal === 'number') {
          comparison = aVal - bVal;
        } else if (aVal instanceof Date && bVal instanceof Date) {
          comparison = aVal.getTime() - bVal.getTime();
        }

        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    // Paginate
    this.totalPages = Math.ceil(this.sortedData.length / this.pageSize);
    const startIdx = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = this.sortedData.slice(startIdx, startIdx + this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateTable();
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
}

