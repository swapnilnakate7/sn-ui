# sn-tooltip

A lightweight tooltip directive for Angular that shows contextual information on hover.

## Installation

```bash
npm install @nicosnapps/sn-tooltip
```

## Usage

```typescript
import { TooltipDirective } from '@nicosnapps/sn-tooltip';

@Component({
  imports: [TooltipDirective],
  template: `
    <button snTooltip="Click to save" tooltipPosition="top">Save</button>
  `
})
```

## Part of [sn-ui](https://github.com/nicosnapps/sn-ui)
