import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { loadProductsAction } from '../../state/product.actions';
import { getErrors, getProducts, State } from '../../state/product.reducer';
import { ProductCreationComponent } from '../product-creation/product-creation.component';

@Component({
  selector: 'products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  public products$: Observable<ProductModel[]>;
  public errors$: Observable<string[]>;

  public constructor(private store: Store<State>, private matDialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.products$ = this.store.select(getProducts);
    this.errors$ = this.store.select(getErrors);

    this.store.dispatch(loadProductsAction());
  }

  public openCreationDialog(): void {
    const dialogRef = this.matDialog.open(ProductCreationComponent);
  }
}
