import { Component, Input } from "@angular/core";

@Component({
    selector: "github-login",
    templateUrl: "./github-login.component.html",
    styleUrls: ["./github-login.component.scss"]
})
export class GithubLoginComponent {
    @Input()
    public color: any;

    @Input()
    public width: any;

    @Input()
    public height: any;

    constructor() {}
}