import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnButtonComponent } from 'sn-button';
import { SnCardComponent } from 'projects/sn-card/src/public-api';
import { SnInputComponent } from 'projects/sn-input/src/public-api';

@Component({
  selector: 'sn-list',
  standalone: true,
  imports: [CommonModule, SnButtonComponent, SnCardComponent, SnInputComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  list = ['button', 'card', 'input'];
  _display = '';
  display(componentName: string) {
    this._display = componentName;
  }
}
