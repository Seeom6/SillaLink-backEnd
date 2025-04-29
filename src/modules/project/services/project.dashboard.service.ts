import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../database/project.repository';
import { CreateProjectDto } from '../api/dto/request/create-project.dto';
import { UpdateProjectDto } from '../api/dto/request/update-project.dto';
import { ProjectDocument } from '../database/project.schema';
import { ProjectError, ProjectErrorCode } from './project.error';
import { EnvironmentService } from '@Package/config';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectError: ProjectError,
    private readonly envService: EnvironmentService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<void> {
    const existingProject = await this.projectRepository.findByName(createProjectDto.name);
    if (existingProject) {
      this.projectError.throw(ProjectErrorCode.PROJECT_ALREADY_EXISTS);
    }
    await this.projectRepository.create({
      ...createProjectDto,
    });
  }

  async findOne(id: string): Promise<ProjectDocument> {
    const project = await this.projectRepository.findOne({
      filter: {
        _id: id,
        isDeleted: false,
      },
    });
    if (!project) {
      this.projectError.throw(ProjectErrorCode.PROJECT_NOT_FOUND);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<void> {
    await this.findOne(id);

    if (updateProjectDto.name) {
      const existingProject = await this.projectRepository.findByName(updateProjectDto.name);
      if (existingProject && existingProject._id.toString() !== id) {
        this.projectError.throw(ProjectErrorCode.PROJECT_ALREADY_EXISTS);
      }
    }

    const project = await this.projectRepository.update(id, updateProjectDto);
    if (!project) {
      this.projectError.throw(ProjectErrorCode.PROJECT_NOT_FOUND);
    }
    return ;
  }


  async findAll(): Promise<ProjectDocument[]> {
    const projects = await this.projectRepository.find({
      filter: {
        isDeleted: false,
      },
    });
    projects.forEach((project) => {
      project.mainImage = `${this.envService.get('app.baseUrl')}/${project.mainImage}`;
      project.images = project.images.map((image)=>{
        console.log(image)
        return `${this.envService.get('app.baseUrl')}/${image}`
      })
    });
    return projects;
  }

  async getProjectById(id: string){
    const project = await this.projectRepository.findOne({
      filter: {
        _id: id
      }
    })
    if(!project){
      this.projectError.throw(ProjectErrorCode.PROJECT_NOT_FOUND)
    }
    project.mainImage = `${this.envService.get('app.baseUrl')}/${project.mainImage}`;
    return project
  }

  async delete(id: string): Promise<void>{
    await this.findOne(id)
    await this.projectRepository.update(id, {
      isDeleted: new Date()
    })
    return;
  }
} 