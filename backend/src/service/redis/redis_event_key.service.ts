import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class RedisEventKeyService {
  public projectKeyPrefix: string;
  public separator = ':';

  constructor() {
    this.projectKeyPrefix = this.keyPrefix();
  }

  abstract keyPrefix(): string;

  public generateKeyName(...nameChunks: Array<string>): string {
    return nameChunks.join(this.separator);
  }

  public getKey(payload: any): string {
    const stringifiedPayload = JSON.stringify(payload);

    return this.generateKeyName(this.projectKeyPrefix, stringifiedPayload);
  }

  public getPayload(key: string): any {
    const parts = key.split(`${this.projectKeyPrefix}${this.separator}`);
    const stringifiedPayload = parts[parts.length - 1];

    return JSON.parse(stringifiedPayload);
  }
}
