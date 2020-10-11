import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TreoCardModule } from '@treo/components/card';
import { TreoNavigationModule } from '@treo/components/navigation';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { routes } from './product-routing.module';
import { ProductEffects } from './state/product.effects';
import { productReducer } from './state/product.reducer';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,

        RouterModule.forChild(routes),
        StoreModule.forFeature('products', productReducer),
        EffectsModule.forFeature([ProductEffects]),

        // Treo
        TreoCardModule,
        TreoNavigationModule,

        // Material UI
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,

        // Forms
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
    ],
})
export class ProductModule {

}
