import { Component, Input, Output, EventEmitter, forwardRef, booleanAttribute, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'sn-dropdown-x',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sn-dropdown-x.html',
  styleUrl: './sn-dropdown-x.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SnDropdownXComponent),
      multi: true,
    },
  ],
})
export class SnDropdownXComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() name: string = '';
  @Input() options: SelectOption[] = [];
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input({ transform: booleanAttribute }) searchable: boolean = false;
  @Input({ transform: booleanAttribute }) multiple: boolean = false;
  @Input({ transform: booleanAttribute }) clearable: boolean = true;
  @Output() changed = new EventEmitter<any>();

  isOpen: boolean = false;
  searchQuery: string = '';
  selectedValue: any = null;
  selectedValues: any[] = [];
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef) {}

  get filteredOptions(): SelectOption[] {
    if (!this.searchable || !this.searchQuery) {
      return this.options;
    }
    const query = this.searchQuery.toLowerCase();
    return this.options.filter(opt =>
      opt.label.toLowerCase().includes(query)
    );
  }

  get displayValue(): string {
    if (this.multiple) {
      if (this.selectedValues.length === 0) return this.placeholder;
      return `${this.selectedValues.length} selected`;
    } else {
      const selected = this.options.find(opt => opt.value === this.selectedValue);
      return selected ? selected.label : this.placeholder;
    }
  }

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.searchQuery = '';
      }
    }
  }

  selectOption(option: SelectOption): void {
    if (option.disabled) return;

    if (this.multiple) {
      const index = this.selectedValues.indexOf(option.value);
      if (index === -1) {
        this.selectedValues.push(option.value);
      } else {
        this.selectedValues.splice(index, 1);
      }
      this.onChange(this.selectedValues);
      this.changed.emit(this.selectedValues);
    } else {
      this.selectedValue = option.value;
      this.onChange(this.selectedValue);
      this.changed.emit(this.selectedValue);
      this.isOpen = false;
    }
    this.onTouched();
  }

  isSelected(option: SelectOption): boolean {
    if (this.multiple) {
      return this.selectedValues.includes(option.value);
    }
    return this.selectedValue === option.value;
  }

  clearSelection(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.multiple) {
      this.selectedValues = [];
      this.onChange(this.selectedValues);
      this.changed.emit(this.selectedValues);
    } else {
      this.selectedValue = null;
      this.onChange(null);
      this.changed.emit(null);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (this.multiple) {
      this.selectedValues = value ?? [];
    } else {
      this.selectedValue = value ?? null;
    }
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
