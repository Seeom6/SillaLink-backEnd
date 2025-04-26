import { AuthModule } from "./auth/auth.module";
import { ProjectModule } from "./project";
import { UserModule } from "./user";

export const modules = [
  ProjectModule,
  UserModule,
  AuthModule,
];
