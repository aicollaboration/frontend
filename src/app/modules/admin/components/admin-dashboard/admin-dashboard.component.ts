import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GithubService } from 'app/core/auth/github.service';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
    public connected: boolean = false;
    public userInfo: string;
    public repositories: any[] = [];

    constructor(private githubService: GithubService) {}

    ngOnInit(): void {
        this.connected = this.githubService.isConnected();

        if (this.connected) {
            this.fetchGithubData();
        }
    }

    private async fetchGithubData() {
        this.userInfo = JSON.stringify(await this.githubService.fetchUserInfo(), null, 4);
        this.repositories = await this.githubService.fetchUserRepositories();
    }

    public async signIn() {
        this.githubService.signIn();
    }

    public async signOut() {
        this.githubService.signOut();
    }
}
