# sn-empty-state

A polished empty state display component for Angular applications. Use it when tables, lists, or views have no data to show.

## Installation

```bash
npm i sn-empty-state
```

## Usage

```typescript
import { ... } from 'sn-empty-state';

@Component({
  imports: [SnEmptyStateComponent],
  template: `
    <sn-empty-state 
      title="No items found" 
      description="Get started by adding a new item."
      actionText="Add Item"
      (actionClicked)="onAdd()">
    </sn-empty-state>
  `
})
```

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `''` | Heading text |
| `description` | `string` | `''` | Supporting message |
| `actionText` | `string` | `''` | CTA button label (hidden if empty) |
| `iconClass` | `string` | `''` | Custom icon class |

## Outputs

| Output | Type | Description |
|---|---|---|
| `actionClicked` | `EventEmitter<void>` | Fires when the CTA button is clicked |

