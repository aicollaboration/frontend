import { CategoryModel } from './category.model';

export class ServiceModel {
    public objectId: string;
    public title: string;
    public image: string;
    public description?: string;
    public category: CategoryModel;
}
