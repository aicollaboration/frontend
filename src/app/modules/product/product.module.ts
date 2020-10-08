import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TreoCardModule } from '@treo/components/card';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEffects } from './state/product.effects';
import { productReducer } from './state/product.reducer';
import { routes } from './product-routing.module';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        TreoCardModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('products', productReducer),
        EffectsModule.forFeature([ProductEffects]),
    ],
})
export class ProductModule {

}
