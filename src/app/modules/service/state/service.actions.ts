import { createAction, props } from '@ngrx/store';
import { ServiceModel } from '../models/service.model';

export enum ServiceActions {
    LOAD_SERVICES = '[Services] load services',
    LAOD_SERVICES_SUCCESS = '[Services] load services successful',
    LOAD_SERVICE = '[Services] load service',
    LAOD_SERVICE_SUCCESS = '[Services] load service successful',
    ERROR = '[Services] error',
}

export const loadServicesAction = createAction(
    ServiceActions.LOAD_SERVICES
);

export const loadServicesSuccessAction = createAction(
    ServiceActions.LAOD_SERVICES_SUCCESS,
    props<{ services: ServiceModel[] }>()
);

export const errorAction = createAction(
    ServiceActions.ERROR,
    props<{ error: string }>()
);

export const loadServiceAction = createAction(
    ServiceActions.LOAD_SERVICE,
    props<{ serviceId: string }>()
);
export const loadServiceSuccessAction = createAction(
    ServiceActions.LAOD_SERVICE_SUCCESS,
    props<{ service: ServiceModel }>()
);
