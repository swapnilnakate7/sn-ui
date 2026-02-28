import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'sn-alert',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './sn-alert.html',
  styleUrl: 'sn-alert.scss',
})
export class SnAlertComponent {
  @Input() scheme: string = 'info';
  @Input() title: string = '';
  @Input({ transform: booleanAttribute }) dismissible: boolean = false;
  @Output() dismissed = new EventEmitter<void>();

  _visible: boolean = true;

  get icon(): string {
    switch (this.scheme) {
      case 'success': return '✓';
      case 'danger':  return '✗';
      case 'warn':    return '⚠';
      case 'info':    return 'ℹ';
      default:        return 'ℹ';
    }
  }

  dismiss(): void {
    this._visible = false;
    this.dismissed.emit();
  }
}
