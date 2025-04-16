import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigModule, EnvironmentService } from '@Package/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [EnvConfigModule],
            inject: [EnvironmentService],
            useFactory(env: EnvironmentService) {
                const host = env.get('mongodb.host');
                const port = env.get('mongodb.port');
                const username = env.get('mongodb.username');
                const password = env.get('mongodb.password');
                const database = env.get('mongodb.name');

                const uri = username && password
                    ? `mongodb://${username}:${password}@${host}:${port}/${database}`
                    : `mongodb://${host}:${port}/${database}`;

                const logger = new Logger('MongoDB');
                console.log(uri);
                return {
                    uri,
                    connectionFactory: (connection) => {
                        connection.on('connected', () => {
                            logger.log('Successfully connected to MongoDB');
                        });
                        connection.on('error', (err) => {
                            logger.error('MongoDB connection error:', err);
                        });
                        connection.on('disconnected', () => {
                            logger.warn('MongoDB disconnected');
                        });
                        return connection;
                    },
                };
            },
        })
    ]
})
export class MongoConnection {}
