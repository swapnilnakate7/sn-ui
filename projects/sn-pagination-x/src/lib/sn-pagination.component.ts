import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SnPaginationSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'sn-pagination-x',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-pagination.component.html',
  styleUrls: ['./sn-pagination.component.scss'],
})
export class SnPaginationComponent implements OnChanges {
  /**
   * Total number of items across all pages.
   */
  @Input() totalItems: number = 0;

  /**
   * Number of items per page.
   */
  @Input() pageSize: number = 10;

  /**
   * The current active page (1-indexed).
   */
  @Input() currentPage: number = 1;

  /**
   * Number of page buttons to show (excluding first/last/prev/next).
   */
  @Input() maxPagesVisible: number = 5;

  /**
   * Current size of the pagination component.
   */
  @Input() size: SnPaginationSize = 'md';

  /**
   * Disables the entire pagination control.
   */
  @Input() disabled: boolean = false;

  /**
   * Event emitted when the page changes.
   */
  @Output() pageChange = new EventEmitter<number>();

  totalPages: number = 0;
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] || changes['pageSize'] || changes['maxPagesVisible'] || changes['currentPage']) {
      this.calculatePages();
    }
  }

  calculatePages(): void {
    this.totalPages = Math.ceil(Math.max(this.totalItems, 0) / Math.max(this.pageSize, 1));
    this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPages));

    const half = Math.floor(this.maxPagesVisible / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + this.maxPagesVisible - 1);

    if (end - start + 1 < this.maxPagesVisible) {
      start = Math.max(1, end - this.maxPagesVisible + 1);
    }

    this.pages = [];
    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    if (this.disabled || page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.calculatePages();
    this.pageChange.emit(this.currentPage);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }
}
