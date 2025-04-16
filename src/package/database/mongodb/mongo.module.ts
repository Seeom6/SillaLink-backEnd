import {Module, Logger, OnModuleInit} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigModule, EnvironmentService } from '@Package/config';
import { Connection} from "mongoose";
import * as console from "node:console";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [EnvConfigModule],
            inject: [EnvironmentService],
            useFactory: async (env: EnvironmentService)=> {
                const host: string = env.get('mongodb.host');
                const port: number = env.get('mongodb.port');
                const username: string = env.get('mongodb.username');
                const password: string = env.get('mongodb.password');
                const database: string = env.get('mongodb.name');

                const uri = username && password
                    ? `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`
                    : `mongodb://${host}:${port}/${database}?authSource=admin`;

                const logger = new Logger('MongoDB');
                return {
                    uri,
                    connectionFactory: (connection: Connection, name: string) => {
                        connection.on('connected', () => {
                            console.log('Connected to MongoDB');
                            logger.verbose('Successfully connected to MongoDB', name);
                        });
                        connection.on('error', (err) => {
                            logger.error('MongoDB connection error:', err);
                        });
                        connection.on('disconnected', () => {
                            logger.warn('MongoDB disconnected');
                        });
                        connection.plugin((schema: any) => {
                            schema.options.toJSON = {
                                virtuals: true,
                                versionKey: false,
                                transform(doc: any, ret: any) {
                                    if (ret.password) delete ret.password;
                                    ret.id = ret._id;
                                    delete ret._id;
                                },
                            };
                            schema.options.toObject = {
                                virtuals: true,
                                versionKey: false,
                                transform(doc: any, ret: any) {
                                    if (ret.password) delete ret.password;
                                    delete ret._id;
                                },
                            };
                        });
                        return connection;
                    },
                };
            },
        })
    ]
})
export class MongoConnection implements OnModuleInit{
    onModuleInit(): void {
        const logger = new Logger('MongoDB');
        logger.verbose('MongoDB Module Initialized');
    }
}
