import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Backendless from 'backendless';
import { from, Observable } from 'rxjs';
import { ServiceModel } from '../models/service.model';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    private supabase: SupabaseClient;

    constructor() {
        const supabaseUrl = 'https://exrcpfgiopxnpdbziykr.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDIwMjQ5NiwiZXhwIjoxOTI5Nzc4NDk2fQ.Z6awBtD8HNl_FWJposOdSLcU8oE2wErlHqiJR4jZKPE';

        this.supabase = createClient(supabaseUrl, supabaseKey);
    }
    
    public getServices(): Observable<ServiceModel[]> {
        debugger;
        return from(Backendless.Data.of('services').find<ServiceModel>());
    }

    public getService(serviceId: string): Observable<ServiceModel> {
        return from(Backendless.Data.of('services').findById<ServiceModel>(serviceId, { relations: ['category'] }));
    }

    public async createService(service: any) {
        const { data, error } = await this.supabase.from('Services').insert([service]);

        if (error) {
            throw error;
        }

        return data;
    }

    public async updateService(service: any, id: number) {
        const { data, error } = await this.supabase.from('Services').update(service).eq('id', id);

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
