import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ServiceModel } from "../models/service.model";
import { ServiceService } from "../services/service.service";

@Injectable({
    providedIn: 'root'
})
export class ServicesResolver implements Resolve<ServiceModel[]> {
    constructor(private serviceService: ServiceService) {
    }

    public resolve(route: ActivatedRouteSnapshot): Promise<ServiceModel[]> {
        return this.serviceService.getServices();
    }
}