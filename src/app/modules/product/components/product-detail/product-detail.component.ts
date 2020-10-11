import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TreoNavigationItem } from '@treo/components/navigation';
import { Observable } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { loadProductAction } from '../../state/product.actions';
import { getProduct, State } from '../../state/product.reducer';

@Component({
    selector: 'products',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    public product$: Observable<ProductModel>;
    public drawerMode = 'side';
    public drawerOpened = true;
    public scrollMode = 'inner';
    public menu: TreoNavigationItem[] = [
        {
            title: 'Product',
            subtitle: 'Settings',
            type: 'group',
            children: [
                {
                    title: 'General',
                    type: 'basic',
                    icon: 'add_circle'
                },
                {
                    title: 'Pages',
                    type: 'basic',
                    icon: 'work'
                },
                {
                    title: 'Services',
                    type: 'basic',
                    icon: 'work'
                },
            ],
        },
        {
            title: 'Services',
            type: 'group',
            children: [

                {
                    title: 'Overview',
                    type: 'basic',
                    icon: 'list_alt',
                    /*
                    badge: {
                        title: '49',
                        style: 'rounded'
                    }
                    */
                },
                {
                    title: 'Authentication',
                    type: 'basic',
                    icon: 'people_alt'
                },
                {
                    title: 'API',
                    type: 'basic',
                    icon: 'check_circle'
                },
                {
                    title: 'File storage',
                    type: 'basic',
                    icon: 'remove_circle'
                },
                {
                    title: 'Analytics',
                    type: 'basic',
                    icon: 'person_outline'
                },
                {
                    title: 'Functions',
                    type: 'basic',
                    icon: 'people_alt'
                }
            ]
        },
        {
            title: 'Settings',
            type: 'group',
            children: [
                {
                    title: 'Domain management',
                    type: 'basic',
                    icon: 'work'
                },
                {
                    title: 'General',
                    type: 'collapsable',
                    icon: 'settings',
                    children: [
                        {
                            title: 'Tasks',
                            type: 'basic'
                        },
                        {
                            title: 'Users',
                            type: 'basic'
                        },
                        {
                            title: 'Teams',
                            type: 'basic'
                        }
                    ]
                },
                {
                    title: 'Account',
                    type: 'collapsable',
                    icon: 'account_circle',
                    children: [
                        {
                            title: 'Personal',
                            type: 'basic'
                        },
                        {
                            title: 'Payment',
                            type: 'basic'
                        },
                        {
                            title: 'Security',
                            type: 'basic'
                        }
                    ]
                }
            ]
        },
        {
            type: 'divider'
        }
    ];

    public constructor(
        private route: ActivatedRoute,
        private store: Store<State>
    ) {
    }

    public ngOnInit(): void {
        this.product$ = this.store.select(getProduct);

        this.route.params.subscribe(params => {
            this.store.dispatch(loadProductAction({ productId: params.id }));
        });
    }
}
