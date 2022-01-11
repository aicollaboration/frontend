import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { SolutionModel } from "../models/solution.model";
import { SolutionService } from "../services/solution.service";

@Injectable({
    providedIn: 'root'
})
export class SolutionResolver implements Resolve<SolutionModel> {
    constructor(private solutionService: SolutionService) {
    }

    public resolve(route: ActivatedRouteSnapshot): Promise<SolutionModel> {
        const solutionId = route.params.solutionId;

        return this.solutionService.getSolution(solutionId);
    }
}