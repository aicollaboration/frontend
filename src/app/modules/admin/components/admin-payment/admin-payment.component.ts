import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';

@Component({
    selector: 'admin-payment',
    templateUrl: './admin-payment.component.html',
    styleUrls: ['./admin-payment.component.scss'],
})
export class AdminPaymentComponent implements OnInit {
    @ViewChild(StripeCardComponent)
    public card: StripeCardComponent;

    public cardOptions: StripeCardElementOptions = {
        style: {
            base: {
                iconColor: '#666EE8',
                color: '#31325F',
                fontWeight: '300',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                    color: '#CFD7E0'
                }
            }
        }
    };

    public elementsOptions: StripeElementsOptions = {
        locale: 'de'
    };

    public stripeTest: FormGroup;

    constructor(private formBuilder: FormBuilder, private stripeService: StripeService) { }

    public ngOnInit(): void {
        this.stripeTest = this.formBuilder.group({
            name: ['', [Validators.required]]
        });
    }

    public createToken(): void {
        const name = this.stripeTest.get('name').value;
        this.stripeService
            .createToken(this.card.element, { name })
            .subscribe((result) => {
                if (result.token) {
                    // Use the token
                    console.log(result.token.id);
                } else if (result.error) {
                    // Error creating the token
                    console.log(result.error.message);
                }
            });
    }
}