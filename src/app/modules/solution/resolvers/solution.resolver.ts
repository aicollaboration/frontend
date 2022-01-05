import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { SolutionModel } from "../models/solution.model";
import { SolutionService } from "../services/solution.service";
import { getSolutionSelector, State } from "../state/solution.reducer";

@Injectable({
    providedIn: 'root'
  })
export class SolutionResolver implements Resolve<any> {
    constructor(
        private solutionService: SolutionService,
        private store: Store<State>,
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<SolutionModel> {
        const solutionId = route.params.solutionId;

        return this.store.select(getSolutionSelector).pipe(
            take(1),
            switchMap(solution => {
                if (solution) {
                    return of(solution);
                }

                return this.solutionService.getSolution(solutionId);
            }),
        );
    }
}