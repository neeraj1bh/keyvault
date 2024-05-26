import { Key } from '@app/db/entities';
import { LoggerService } from '@app/logger';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Key)
    private keyRepository: Repository<Key>,
    private logger: LoggerService,
  ) {}

  APP_CONTEXT = 'UserService';

  async getKeyDetails(key: string): Promise<Key> {
    try {
      return this.keyRepository.findOne({ where: { key, isActive: true } });
    } catch (error) {
      this.logger.error('Failed to get key details', error, this.APP_CONTEXT);
      throw error;
    }
  }

  async disableKey(key: string): Promise<Key> {
    try {
      const keyEntity = await this.keyRepository.findOne({ where: { key } });
      keyEntity.isActive = false;
      return this.keyRepository.save(keyEntity);
    } catch (error) {
      this.logger.error('Failed to disable key', error, this.APP_CONTEXT);
      throw error;
    }
  }
}
