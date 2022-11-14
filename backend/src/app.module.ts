import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { ConfigService } from '@nestjs/config';

import configuration from './config/configuration';
import dbConfig from './config/db.config';

import { DatabaseConfig, RedisConfig } from './config/interfaces';
import { GameModule } from './module/game.module';
import { GameLevelTimeoutService } from './service/game/game_level_timeout.service';
import { GameLevelTimeoutModule } from './module/game_level_timeout.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot(dbConfig() as DatabaseConfig),
    GameLevelTimeoutModule,
    RedisModule.forRootAsync({
      imports: [GameLevelTimeoutModule],
      inject: [ConfigService, GameLevelTimeoutService],
      useFactory: (
        configService: ConfigService,
        gameLevelTimeoutService: GameLevelTimeoutService,
      ) => {
        return (configService.get('redis') as Array<RedisConfig>).map(
          (redisConfig): RedisModuleOptions => {
            if (redisConfig.name === 'subscriber') {
              return {
                ...redisConfig,
                onClientReady(client) {
                  client.subscribe('__keyevent@0__:expired');
                  client.on(
                    'message',
                    async (channel: string, message: string) => {
                      await gameLevelTimeoutService.handleRedisKeyExpired(
                        message,
                      );
                    },
                  );

                  return client;
                },
              };
            }

            return redisConfig;
          },
        );
      },
    }),
    GameModule,
  ],
})
export class AppModule {}
