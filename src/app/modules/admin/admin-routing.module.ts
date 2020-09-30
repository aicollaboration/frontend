import { Route } from '@angular/router';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { UseCaseListComponent } from './components/use-case-list/use-case-list.component';

export const routes: Route[] = [
    {
        path: '',
        component: AdminOverviewComponent,
    },
    {
        path: 'use-cases',
        component: UseCaseListComponent,
    }
];