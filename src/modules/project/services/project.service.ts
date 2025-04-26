import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../database/project.repository';
import { CreateProjectDto } from '../api/dto/request/create-project.dto';
import { UpdateProjectDto } from '../api/dto/request/update-project.dto';
import { ProjectDocument } from '../database/project.schema';
import { ProjectError } from './project.error';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectError: ProjectError,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDocument> {
    const existingProject = await this.projectRepository.findByName(createProjectDto.name);
    if (existingProject) {
      this.projectError.projectAlreadyExists();
    }

    return this.projectRepository.create({
      ...createProjectDto,
    });
  }

  async findOne(id: string): Promise<ProjectDocument> {
    const project = await this.projectRepository.findOne(id);
    if (!project) {
      this.projectError.projectNotFound();
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectDocument> {
    // Verify project exists and user has access
    await this.findOne(id);

    // If name is being updated, check if new name is unique
    if (updateProjectDto.name) {
      const existingProject = await this.projectRepository.findByName(updateProjectDto.name);
      if (existingProject && existingProject._id.toString() !== id) {
        this.projectError.projectAlreadyExists();
      }
    }

    const project = await this.projectRepository.update(id, updateProjectDto);
    if (!project) {
      this.projectError.projectNotFound();
    }
    return project;
  }

} 