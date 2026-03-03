# sn-avatar

A lightweight, customizable avatar component for Angular applications.

## Installation

```bash
npm i sn-avatar
```

## Usage

```typescript
import { ... } from 'sn-avatar';

@Component({
  imports: [SnAvatarComponent],
  template: `
    <sn-avatar src="https://example.com/photo.jpg" size="md" shape="circle"></sn-avatar>
    <sn-avatar initials="JD" bgColor="#3b82f6" textColor="#fff" size="lg"></sn-avatar>
  `
})
```

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | `''` | URL of the avatar image |
| `alt` | `string` | `''` | Alt text for the image |
| `initials` | `string` | `''` | Fallback text when no image is provided |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the avatar |
| `shape` | `'circle' \| 'square' \| 'rounded'` | `'circle'` | Shape of the avatar |
| `bgColor` | `string` | — | Background color for initials |
| `textColor` | `string` | — | Text color for initials |

## Part of [sn-ui](https://github.com/nicosnapps/sn-ui)
