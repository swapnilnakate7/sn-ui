# sn-badge

A small badge/label component for Angular to display status indicators, counts, or tags.

## Installation

```bash
npm install @nicosnapps/sn-badge
```

## Usage

```typescript
import { SnBadgeComponent } from '@nicosnapps/sn-badge';

@Component({
  imports: [SnBadgeComponent],
  template: `
    <sn-badge text="New" scheme="primary"></sn-badge>
    <sn-badge text="3" scheme="danger"></sn-badge>
  `
})
```

## Part of [sn-ui](https://github.com/nicosnapps/sn-ui)
