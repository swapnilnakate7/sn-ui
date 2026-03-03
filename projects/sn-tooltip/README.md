# sn-tooltip

A lightweight tooltip directive for Angular that shows contextual information on hover.

## Installation

```bash
npm i sn-tooltip
```

## Usage

```typescript
import { ... } from 'sn-tooltip';

@Component({
  imports: [TooltipDirective],
  template: `
    <button snTooltip="Click to save" tooltipPosition="top">Save</button>
  `
})
```

