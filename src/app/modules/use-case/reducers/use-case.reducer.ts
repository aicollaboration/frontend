import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { UseCaseModel } from '../models/use-case.model';
import { initializeCurrentUseCaseAction, loadUseCasesSuccess, loadUseCaseSuccess, setCurrentUseCaseAction, toggleUseCaseAction } from '../state/use-case.actions';

export interface State extends AppState {
    useCases: UseCaseState;
}

export interface UseCaseState {
    show: boolean;
    useCases: UseCaseModel[];
    currentUseCase?: UseCaseModel;
    currentUseCaseId?: number;
}

const initialState: UseCaseState = {
    show: true,
    useCases: [],
};

const getUseCaseFeatureState = createFeatureSelector<UseCaseState>('useCases');

export const getShow = createSelector(
    getUseCaseFeatureState,
    state => state.show
);
export const getUseCases = createSelector(
    getUseCaseFeatureState,
    state => state.useCases
);
export const getUseCase = createSelector(
    getUseCaseFeatureState,
    state => state.currentUseCase
);
export const getCurrentUseCaseId = createSelector(
    getUseCaseFeatureState,
    state => state.currentUseCaseId
);
export const getCurrentUseCase = createSelector(
    getUseCaseFeatureState,
    getCurrentUseCaseId,
    (state, currentUseCaseId) => state.useCases.find(useCase => useCase.id === currentUseCaseId)
);

export const useCaseReducer = createReducer<UseCaseState>(
    initialState,
    on(toggleUseCaseAction, (state): UseCaseState => {
        return {
            ...state,
            show: !state.show,
        };
    }),
    on(setCurrentUseCaseAction, (state, action): UseCaseState => {
        return {
            ...state,
            currentUseCase: action.useCase
        };
    }),
    on(initializeCurrentUseCaseAction, (state): UseCaseState => {
        return {
            ...state,
            currentUseCase: {
                id: 0,
                title: '',
                description: '',
                image: 'assets/images/cases/customer_segmentation.jpg',
                category: {
                    title: 'customer-analytics'
                }
            }
        };
    }),
    on(loadUseCasesSuccess, (state, action): UseCaseState => {
        return {
            ...state,
            useCases: action.useCases,
        };
    }),
    on(loadUseCaseSuccess, (state, action): UseCaseState => {
        return {
            ...state,
            currentUseCase: action.useCase,
        };
    })
);
