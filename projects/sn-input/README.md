# sn-input

A customizable text input component for Angular with label, placeholder, and validation support.

## Installation

```bash
npm i sn-input
```

## Usage

```typescript
import { SnInputComponent } from 'sn-input';

@Component({
  imports: [SnInputComponent],
  template: `
    <sn-input label="Email" placeholder="Enter your email" type="email" [(value)]="email"></sn-input>
  `
})
```

