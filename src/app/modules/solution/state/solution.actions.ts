import { createAction, props } from '@ngrx/store';
import { SolutionModel } from '../models/solution.model';

export const loadSolutionsAction = createAction(
    '[Solutions] load'
);
export const loadSolutionsSuccessAction = createAction(
    '[Solutions] load successful',
    props<{ solutions: SolutionModel[] }>()
);
export const loadSolutionAction = createAction(
    '[Solutions] load solution',
    props<{ solutionId: number }>()
);
export const loadSolutionSuccessAction = createAction(
    '[Solutions] load solution success',
    props<{ solution: SolutionModel }>()
);
export const errorAction = createAction(
    '[Solutions] error action',
    props<{ errors: string[] }>()
);
