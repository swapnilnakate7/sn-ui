import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'sn-spinner',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './sn-spinner.html',
  styleUrl: 'sn-spinner.scss',
})
export class SnSpinnerComponent {
  @Input() scheme: string = 'primary';
  @Input() size: string = 'md';
  @Input() label: string = 'Loading...';

  get classes(): Record<string, boolean> {
    return {
      'sn-spinner': true,
      [`scheme-${this.scheme}`]: true,
      [`size-${this.size}`]: true,
    };
  }
}
