import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { v4 } from 'uuid';

@Component({
  selector: 'sn-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'sn-input.html',
  styleUrl: 'sn-input.scss',
})
export class SnInputComponent implements OnInit {
  @Input({ required: true }) type: string = 'text';
  @Input() label?: string;
  @Input() placeholder: string = `Enter ${this.type}`;
  _info:boolean=true;
  _error:boolean = false;
  _warning:boolean=false;
  _success:boolean=false;
  
  _id = v4();
  upperCasePipe: TitleCasePipe = new TitleCasePipe();

  ngOnInit(): void {
    this.placeholder = `Enter ${this.upperCasePipe.transform(this.type)}`;
  }
}
