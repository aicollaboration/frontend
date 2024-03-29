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
      /*
      if (solution.file) {
        const { data, error } = await this.supabase.storage.from('solution').createSignedUrl(solution.file, 60);

        if (!error && data.signedURL) {
          solution.file = data.signedURL;
        }
      }
      */
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
      name,
      description,
      config,
      solution(*),
      service(*)
    `;
    const { data, error } = await this.supabase.from('solution_services').select(query).eq('solutionId', solutionId).eq('serviceId', serviceId);

    debugger

    if (error) {
      throw error;
    }

    return data[0];
  }

  public async getSolutionServices(solutionId: string) {
    const query = `
      id,
      name,
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
    solutionService.public = true;
    const { data, error } = await this.supabase.from<SolutionServiceModel>('solution_services').insert([solutionService]);

    if (error) {
      throw error;
    }

    return data;
  }

  public async updateSolutionService(solutionService: SolutionServiceModel) {
    solutionService.author = this.supabase.auth.user().id;

    const { data, error } = await this.supabase.from<SolutionServiceModel>('solution_services').update(solutionService).eq('id', solutionService.id);

    if (error) {
      throw error;
    }

    return data;
  }


  public async getSolution(solutionId: string) {
    const { data, error } = await this.supabase.from<SolutionModel>('solution').select("*").eq('id', solutionId)

    return data[0];
  }

  public async createSolution(solution: SolutionModel): Promise<SolutionModel> {
    solution.author = this.supabase.auth.user().id;
    const { data, error } = await this.supabase.from('solution').insert(solution);

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
    await this.supabase.from<SolutionServiceModel>('solution_services').delete().eq('solutionId', id.toString());

    const { data, error } = await this.supabase.from('solution').delete().eq('id', id);

    if (error) {
      throw error;
    }

    return data;
  }

  public async deleteSolutionService(id: string) {
    const { data, error } = await this.supabase.from<SolutionServiceModel>('solution_services').delete().eq('id', id.toString());

    if (error) {
      throw error;
    }

    return data;
  }

  public async findSolutions(query: string): Promise<Array<SolutionModel>> {
    const { data, error } = await this.supabase.from<SolutionModel>('solution').select("*").like('name', `%${query}%`);

    if (error) {
      throw error;
    }

    return data;
  }
}
