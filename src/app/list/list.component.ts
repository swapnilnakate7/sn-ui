import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnButtonComponent } from 'projects/sn-button/src/public-api';
import { SnCardComponent } from 'projects/sn-card/src/public-api';

@Component({
  selector: 'sn-list',
  standalone: true,
  imports: [CommonModule, SnButtonComponent, SnCardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  list = ['button', 'card'];
  _display = '';
  display(componentName: string) {
    this._display = componentName;
  }
}
