import {OurServiceDocument} from "@Modules/our-service/entity/our-service.schema";

export class GetAllServiceDto {
  name: string;
  description: string;
  image: string;
  constructor(service: OurServiceDocument) {
    this.name = service.name
    this.description = service.name
    this.image = service.image
  }
}