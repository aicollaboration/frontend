import { CategoryModel } from './category.model';

export class ServiceModel {
    public id: string;
    public name: string;
    public image?: string;
    public file?: string;
    public description?: string;
    public api?: string;
    public category?: CategoryModel;
}
