import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'components/button', pathMatch: 'full' },
    { path: 'components/:name', component: ListComponent },
    { path: '**', redirectTo: 'components/button' }
];
