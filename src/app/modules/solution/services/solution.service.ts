import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Backendless from 'backendless';
import { from, Observable } from 'rxjs';
import { SolutionModel } from '../models/solution.model';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private supabase: SupabaseClient;

  constructor() {
      const supabaseUrl = 'https://exrcpfgiopxnpdbziykr.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDIwMjQ5NiwiZXhwIjoxOTI5Nzc4NDk2fQ.Z6awBtD8HNl_FWJposOdSLcU8oE2wErlHqiJR4jZKPE';

      this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  public getSolutions(): Observable<SolutionModel[]> {
    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setPageSize(100);

    return from(Backendless.Data.of('solutions').find<SolutionModel>(queryBuilder));
  }

  public getSolution(solutionId: string): Observable<SolutionModel> {
    return from(Backendless.Data.of('solutions').findById<SolutionModel>(solutionId, { relations: ['category'] }));
  }

  public async createSolution(Solution: any) {
      const { data, error } = await this.supabase.from('Solutions').insert([Solution]);

      if (error) {
          throw error;
      }

      return data;
  }

  public async updateSolution(Solution: any, id: number) {
      const { data, error } = await this.supabase.from('Solutions').update(Solution).eq('id', id);

      if (error) {
          throw error;
      }

      return data;
  }

  public async deleteSolution(id: number) {
      const { data, error } = await this.supabase.from('Solutions').delete().eq('id', id);

      if (error) {
          throw error;
      }

      return data;
  }
}
