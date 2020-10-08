import { Route } from '@angular/router';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';
import { SolutionListComponent } from './components/solution-list/solution-list.component';

export const routes: Route[] = [
    {
        path: '',
        component: SolutionListComponent,
    },
    {
        path: ':id',
        component: SolutionDetailComponent,
    }
];