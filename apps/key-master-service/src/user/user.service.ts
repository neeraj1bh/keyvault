import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Key } from '../../../../libs/db/src/entities/key.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Key)
    private keyRepository: Repository<Key>,
  ) {}

  async getKeyDetails(key: string): Promise<Key> {
    return this.keyRepository.findOne({ where: { key, isActive: true } });
  }

  async disableKey(key: string): Promise<Key> {
    const keyEntity = await this.keyRepository.findOne({ where: { key } });
    keyEntity.isActive = false;
    return this.keyRepository.save(keyEntity);
  }
}
