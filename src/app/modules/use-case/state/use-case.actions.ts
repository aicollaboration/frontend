import { createAction, props } from '@ngrx/store';
import { UseCaseModel } from '../models/use-case.model';

export const toggleUseCaseAction = createAction(
    '[Use Case] Toggle'
);
export const setCurrentUseCaseAction = createAction(
    '[Use Case] Set current use-case',
    props<{ useCase: UseCaseModel }>()
);
export const clearCurrentUseCaseAction = createAction(
    '[Use Case] Clear current use-case'
);
export const initializeCurrentUseCaseAction = createAction(
    '[Use Case] Init current use-case'
);

export const loadUseCases = createAction(
    '[Use cases] load'
);
export const loadUseCasesSuccess = createAction(
    '[Use cases] load successful',
    props<{ useCases: UseCaseModel[] }>()
);
export const loadUseCasesFailure = createAction(
    '[Use cases] load failure',
    props<{ error: string }>()
);

export const loadUseCase = createAction(
    '[Use cases] load use case',
    props<{ useCaseId: number }>()
);
export const loadUseCaseSuccess = createAction(
    '[Use cases] load use case success',
    props<{ useCase: UseCaseModel }>()
);
export const loadUseCaseFailure = createAction(
    '[Use cases] load use case failure',
    props<{ error: string }>()
);
