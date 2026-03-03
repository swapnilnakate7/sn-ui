# sn-pagination-x

A clean pagination component for Angular applications with configurable page sizes and navigation.

## Installation

```bash
npm i sn-pagination-x
```

## Usage

```typescript
import { SnPaginationComponent } from 'sn-pagination-x';

@Component({
  imports: [SnPaginationComponent],
  template: `
    <sn-pagination-x 
      [totalItems]="120" 
      [pageSize]="10" 
      [currentPage]="1" 
      size="md"
      (pageChange)="onPageChange($event)">
    </sn-pagination-x>
  `
})
```

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `totalItems` | `number` | `0` | Total number of items |
| `pageSize` | `number` | `10` | Items per page |
| `currentPage` | `number` | `1` | Active page (1-indexed) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disable all interactions |

## Outputs

| Output | Type | Description |
|---|---|---|
| `pageChange` | `EventEmitter<number>` | Emits the new page number |

