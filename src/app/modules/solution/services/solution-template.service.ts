import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root'
})
export class SolutionTemplateService {
    private supabase: SupabaseClient;

    constructor() {
        const supabaseUrl = 'https://exrcpfgiopxnpdbziykr.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDIwMjQ5NiwiZXhwIjoxOTI5Nzc4NDk2fQ.Z6awBtD8HNl_FWJposOdSLcU8oE2wErlHqiJR4jZKPE';

        this.supabase = createClient(supabaseUrl, supabaseKey);
    }

    public async getSolutionTemplates() {
        const { data, error } = await this.supabase.from('SolutionTemplates').select('*')
        if (error) {
            throw error;
        }
        return data;
    }

}