import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ServiceService } from '../services/service.service';
import { errorAction, loadServiceAction, loadServicesAction, loadServicesSuccessAction, loadServiceSuccessAction } from './service.actions';

@Injectable()
export class ServiceEffects {
    public loadServices$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadServicesAction),
            mergeMap(() => {
                return this.serviceService.getServices().pipe(
                    map(services => loadServicesSuccessAction({ services })),
                    catchError(error => of(errorAction({ error })))
                );
            })
        );
    });

    public loadService$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadServiceAction),
            switchMap((value, index) => {
                return this.serviceService.getService(value.serviceId).pipe(
                    map(service => loadServiceSuccessAction({ service })),
                    catchError(error => of(errorAction({ error })))
                );
            })
        );
    });

    constructor(private actions$: Actions, private serviceService: ServiceService) {

    }
}
