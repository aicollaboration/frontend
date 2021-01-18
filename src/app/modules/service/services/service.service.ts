import { Injectable } from '@angular/core';
import Backendless from 'backendless';
import { from, Observable } from 'rxjs';
import { ServiceModel } from '../models/service.model';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    public getServices(): Observable<ServiceModel[]> {
        return from(Backendless.Data.of('services').find<ServiceModel>());
    }

    public getService(serviceId: string): Observable<ServiceModel> {
        return from(Backendless.Data.of('services').findById<ServiceModel>(serviceId, { relations: ['category'] }));
    }
}
