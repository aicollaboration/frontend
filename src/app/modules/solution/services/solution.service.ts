import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthService } from 'app/core/auth/auth.service';
import { SolutionServiceModel } from '../models/solution-service.model';
import { SolutionModel } from '../models/solution.model';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private supabase: SupabaseClient;

  constructor(private authService: AuthService) {
    this.supabase = this.authService.getClient();
  }

  public async getSolutions() {
    const { data, error } = await this.supabase.from<SolutionModel>('solution').select('*');

    const solutions: SolutionModel[] = await Promise.all(data.map(async (solution: SolutionModel) => {
      if (solution.file) {
        const { data, error } = await this.supabase.storage.from('solution').createSignedUrl(solution.file, 60);

        if (!error && data.signedURL) {
          solution.file = data.signedURL;
        }
      }
      return solution;
    }));

    if (error && error.code === "401") {
      this.supabase.auth.refreshSession();
    }

    return solutions;
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
    solutionService.author = this.supabase.auth.user().id;
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

  public async createSolution(solution: SolutionModel) {
    solution.author = this.supabase.auth.user().id;
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
