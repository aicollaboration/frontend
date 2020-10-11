import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TreoNavigationItem } from '@treo/components/navigation';
import { Observable } from 'rxjs';
import { SolutionModel } from '../../models/solution.model';
import { loadSolutionAction } from '../../state/solution.actions';
import { getSolution, State } from '../../state/solution.reducer';

@Component({
    selector: 'solutions',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss'],
})
export class SolutionDetailComponent implements OnInit {
    public solution$: Observable<SolutionModel>;
    public drawerMode = 'side';
    public drawerOpened = true;
    public scrollMode = 'inner';
    public menu: TreoNavigationItem[] = [
        {
            title: 'Actions',
            subtitle: 'Task, project & team',
            type: 'group',
            children: [
                {
                    title: 'Create task',
                    type: 'basic',
                    icon: 'add_circle'
                },
                {
                    title: 'Create team',
                    type: 'basic',
                    icon: 'people_alt'
                },
                {
                    title: 'Create project',
                    type: 'basic',
                    icon: 'work'
                },
                {
                    title: 'Create user',
                    type: 'basic',
                    icon: 'person_outline'
                },
                {
                    title: 'Assign user or team',
                    subtitle: 'Assign to a task or a project',
                    type: 'basic',
                    icon: 'assignment_ind'
                }
            ]
        },
        {
            title: 'Tasks',
            type: 'group',
            children: [

                {
                    title: 'All tasks',
                    type: 'basic',
                    icon: 'list_alt',
                    badge: {
                        title: '49',
                        style: 'rounded'
                    }
                },
                {
                    title: 'Ongoing tasks',
                    type: 'basic',
                    icon: 'play_circle_filled'
                },
                {
                    title: 'Completed tasks',
                    type: 'basic',
                    icon: 'check_circle'
                },
                {
                    title: 'Abandoned tasks',
                    type: 'basic',
                    icon: 'remove_circle'
                },
                {
                    title: 'Assigned to me',
                    type: 'basic',
                    icon: 'person_outline'
                },
                {
                    title: 'Assigned to my team',
                    type: 'basic',
                    icon: 'people_alt'
                }
            ]
        },
        {
            title: 'Settings',
            type: 'group',
            children: [

                {
                    title: 'General',
                    type: 'collapsable',
                    icon: 'settings',
                    children: [
                        {
                            title: 'Tasks',
                            type: 'basic'
                        },
                        {
                            title: 'Users',
                            type: 'basic'
                        },
                        {
                            title: 'Teams',
                            type: 'basic'
                        }
                    ]
                },
                {
                    title: 'Account',
                    type: 'collapsable',
                    icon: 'account_circle',
                    children: [
                        {
                            title: 'Personal',
                            type: 'basic'
                        },
                        {
                            title: 'Payment',
                            type: 'basic'
                        },
                        {
                            title: 'Security',
                            type: 'basic'
                        }
                    ]
                }
            ]
        },
        {
            type: 'divider'
        }
    ];

    public constructor(
        private route: ActivatedRoute,
        private store: Store<State>
    ) {
    }

    public ngOnInit(): void {
        this.solution$ = this.store.select(getSolution);

        this.route.params.subscribe(params => {
            this.store.dispatch(loadSolutionAction({ solutionId: params.id }));
        });
    }
}
