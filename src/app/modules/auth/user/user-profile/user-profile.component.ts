import { Component } from "@angular/core";
import { AuthService } from "app/core/auth/auth.service";

@Component({
    selector: "user-profile",
    templateUrl: "./user-profile.component.html",
    styleUrls: []
})
export class UserProfileComponent {
    public user: string;

    constructor(private authService: AuthService) {
        this.user = JSON.stringify(this.authService.user, null, "    ");
    }
}