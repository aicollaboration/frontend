import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Backendless from 'backendless';
import { from, Observable } from 'rxjs';
import { SolutionServiceModel } from '../models/solution-service.model';
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

  public async getSolutions() {
    const { data, error } = await this.supabase.from<SolutionModel>('solution').select('*');

    return data;
  }

  public async getSolutionService(solutionId: string, serviceId: string) {
    const query = `
      id,
      config,
      solution(*),
      service(*)
    `;
    const { data, error } = await this.supabase.from('solution_services').select(query).eq('solutionId', solutionId).eq('serviceId', serviceId);
    
    if (error) {
      throw error;
    }
    
    return data[0];
  }

  public async getSolutionServices(solutionId: string) {
    const query = `
    id,
    config,
    solution(*),
    service(*)
    `;
    const { data, error } = await this.supabase.from('solution_services').select(query).eq('solutionId', solutionId);
    if (error) {
      throw error;
    }
    return data;
  }

  public async addSolutionService(solutionService: SolutionServiceModel) {
    const { data, error } = await this.supabase.from<SolutionServiceModel>('solution_services').insert([solutionService]);

    if (error) {
      throw error;
    }

    return data;
  }


  public async getSolution(solutionId: string) {
    const { data, error } = await this.supabase.from<SolutionModel>('solution').select("*").eq('id', solutionId)

    return data[0];
  }

  public async createSolution(solution: any) {
    const { data, error } = await this.supabase.from('solution').insert([solution]);

    if (error) {
      throw error;
    }

    return data[0];
  }

  public async updateSolution(solution: any, solutionId: string) {
    const { data, error } = await this.supabase.from('solution').update(solution).eq('id', solutionId);

    if (error) {
      throw error;
    }

    return data;
  }

  public async deleteSolution(id: number) {
    const { data, error } = await this.supabase.from('solution').delete().eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }


  public async uploadFile(path: string, file: File) {
    const { data, error } = await this.supabase.storage.from('solution').upload(path, file);
    if (error) {
      throw error;
    }

    return data;
  }

  public async getFile(path: string) {
    const { data, error } = await this.supabase.storage.from('solution').list();
    if (error) {
      throw error;
    }

    return data;
  }
}
