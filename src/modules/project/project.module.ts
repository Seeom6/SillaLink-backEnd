import { MongooseModule } from "@nestjs/mongoose";
import { Project } from "./database/project.schema";
import { ProjectSchema } from "./database/project.schema";
import { ProjectService } from "./services/project.dashboard.service";
import { ProjectDashboardController } from "./api/controllers/project-dashboard.controller";
import { Module } from "@nestjs/common";
import { ProjectRepository } from "./database/project.repository";
import { ProjectError } from "./services/project.error";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectDashboardController],
  providers: [ProjectService, ProjectRepository, ProjectError],
})
export class ProjectModule {}