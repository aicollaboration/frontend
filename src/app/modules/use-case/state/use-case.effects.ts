import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UseCaseService } from '../services/use-case.service';
import { loadUseCaseAction, loadUseCasesAction, errorAction, loadUseCasesSuccessAction, loadUseCaseSuccessAction } from './use-case.actions';

@Injectable()
export class UseCaseEffects {
    public loadUseCases$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadUseCasesAction),
            mergeMap(() => this.useCaseService.getUseCases().pipe(
                map(useCases => loadUseCasesSuccessAction({ useCases })),
                catchError(error => of(errorAction({ errors: [error] })))
            ))
        );
    });

    public loadUseCase$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadUseCaseAction),
            switchMap((value, index) => {
                return this.useCaseService.getUseCase(value.useCaseId).pipe(
                    map(useCase => loadUseCaseSuccessAction({ useCase })),
                    catchError(error => of(errorAction({ errors: [error] })))
                );
            })
        );
    });

    constructor(private actions$: Actions, private useCaseService: UseCaseService) {

    }
}
