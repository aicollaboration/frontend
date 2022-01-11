import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";


@Injectable()
export class GithubService {
    public constructor(private authService: AuthService, private httpClient: HttpClient) {
    }

    public async signIn() {
        const { user, session, error } = await this.authService.getClient().auth.signIn({
            provider: 'github',
        }, {
            redirectTo: 'http://localhost:4100/admin/dashboard',
            scopes: 'repo user',
        });
    }

    public async signOut() {
        const { error } = await this.authService.getClient().auth.signOut()
    }   

    public isConnected(): boolean {
        return !!this.getToken();
    }

    public getToken() {
        const session = this.authService.getClient().auth.session();
        const accessToken = session.provider_token;

        return accessToken;
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

    public async fetchUserOrganizations(): Promise<any[]> {
        const headers = {
            "Authorization": `Bearer ${this.getToken()}`,
        };
        const user = 'tobiasoberrauch';

        return this.httpClient.get<any[]>(`https://api.github.com/users/${user}/orgs`, { headers }).toPromise();
    }

    public async fetchOrganizations(): Promise<any[]> {
        const headers = {
            "Authorization": `Bearer ${this.getToken()}`,
        };
        return this.httpClient.get<any[]>(`https://api.github.com/organizations`, { headers }).toPromise();
    }
}