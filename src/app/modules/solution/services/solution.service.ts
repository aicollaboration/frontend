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
    const { data, error } = await this.supabase.from<SolutionModel>('Solutions').select('*');

    return data;
  }


  public async getSolutionServices(solutionId: string) {
    const { data, error } = await this.supabase.from('SolutionServices').select("*").eq('solutionId', solutionId)
    if (error) {
      throw error;
    }
    return data;
  }

  public async addSolutionService(solutionService: SolutionServiceModel) {
    const { data, error } = await this.supabase.from<SolutionServiceModel>('SolutionServices').insert([solutionService]);

    if (error) {
      throw error;
    }

    return data;
  }


  public async getSolution(solutionId: string) {
    const { data, error } = await this.supabase.from<SolutionModel>('Solutions').select("*").eq('id', solutionId)

    return data[0];
  }

  public async createSolution(solution: any) {
    const { data, error } = await this.supabase.from('Solutions').insert([solution]);

    if (error) {
      throw error;
    }

    return data;
  }

  public async updateSolution(solution: any, solutionId: string) {
    const { data, error } = await this.supabase.from('Solutions').update(solution).eq('id', solutionId);

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


  public async uploadFile(path: string, file: File) {
    const { data, error } = await this.supabase.storage.from('Solutions').upload(path, file);
    if (error) {
      throw error;
    }

    return data;
  }

  public async getFile(path: string) {
    const { data, error } = await this.supabase.storage.from('Solutions').list();
    if (error) {
      throw error;
    }

    return data;
  }
}
