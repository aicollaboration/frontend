import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TreoNavigationItem } from '@treo/components/navigation';
import { Observable } from 'rxjs';
import { loadServiceAction } from '../../state/service.actions';
import { getServiceSelector, State } from '../../state/service.reducer';
import { ServiceDeletionComponent } from '../service-deletion/service-deletion.component';
import { ServiceModel } from './../../models/service.model';

@Component({
    selector: 'service-detail',
    templateUrl: './service-detail.component.html',
    styleUrls: [
        './service-detail.component.scss',
    ],
})
export class ServiceDetailComponent implements OnInit {
    public service: ServiceModel;
    public api: any;
    public menuData: TreoNavigationItem[];

    public constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
    ) {
        this.menuData = [
            {
                title: 'Manage',
                type: 'group',
                children: [
                    {
                        title: 'Home',
                        type: 'basic',
                        icon: 'home',
                        link: '.',
                    },
                    {
                        title: 'Definition',
                        type: 'basic',
                        icon: 'code',
                        link: 'definition',
                    },
                    {
                        title: 'Testing',
                        type: 'basic',
                        icon: 'people_alt',
                        link: 'testing',
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

    public ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.service = data.service;
        });
    }

    public openDeleteDialog(): void {
        const dialogRef = this.dialog.open(ServiceDeletionComponent);
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {

            }
        });
    }
}
