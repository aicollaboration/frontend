import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GithubLoginComponent } from "./components/github-login/github-login.component";
import { GitlabLoginComponent } from "./components/gitlab-login/gitlab-login.compoment";
import { SocialLoginComponent } from "./components/social-login/social-login.component";

@NgModule({
    declarations: [
        GithubLoginComponent,
        SocialLoginComponent,
        GitlabLoginComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        GithubLoginComponent,
        SocialLoginComponent,
        GitlabLoginComponent,
    ]
})
export class SocialLoginModule {

}