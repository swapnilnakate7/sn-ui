# sn-tabs-x

A tabbed navigation component for Angular with dynamic tab panels and customizable styling.

## Installation

```bash
npm i sn-tabs-x
```

## Usage

```typescript
import { ... } from 'sn-tabs-x';

@Component({
  imports: [SnTabsXComponent],
  template: `
    <sn-tabs-x [tabs]="tabs"></sn-tabs-x>
  `
})
export class MyComponent {
  tabs = [
    { label: 'Overview', content: 'Overview panel content' },
    { label: 'Settings', content: 'Settings panel content' },
  ];
}
```

