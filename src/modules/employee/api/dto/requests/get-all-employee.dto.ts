import { PositionEnum } from "@Modules/employee/databases/position.enum";
import { IPaginationRequest} from "@Package/api";

export class GetAllEmployee extends IPaginationRequest {
    name?: string;
    position?: PositionEnum
}