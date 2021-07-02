import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ICreateOrderRequest, IPayPalConfig } from "ngx-paypal";

declare const paypal;

@Component({
    selector: 'admin-payment',
    templateUrl: './admin-payment.component.html',
    styleUrls: ['./admin-payment.component.scss'],
})
export class AdminPaymentComponent implements OnInit {
    public payPalConfig?: IPayPalConfig;

    @ViewChild('paypal', { static: true })
    public paypalElement: ElementRef;


    public ngOnInit(): void {
        paypal.Buttons().render();

        this.initConfig();
    }

    private initConfig(): void {
        this.payPalConfig = {
            currency: 'EUR',
            clientId: 'AW2knlF9Yu_sx7-pEUznxA3246h-RvDdbLnIHi8RxJG_QA91blJ56KDSRK81c9RhDsbHaebmLWULRUtg',
            createOrderOnClient: (data) => <ICreateOrderRequest>{
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                        breakdown: {
                            item_total: {
                                currency_code: 'EUR',
                                value: '9.99'
                            }
                        }
                    },
                    items: [{
                        name: 'Enterprise Subscription',
                        quantity: '1',
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                            currency_code: 'EUR',
                            value: '9.99',
                        },
                    }]
                }]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then(details => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });

            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);

            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);

            },
            onError: err => {
                console.log('OnError', err);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            }
        };
    }
}