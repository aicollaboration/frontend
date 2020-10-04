import { createAction, props } from '@ngrx/store';
import { UseCaseModel } from '../models/use-case.model';

export const loadUseCasesAction = createAction(
    '[Use cases] load'
);
export const loadUseCasesSuccessAction = createAction(
    '[Use cases] load successful',
    props<{ useCases: UseCaseModel[] }>()
);
export const loadUseCaseAction = createAction(
    '[Use cases] load use case',
    props<{ useCaseId: number }>()
);
export const loadUseCaseSuccessAction = createAction(
    '[Use cases] load use case success',
    props<{ useCase: UseCaseModel }>()
);
export const errorAction = createAction(
    '[Use cases] error action',
    props<{ errors: string[] }>()
);
