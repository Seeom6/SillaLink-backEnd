import { ProjectDocument } from "@Modules/project/database/project.schema";

export class GetAllProjects {
    id: string;
    name: string;
    description: string;
    isFeature: boolean;
    mainImage: string;
    images: string[];
    constructor(project: ProjectDocument){
        this.id = project._id.toString();
        this.description = project.description;
        this.isFeature = project.isFeatured;
        this.mainImage = project.mainImage;
        this.images = project.images;
        this.name = project.name
    }
}