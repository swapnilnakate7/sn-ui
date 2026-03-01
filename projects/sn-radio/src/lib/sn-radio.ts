import { Component, Input, Output, EventEmitter, forwardRef, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sn-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-radio.html',
  styleUrl: './sn-radio.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SnRadioComponent),
      multi: true,
    },
  ],
})
export class SnRadioComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() value: any;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Output() changed = new EventEmitter<any>();

  checked: boolean = false;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  onRadioChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.checked = true;
      this.onChange(this.value);
      this.changed.emit(this.value);
    }
  }

  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.checked = value === this.value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

