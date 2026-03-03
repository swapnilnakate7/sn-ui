# sn-breadcrumbs

A hierarchical navigation breadcrumbs component for Angular with custom SVG separators and interactive links.

## Installation

```bash
npm i sn-breadcrumbs
```

## Usage

```typescript
import { SnBreadcrumbsComponent } from 'sn-breadcrumbs';

@Component({
  imports: [SnBreadcrumbsComponent],
  template: `
    <sn-breadcrumbs 
      [items]="[
        { label: 'Home', path: '/' },
        { label: 'Products', path: '/products' },
        { label: 'Current Page' }
      ]"
      (itemClick)="onNavigate($event)">
    </sn-breadcrumbs>
  `
})
```

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `items` | `BreadcrumbItem[]` | `[]` | Array of `{ label, path?, disabled? }` |

## Outputs

| Output | Type | Description |
|---|---|---|
| `itemClick` | `EventEmitter<BreadcrumbItem>` | Fires when a breadcrumb link is clicked |

