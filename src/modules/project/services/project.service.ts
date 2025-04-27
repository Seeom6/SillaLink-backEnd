import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "../api/dto/request/create-project.dto";
import { ProjectRepository } from "../database/project.repository";
import { ProjectDocument } from "../database/project.schema";

@Injectable()
export class ProjectServiceWeb {
  constructor(private readonly projectRepository: ProjectRepository) { }

  async getAll(){
  }
}