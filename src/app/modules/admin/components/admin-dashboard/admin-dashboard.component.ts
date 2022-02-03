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
        private kubernetesService: KubernetesService
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

        const nodes = await this.kubernetesService.getNodes();
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
        
        const orgs = await this.githubService.fetchUserOrganizations();
        debugger
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
