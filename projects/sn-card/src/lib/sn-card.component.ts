import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sn-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-card.html',
  styleUrl: 'sn-card.scss',
})
export class SnCardComponent implements OnInit {
  

  @Input() title?: string;
  _imageSrc : string="https://picsum.photos/200";
  _actions: any[] = []

  ngOnInit(): void {
  // this._imageSrc ="";
  }
  
}
