import { Component, Input } from '@angular/core';

@Component({
    selector: 'github-repositories',
    templateUrl: './github-repositories.component.html',
})
export class GithubRepositoriesComponent {
    @Input()
    public repositories;
}