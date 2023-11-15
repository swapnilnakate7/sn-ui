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
export class SnButtonComponent implements OnInit {
  @Input() type: string = 'submit';
  @Input() text: string = 'Default';
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() scheme: string = 'default';

  _styles: any = {
    info: 'info',
    warn: 'warn',
    danger: 'danger',
    success: 'success',
  };
  constructor() {}

  ngOnInit() {}
}
