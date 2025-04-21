import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UserModule } from '@Modules/user';

@Module({
   imports: [UserModule],
   providers: [SeederService],
   exports: [SeederService],
})
export class SeederModule {} 