import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UseCaseService } from '../services/use-case.service';
import { loadUseCase, loadUseCaseFailure, loadUseCases, loadUseCasesFailure, loadUseCasesSuccess, loadUseCaseSuccess } from './use-case.actions';

@Injectable()
export class UseCaseEffects {
    public loadUseCases$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadUseCases),
            mergeMap(() => this.useCaseService.getUseCases().pipe(
                map(useCases => loadUseCasesSuccess({ useCases })),
                catchError(error => of(loadUseCasesFailure({ error })))
            ))
        );
    });

    public loadUseCase$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadUseCase),
            switchMap((value, index) => {
                return this.useCaseService.getUseCase(value.useCaseId).pipe(
                    map(useCase => loadUseCaseSuccess({ useCase })),
                    catchError(error => of(loadUseCaseFailure({ error })))
                );
            })
        );
    });

    constructor(private actions$: Actions, private useCaseService: UseCaseService) {

    }
}
