import { Injectable } from '@angular/core';
import Backendless from 'backendless';
import { from, Observable } from 'rxjs';
import { SolutionModel } from '../models/solution.model';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  public getSolutions(): Observable<SolutionModel[]> {
    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setPageSize(100);

    return from(Backendless.Data.of('solutions').find<SolutionModel>(queryBuilder));
  }

  public getSolution(solutionId: string): Observable<SolutionModel> {
    return from(Backendless.Data.of('solutions').findById<SolutionModel>(solutionId, { relations: ['category'] }));
  }
}
