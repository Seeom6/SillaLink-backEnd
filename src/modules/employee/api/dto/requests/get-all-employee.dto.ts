import { PositionEnum } from "@Modules/employee/databases/position.enum";
import { PaginationRequest} from "@Package/api";

export class GetAllEmployee extends PaginationRequest {
    name?: string;
    position?: PositionEnum
}