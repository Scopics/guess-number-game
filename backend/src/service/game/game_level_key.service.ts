import { RedisEventKeyService } from '../redis/redis_event_key.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameLevelKeyService extends RedisEventKeyService {
  public keyPrefix(): string {
    return this.generateKeyName('game', 'level', 'timeout', 'event');
  }
}
