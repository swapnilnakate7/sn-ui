import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sn-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-card.html',
  styleUrl: 'sn-card.scss',
})
export class SnCardComponent {
  @Input() title?: string;
}
