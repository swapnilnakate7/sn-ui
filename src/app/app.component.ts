import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ListComponent } from '@app/list/list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  router = inject(Router);
  title = 'sn-ui';
  componentNameToDisplay = 'alert';
  isSidebarOpen = true;
  viewMode: 'preview' | 'code' = 'preview';

  components = [
    { name: 'alert', label: 'Alert', isNew: false, category: 'Feedback' },
    { name: 'badge', label: 'Badge', isNew: false, category: 'Data Display' },
    { name: 'button', label: 'Button', isNew: false, category: 'Forms' },
    { name: 'card', label: 'Card', isNew: false, category: 'Data Display' },
    { name: 'checkbox', label: 'Checkbox', isNew: false, category: 'Forms' },
    { name: 'datatable', label: 'Data Table', isNew: false, category: 'Data Display' },
    { name: 'dropdown', label: 'Dropdown', isNew: false, category: 'Forms' },
    { name: 'input', label: 'Input', isNew: false, category: 'Forms' },
    { name: 'modal', label: 'Modal', isNew: false, category: 'Overlay' },
    { name: 'radio', label: 'Radio', isNew: false, category: 'Forms' },
    { name: 'spinner', label: 'Spinner', isNew: false, category: 'Feedback' },
    { name: 'tabs', label: 'Tabs', isNew: false, category: 'Navigation' },
    { name: 'textarea', label: 'Textarea', isNew: false, category: 'Forms' },
    { name: 'toggle', label: 'Toggle', isNew: false, category: 'Forms' },
    { name: 'tooltip', label: 'Tooltip', isNew: true, category: 'Overlay' },
  ];

  get categories() {
    return [...new Set(this.components.map(c => c.category))];
  }

  getComponentsByCategory(cat: string) {
    return this.components.filter(c => c.category === cat);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      const parts = url.split('/');
      this.componentNameToDisplay = parts[parts.length - 1];
    });
  }

  setComponentName(name: string) {
    this.router.navigate(['/components', name]);
  }

  setViewMode(mode: 'preview' | 'code') {
    this.viewMode = mode;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
