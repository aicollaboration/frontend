import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TreoNavigationItem } from '@treo/components/navigation';
import { SolutionModel } from '../../models/solution.model';
import { SolutionService } from '../../services/solution.service';
import { loadSolutionAction } from '../../state/solution.actions';
import { State } from '../../state/solution.reducer';
import { SolutionServiceCreationComponent } from '../solution-service-creation/solution-service-creation.component';

@Component({
    selector: 'solution',
    templateUrl: './solution-detail.component.html',
    styleUrls: ['./solution-detail.component.scss'],
})
export class SolutionDetailComponent implements OnInit {
    public solution: SolutionModel;
    public solutionServices = [];
    private solutionId: string;
    public menuData: TreoNavigationItem[];

    public solutionForm = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
    });

    public constructor(
        private matDialog: MatDialog,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private solutionService: SolutionService,
        private store: Store<State>,
    ) {
        this.menuData = [
            {
                title: 'Manage',
                type: 'group',
                active: true,
                children: [
                    {
                        title: 'Home',
                        type: 'basic',
                        icon: 'home',
                        link: 'home',
                    },
                    {
                        title: 'Services',
                        type: 'basic',
                        icon: 'code',
                        link: 'services',
                    },
                    {
                        title: 'Content',
                        type: 'basic',
                        icon: 'list',
                        link: 'content',
                    },
                    {
                        title: 'Design',
                        type: 'basic',
                        icon: 'dripicons:brush',
                        link: 'design',
                    },
                ]
            },
            {
                title: 'Settings',
                type: 'group',
                children: [
                    {
                        title: 'General',
                        type: 'basic',
                        icon: 'settings',
                        link: 'settings',
                    },
                    {
                        title: 'Users',
                        type: 'basic',
                        icon: 'people_alt',
                        link: 'users',
                    },
                ],
            },
            {
                title: 'Analytics',
                type: 'group',
                children: [
                    {
                        title: 'Costs',
                        type: 'basic',
                        icon: 'bar_chart',
                        link: 'costs',
                    },
                    {
                        title: 'Revenue',
                        type: 'basic',
                        icon: 'attach_money',
                        link: 'revenue',
                    },
                    {
                        title: 'Traffic',
                        type: 'basic',
                        icon: 'trending_up',
                        link: 'traffic',
                    },
                    {
                        title: 'Users',
                        type: 'basic',
                        icon: 'people_alt',
                        link: 'traffic',
                    },
                    {
                        title: 'Logs',
                        type: 'basic',
                        icon: 'list',
                        link: 'traffic',
                    },
                    {
                        title: 'Alerts',
                        type: 'basic',
                        icon: 'notifications',
                        link: 'traffic',
                    },
                ],
            },
        ];
    }

    public async ngOnInit(): Promise<void> {
        this.route.data.subscribe(data => {
            this.solution = data.solution;
        });

        this.route.params.subscribe(async params => {
            const solutionId = this.solutionId = params.solutionId;

            this.solutionServices = await this.solutionService.getSolutionServices(solutionId);
        });
    }

    public async addService(event) {
        event.preventDefault();

        const dialogRef = this.matDialog.open(SolutionServiceCreationComponent, {
            data: {
                solutionId: this.solutionId,
            },
        });
        dialogRef.afterClosed().subscribe(async result => {
            this.solutionServices = await this.solutionService.getSolutionServices(this.solutionId);
        });
    }

    public async onSubmit() {
        const solution: SolutionModel = {
            ...this.solutionForm.value,
        };

        this.solutionService.updateSolution(solution, this.solutionId).then(data => {
            this.store.dispatch(loadSolutionAction({ solutionId: this.solutionId }));
            this.snackBar.open(`Solution successful updated`, 'Close', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'center' });
        }).catch(error => {
            this.snackBar.open(error, 'Close', { verticalPosition: 'top', horizontalPosition: 'center' });
        });
    }
}
