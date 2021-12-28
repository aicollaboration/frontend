import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from '@supabase/supabase-js';


@Injectable()
export class GithubService {
    public constructor(private httpClient: HttpClient) {
    }

    public async signIn() {
        const { user, session, error } = await this.getClient().auth.signIn({
            provider: 'github',
        }, {
            redirectTo: 'http://localhost:4100/admin/dashboard',
            scopes: 'repo gist notifications'
        });
    }
    
    public async signOut() {
    }

    public isConnected(): boolean {
        return !!this.getToken();
    }

    public getToken() {
        const session = this.getClient().auth.session();
        const accessToken = session.provider_token;

        return accessToken;
    }

    protected getClient(): SupabaseClient {
        const supabaseUrl = 'https://exrcpfgiopxnpdbziykr.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDIwMjQ5NiwiZXhwIjoxOTI5Nzc4NDk2fQ.Z6awBtD8HNl_FWJposOdSLcU8oE2wErlHqiJR4jZKPE';

        return createClient(supabaseUrl, supabaseKey);
    }

    public async fetchUserInfo() {
        const headers = {
            "Authorization": `Bearer ${this.getToken()}`,
        };
        return await this.httpClient.get('https://api.github.com/user', { headers }).toPromise();
    }

    public async fetchUserRepositories(): Promise<any[]> {
        const headers = {
            "Authorization": `Bearer ${this.getToken()}`,
        };
        const user = 'tobiasoberrauch';

        return this.httpClient.get<any[]>(`https://api.github.com/users/${user}/repos`, { headers }).toPromise();
    }
}