import { ProjectService } from "@Modules/project/services/project.service";
import { Body, Post } from "@nestjs/common";
import { AuthControllerAdmin } from "@Package/api";
import { CreateProjectDto } from "../dto/request/create-project.dto";
import { CreateProjectValidation } from "../validation/create-project.validation.pipe";

@AuthControllerAdmin({
  prefix: "out-project"
})
export class ProjectDashboardController {
  constructor(private readonly projectService: ProjectService) { }

  @Post("")
  async createProject(@Body(CreateProjectValidation) body: CreateProjectDto) {
    return this.projectService.create(body);
  }
}
