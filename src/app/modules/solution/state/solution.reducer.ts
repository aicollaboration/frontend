import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { SolutionModel } from '../models/solution.model';
import { errorAction, loadSolutionsSuccessAction, loadSolutionSuccessAction } from './solution.actions';

export interface State extends AppState {
    products: SolutionState;
}

export interface SolutionState {
    solutions: SolutionModel[];
    currentSolution?: SolutionModel;
    currentSolutionId?: number;
    errors: string[];
    hasErrors: boolean;
}

const initialState: SolutionState = {
    solutions: [],
    errors: [],
    hasErrors: false,
};

const getSolutionFeatureState = createFeatureSelector<SolutionState>('solutions');

export const getSolutions = createSelector(
    getSolutionFeatureState,
    state => state.solutions
);
export const getSolution = createSelector(
    getSolutionFeatureState,
    state => state.currentSolution
);
export const getErrors = createSelector(
    getSolutionFeatureState,
    state => state.errors
);
export const hasErrors = createSelector(
    getSolutionFeatureState,
    state => state.hasErrors
);

export const solutionReducer = createReducer<SolutionState>(
    initialState,
    on(loadSolutionsSuccessAction, (state, action): SolutionState => {
        return {
            ...state,
            solutions: action.solutions,
        };
    }),
    on(loadSolutionSuccessAction, (state, action): SolutionState => {
        return {
            ...state,
            currentSolution: action.solution,
        };
    }),
    on(errorAction, (state, action): SolutionState => {
        return {
            ...state,
            hasErrors: true,
            errors: action.errors,
        };
    }),
);
