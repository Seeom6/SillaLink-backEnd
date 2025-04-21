import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '@Modules/user';
import { HashService } from '@Package/auth';
import { EnvironmentService } from '@Package/config';
import { Logger } from '@nestjs/common';
import * as process from 'node:process';
import { UserRole } from '@Modules/user/types/role.enum';
import { User } from '@Modules/user/entity/user.schema';
import * as fs from 'fs';
import * as path from 'path';

interface AdminData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    role: string;
}

@Injectable()
export class SeederService implements OnModuleInit {
    private readonly logger = new Logger(SeederService.name);

    constructor(
        private readonly userService: UserService,
        private readonly env: EnvironmentService,
    ) { }

    async onModuleInit() {
        if (process.env.NODE_ENV === 'development') {
            await this.seed();
        }
    }

    private async seed() {
        try {
            this.logger.log('Starting database seeding...');

            await this.seedAdminUser();

            this.logger.log('Database seeding completed successfully');
        } catch (error) {
            this.logger.error('Error during database seeding:', error);
        }
    }

    private async seedAdminUser() {
        try {
            const adminDataPath = path.join(__dirname, 'data', 'admin.json');
            const adminData: AdminData = JSON.parse(fs.readFileSync(adminDataPath, 'utf8'));

            const existingAdmin = await this.userService.findUserByEmail(adminData.email, false);
            if (existingAdmin) {
                this.logger.log('Admin user already exists');
                return;
            }

            const hashedPassword = await HashService.hashPassword(adminData.password);
            const user = await this.userService.createUser({
                email: adminData.email,
                password: hashedPassword,
                firstName: adminData.firstName,
                lastName: adminData.lastName,
                isActive: adminData.isActive,
            });

            // Update the user role after creation
            await this.userService.updateUserByEmail(adminData.email, { role: UserRole.ADMIN });

            this.logger.log('Admin user created successfully');
        } catch (error) {
            this.logger.error('Error creating admin user:', error);
        }
    }
} 