# sn-textarea

A customizable and accessible multi-line text input component for Angular applications with auto-resize and character counter support.

## Overview

The `sn-textarea` component provides a modern, styled textarea input with support for:

- ✅ Multi-line text input
- ✅ Auto-resize based on content (optional)
- ✅ Character counter with max length support
- ✅ Disabled and readonly states
- ✅ Custom labels and placeholders
- ✅ Form control integration (ControlValueAccessor)
- ✅ Full accessibility support (ARIA labels)
- ✅ Keyboard navigation
- ✅ Customizable row height

## Installation

```bash
npm install sn-textarea
```

## Usage

### Basic Textarea

```typescript
import { Component } from '@angular/core';
import { SnTextareaComponent } from 'sn-textarea';

@Component({
  selector: 'app-demo',
  template: `
    <sn-textarea 
      id="comments"
      label="Comments"
      placeholder="Enter your comments"
      (changed)="onChanged($event)"
    ></sn-textarea>
  `,
  imports: [SnTextareaComponent]
})
export class DemoComponent {
  onChanged(value: string): void {
    console.log('Value:', value);
  }
}
```

### With Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SnTextareaComponent } from 'sn-textarea';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="form">
      <sn-textarea 
        id="bio"
        label="Bio"
        placeholder="Tell us about yourself"
        formControlName="bio"
      ></sn-textarea>
    </form>
  `,
  imports: [SnTextareaComponent, ReactiveFormsModule]
})
export class FormComponent {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      bio: ['']
    });
  }
}
```

### With Character Counter

```typescript
import { Component } from '@angular/core';
import { SnTextareaComponent } from 'sn-textarea';

@Component({
  selector: 'app-counter',
  template: `
    <sn-textarea 
      id="description"
      label="Description"
      placeholder="Max 500 characters"
      [maxLength]="500"
      [(ngModel)]="description"
    ></sn-textarea>
  `,
  imports: [SnTextareaComponent]
})
export class CounterComponent {
  description: string = '';
}
```

### With Auto-Resize

```typescript
<sn-textarea 
  id="feedback"
  label="Feedback"
  placeholder="Type your feedback"
  [autoResize]="true"
  [rows]="4"
></sn-textarea>
```

### Readonly State

```typescript
<sn-textarea 
  id="readonly-text"
  label="Read Only"
  value="This is read-only content"
  [readonly]="true"
></sn-textarea>
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | `string` | `''` | HTML id attribute for the textarea |
| `label` | `string` | `''` | Label text displayed above the textarea |
| `placeholder` | `string` | `''` | Placeholder text for the textarea |
| `name` | `string` | `''` | HTML name attribute |
| `rows` | `number` | `4` | Number of rows to display |
| `maxLength` | `number \| null` | `null` | Maximum character length allowed |
| `disabled` | `boolean` | `false` | Whether the textarea is disabled |
| `autoResize` | `boolean` | `true` | Auto-resize textarea based on content |
| `readonly` | `boolean` | `false` | Whether the textarea is readonly |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `changed` | `EventEmitter<string>` | Emitted when textarea value changes |

## Features

### Auto-Resize
When `autoResize` is enabled, the textarea automatically adjusts its height based on the content, making it ideal for dynamic content.

### Character Counter
When `maxLength` is set, a character counter is displayed showing current / max characters. This helps users understand how much space they have left.

### Form Integration
The component works seamlessly with both Reactive Forms and Template Forms through the ControlValueAccessor interface.

## Styling

The component uses Tailwind CSS for styling. It includes:

- Blue color scheme for focus states
- Smooth transitions and hover effects
- Focus states with shadow effects
- Disabled and readonly state styling
- Dark and light mode compatible
- Responsive sizing

## Testing

```bash
ng test sn-textarea
```

## Building

```bash
ng build sn-textarea
```

## Accessibility

The component includes:

- Proper ARIA labels for screen readers
- Keyboard navigation support (Tab, Enter for new lines)
- Focus indicators
- Semantic HTML structure
- Character counter for users with visual limitations
- Label associated with textarea via id attribute

