import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ServiceModel } from "../models/service.model";
import { ServiceService } from "../services/service.service";

@Injectable({
    providedIn: 'root'
})
export class ServiceResolver implements Resolve<ServiceModel> {
    constructor(private serviceService: ServiceService) {
    }

    public async resolve(route: ActivatedRouteSnapshot): Promise<ServiceModel> {
        const serviceId = route.params.id;
        const service = this.serviceService.getService(serviceId);

        return service;
    }
}