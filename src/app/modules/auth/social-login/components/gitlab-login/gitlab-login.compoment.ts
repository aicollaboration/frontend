import { Component, Input } from "@angular/core";
import { AuthService } from "app/core/auth/auth.service";

@Component({
    selector: "gitlab-login",
    templateUrl: "./gitlab-login.component.html",
})
export class GitlabLoginComponent {
    @Input()
    public color: any;

    @Input()
    public width: any;

    @Input()
    public height: any;

    @Input()
    public label: string;

    constructor(private authService: AuthService) { }

    public async handleClick(event: Event): Promise<void> {
        event.preventDefault();

        const user = await this.authService.signUpWithGithub();
        console.log(user);
    }

    public handleMouseEnter(event: Event): void {
        event.preventDefault();
    }

    public handleMouseLeave(event: Event): void {
        event.preventDefault();
    }

    public handleFocus(event: Event): void {
        event.preventDefault();
    }

    public handleBlur(event: Event): void {
        event.preventDefault();
    }
}