import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { TreoAnimations } from '@treo/animations';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    animations: TreoAnimations
})
export class AuthSignInComponent implements OnInit {
    public signInForm: FormGroup;
    public message: any;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
    ) {
        this.message = null;
    }

    public ngOnInit(): void {
        // Create the form
        this.signInForm = this.formBuilder.group({
            email: [''],
            password: [''],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    public async signIn() {
        // Disable the form
        this.signInForm.disable();

        // Hide the message
        this.message = null;

        // Get the credentials
        const credentials = this.signInForm.value;

        // Sign in
        try {
            const user = await this.authService.signIn(credentials.email, credentials.password);

            const updatedUser = await this.authService.updateUser({ userType: 'BUSINESS', foo: 'bar' });

            if (this.route.snapshot.queryParamMap.has('redirectURL')) {
                window.location.pathname = this.route.snapshot.queryParamMap.get('redirectURL');
            } else {
                window.location.pathname = '/dashboard';
            }
        } catch (error) {
            this.message = {
                appearance: 'outline',
                content: error.message,
                shake: true,
                showIcon: false,
                type: 'error'
            };

            this.signInForm.enable();
        }
    }
}
