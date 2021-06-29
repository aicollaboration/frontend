import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TreoAnimations } from '@treo/animations';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    animations: TreoAnimations
})
export class AuthSignInComponent implements OnInit {
    signInForm: FormGroup;
    message: any;

    /**
     * Constructor
     *
     * @param {AuthService} authService
     * @param {FormBuilder} formBuilder
     * @param {Router} router
     */
    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.message = null;
    }

    ngOnInit(): void {
        // Create the form
        this.signInForm = this.formBuilder.group({
            email: [''],
            password: [''],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    async signIn() {
        // Disable the form
        this.signInForm.disable();

        // Hide the message
        this.message = null;

        // Get the credentials
        const credentials = this.signInForm.value;

        // Sign in
        try {
            const user = await this.authService.signIn(credentials.email, credentials.password);
            // this.router.navigate(['/solutions']);
            window.location.pathname = "/solutions";
        } catch (error) {
            this.message = {
                appearance: 'outline',
                content: error,
                shake: true,
                showIcon: false,
                type: 'error'
            };

            this.signInForm.enable();
        }
    }
}
