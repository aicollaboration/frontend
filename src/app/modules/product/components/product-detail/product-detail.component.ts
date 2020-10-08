import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { loadProductAction } from '../../state/product.actions';
import { getProduct, State } from '../../state/product.reducer';

@Component({
    selector: 'products',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
    public product$: Observable<ProductModel>;

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
