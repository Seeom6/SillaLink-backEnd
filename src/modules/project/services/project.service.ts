import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "../api/dto/request/create-project.dto";
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
    });
    return projects;
  }
}