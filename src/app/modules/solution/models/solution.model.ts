import { CategoryModel } from './category.model';

export class SolutionModel {
  public objectId: string;
  public title: string;
  public subtitle?: string;
  public type?: string;
  public icon?: string;
  public image?: string;
  public description: string;
  public category: CategoryModel;
}
