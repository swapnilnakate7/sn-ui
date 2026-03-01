import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef, booleanAttribute, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sn-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-textarea.html',
  styleUrl: './sn-textarea.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SnTextareaComponent),
      multi: true,
    },
  ],
})
export class SnTextareaComponent implements ControlValueAccessor, OnInit {
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() rows: number = 4;
  @Input() maxLength: number | null = null;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input({ transform: booleanAttribute }) autoResize: boolean = true;
  @Input({ transform: booleanAttribute }) readonly: boolean = false;
  @Output() changed = new EventEmitter<string>();

  value: string = '';
  characterCount: number = 0;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  onTextareaChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.characterCount = this.value.length;
    this.onChange(this.value);
    this.changed.emit(this.value);

    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  onBlur(): void {
    this.onTouched();
  }

  private adjustHeight(): void {
    if (this.textarea && this.autoResize) {
      const textarea = this.textarea.nativeElement;
      textarea.style.height = 'auto';
      textarea.style.height = Math.max(textarea.scrollHeight, textarea.offsetHeight) + 'px';
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value ?? '';
    this.characterCount = this.value.length;

    if (this.autoResize && this.textarea) {
      setTimeout(() => this.adjustHeight(), 0);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
