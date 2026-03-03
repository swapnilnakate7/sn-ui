# sn-toggle

A toggle switch component for Angular with label support and multiple color schemes.

## Installation

```bash
npm i sn-toggle
```

## Usage

```typescript
import { ... } from 'sn-toggle';

@Component({
  imports: [SnToggleComponent],
  template: `
    <sn-toggle label="Dark Mode" [checked]="isDark" scheme="primary" (toggled)="isDark = $event"></sn-toggle>
  `
})
```

## Part of [sn-ui](https://github.com/nicosnapps/sn-ui)
