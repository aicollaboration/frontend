import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
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
    public service$: Observable<ServiceModel>;
    public api: any;

    public constructor(
        private route: ActivatedRoute,
        private store: Store<State>,
        private dialog: MatDialog,
    ) {
    }

    public ngOnInit(): void {
        this.service$ = this.store.select(getServiceSelector);
        this.service$.subscribe(service => {
            if (service && service.api) {
                this.api = JSON.parse(service.api);
            }
        });

        this.route.params.subscribe(params => {
            this.store.dispatch(loadServiceAction({ serviceId: params.id }));
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
