import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { GithubService } from "app/core/auth/github.service";

@Component({
    selector: "service-import",
    templateUrl: "./service-import.component.html",
    styleUrls: ["./service-import.component.scss"],
})
export class ServiceImportComponent implements OnInit {
    public serviceForm = new FormGroup({
        url: new FormControl(''),
        repository: new FormControl(''),
    });
    public repositories: any[] = [];

    constructor(private githubService: GithubService, private http: HttpClient) { }

    async ngOnInit(): Promise<void> {
        this.repositories = await this.githubService.fetchUserRepositories();
    }


    public onSubmit(): void {
        const url = this.serviceForm.value.url;
        const apiUrl = this.detectApiUrl(url);

        // request github api with apiUrl
        this.requestGithubApi(apiUrl);
        debugger

    }

    private detectApiUrl(url: string): string {
        if (url.includes('git@')) {
            const org = url.split('git@')[1].split(':')[1].split('/')[0];
            const repo = url.split('git@')[1].split(':')[1].split('/')[1].replace('.git', '');

            return `https://api.github.com/repos/${org}/${repo}`;
        }
    }

    private requestGithubApi(apiUrl: string): void {
        // request github api with apiUrl
        this.http.get(apiUrl).subscribe(
            (data: any) => {
                console.log(data);
            }   
        );
    }
    
}
