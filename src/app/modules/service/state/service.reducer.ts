import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { ServiceModel } from '../models/service.model';
import { errorAction, loadServicesSuccessAction, loadServiceSuccessAction } from './service.actions';

export interface State extends AppState {
    services: ServiceState;
}

export interface ServiceState {
    services: ServiceModel[];
    currentService?: ServiceModel;
    error?: string;
}

const initialState: ServiceState = {
    services: [],
};

const getServiceFeatureState = createFeatureSelector<ServiceState>('services');

export const getServicesSelector = createSelector(
    getServiceFeatureState,
    state => state.services
);
export const getServiceSelector = createSelector(
    getServiceFeatureState,
    state => state.currentService
);

export const getErrorSelector = createSelector(
    getServiceFeatureState,
    state => state.error
);

export const serviceReducer = createReducer<ServiceState>(
    initialState,
    on(loadServicesSuccessAction, (state, action): ServiceState => {
        return {
            ...state,
            services: action.services,
        };
    }),
    on(loadServiceSuccessAction, (state, action): ServiceState => {
        return {
            ...state,
            currentService: action.service
        };
    }),
    on(errorAction, (state, action): ServiceState => {
        return {
            ...state,
            error: action.error
        };
    })
);
