import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TreoAnimations } from '@treo/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Backendless from 'backendless';



@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: TreoAnimations
})
export class AuthSignInComponent implements OnInit {
    signInForm: FormGroup;
    message: any;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} activatedRoute
     * @param {AuthService} authService
     * @param {FormBuilder} formBuilder
     * @param {Router} router
     */
    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        // Set the defaults
        this.message = null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this.formBuilder.group({
            email: ['tobias.oberrauch@cgi.com'],
            password: ['yxcyxcyxc'],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Disable the form
        this.signInForm.disable();

        // Hide the message
        this.message = null;

        // Get the credentials
        const credentials = this.signInForm.value;

        // Sign in
        this.authService.signIn(credentials).then((loggedInUser) => {
            this.router.navigateByUrl('/solutions');
        }).catch((error) => {
            this.message = {
                appearance: 'outline',
                content: error,
                shake: true,
                showIcon: false,
                type: 'error'
            };

            this.signInForm.enable();
        })
    }
}
