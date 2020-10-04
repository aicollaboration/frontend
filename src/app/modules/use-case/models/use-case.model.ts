import { CategoryModel } from './category.model';

export class UseCaseModel {
  public id: number;
  public title: string;
  public subtitle?: string;
  public image: string;
  public description: string;
  public category: CategoryModel;
}
