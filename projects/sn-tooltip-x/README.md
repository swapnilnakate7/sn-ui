# sn-tooltip-x

A lightweight tooltip directive for Angular that shows contextual information on hover.

## Installation

```bash
npm i sn-tooltip-x
```

## Usage

```typescript
import { TooltipDirective } from 'sn-tooltip-x';

@Component({
  imports: [TooltipDirective],
  template: `
    <button snTooltip="Click to save" tooltipPosition="top">Save</button>
  `
})
```

