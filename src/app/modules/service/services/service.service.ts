import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthService } from 'app/core/auth/auth.service';
import { ServiceModel } from '../models/service.model';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    private supabase: SupabaseClient;
    constructor(private authService: AuthService) {
        this.supabase = this.authService.getClient();
    }

    public async getServices() {
        const query = `*`;
        const { data, error } = await this.supabase.from<ServiceModel>('service').select(query);

        return data;
    }

    public async getService(serviceId: string) {
        const { data, error } = await this.supabase.from<ServiceModel>('service').select("*").eq('id', serviceId);

        const service = data[0];
        const api = JSON.parse(service.api);

        if (error) {
            throw error;
        }

        return data[0];
    }

    public async createService(service: ServiceModel) {
        service.author = this.supabase.auth.user().id;
        const { data, error } = await this.supabase.from<ServiceModel>('service').insert([service]);

        if (error) {
            throw error;
        }

        return data[0];
    }

    public async updateService(service: any, serviceId: string) {
        const { data, error } = await this.supabase.from('service').update(service).eq('id', serviceId);

        if (error) {
            throw error;
        }

        return data;
    }

    public async deleteService(id: number) {
        const { data, error } = await this.supabase.from('service').delete().eq('id', id);

        if (error) {
            throw error;
        }

        return data;
    }

    public async findServices(query: string): Promise<Array<ServiceModel>> {
        const { data, error } = await this.supabase.from<ServiceModel>('service').select("*").like('name', `%${query}%`);

        if (error) {
            throw error;
        }

        return data;
    }
}
