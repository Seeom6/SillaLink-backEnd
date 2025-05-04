import {Injectable} from "@nestjs/common";
import {OurServiceError} from "@Modules/our-service/services/our-service.error";
import {OurServiceRepository} from "@Modules/our-service/entity/our-service.repository";
import {OurServiceDocument} from "@Modules/our-service/entity/our-service.schema";
import {parsImageUrl} from "@Package/file";


@Injectable()
export class OurServiceWebService {
  constructor(
    private readonly ourServiceError: OurServiceError,
    private readonly ourServiceRepository: OurServiceRepository,
  ) {}

  async getOurService(): Promise<OurServiceDocument[]> {
    const services =  await this.ourServiceRepository.find({
      filter: {
        deletedAt: {
          $ne: null
        }
      }
    })
    services.map((service)=>{
      service.image = parsImageUrl(service.image)
    })
    return services
  }
}