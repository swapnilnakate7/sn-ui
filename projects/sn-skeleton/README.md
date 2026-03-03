# sn-skeleton

A flexible skeleton loading placeholder for Angular applications. Perfect for displaying while content is being fetched.

## Installation

```bash
npm i sn-skeleton
```

## Usage

```typescript
import { ... } from 'sn-skeleton';

@Component({
  imports: [SnSkeletonComponent],
  template: `
    <sn-skeleton type="text" width="60%" height="1rem" animation="pulse"></sn-skeleton>
    <sn-skeleton type="circle" width="3rem" height="3rem" animation="wave"></sn-skeleton>
    <sn-skeleton type="rectangle" width="100%" height="8rem"></sn-skeleton>
  `
})
```

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `type` | `'text' \| 'circle' \| 'rectangle'` | `'text'` | Shape of the skeleton |
| `animation` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | Animation style |
| `width` | `string` | `'100%'` | Width (CSS value) |
| `height` | `string` | `'1rem'` | Height (CSS value) |
| `customClass` | `string` | `''` | Additional CSS classes |

