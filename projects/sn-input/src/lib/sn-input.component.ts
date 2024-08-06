import { booleanAttribute, Component, Input, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { v4 } from 'uuid';
import { FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'sn-input',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: 'sn-input.html',
  styleUrl: 'sn-input.scss',
})
export class SnInputComponent implements OnInit {
  @Input({ required: true }) type: string = 'text';
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() pattern?:string;
  @Input({transform:booleanAttribute}) required:boolean=false;
  @Input() infoMessages?:string[]=[];
  @Input() errorMessages?:string[]=[];
  @Input() warningMessages?:string[]=[];
  @Input() successMessages?:string[]=[];

  _control:FormControl = new FormControl('');
  _info:boolean=true;
  _error:boolean = false;
  _warning:boolean=false;
  _success:boolean=false;

  
  _id = v4();
  upperCasePipe: TitleCasePipe = new TitleCasePipe();

  ngOnInit(): void {
    if(!this.placeholder) this.placeholder = `Enter ${this.upperCasePipe.transform(this.type)}`;

    if(this.infoMessages?.length){
      this._info = true;
    }
    if(this.warningMessages?.length){
      this._warning = true;
    }
    if(this.errorMessages?.length){
      this._error = true;
    }
    if(this.successMessages?.length){
      this._success = true;
    }
   
    if(this.pattern){
      this._control.addValidators(Validators.pattern(this.pattern));
    }
    this._control.addValidators(this.required? Validators.required:[]);

  }
  getErrorMessage(type:string,error:ValidationErrors):string{
    let message='';
    console.group('getErrorMessage');
    console.log(type);
    console.log(error);
    if(type === 'pattern') message = `Invalid input for Pattern: ${error['pattern'].requiredPattern}`;
    if(type === 'required') message = `Its a required field`;

    console.groupEnd();
    return message;
  }
  onInputChange():void{
    console.log(this._control.errors)
    this.errorMessages =[];
    if(this._control.errors){
      const errors:ValidationErrors = this._control.errors;
      
      
      for(const errorKey in errors){
        this.errorMessages.push(this.getErrorMessage(errorKey,errors));
      }
      this._error=true;
    }
  }

}
