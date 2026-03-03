# sn-progress-bar

A linear progress bar component for Angular with determinate and indeterminate modes, multiple themes, and size variants.

## Installation

```bash
npm install @nicosnapps/sn-progress-bar
```

## Usage

```typescript
import { SnProgressBarComponent } from '@nicosnapps/sn-progress-bar';

@Component({
  imports: [SnProgressBarComponent],
  template: `
    <sn-progress-bar [value]="75" theme="success" size="md" [showLabel]="true"></sn-progress-bar>
    <sn-progress-bar [indeterminate]="true" theme="warn"></sn-progress-bar>
  `
})
```

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Current progress (0–100) |
| `max` | `number` | `100` | Maximum value |
| `indeterminate` | `boolean` | `false` | Show animated loading stripe |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Track height |
| `theme` | `'primary' \| 'success' \| 'warn' \| 'danger' \| 'info'` | `'primary'` | Color scheme |
| `showLabel` | `boolean` | `false` | Show percentage label |
| `labelText` | `string` | `''` | Custom label prefix |

## Part of [sn-ui](https://github.com/nicosnapps/sn-ui)
