# sn-alert

A notification alert component for Angular with multiple severity levels and dismissible option.

## Installation

```bash
npm install @nicosnapps/sn-alert
```

## Usage

```typescript
import { SnAlertComponent } from '@nicosnapps/sn-alert';

@Component({
  imports: [SnAlertComponent],
  template: `
    <sn-alert type="success" message="Operation completed successfully!"></sn-alert>
    <sn-alert type="danger" message="Something went wrong." [dismissible]="true"></sn-alert>
  `
})
```

## Part of [sn-ui](https://github.com/nicosnapps/sn-ui)
