import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public customerAnalyticsCategory: CategoryModel = {
    title: 'Customer analytics',
    slug: `customer-analytics`,
  };

  public products: ProductModel[] = [{
    id: 1,
    title: 'Document Analyser',
    image: 'assets/images/cases/customer_segmentation.jpg',
    description: ``,
    category: this.customerAnalyticsCategory,
  }];

  public getProducts(): Observable<ProductModel[]> {
    return of(this.products);
  }

  public getProduct(productId: number): Observable<ProductModel> {
    const productOfUndefined = this.products.find(product => product.id == productId);

    if (productOfUndefined) {
      return of(productOfUndefined);
    }

    throw new Error(`Product with id ${productId} not available`);
  }
}
