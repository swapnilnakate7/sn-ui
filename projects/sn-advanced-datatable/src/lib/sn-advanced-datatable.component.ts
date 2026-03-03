import {
    Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AdvTableColumn {
    header: string;
    key: string;
    sortable?: boolean;
    filterable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
}

export interface AdvTableRow {
    [key: string]: any;
}

export interface AdvSortEvent {
    column: string;
    direction: 'asc' | 'desc';
}

@Component({
    selector: 'sn-advanced-datatable',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './sn-advanced-datatable.component.html',
    styleUrls: ['./sn-advanced-datatable.component.scss'],
})
export class SnAdvancedDatatableComponent implements OnInit, OnChanges {
    // --- Data ---
    @Input() columns: AdvTableColumn[] = [];
    @Input() data: AdvTableRow[] = [];

    // --- Features ---
    @Input() searchable: boolean = true;
    @Input() filterable: boolean = false;
    @Input() selectable: boolean = false;
    @Input() expandable: boolean = false;
    @Input() expandedRowTemplate: TemplateRef<any> | null = null;

    // --- Appearance ---
    @Input() striped: boolean = true;
    @Input() hoverable: boolean = true;
    @Input() bordered: boolean = false;
    @Input() pageSize: number = 10;
    @Input() pageSizeOptions: number[] = [5, 10, 25, 50];

    // --- Outputs ---
    @Output() sorted = new EventEmitter<AdvSortEvent>();
    @Output() selectionChange = new EventEmitter<AdvTableRow[]>();
    @Output() rowExpanded = new EventEmitter<AdvTableRow>();

    // --- Internal State ---
    processedData: AdvTableRow[] = [];
    paginatedData: AdvTableRow[] = [];
    currentPage: number = 1;
    totalPages: number = 1;
    totalFilteredItems: number = 0;

    sortColumn: string | null = null;
    sortDirection: 'asc' | 'desc' = 'asc';

    searchQuery: string = '';
    columnFilters: { [key: string]: string } = {};

    selectedRows: Set<number> = new Set();
    allSelected: boolean = false;

    expandedRows: Set<number> = new Set();

    ngOnInit(): void {
        this.processTable();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] || changes['columns'] || changes['pageSize']) {
            this.processTable();
        }
    }

    // --- Searching ---
    onSearchChange(): void {
        this.currentPage = 1;
        this.processTable();
    }

    // --- Column Filtering ---
    onFilterChange(): void {
        this.currentPage = 1;
        this.processTable();
    }

    // --- Sorting ---
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
        this.processTable();
    }

    getSortIcon(column: string): string {
        if (this.sortColumn !== column) return '↕';
        return this.sortDirection === 'asc' ? '↑' : '↓';
    }

    // --- Selection ---
    toggleSelectAll(): void {
        if (this.allSelected) {
            this.selectedRows.clear();
            this.allSelected = false;
        } else {
            this.paginatedData.forEach((_, i) => {
                const globalIndex = (this.currentPage - 1) * this.pageSize + i;
                this.selectedRows.add(globalIndex);
            });
            this.allSelected = true;
        }
        this.emitSelection();
    }

    toggleRowSelect(globalIndex: number): void {
        if (this.selectedRows.has(globalIndex)) {
            this.selectedRows.delete(globalIndex);
        } else {
            this.selectedRows.add(globalIndex);
        }
        this.allSelected = this.paginatedData.every((_, i) => {
            return this.selectedRows.has((this.currentPage - 1) * this.pageSize + i);
        });
        this.emitSelection();
    }

    isRowSelected(globalIndex: number): boolean {
        return this.selectedRows.has(globalIndex);
    }

    private emitSelection(): void {
        const selected = Array.from(this.selectedRows).map(i => this.processedData[i]).filter(Boolean);
        this.selectionChange.emit(selected);
    }

    // --- Expansion ---
    toggleRowExpand(globalIndex: number): void {
        if (this.expandedRows.has(globalIndex)) {
            this.expandedRows.delete(globalIndex);
        } else {
            this.expandedRows.add(globalIndex);
            this.rowExpanded.emit(this.processedData[globalIndex]);
        }
    }

    isRowExpanded(globalIndex: number): boolean {
        return this.expandedRows.has(globalIndex);
    }

    // --- Pagination ---
    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.updatePaginatedData();
        }
    }

    nextPage(): void { this.goToPage(this.currentPage + 1); }
    prevPage(): void { this.goToPage(this.currentPage - 1); }

    onPageSizeChange(): void {
        this.currentPage = 1;
        this.processTable();
    }

    getVisiblePages(): number[] {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(this.totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    // --- Core Processing Pipeline ---
    private processTable(): void {
        let result = [...this.data];

        // 1. Global search filter
        if (this.searchQuery.trim()) {
            const query = this.searchQuery.toLowerCase();
            result = result.filter(row =>
                this.columns.some(col => {
                    const val = row[col.key];
                    return val !== null && val !== undefined && String(val).toLowerCase().includes(query);
                })
            );
        }

        // 2. Per-column filters
        if (this.filterable) {
            for (const col of this.columns) {
                const filter = this.columnFilters[col.key];
                if (filter && filter.trim()) {
                    const filterLower = filter.toLowerCase();
                    result = result.filter(row => {
                        const val = row[col.key];
                        return val !== null && val !== undefined && String(val).toLowerCase().includes(filterLower);
                    });
                }
            }
        }

        // 3. Sort
        if (this.sortColumn) {
            const dir = this.sortDirection;
            result.sort((a, b) => {
                const aVal = a[this.sortColumn!];
                const bVal = b[this.sortColumn!];
                if (aVal === null || aVal === undefined) return 1;
                if (bVal === null || bVal === undefined) return -1;

                let cmp = 0;
                if (typeof aVal === 'string') cmp = aVal.localeCompare(bVal);
                else if (typeof aVal === 'number') cmp = aVal - bVal;
                else if (aVal instanceof Date && bVal instanceof Date) cmp = aVal.getTime() - bVal.getTime();

                return dir === 'asc' ? cmp : -cmp;
            });
        }

        this.processedData = result;
        this.totalFilteredItems = result.length;
        this.totalPages = Math.max(1, Math.ceil(result.length / this.pageSize));

        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
        }

        this.updatePaginatedData();
    }

    private updatePaginatedData(): void {
        const start = (this.currentPage - 1) * this.pageSize;
        this.paginatedData = this.processedData.slice(start, start + this.pageSize);
    }
}
