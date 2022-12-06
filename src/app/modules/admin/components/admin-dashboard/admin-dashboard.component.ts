import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GithubService } from 'app/shared/services/github/github.service';
import { GitlabService } from 'app/shared/services/gitlab/gitlab.service';
import { KubernetesService } from 'app/shared/services/kubernetes/kubernetes.service';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
    public gitlabIsConnected: boolean = false;
    public githubIsConnected: boolean = false;
    public userInfo: string;
    public repositories: any[] = [];
    public groups: any[] = [];
    public projects: any[] = [];

    constructor(
        private githubService: GithubService,
        private gitlabService: GitlabService,
        private kubernetesService: KubernetesService,
        private httpClient: HttpClient,
    ) { }

    async ngOnInit(): Promise<void> {
        this.gitlabIsConnected = this.gitlabService.isConnected();
        this.githubIsConnected = this.githubService.isConnected();

        if (this.gitlabIsConnected) {
            this.fetchGitlabData();
        }
        if (this.githubIsConnected) {
            this.fetchGithubData();
        }
    }

    public async createProject() {
        this.httpClient.post(`https://gitlab.aipioneers.tech/api/v4/projects`, {
            name: 'test',
            description: 'test',
            visibility: 'public',
            namespace_id: 5,
            
        }, {
            headers: {
                'PRIVATE-TOKEN': 'BpnqqSPMgKWJdX6B-WcH',
            }
        }).subscribe((data) => {
            console.log(data);
        });

    }

    private async fetchGitlabData() {
        this.userInfo = JSON.stringify(await this.gitlabService.fetchUserInfo(), null, 4);
        this.groups = await this.gitlabService.fetchGroups();
        this.groups = await Promise.all(this.groups.map(async group => {
            return new Promise(async (resolve, reject) => {
                resolve({
                    ...group,
                    repositories: await this.gitlabService.fetchGroupRepositories(group.id),
                });
            });
        }));
    }

    private async fetchGithubData() {
        this.userInfo = JSON.stringify(await this.githubService.fetchUserInfo(), null, 4);

        this.repositories = await this.githubService.fetchUserRepositories();
    }

    public async signInWithGitlab() {
        this.gitlabService.signIn();
    }

    public async signOutGitlab() {
        this.gitlabService.signOut();
    }

    public async signInWithGithub() {
        this.githubService.signIn();
    }

    public async signOutGithub() {
        this.gitlabService.signOut();
    }
}
