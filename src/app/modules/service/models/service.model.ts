import { CategoryModel } from './category.model';

export class ServiceModel {
    public id: number;
    public name: string;
    public image?: string;
    public description?: string;
    public category?: CategoryModel;
}
