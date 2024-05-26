import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Key } from '@app/db/entities/key.entity';

@Injectable()
export class TokenInfoService {
  constructor(
    @InjectRepository(Key)
    private keyRepository: Repository<Key>,
  ) {}

  async validateKey(apiKey: string): Promise<Key> {
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
  }

  getTokenInfo(): any {
    return {
      token: 'example-token',
      data: 'This is some token information',
    };
  }
}
