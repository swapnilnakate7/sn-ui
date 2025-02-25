import { Component , EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from '@app/list/list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sn-ui';
  componentNameToDisplay='button';
  setComponentName(name:string){
    this.componentNameToDisplay =name;
  }
}
