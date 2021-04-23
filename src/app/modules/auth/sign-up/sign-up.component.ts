import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TreoAnimations } from '@treo/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject } from 'rxjs';
@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: TreoAnimations
})
export class AuthSignUpComponent implements OnInit, OnDestroy {
    message: any;
    signUpForm: FormGroup;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AuthService} authService
     * @param {FormBuilder} formBuilder
     */
    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.message = null;

        // Set the private defaults
        this.unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Create the form
        this.signUpForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            agreements: ['', Validators.requiredTrue]
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    async signUp(): Promise<void> {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the message
        this.message = null;


        // Get the credentials
        const user = this.signUpForm.value;

        // Sign up
        try {
            await this.authService.signUp(user);

            this.signUpForm.enable();
            this.signUpForm.reset({});
            // Show the message
            this.message = {
                appearance: 'outline',
                content: 'Your account has been created and a confirmation mail has been sent to your email address.',
                shake: false,
                showIcon: false,
                type: 'success'
            };
        } catch (error) {
            console.log("error message - " + error.message);
            console.log("error code - " + error.statusCode);
        }
    }
}
