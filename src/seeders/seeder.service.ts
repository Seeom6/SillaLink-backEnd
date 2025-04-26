import { UserDocument } from '@Modules/user/entity/user.schema';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    this.logger.log('SeederService initialized');
  }

  async seed() {
    try {
      this.logger.log('Starting database seeding...');

      // Clear existing data
      await this.clearDatabase();

      // Seed users
      await this.seedUsers();

      this.logger.log('Database seeding completed successfully');
    } catch (error) {
      this.logger.error('Error seeding database:', error);
      throw error;
    }
  }

  private async clearDatabase() {
    this.logger.log('Clearing existing data...');
    await this.userModel.deleteMany({});
    this.logger.log('Database cleared');
  }

  private async seedUsers() {
    this.logger.log('Seeding users...');
    const users = [
      {
        email: 'admin@sillalink.com',
        password: 'Admin@123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isVerified: true,
      },
      {
        email: 'user@sillalink.com',
        password: 'User@123',
        firstName: 'Regular',
        lastName: 'User',
        role: 'user',
        isVerified: true,
      },
    ];

    await this.userModel.insertMany(users);
    this.logger.log('Users seeded successfully');
  }

} 