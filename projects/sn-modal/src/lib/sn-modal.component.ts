import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'sn-modal',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './sn-modal.html',
  styleUrl: 'sn-modal.scss',
})
export class SnModalComponent {
  @Input({ transform: booleanAttribute }) open: boolean = false;
  @Input() title: string = '';
  @Input() size: string = 'md';
  @Input({ transform: booleanAttribute }) closeOnBackdrop: boolean = true;
  @Output() closed = new EventEmitter<void>();

  get panelClasses(): Record<string, boolean> {
    return {
      'sn-modal-panel': true,
      [`size-${this.size}`]: true,
    };
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  close(): void {
    this.open = false;
    this.closed.emit();
  }
}
