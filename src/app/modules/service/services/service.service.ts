import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Backendless from 'backendless';
import { from, Observable, of } from 'rxjs';
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
        const { data, error } = await this.supabase.from<ServiceModel>('Services').select('*');
 
        return data;
    }

    public async getService(serviceId: string) {
       const { data, error } = await this.supabase.from<ServiceModel>('Services').select("*").eq('id', serviceId)
     return data[0];
    }

    public async createService(service: any) {
       debugger;
        const { data, error } = await this.supabase.from<ServiceModel>('Services').insert([service]);

        if (error) {
            throw error;
        }

        return data;
    }

    public async updateService(service: any, serviceId: string) {
        const { data, error } = await this.supabase.from('Services').update(service).eq('id', serviceId);

        if (error) {
            throw error;
        }

        return data;
    }

    public async deleteService(id: number) {
        const { data, error } = await this.supabase.from('Services').delete().eq('id', id);

        if (error) {
            throw error;
        }

        return data;
    }
}
