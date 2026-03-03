# sn-input

A customizable text input component for Angular with label, placeholder, and validation support.

## Installation

```bash
npm install @nicosnapps/sn-input
```

## Usage

```typescript
import { SnInputComponent } from '@nicosnapps/sn-input';

@Component({
  imports: [SnInputComponent],
  template: `
    <sn-input label="Email" placeholder="Enter your email" type="email" [(value)]="email"></sn-input>
  `
})
```

## Part of [sn-ui](https://github.com/nicosnapps/sn-ui)
