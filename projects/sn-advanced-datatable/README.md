# sn-advanced-datatable

A feature-rich data table for Angular with search, filtering, sorting, row selection, expandable rows, and pagination.

## Installation

```bash
npm install @nicosnapps/sn-advanced-datatable
```

## Usage

```typescript
import { SnAdvancedDatatableComponent } from '@nicosnapps/sn-advanced-datatable';

@Component({
  imports: [SnAdvancedDatatableComponent],
  template: `
    <sn-advanced-datatable 
      [columns]="columns" 
      [data]="data"
      [searchable]="true"
      [filterable]="true"
      [selectable]="true"
      [expandable]="true"
      [pageSize]="10">
    </sn-advanced-datatable>
  `
})
export class MyComponent {
  columns = [
    { header: 'Name', key: 'name', sortable: true, filterable: true },
    { header: 'Email', key: 'email', sortable: true },
    { header: 'Status', key: 'status', sortable: true, filterable: true },
  ];
  data = [
    { name: 'Alice', email: 'alice@co.com', status: 'Active' },
    { name: 'Bob', email: 'bob@co.com', status: 'Inactive' },
  ];
}
```

## Features

| Feature | Description |
|---|---|
| **Global search** | Full-text filter across all columns |
| **Column filters** | Per-column text inputs |
| **Sorting** | Click headers to sort asc/desc |
| **Row selection** | Checkbox-based, select-all per page |
| **Expandable rows** | Accordion content with custom `ng-template` |
| **Pagination** | Page size selector, visible page range |
| **Appearance** | Striped, hoverable, bordered options |

## Part of [sn-ui](https://github.com/nicosnapps/sn-ui)
