import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'sn-spinner-x',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './sn-spinner-x.html',
  styleUrl: 'sn-spinner-x.scss',
})
export class SnSpinnerXComponent {
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
