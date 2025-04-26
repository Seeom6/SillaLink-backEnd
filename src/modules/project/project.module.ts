import { MongooseModule } from "@nestjs/mongoose";
import { Project } from "./database/project.schema";
import { ProjectSchema } from "./database/project.schema";
import { ProjectService } from "./services/project.service";
import { ProjectDashboardController } from "./api/controllers/project-dashboard.controller";
import { Module } from "@nestjs/common";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectDashboardController],
  providers: [ProjectService],
})
export class ProjectModule {}