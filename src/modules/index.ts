import { AuthModule } from "./auth";
import { ProjectModule } from "./project";
import { UserModule } from "./user";
import { EmployeeModule } from "./employee";
import { OurServiceModule } from "./our-service";

export const Modules = [
  ProjectModule,
  UserModule,
  AuthModule,
  EmployeeModule,
  OurServiceModule
];
