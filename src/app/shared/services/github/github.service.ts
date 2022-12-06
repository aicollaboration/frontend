import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "@supabase/supabase-js";
import { AuthService } from "app/core/auth/auth.service";
import { RepositoryModel } from "app/modules/solution/models/repository.model";
import yaml from 'js-yaml';


@Injectable()
export class GithubService {
    public constructor(private authService: AuthService, private httpClient: HttpClient) {
    }

    public async signIn(redirectTo: string = 'http://localhost:4100/dashboard') {
        const { user, session, error } = await this.authService.getClient().auth.signIn({
            provider: 'github',
        }, {
            redirectTo,
            scopes: 'repo user admin:repo_hook read:org',
        });
    }

    public async signOut() {
        const { error } = await this.authService.getClient().auth.signOut()
    }

    public isConnected(): boolean {
        const client = this.authService.getClient();
        const user: User = client.auth.user();

        const identities = user['identities'].map(identity => identity.provider);
        return identities.indexOf('github') > -1;
    }

    public getToken() {
        if (!this.authService.isAuthenticated) {
            this.authService.signOut();

            // redirect
            return null;
        }

        const session = this.authService.getClient().auth.session();
        if (!('provider_token' in session)) {
            this.signIn(window.location.href);
        }
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

    public async createRepository(owner: string, name: string, template: string): Promise<RepositoryModel> {
        const url = `https://api.github.com/repos/${template}/generate`;
        const data = {
            owner,
            name,
        };
        const headers = this.getHeaders();
        return await this.httpClient.post<RepositoryModel>(url, data, { headers }).toPromise();
    }

    public async createCertificate(owner: string, name: string): Promise<boolean> {
        const url = `https://api.github.com/repos/aicollaboration/certificates/contents/certificate.yaml`;

        const headers = this.getHeaders();
        const response = await this.httpClient.get(url, { headers }).toPromise();
        const content = atob(response['content']);
        const certificate = yaml.load(content);
        const domain = `${name}.${owner}.aicollaboration.net`;

        if (certificate['spec'].dnsNames.indexOf(domain) > -1) {
            return true;
        }
        certificate['spec'].dnsNames.push(domain);

        const data = {
            "message": `Add ${name}.${owner}.aicollaboration.net to certificate`,
            "content": btoa(yaml.dump(certificate)),
            "sha": response['sha'],
        };
        const updateResponse = await this.httpClient.put(url, data, { headers }).toPromise();

        return true;
    }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`,
        });
    }
}