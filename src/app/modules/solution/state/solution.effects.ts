import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { loadSolutionAction, loadSolutionsAction, errorAction, loadSolutionsSuccessAction, loadSolutionSuccessAction } from './solution.actions';
import { SolutionService } from '../services/solution.service';

@Injectable()
export class SolutionEffects {
    public loadSolutions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadSolutionsAction),
            switchMap(() => this.solutionService.getSolutions()),
                map(solutions => loadSolutionsSuccessAction({ solutions })),
                catchError(error => of(errorAction({ errors: [error] })))
         );
    });

    public loadService$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadSolutionAction),
            switchMap(action => this.solutionService.getSolution(action.solutionId)),
            map(solution => loadSolutionSuccessAction({ solution })),
            catchError(error => of(errorAction({ errors: [error] })))
                );
      });

    constructor(private actions$: Actions, private solutionService: SolutionService) {

    }
}
