import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sn-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'sn-input.html',
  styleUrl: 'sn-input.scss',
})
export class SnInputComponent {
  @Input() type: string = 'text';
  @Input() label: string = 'Label';
}
