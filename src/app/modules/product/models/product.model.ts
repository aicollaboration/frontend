import { CategoryModel } from './category.model';

export class ProductModel {
  public id: number;
  public title: string;
  public subtitle?: string;
  public image: string;
  public description: string;
  public category: CategoryModel;
  public solutions: any[];
  public features: any[];
}
