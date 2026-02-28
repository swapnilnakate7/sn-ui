import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'sn-toggle',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './sn-toggle.html',
  styleUrl: 'sn-toggle.scss',
})
export class SnToggleComponent {
  @Input({ transform: booleanAttribute }) checked: boolean = false;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() label: string = '';
  @Input() scheme: string = 'primary';
  @Output() toggled = new EventEmitter<boolean>();

  private static _idCounter = 0;
  readonly inputId = `sn-toggle-${++SnToggleComponent._idCounter}`;

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.toggled.emit(this.checked);
  }
}
