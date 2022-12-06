import { Route } from '@angular/router';
import { SolutionCreationComponent } from './components/solution-creation/solution-creation.component';
import { SolutionDesignComponent } from './components/solution-design/solution-design.component';
import { SolutionDetailHomeComponent } from './components/solution-detail-home/solution-detail-home.component';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';
import { SolutionEditorComponent } from './components/solution-editor/solution-editor.component';
import { SolutionListComponent } from './components/solution-list/solution-list.component';
import { SolutionServiceDetailComponent } from './components/solution-service-detail/solution-service-detail.component';
import { SolutionServiceListComponent } from './components/solution-service-list/solution-service-list.component';
import { SolutionSettingsComponent } from './components/solution-settings/solution-settings.component';
import { SolutionUserListComponent } from './components/solution-users/solution-user-list.component';
import { SolutionResolver } from './resolvers/solution.resolver';
import { SolutionsResolver } from './resolvers/solutions.resolver';

export const routes: Route[] = [
    {
        path: '',
        component: SolutionListComponent,
        resolve: {
            solutions: SolutionsResolver,
        }
    },
    {
        path: 'detail/:solutionId',
        component: SolutionDetailComponent,
        resolve: {
            solution: SolutionResolver,
        },
        children: [
            {
                path: 'home',
                component: SolutionDetailHomeComponent,
            },
            {
                path: 'services',
                component: SolutionServiceListComponent,
            },
            {
                path: 'services/:serviceId',
                component: SolutionServiceDetailComponent,
            },
            {
                path: 'users',
                component: SolutionUserListComponent,
            },
            {
                path: 'design',
                component: SolutionDesignComponent,
            },
            {
                path: 'settings',
                component: SolutionSettingsComponent,
            },
        ]
    },
    {
        path: 'create',
        component: SolutionCreationComponent,
    },
    {
        path: 'edit/:id',
        component: SolutionEditorComponent,
    },
];
