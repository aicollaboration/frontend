import { CategoryModel } from './category.model';

export class ServiceModel {
    public id: string;
    public name: string;
    public image?: string;
    public file?: File;
    public description?: string;
    public category?: CategoryModel;
}
