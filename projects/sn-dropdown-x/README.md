# sn-select
A powerful and accessible dropdown select component for Angular applications with search and multi-select support.
## Overview
The `sn-select` component provides a feature-rich dropdown with:
- ✅ Single and multi-select modes
- ✅ Search/filter functionality
- ✅ Clearable selections
- ✅ Disabled state for component and individual options
- ✅ Custom labels and placeholders
- ✅ Form control integration (ControlValueAccessor)
- ✅ Full accessibility support (ARIA labels)
- ✅ Keyboard navigation
- ✅ Click-outside-to-close behavior
## Installation
```bash
npm install sn-select
```
## Usage
### Basic Single Select
```typescript
import { Component } from '@angular/core';
import { SnSelectComponent, SelectOption } from 'sn-select';
@Component({
  selector: 'app-demo',
  template: `
    <sn-select 
      id="country"
      label="Country"
      placeholder="Select a country"
      [options]="countries"
      (changed)="onSelectionChange($event)"
    ></sn-select>
  `,
  imports: [SnSelectComponent]
})
export class DemoComponent {
  countries: SelectOption[] = [
    { label: 'USA', value: 'us' },
    { label: 'UK', value: 'uk' },
    { label: 'Canada', value: 'ca' },
  ];
  onSelectionChange(value: any): void {
    console.log('Selected:', value);
  }
}
```
### With Search
```typescript
<sn-select 
  id="searchable"
  label="Search Countries"
  [options]="countries"
  [searchable]="true"
  [(ngModel)]="selectedCountry"
></sn-select>
```
### Multi-Select
```typescript
<sn-select 
  id="multi"
  label="Select Multiple"
  [options]="options"
  [multiple]="true"
  [(ngModel)]="selectedValues"
></sn-select>
```
### With Reactive Forms
```typescript
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  template: `
    <form [formGroup]="form">
      <sn-select 
        id="category"
        label="Category"
        [options]="categories"
        formControlName="category"
      ></sn-select>
    </form>
  `,
  imports: [SnSelectComponent, ReactiveFormsModule]
})
export class FormComponent {
  form: FormGroup;
  categories: SelectOption[] = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Books', value: 'books' },
    { label: 'Clothing', value: 'clothing' },
  ];
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      category: ['electronics']
    });
  }
}
```
### Disabled Options
```typescript
options: SelectOption[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2 (Disabled)', value: 'opt2', disabled: true },
  { label: 'Option 3', value: 'opt3' },
];
```
## API
### Inputs
| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | `string` | `''` | HTML id attribute |
| `label` | `string` | `''` | Label text displayed above dropdown |
| `placeholder` | `string` | `'Select an option'` | Placeholder text |
| `name` | `string` | `''` | HTML name attribute |
| `options` | `SelectOption[]` | `[]` | Array of options to display |
| `disabled` | `boolean` | `false` | Whether dropdown is disabled |
| `searchable` | `boolean` | `false` | Enable search/filter functionality |
| `multiple` | `boolean` | `false` | Enable multi-select mode |
| `clearable` | `boolean` | `true` | Show clear button when value selected |
### SelectOption Interface
```typescript
interface SelectOption {
  label: string;      // Display text
  value: any;         // Actual value
  disabled?: boolean; // Optional disabled state
}
```
### Outputs
| Output | Type | Description |
|--------|------|-------------|
| `changed` | `EventEmitter<any>` | Emitted when selection changes |
## Features
### Search Functionality
When `searchable` is enabled, users can filter options by typing. The search is case-insensitive and matches against option labels.
### Multi-Select Mode
When `multiple` is enabled:
- Multiple options can be selected
- Selected count is displayed in trigger
- Checkboxes appear next to options
- Returns an array of selected values
### Clearable
When `clearable` is enabled, a clear button (✕) appears when options are selected, allowing users to quickly reset the selection.
## Styling
The component uses Tailwind CSS for styling. It includes:
- Blue color scheme for selected states
- Smooth transitions and hover effects
- Focus states with shadow effects
- Disabled state styling
- Dropdown positioning with z-index
- Scrollable options list
- Search input styling
## Testing
```bash
ng test sn-select
```
## Building
```bash
ng build sn-select
```
## Accessibility
The component includes:
- Proper ARIA labels and roles (combobox, listbox, option)
- Keyboard navigation support (Tab, Arrow keys, Enter, Escape)
- Focus indicators
- Semantic HTML structure
- Screen reader support for selected states
- aria-expanded for dropdown state
- aria-selected for option states
## Best Practices
1. **Provide meaningful labels:** Use descriptive labels for the select and options
2. **Keep option lists reasonable:** For very long lists, consider pagination or virtualization
3. **Use search for 10+ options:** Makes selection easier for users
4. **Clear option text:** Use concise, descriptive option labels
5. **Group related options:** If needed, consider creating separate selects
