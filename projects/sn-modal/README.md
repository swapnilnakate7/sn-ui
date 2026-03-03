# sn-modal

A dialog/modal component for Angular with backdrop, close button, and customizable content.

## Installation

```bash
npm install @nicosnapps/sn-modal
```

## Usage

```typescript
import { SnModalComponent } from '@nicosnapps/sn-modal';

@Component({
  imports: [SnModalComponent],
  template: `
    <button (click)="open = true">Open Modal</button>
    <sn-modal [isOpen]="open" title="Confirm Action" (closed)="open = false">
      <p>Are you sure you want to proceed?</p>
    </sn-modal>
  `
})
```

## Part of [sn-ui](https://github.com/nicosnapps/sn-ui)
