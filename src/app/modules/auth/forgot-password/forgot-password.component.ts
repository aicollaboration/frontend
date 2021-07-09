import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { TreoAnimations } from '@treo/animations';
import { SupabaseService } from 'app/core/auth/supabase.service';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: TreoAnimations
})
export class AuthForgotPasswordComponent implements OnInit {
    public forgotPasswordForm: FormGroup;
    public message: any;
    private supabase: SupabaseClient;

    constructor(private formBuilder: FormBuilder) {
        // Set the defaults
        this.message = null;

        this.supabase = createClient(
            'https://exrcpfgiopxnpdbziykr.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDIwMjQ5NiwiZXhwIjoxOTI5Nzc4NDk2fQ.Z6awBtD8HNl_FWJposOdSLcU8oE2wErlHqiJR4jZKPE'
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void {
        // Do nothing if the form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();

        // Hide the message
        this.message = null;

        // Do your action here...
        const email = this.forgotPasswordForm.value.email;
        this.supabase.auth.api.resetPasswordForEmail(email).then(data => {
            // Show the message
            this.message = {
                appearance: 'outline',
                content: 'Password reset sent! You\'ll receive an email if you are registered on our system.',
                shake: false,
                showIcon: false,
                type: 'success'
            };
        })
            .catch(error => {
                // Show the message
                this.message = {
                    appearance: 'outline',
                    content: error,
                    shake: false,
                    showIcon: false,
                    type: 'error'
                };
            })
            .finally(() => {
                // Re-enable the form
                this.forgotPasswordForm.enable();

                // Reset the form
                this.forgotPasswordForm.reset({});
            });
    }
}
