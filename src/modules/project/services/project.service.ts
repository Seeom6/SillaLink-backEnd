import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "../database/project.repository";
import { ProjectDocument } from "../database/project.schema";
import { EnvironmentService } from "@Package/config";

@Injectable()
export class ProjectServiceWeb {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly envService: EnvironmentService
  ) { }

  async getAll() {
    const projects: ProjectDocument[] = await this.projectRepository.aggregate({
      pipeline: [
        {
          $match: {
            isFeatured: true,
            isDeleted: {
              $ne: null
            }
          }
        },
        {
          $sample: {
            size: 6
          }
        }
      ]
    })
    projects.forEach((project) => {
      project.mainImage = `${this.envService.get('app.baseUrl')}/${project.mainImage}`;
      project.images = project.images.map((image)=>{
        console.log(image)
        return `${this.envService.get('app.baseUrl')}/${image}`
      })
    });
    return projects;
  }
}