import { Component, Input } from '@angular/core';

@Component({
    selector: 'github-user',
    templateUrl: './github-user.component.html',
})
export class GithubUserComponent {
    @Input()
    public user;
}