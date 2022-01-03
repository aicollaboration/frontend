import { Component, Input } from "@angular/core";
import { AuthService } from "app/core/auth/auth.service";

@Component({
    selector: "social-login",
    templateUrl: "./social-login.component.html",
    styleUrls: ["./social-login.component.scss"]
})
export class SocialLoginComponent {
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