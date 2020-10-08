import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { SolutionService } from '../services/solution.service';
import { loadSolutionAction, loadSolutionsAction, errorAction, loadSolutionsSuccessAction, loadSolutionSuccessAction } from './solution.actions';

@Injectable()
export class SolutionEffects {
    public loadSolutions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadSolutionsAction),
            mergeMap(() => this.solutionService.getSolutions().pipe(
                map(solutions => loadSolutionsSuccessAction({ solutions })),
                catchError(error => of(errorAction({ errors: [error] })))
            ))
        );
    });

    public loadSolution$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadSolutionAction),
            switchMap((value, index) => {
                return this.solutionService.getSolution(value.solutionId).pipe(
                    map(solution => loadSolutionSuccessAction({ solution })),
                    catchError(error => of(errorAction({ errors: [error] })))
                );
            })
        );
    });

    constructor(private actions$: Actions, private solutionService: SolutionService) {

    }
}
