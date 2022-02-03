import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "@supabase/supabase-js";
import { AuthService } from "app/core/auth/auth.service";
import { SolutionModel } from "app/modules/solution/models/solution.model";

@Injectable()
export class GitlabService {
    private apiHost: string;

    public constructor(
        private authService: AuthService,
        private httpClient: HttpClient,
    ) {
        this.apiHost = 'https://gitlab.com/api/v4';
    }

    private buildApiUrl(url: string) {
        return `${this.apiHost}${url}`;
    }

    public async signIn() {
        const { user, session, error } = await this.authService.getClient().auth.signIn({
            provider: 'gitlab',
        }, {
            redirectTo: 'http://localhost:4100/dashboard',
            scopes: 'api read_user read_api read_repository write_repository read_registry write_registry profile email',
        });
    }

    public async createProject(solution: SolutionModel) {
        const headers = {
            "Authorization": `Bearer ${this.getToken()}`,
        };
        return await this.httpClient.post(this.buildApiUrl(`/projects`), {
            name: solution.name,
            namespace_id: solution.owner,
            visibility: solution.visiblity,
            use_custom_template: true,
            template_name: 'aicollaboration/solution-template-react-typescript',
        }, { headers }).toPromise();
    }

    public async fetchUserInfo() {
        return this.fetch(this.buildApiUrl('/user'));
    }

    public async fetchUserRepositories(projectId: string): Promise<any> {
        return await this.fetch(this.buildApiUrl(`/projects/${projectId}/repository/tree`));
    }

    public async fetchProjects(): Promise<any> {
        return await this.fetch(this.buildApiUrl(`/projects?private=true&simple=yes`));
    }

    public async fetchGroups(): Promise<any[]> {
        const headers = {
            "Authorization": `Bearer ${this.getToken()}`,
        };
        return await this.httpClient.get<any[]>(this.buildApiUrl(`/groups`), { headers }).toPromise();
    }

    public async fetchGroupRepositories(groupId: string): Promise<any> {
        return await this.fetch(this.buildApiUrl(`/groups/${groupId}/projects`));
    }

    public async signOut() {

    }

    public getToken() {
        const client = this.authService.getClient();
        const session = client.auth.session();
        const accessToken = session.provider_token;

        return accessToken;
    }

    public isConnected(): boolean {
        const client = this.authService.getClient();
        const user: User = client.auth.user();

        const identities = user['identities'].map(identity => identity.provider);
        return identities.indexOf('gitlab') > -1;
    }

    private async fetch(url: string): Promise<any> {
        const headers = {
            "Authorization": `Bearer ${this.getToken()}`,
        };
        return await this.httpClient.get(url, { headers }).toPromise();
    }
}