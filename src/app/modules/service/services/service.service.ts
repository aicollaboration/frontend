import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ServiceModel } from '../models/service.model';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    private supabase: SupabaseClient;
    supabaseURL: any;

    constructor() {
        const supabaseUrl = 'https://exrcpfgiopxnpdbziykr.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDIwMjQ5NiwiZXhwIjoxOTI5Nzc4NDk2fQ.Z6awBtD8HNl_FWJposOdSLcU8oE2wErlHqiJR4jZKPE';

        this.supabase = createClient(supabaseUrl, supabaseKey);
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

    public async uploadFile(path: string, file: File) {
        const { data, error } = await this.supabase.storage.from('service').upload(path, file);
        if (error) {
            throw error;
        }

        return data;
    }

    public async getFile(path: string) {
        const { data, error } = await this.supabase.storage.from('service').list();
        if (error) {
            throw error;
        }

        return data;
    }
}
