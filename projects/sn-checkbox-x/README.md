# sn-checkbox

A customizable and accessible checkbox component for Angular applications.

## Overview

The `sn-checkbox` component provides a modern, styled checkbox input with support for:

- ✅ Standard checked/unchecked states
- ✅ Indeterminate state (for multi-select patterns)
- ✅ Disabled state
- ✅ Custom labels
- ✅ Form control integration (ControlValueAccessor)
- ✅ Full accessibility support (ARIA labels)
- ✅ Keyboard navigation

## Installation

```bash
npm install sn-checkbox
```

## Usage

### Basic Checkbox

```typescript
import { Component } from '@angular/core';
import { SnCheckboxComponent } from 'sn-checkbox';

@Component({
  selector: 'app-demo',
  template: `
    <sn-checkbox 
      id="agree"
      label="I agree to the terms"
      (changed)="onChecked($event)"
    ></sn-checkbox>
  `,
  imports: [SnCheckboxComponent]
})
export class DemoComponent {
  onChecked(value: boolean): void {
    console.log('Checkbox value:', value);
  }
}
```

### With Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SnCheckboxComponent } from 'sn-checkbox';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="form">
      <sn-checkbox 
        id="newsletter"
        label="Subscribe to newsletter"
        formControlName="newsletter"
      ></sn-checkbox>
    </form>
  `,
  imports: [SnCheckboxComponent, ReactiveFormsModule]
})
export class FormComponent {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      newsletter: [false]
    });
  }
}
```

### With Template Forms

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SnCheckboxComponent } from 'sn-checkbox';

@Component({
  selector: 'app-template-form',
  template: `
    <sn-checkbox 
      id="terms"
      [(ngModel)]="accepted"
      label="I accept"
    ></sn-checkbox>
  `,
  imports: [SnCheckboxComponent, FormsModule]
})
export class TemplateFormComponent {
  accepted: boolean = false;
}
```

### Indeterminate State

```typescript
<sn-checkbox 
  id="select-all"
  [indeterminate]="someSelected && !allSelected"
  [checked]="allSelected"
  label="Select All"
></sn-checkbox>
```

### Disabled State

```typescript
<sn-checkbox 
  id="disabled-check"
  [disabled]="true"
  label="Disabled checkbox"
></sn-checkbox>
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | `string` | `''` | HTML id attribute for the checkbox |
| `label` | `string` | `''` | Label text displayed next to the checkbox |
| `name` | `string` | `''` | HTML name attribute for the checkbox |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `indeterminate` | `boolean` | `false` | Whether the checkbox is in indeterminate state |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `changed` | `EventEmitter<boolean>` | Emitted when checkbox state changes |

### Methods

The component implements `ControlValueAccessor` for seamless integration with Angular forms.

## Styling

The component uses Tailwind CSS for styling. It includes:

- Blue color scheme (customizable via CSS variables)
- Smooth transitions and hover effects
- Focus states with shadow effects
- Disabled state styling
- Dark and light mode compatible

## Testing

```bash
ng test sn-checkbox
```

## Building

```bash
ng build sn-checkbox
```

## Accessibility

The component includes:

- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators
- Semantic HTML structure
- Support for indeterminate state indication
## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
