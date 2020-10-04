import { Route } from '@angular/router';
import { UseCaseDetailComponent } from './components/use-case-detail/use-case-detail.component';
import { UseCaseListComponent } from './components/use-case-list/use-case-list.component';

export const routes: Route[] = [
    {
        path: '',
        component: UseCaseListComponent,
    },
    {
        path: ':id',
        component: UseCaseDetailComponent,
    }
];