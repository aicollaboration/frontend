import { Route } from '@angular/router';
import { ProblemSubmitterComponent } from './components/problem-submitter/problem-submitter.component';
import { SolutionBoardComponent } from './components/solution-board/solution-board.component';
import { SolutionCreationComponent } from './components/solution-creation/solution-creation.component';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';
import { SolutionEditorComponent } from './components/solution-editor/solution-editor.component';
import { SolutionListComponent } from './components/solution-list/solution-list.component';

export const routes: Route[] = [
    {
        path: '',
        component: SolutionListComponent,
    },
    {
        path: 'detail/:id',
        component: SolutionDetailComponent,
    },
    {
        path: 'create',
        component: SolutionCreationComponent,
    },
    {
        path: 'submit',
        component: ProblemSubmitterComponent,
    },
    {
        path: 'board',
        component: SolutionBoardComponent,
    },
    {
        path: 'edit/:id',
        component: SolutionEditorComponent,
    },
];
