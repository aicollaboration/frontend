import { Injectable } from "@angular/core";
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthService } from "app/core/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class SolutionTemplateService {
    private supabase: SupabaseClient;

    constructor(private authService: AuthService) {
        this.supabase = this.authService.getClient();
    }

    public async getSolutionTemplates() {
        const { data, error } = await this.supabase.from('solution_templates').select('*');

        if (error) {
            throw error;
        }
        return data;
    }

}