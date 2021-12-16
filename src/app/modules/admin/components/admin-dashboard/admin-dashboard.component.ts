import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
    public userInfo: string;
    public connected: boolean = false;
    public repositories: any[] = [];

    public constructor(private httpClient: HttpClient) {
    }

    ngOnInit(): void {
        this.connected = !!this.getGithubToken();

        if (this.connected) {
            this.fetchUserInfo();
            this.fetchUserRepositories();
        }
    }

    private getGithubToken() {
        const session = this.getClient().auth.session();
        const accessToken = session.provider_token;

        return accessToken;
    }

    private fetchUserInfo() {
        const headers = {
            "Authorization": `Bearer ${this.getGithubToken()}`,
        };
        const observable = this.httpClient.get('https://api.github.com/user', { headers });
        observable.subscribe(userInfo => {
            this.userInfo = JSON.stringify(userInfo);
        });
    }

    private fetchUserRepositories() {
        const headers = {
            "Authorization": `Bearer ${this.getGithubToken()}`,
        };
        const user = 'tobiasoberrauch';
        const observable = this.httpClient.get(`https://api.github.com/users/${user}/repos`, { headers });
        observable.subscribe((repositories: any[]) => {
            this.repositories = repositories;
        });
    }



    public async signInWithGithub() {
        const { user, session, error } = await this.getClient().auth.signIn({
            provider: 'github',
        }, {
            redirectTo: 'http://localhost:4100/admin/dashboard',
            scopes: 'repo gist notifications'
        });
        debugger
    }

    public async signOutWithGithub() {
        debugger
    }

    public getClient(): SupabaseClient {
        const supabaseUrl = 'https://exrcpfgiopxnpdbziykr.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDIwMjQ5NiwiZXhwIjoxOTI5Nzc4NDk2fQ.Z6awBtD8HNl_FWJposOdSLcU8oE2wErlHqiJR4jZKPE';

        return createClient(supabaseUrl, supabaseKey);
    }
}
