import { Body, Post } from "@nestjs/common";
import { CreateProjectDto } from "../dto/request/create-project.dto";
import { ProjectService } from "@Modules/project/services/project.dashboard.service";
import { AuthControllerWeb } from "@Package/api";

@AuthControllerWeb({
    prefix: "project"
})
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    async createProject(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.create(createProjectDto);
    }
}