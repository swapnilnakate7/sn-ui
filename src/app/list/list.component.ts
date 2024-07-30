import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnButtonComponent } from '@libs/sn-button-x/src/public-api';
import  {SnCardComponent}from '@libs/sn-card/src/public-api';
import  {SnInputComponent}from '@libs/sn-input/src/public-api';

// import { SnButtonComponent } from '@dist/sn-button-x';
// import { SnCardComponent } from '@dist/sn-card';
// import { SnInputComponent } from '@dist/sn-input';

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
