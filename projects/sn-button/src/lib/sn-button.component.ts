import {
  Component,
  Input,
  OnInit,
  Signal,
  booleanAttribute,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'sn-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-button.html',
  styleUrl: 'sn-button.scss',
})
export class SnButtonComponent {
  @Input() type: string = 'submit';
  @Input() text: string = 'Default';
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input({ transform: booleanAttribute }) rounded: boolean = false;
  @Input({ transform: booleanAttribute }) filled: boolean = false;

  @Input() scheme: string = 'default';

  _styles: any = {
    primary: 'primary',
    warn: 'warn',
    danger: 'danger',
    success: 'success',
  };
  getClasses() {
    return [
      'sn-button',
      this.scheme,
      this.rounded ? 'rounded' : '',
      this.filled ? 'filled' : '',
    ];
  }
}
