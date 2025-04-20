import { Injectable, Inject, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import Keyv from 'keyv';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(RedisService.name);

    constructor(
        @Inject('REDIS_CLIENT') private readonly keyv: Keyv,
    ) { }

    async onModuleInit() {
        try {
            await this.keyv.set('connection-test', 'ok');
            const test = await this.keyv.get('connection-test');
            if (test === 'ok') {
                this.logger.log('Successfully connected to Redis');
                await this.keyv.delete('connection-test');
            }
        } catch (error) {
            this.logger.error('Failed to connect to Redis', error);
            throw error;
        }
    }

    async onModuleDestroy() {
        await this.keyv.disconnect();
        this.logger.log('Redis connection closed');
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        try {
            await this.keyv.set(key, value, ttl);
        } catch (error) {
            this.logger.error(`Error setting key ${key}`, error);
            throw error;
        }
    }

    async get<T>(key: string): Promise<T | null> {
        try {
            return await this.keyv.get(key);
        } catch (error) {
            this.logger.error(`Error getting key ${key}`, error);
            throw error;
        }
    }

    async delete(key: string): Promise<void> {
        try {
            await this.keyv.delete(key);
        } catch (error) {
            this.logger.error(`Error deleting key ${key}`, error);
            throw error;
        }
    }

    async clear(): Promise<void> {
        try {
            await this.keyv.clear();
        } catch (error) {
            this.logger.error('Error clearing Redis', error);
            throw error;
        }
    }

    async has(key: string): Promise<boolean> {
        try {
            const value = await this.keyv.get(key);
            return value !== undefined;
        } catch (error) {
            this.logger.error(`Error checking existence of key ${key}`, error);
            throw error;
        }
    }
}
