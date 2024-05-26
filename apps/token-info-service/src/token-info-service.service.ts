import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Key } from '@app/db/entities/key.entity';
import { LoggerService } from '@app/logger';

@Injectable()
export class TokenInfoService {
  constructor(
    @InjectRepository(Key)
    private keyRepository: Repository<Key>,
    private logger: LoggerService,
  ) {}

  APP_CONTEXT = 'TokenInfoService';

  async validateKey(apiKey: string): Promise<Key> {
    try {
      const key = await this.keyRepository.findOne({
        where: { key: apiKey, isActive: true },
      });

      if (!key) {
        throw new NotFoundException('API key not found or inactive');
      }

      if (key.expiresAt < new Date()) {
        throw new NotFoundException('API key expired');
      }

      return key;
    } catch (error) {
      this.logger.error(error.message, error, this.APP_CONTEXT);
      throw error;
    }
  }

  getTokenInfo(): any {
    return {
      token: 'example-token',
      data: 'This is some token information',
    };
  }
}
