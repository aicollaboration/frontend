import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GithubLoginComponent } from "./components/github-login/github-login.component";
import { SocialLoginComponent } from "./components/social-login/social-login.component";

@NgModule({
    declarations: [
        GithubLoginComponent,
        SocialLoginComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        GithubLoginComponent,
        SocialLoginComponent,
    ]
})
export class SocialLoginModule {

}