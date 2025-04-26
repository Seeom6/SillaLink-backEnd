import { ProjectService } from "@Modules/project/services/project.service";
import { Body, Post } from "@nestjs/common";
import { AuthControllerAdmin } from "@Package/api";
import { CreateProjectDto } from "../dto/request/create-project.dto";

 @AuthControllerAdmin({
  prefix: "out-project"
})
export class ProjectDashboardController {
  constructor(private readonly projectService: ProjectService) {}

 @Post("create")
 async createProject(@Body() body: CreateProjectDto) {
  return this.projectService.create(body);
 }
}
