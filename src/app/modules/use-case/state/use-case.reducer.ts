import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { UseCaseModel } from '../models/use-case.model';
import { errorAction, loadUseCasesSuccessAction, loadUseCaseSuccessAction } from './use-case.actions';

export interface State extends AppState {
    useCases: UseCaseState;
}

export interface UseCaseState {
    useCases: UseCaseModel[];
    currentUseCase?: UseCaseModel;
    currentUseCaseId?: number;
    errors: string[];
    hasErrors: boolean;
}

const initialState: UseCaseState = {
    useCases: [],
    errors: [],
    hasErrors: false,
};

const getUseCaseFeatureState = createFeatureSelector<UseCaseState>('useCases');

export const getUseCases = createSelector(
    getUseCaseFeatureState,
    state => state.useCases
);
export const getUseCase = createSelector(
    getUseCaseFeatureState,
    state => state.currentUseCase
);
export const getErrors = createSelector(
    getUseCaseFeatureState,
    state => state.errors
);
export const hasErrors = createSelector(
    getUseCaseFeatureState,
    state => state.hasErrors
);

export const useCaseReducer = createReducer<UseCaseState>(
    initialState,
    on(loadUseCasesSuccessAction, (state, action): UseCaseState => {
        return {
            ...state,
            useCases: action.useCases,
        };
    }),
    on(loadUseCaseSuccessAction, (state, action): UseCaseState => {
        return {
            ...state,
            currentUseCase: action.useCase,
        };
    }),
    on(errorAction, (state, action): UseCaseState => {
        return {
            ...state,
            hasErrors: true,
            errors: action.errors,
        };
    }),
);
