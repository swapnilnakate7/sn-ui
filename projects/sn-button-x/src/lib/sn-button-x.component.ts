import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';
import { CommonModule, NgClass, TitleCasePipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  fa0,
  faCoffee,
} from '@fortawesome/free-solid-svg-icons';
import { SnButtonService } from './sn-button-x.service';

@Component({
  selector: 'sn-button-x',
  standalone: true,
  imports: [CommonModule, NgClass, FaIconComponent],
  providers: [SnButtonService],
  templateUrl: './sn-button-x.html',
  styleUrl: 'sn-button-x.scss',
})
export class SnButtonComponent implements OnInit {
  @Input() type: string = 'submit';
  @Input() text: string = 'Default';
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input({ transform: booleanAttribute }) rounded: boolean = false;
  @Input({ transform: booleanAttribute }) filled: boolean = false;
  @Input({ transform: booleanAttribute }) raised: boolean = false;
  @Input() icon: string = '';
  @Output() clickBtn: EventEmitter<any> = new EventEmitter();

  @Input() scheme: string = 'default';

  titleCase: TitleCasePipe = new TitleCasePipe();

  currentClasses: Record<string, boolean> = {};
  faCoffee = faCoffee;
  currentIcon: IconDefinition = fa0;
  service = inject(SnButtonService);

  _styles: any = {
    primary: 'primary',
    warn: 'warn',
    danger: 'danger',
    success: 'success',
  };

  ngOnInit(): void {
    this.setCurrentClasses();
    this.currentIcon = this.service.getCurrentIcon(
      this.titleCase.transform(this.icon)
    );
    if (this.icon === 'coffee') {
      console.log(this.currentIcon);
    }
  }

  onClickBtn(clickEvent: any) {
    this.clickBtn?.emit([clickEvent]);
  }

  setCurrentClasses() {
    const scheme = this.scheme.replace('-outlined', '');
    const isOutlined = this.scheme.includes('-outlined');

    // Base styling
    this.currentClasses = {
      'inline-flex': true,
      'items-center': true,
      'justify-center': true,
      'font-medium': true,
      'transition-all': true,
      'duration-300': true,
      'shadow-sm': true,
      'focus:outline-none': true,
      'focus:ring-2': true,
      'focus:ring-offset-2': true,
      'disabled:opacity-50': true,
      'disabled:cursor-not-allowed': true,

      // Sizes/Shapes
      'px-4': true,
      'py-2': true,
      'text-sm': true,
      'rounded-full': this.rounded,
      'rounded-lg': !this.rounded,
      'shadow-md': this.raised,
      'hover:-translate-y-0.5': this.raised,
    };

    // Scheme logic
    if (isOutlined) {
      this.currentClasses['border-2'] = true;
      this.currentClasses['bg-transparent'] = true;
      switch (scheme) {
        case 'primary':
          Object.assign(this.currentClasses, { 'text-indigo-600': true, 'border-indigo-600': true, 'hover:bg-indigo-50': true, 'focus:ring-indigo-500': true });
          break;
        case 'success':
          Object.assign(this.currentClasses, { 'text-emerald-600': true, 'border-emerald-600': true, 'hover:bg-emerald-50': true, 'focus:ring-emerald-500': true });
          break;
        case 'danger':
          Object.assign(this.currentClasses, { 'text-rose-600': true, 'border-rose-600': true, 'hover:bg-rose-50': true, 'focus:ring-rose-500': true });
          break;
        case 'warn':
          Object.assign(this.currentClasses, { 'text-amber-600': true, 'border-amber-600': true, 'hover:bg-amber-50': true, 'focus:ring-amber-500': true });
          break;
        default:
          Object.assign(this.currentClasses, { 'text-slate-600': true, 'border-slate-300': true, 'hover:bg-slate-50': true, 'focus:ring-slate-500': true });
      }
    } else {
      this.currentClasses['border'] = true;
      this.currentClasses['border-transparent'] = true;
      switch (scheme) {
        case 'primary':
          Object.assign(this.currentClasses, { 'bg-indigo-600': true, 'text-white': true, 'hover:bg-indigo-700': true, 'focus:ring-indigo-500': true });
          break;
        case 'success':
          Object.assign(this.currentClasses, { 'bg-emerald-600': true, 'text-white': true, 'hover:bg-emerald-700': true, 'focus:ring-emerald-500': true });
          break;
        case 'danger':
          Object.assign(this.currentClasses, { 'bg-rose-600': true, 'text-white': true, 'hover:bg-rose-700': true, 'focus:ring-rose-500': true });
          break;
        case 'warn':
          Object.assign(this.currentClasses, { 'bg-amber-500': true, 'text-white': true, 'hover:bg-amber-600': true, 'focus:ring-amber-500': true });
          break;
        default:
          Object.assign(this.currentClasses, { 'bg-white': true, 'text-slate-700': true, 'border-slate-300': true, 'hover:bg-slate-50': true, 'focus:ring-slate-500': true });
      }
    }
  }
}
