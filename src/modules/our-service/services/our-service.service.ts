import { Injectable } from '@nestjs/common';
import { OurServiceError, OurServiceErrorCode } from './our-service.error';
import { OurServiceRepository } from '../entity/our-service.repository';
import { Pagination } from 'src/package/api';
import {CreateServiceDto} from "@Modules/our-service/api/dto/requests";
import {OurServiceDocument} from "@Modules/our-service/entity/our-service.schema";
import {UpdateServiceDashboardDto} from "@Modules/our-service/api/dto/requests/update-service-dashboard.dto";
import {toMongoId} from "@Package/services";

@Injectable()
export class OurServiceService {
    constructor(
        private readonly ourServiceError: OurServiceError,
        private readonly ourServiceRepository: OurServiceRepository,
    ) {}

    async getService(id: string) {

        const service = await this.ourServiceRepository.findOne({
            filter: { _id: id }
        });

        if (!service) {
            this.ourServiceError.throw(OurServiceErrorCode.SERVICE_NOT_FOUND);
        }

        return service;
    }

    async createService(data: CreateServiceDto) {

        const existingService = await this.ourServiceRepository.findOne({
            filter: { name: data.name }
        });

        if (existingService) {
            this.ourServiceError.throw(OurServiceErrorCode.SERVICE_ALREADY_EXISTS);
        }

        await this.ourServiceRepository.create({
            doc: {
                name: data.name,
                description: data.description,
                image: data.image || null,
            }
        });
        return;
    }

    async getAllServices(pagination?: Pagination): Promise<OurServiceDocument[]> {
        return this.ourServiceRepository.findAllServices(pagination);
    }

    async updateService(id: string, data: UpdateServiceDashboardDto):Promise<void> {
        const existingService = await this.ourServiceRepository.findOne({
            filter: {
                id: id,
            }
        })
        const isTheSameName = await this.ourServiceRepository.findOne({
            filter: {
                name: data.name
            }
        })
        if (isTheSameName) {
            this.ourServiceError.throw(OurServiceErrorCode.SERVICE_ALREADY_EXISTS);
        }
        await this.ourServiceRepository.findOneAndUpdate({
            filter: {
                _id: toMongoId(id)
            },
            update: data
        })
        return;
    }
}
