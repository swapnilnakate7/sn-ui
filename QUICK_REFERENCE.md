# Quick Reference - New SnUi Form Components

## Installation & Import

All components are standalone and ready to use:

```typescript
import { SnCheckboxComponent } from './projects/sn-checkbox/src/public-api';
import { SnRadioComponent } from './projects/sn-radio/src/public-api';
import { SnTextareaComponent } from './projects/sn-textarea/src/public-api';
```

---

## sn-checkbox

### Basic Usage
```typescript
<sn-checkbox 
  id="agree"
  label="I agree to terms"
  (changed)="onChecked($event)"
></sn-checkbox>
```

### With ngModel
```typescript
<sn-checkbox 
  id="subscribe"
  label="Subscribe to newsletter"
  [(ngModel)]="isSubscribed"
></sn-checkbox>
```

### Indeterminate State
```typescript
<sn-checkbox 
  id="select-all"
  label="Select All"
  [indeterminate]="hasPartialSelection"
  [checked]="allSelected"
></sn-checkbox>
```

### API Quick Lookup
| Input | Type | Default |
|-------|------|---------|
| id | string | '' |
| label | string | '' |
| disabled | boolean | false |
| indeterminate | boolean | false |
| **Output** | **Type** | **When** |
| changed | EventEmitter<boolean> | Value changes |

---

## sn-radio

### Basic Group
```typescript
<sn-radio 
  id="male"
  name="gender"
  value="male"
  label="Male"
  [(ngModel)]="selectedGender"
></sn-radio>
<sn-radio 
  id="female"
  name="gender"
  value="female"
  label="Female"
  [(ngModel)]="selectedGender"
></sn-radio>
```

### With FormControl
```typescript
<sn-radio 
  id="yes"
  name="confirm"
  value="yes"
  label="Yes"
  formControlName="confirmation"
></sn-radio>
```

### Dynamic List
```typescript
@for (option of options; track option.id) {
  <sn-radio 
    [id]="option.id"
    name="dynamic"
    [value]="option.value"
    [label]="option.label"
    [(ngModel)]="selectedValue"
  ></sn-radio>
}
```

### API Quick Lookup
| Input | Type | Default |
|-------|------|---------|
| id | string | '' |
| label | string | '' |
| name | string | '' |
| value | any | undefined |
| disabled | boolean | false |
| **Output** | **Type** | **When** |
| changed | EventEmitter<any> | Selected |

---

## sn-textarea

### Basic Usage
```typescript
<sn-textarea 
  id="comments"
  label="Comments"
  placeholder="Enter your comments"
  (changed)="onChanged($event)"
></sn-textarea>
```

### With Character Counter
```typescript
<sn-textarea 
  id="description"
  label="Description"
  placeholder="Max 500 characters"
  [maxLength]="500"
  [(ngModel)]="description"
></sn-textarea>
```

### Auto-Resize
```typescript
<sn-textarea 
  id="feedback"
  label="Feedback"
  placeholder="This will auto-resize"
  [autoResize]="true"
  [rows]="4"
></sn-textarea>
```

### Readonly
```typescript
<sn-textarea 
  id="readonly"
  label="Read Only"
  [readonly]="true"
  value="Cannot edit this"
></sn-textarea>
```

### API Quick Lookup
| Input | Type | Default |
|-------|------|---------|
| id | string | '' |
| label | string | '' |
| placeholder | string | '' |
| rows | number | 4 |
| maxLength | number \| null | null |
| disabled | boolean | false |
| autoResize | boolean | true |
| readonly | boolean | false |
| **Output** | **Type** | **When** |
| changed | EventEmitter<string> | Input changes |

---

## Form Integration Examples

### Reactive Forms (All Components)
```typescript
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="form">
      <sn-checkbox 
        formControlName="agree"
        label="I agree"
      ></sn-checkbox>
      
      <sn-radio 
        formControlName="choice"
        name="options"
        value="opt1"
        label="Option 1"
      ></sn-radio>
      
      <sn-textarea 
        formControlName="comments"
        label="Comments"
      ></sn-textarea>
      
      <button [disabled]="form.invalid">Submit</button>
    </form>
  `,
  imports: [
    ReactiveFormsModule,
    SnCheckboxComponent,
    SnRadioComponent,
    SnTextareaComponent
  ]
})
export class FormComponent {
  form = this.fb.group({
    agree: [false],
    choice: ['opt1'],
    comments: ['']
  });
  
  constructor(private fb: FormBuilder) {}
}
```

### Template Forms (All Components)
```typescript
@Component({
  template: `
    <sn-checkbox 
      [(ngModel)]="data.agree"
      label="I agree"
    ></sn-checkbox>
    
    <sn-radio 
      [(ngModel)]="data.choice"
      name="options"
      value="opt1"
      label="Option 1"
    ></sn-radio>
    
    <sn-textarea 
      [(ngModel)]="data.comments"
      label="Comments"
    ></sn-textarea>
  `,
  imports: [
    FormsModule,
    SnCheckboxComponent,
    SnRadioComponent,
    SnTextareaComponent
  ]
})
export class FormComponent {
  data = {
    agree: false,
    choice: 'opt1',
    comments: ''
  };
}
```

---

## Common Patterns

### Conditional Display
```typescript
@if (form.get('agree')?.value) {
  <p>Thanks for agreeing!</p>
}
```

### Disable Based on Condition
```typescript
<sn-textarea 
  [disabled]="isLoading"
  label="Comments"
></sn-textarea>
```

### Value Change Tracking
```typescript
<sn-radio 
  (changed)="onSelectionChange($event)"
  name="option"
  value="value1"
  label="Option 1"
></sn-radio>
```

### Character Limit Warning
```typescript
<div>
  <sn-textarea 
    [maxLength]="100"
    [(ngModel)]="text"
  ></sn-textarea>
  @if (text.length > 80) {
    <p class="text-warning">Getting close to limit!</p>
  }
</div>
```

---

## Styling Customization

All components use Tailwind CSS + SCSS. Customize by:

1. **Override CSS Variables** (future feature)
2. **Custom SCSS** - Import and extend styles
3. **Tailwind Config** - Customize theme in `tailwind.config.js`
4. **Direct CSS** - Add custom styles after import

---

## Testing Components

### Test Checkbox
```bash
ng test sn-checkbox
```

### Test Radio
```bash
ng test sn-radio
```

### Test Textarea
```bash
ng test sn-textarea
```

---

## Documentation Links

- **sn-checkbox:** `/projects/sn-checkbox/README.md`
- **sn-radio:** `/projects/sn-radio/README.md`
- **sn-textarea:** `/projects/sn-textarea/README.md`
- **Building Guide:** `/COMPONENT_BUILDING_GUIDE.md`
- **Build Progress:** `/BUILD_PROGRESS.md`

---

**Quick Tip:** All components are keyboard accessible and screen reader friendly! 🎉

