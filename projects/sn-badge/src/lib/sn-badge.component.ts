import { Component, Input, booleanAttribute } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'sn-badge',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './sn-badge.html',
  styleUrl: 'sn-badge.scss',
})
export class SnBadgeComponent {
  @Input() scheme: string = 'default';
  @Input({ transform: booleanAttribute }) pill: boolean = false;
  @Input() size: string = 'md';

  get classes(): Record<string, boolean> {
    return {
      'sn-badge': true,
      [`scheme-${this.scheme}`]: true,
      [`size-${this.size}`]: true,
      'pill': this.pill,
    };
  }
}
