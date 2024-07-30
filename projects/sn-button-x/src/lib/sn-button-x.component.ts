import {
  Component,
  Input,
  OnInit,
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
  setCurrentClasses() {
    const scheme = this.scheme;
    this.currentClasses = {
      'sn-button': true,
      rounded: this.rounded,
      filled: this.filled,
      raised: this.raised,
    };
    this.currentClasses[scheme] = true;
  }
}
