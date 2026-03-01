# sn-radio

A customizable and accessible radio button component for Angular applications.

## Overview

The `sn-radio` component provides a modern, styled radio input with support for:

- ✅ Standard selected/unselected states
- ✅ Radio button grouping (multiple radios with same name)
- ✅ Disabled state
- ✅ Custom labels
- ✅ Form control integration (ControlValueAccessor)
- ✅ Full accessibility support (ARIA labels)
- ✅ Keyboard navigation
- ✅ Value-based selection

## Installation

```bash
npm install sn-radio
```

## Usage

### Basic Radio Button

```typescript
import { Component } from '@angular/core';
import { SnRadioComponent } from 'sn-radio';

@Component({
  selector: 'app-demo',
  template: `
    <sn-radio 
      id="option1"
      name="choice"
      value="option1"
      label="Option 1"
      (changed)="onSelected($event)"
    ></sn-radio>
    <sn-radio 
      id="option2"
      name="choice"
      value="option2"
      label="Option 2"
      (changed)="onSelected($event)"
    ></sn-radio>
  `,
  imports: [SnRadioComponent]
})
export class DemoComponent {
  onSelected(value: any): void {
    console.log('Selected:', value);
  }
}
```

### With Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SnRadioComponent } from 'sn-radio';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="form">
      <div>
        <sn-radio 
          id="male"
          name="gender"
          value="male"
          label="Male"
          formControlName="gender"
        ></sn-radio>
        <sn-radio 
          id="female"
          name="gender"
          value="female"
          label="Female"
          formControlName="gender"
        ></sn-radio>
      </div>
    </form>
  `,
  imports: [SnRadioComponent, ReactiveFormsModule]
})
export class FormComponent {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      gender: ['male']
    });
  }
}
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | `string` | `''` | HTML id attribute for the radio button |
| `label` | `string` | `''` | Label text displayed next to the radio button |
| `name` | `string` | `''` | HTML name attribute (group radios with same name) |
| `value` | `any` | `undefined` | Value associated with this radio button |
| `disabled` | `boolean` | `false` | Whether the radio button is disabled |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `changed` | `EventEmitter<any>` | Emitted when radio button is selected |

## Testing

```bash
ng test sn-radio
```

## Building

```bash
ng build sn-radio
```

## Accessibility

The component includes:

- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators
- Semantic HTML structure
- Support for grouping via name attribute
