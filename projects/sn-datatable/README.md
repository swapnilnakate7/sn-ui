# sn-table
A powerful and flexible data table component for Angular with sorting, pagination, and multiple styling options.
## Overview
The `sn-table` component provides:
- ✅ Sortable columns (click header to sort)
- ✅ Pagination with next/previous navigation
- ✅ Multiple row styling (striped, hoverable, bordered)
- ✅ Responsive table layout
- ✅ Empty state handling
- ✅ Support for multiple data types
- ✅ Customizable column alignment
- ✅ Full accessibility support
## Installation
```bash
npm install sn-table
```
## Usage
### Basic Table
```typescript
import { Component } from '@angular/core';
import { SnTableComponent, TableColumn, TableRow } from 'sn-table';
@Component({
  selector: 'app-demo',
  template: `
    <sn-table 
      [columns]="columns"
      [data]="employees"
    ></sn-table>
  `,
  imports: [SnTableComponent]
})
export class DemoComponent {
  columns: TableColumn[] = [
    { header: 'ID', key: 'id', sortable: true },
    { header: 'Name', key: 'name', sortable: true },
    { header: 'Email', key: 'email', sortable: true },
    { header: 'Status', key: 'status', sortable: false },
  ];
  employees: TableRow[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', status: 'Active' },
    { id: 2, name: 'Bob', email: 'bob@example.com', status: 'Inactive' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', status: 'Active' },
  ];
}
```
### With Styling Options
```typescript
<sn-table 
  [columns]="columns"
  [data]="data"
  [striped]="true"
  [hoverable]="true"
  [bordered]="false"
  [pageSize]="25"
  (sorted)="onSort($event)"
></sn-table>
```
### With Custom Column Width and Alignment
```typescript
columns: TableColumn[] = [
  { header: 'ID', key: 'id', width: '100px', align: 'center' },
  { header: 'Name', key: 'name', width: '200px', align: 'left' },
  { header: 'Email', key: 'email', width: '250px', align: 'left' },
  { header: 'Amount', key: 'amount', width: '150px', align: 'right' },
];
```
## API
### Inputs
| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `columns` | `TableColumn[]` | `[]` | Column definitions |
| `data` | `TableRow[]` | `[]` | Table data rows |
| `striped` | `boolean` | `true` | Alternate row colors |
| `hoverable` | `boolean` | `true` | Highlight row on hover |
| `bordered` | `boolean` | `false` | Show table border |
| `pageSize` | `number` | `10` | Rows per page |
### Outputs
| Output | Type | Description |
|--------|------|-------------|
| `sorted` | `EventEmitter<SortEvent>` | Emitted when column is sorted |
### Interfaces
```typescript
interface TableColumn {
  header: string;        // Column header text
  key: string;          // Data key (object property)
  sortable?: boolean;   // Allow sorting (default: true)
  width?: string;       // CSS width (e.g., '200px', '20%')
  align?: 'left' | 'center' | 'right';  // Text alignment
}
interface TableRow {
  [key: string]: any;   // Any key-value pairs
}
interface SortEvent {
  column: string;       // Sorted column key
  direction: 'asc' | 'desc';  // Sort direction
}
```
## Features
### Sorting
Click any sortable column header to sort. Click again to reverse direction. Supports:
- Strings (alphabetical)
- Numbers (numeric)
- Dates (chronological)
### Pagination
Automatically paginated based on `pageSize`. Navigation buttons appear when data exceeds one page.
### Styling Options
- **Striped:** Alternate row background colors
- **Hoverable:** Highlight rows on hover
- **Bordered:** Show table border
## Styling
The table uses Tailwind CSS utilities and custom SCSS. Customization via:
- CSS variables (future)
- SCSS variables override
- Custom CSS classes
## Testing
```bash
ng test sn-table
```
## Building
```bash
ng build sn-table
```
## Accessibility
- Semantic HTML table structure
- Proper heading hierarchy
- Sortable column indicators
- Keyboard navigation support
- Screen reader friendly
## Best Practices
1. **Make relevant columns sortable** - Set `sortable: false` for status/action columns
2. **Set appropriate column widths** - Fixed widths for better layout control
3. **Use correct alignment** - Right-align numbers, left-align text
4. **Handle empty states** - Component shows "No data available" message
5. **Optimize page size** - Balance between scrolling and loading time
